import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { productImageUrl, userImageBase64 } = await req.json();

    // Validate inputs
    if (!productImageUrl || !userImageBase64) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields: productImageUrl and userImageBase64' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Get API key from environment variables
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    
    if (!OPENROUTER_API_KEY) {
      return new Response(
        JSON.stringify({ 
          error: 'OpenRouter API key not configured' 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Prepare the prompt for the virtual try-on
    const tryOnPrompt = `
      You are a virtual try-on specialist. Your task is to apply the clothing item 
      from the **FIRST IMAGE** (the product) onto the person in the **SECOND IMAGE** (the model).
      Generate a photorealistic image where the person is convincingly wearing the product, 
      maintaining natural lighting, shadows, and clothing folds.
    `;

    // Prepare the payload for OpenRouter API
    const bodyPayload = {
      "model": "google/gemini-2.5-flash-image-preview",
      "modalities": ["image", "text"],
      "messages": [
        {
          "role": "user",
          "content": [
            { "type": "text", "text": tryOnPrompt },
            { 
              "type": "image_url", 
              "image_url": { "url": productImageUrl } 
            },
            { 
              "type": "image_url", 
              "image_url": { "url": userImageBase64 } 
            }
          ]
        }
      ]
    };

    // Call the OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": req.headers.get('origin') || 'http://localhost:3000',
        "X-Title": "Virtual Try-On Service"
      },
      body: JSON.stringify(bodyPayload)
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ message: 'Failed to read error body.' }));
      throw new Error(`API call failed: ${response.status} - ${errorBody.message || JSON.stringify(errorBody)}`);
    }

    const data = await response.json();
    
    // Extract the generated image URL
    const generatedImageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (generatedImageUrl && (generatedImageUrl.startsWith('http') || generatedImageUrl.startsWith('data:'))) {
      return new Response(
        JSON.stringify({ 
          success: true,
          imageUrl: generatedImageUrl
        }),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } else {
      throw new Error(`API did not return a valid image. Raw response: ${JSON.stringify(data)}`);
    }

  } catch (error: any) {
    console.error("Virtual Try-On Error:", error);
    return new Response(
      JSON.stringify({ 
        error: `Failed to generate try-on image: ${error.message}`
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}