// Central product data for the entire e-commerce site
// All products are organized by range (men, women, kids) and category (topwear, bottomwear)

export const products = [
  // ============================================
  // MEN'S COLLECTION
  // ============================================
  
  // Men's Bottomwear
  {
    id: 1,
    name: "Beige Textured Trousers",
    description: "Crafted from breathable, lightweight textured cotton-blend fabric, these beige trousers offer a modern slim fit that's perfect for smart-casual outings. The subtle ribbed texture adds depth and sophistication, while the clean front pleats and functional belt loops ensure a polished silhouette. Ideal for pairing with linen shirts or knits for effortless weekend elegance.",
    price: "₹2,399",
    priceValue: 2399,
    rating: 4.5,
    category: "bottomwear",
    range: "men",
    image: "/mens/beige-trousers.png",
    imageurl: "https://i.postimg.cc/wxWd0Q0P/beige-trousers.png"
  },
  {
    id: 2,
    name: "Black Pleated Trousers",
    description: "These sleek black pleated trousers are tailored for a sharp, professional look without sacrificing comfort. Made from a stretch-infused blend, they hug the waist and taper gently down the leg for a refined silhouette. The deep black hue and crisp pleats make them ideal for office wear, formal dinners, or even styled with sneakers for elevated streetwear.",
    price: "₹2,699",
    priceValue: 2699,
    rating: 4.7,
    category: "bottomwear",
    range: "men",
    image: "/mens/black-trousers.png",
    imageurl: "https://i.postimg.cc/WbhcKqy4/black-trousers.png"
  },
  {
    id: 3,
    name: "Caramel Ribbed Pants",
    description: "Rich caramel-toned ribbed pants crafted for contemporary men who appreciate texture and tone. The vertical ribbing enhances the slim-fit cut, elongating the legs while offering flexibility and movement. Designed with a mid-rise waist and hidden zip-fly closure, these pants transition effortlessly from brunch dates to evening cocktails when paired with a tucked-in knit or button-down.",
    price: "₹2,499",
    priceValue: 2499,
    rating: 4.4,
    category: "bottomwear",
    range: "men",
    image: "/mens/caramel-pants.png",
    imageurl: "https://i.postimg.cc/7YfrcJRM/caramel-pants.png"
  },
  {
    id: 4,
    name: "Grey Pinstripe Trousers",
    description: "A timeless wardrobe staple, these grey pinstripe trousers feature fine white stripes over a charcoal base, lending a classic yet modern aesthetic. Tailored with precision, they boast a straight-leg cut and soft drape for all-day comfort. Perfect for business meetings, weddings, or smart dinners — pair with a crisp white shirt and loafers for an impeccable ensemble.",
    price: "₹2,899",
    priceValue: 2899,
    rating: 4.8,
    category: "bottomwear",
    range: "men",
    image: "/mens/grey-trousers.png",
    imageurl: "https://i.postimg.cc/kXzPdXr0/grey-trousers.png"
  },
  {
    id: 5,
    name: "White Textured Pants",
    description: "Elevate your summer wardrobe with these crisp white textured pants. The subtle ribbed weave adds visual interest and structure, while the tapered leg and mid-rise waist create a flattering, modern silhouette. Made from a breathable cotton blend, they're perfect for sunny days, garden parties, or pairing with pastel knits for a fresh, seasonal look.",
    price: "₹2,499",
    priceValue: 2499,
    rating: 4.6,
    category: "bottomwear",
    range: "men",
    image: "/mens/white-textured-pants.png",
    imageurl: "https://i.postimg.cc/y8R464sx/white-textured-pants.png"
    
  },

  // Men's Topwear - Polos
  {
    id: 6,
    name: "Bold Stripe Knit Polo",
    description: "Make a statement in this bold black-and-cream striped knit polo. Featuring a relaxed boxy fit, ribbed collar, and chest pocket, it's designed for laid-back confidence. The soft cotton-blend knit feels luxurious against the skin and drapes beautifully. Layer over jeans or chinos for a sporty-chic look that works from coffee shops to rooftop bars.",
    price: "₹1,999",
    priceValue: 1999,
    rating: 4.3,
    category: "topwear",
    range: "men",
    image: "/mens/bold-stripe-knit-polo.png",
    imageurl: "https://i.postimg.cc/PrZR5Khv/bold-stripe-knit-polo.png"
  },
  {
    id: 7,
    name: "Navy Vertical Stripe Polo",
    description: "Elevate your casual rotation with this navy blue polo featuring crisp white vertical stripes. Made from premium breathable knit fabric, it offers a slightly oversized fit with a ribbed collar and sleeve cuffs for structure. The contrast stitching and single chest pocket add subtle detailing, making it ideal for weekend getaways or pairing with shorts and sandals.",
    price: "₹2,099",
    priceValue: 2099,
    rating: 4.6,
    category: "topwear",
    range: "men",
    image: "/mens/navy-vertical-stripe-polo.png",
    imageurl: "https://i.postimg.cc/W1ZLpLjK/navy-vertical-stripe-polo.png"
    
  },
  {
    id: 8,
    name: "Emerald Ribbed Polo",
    description: "Stand out in this vibrant emerald green ribbed knit polo, accented with a contrasting cream collar and trim. The V-neck design and short sleeves offer a fresh, modern take on the classic polo, while the ribbed texture provides a tactile, luxe feel. Pair with khakis or dark denim for a stylish, color-forward outfit suitable for garden parties or city strolls.",
    price: "₹2,199",
    priceValue: 2199,
    rating: 4.2,
    category: "topwear",
    range: "men",
    image: "/mens/emerald-ribbed-polo.png",
    imageurl: "https://i.postimg.cc/xThVSTr7/emerald-ribbed-polo.png"
  },
  {
    id: 9,
    name: "Cream Contrast Collar Polo",
    description: "A sophisticated twist on the classic polo, this cream-colored piece features a rich burgundy contrast collar, cuffs, and hem. The soft ribbed knit fabric ensures comfort and shape retention, while the relaxed fit allows for easy layering. Ideal for transitional weather or smart-casual events — throw it on with chinos and leather sneakers for a polished yet approachable look.",
    price: "₹2,049",
    priceValue: 2049,
    rating: 4.1,
    category: "topwear",
    range: "men",
    image: "/mens/cream-contrast-collar-polo.png",
    imageurl: "https://i.postimg.cc/X7m607Mg/cream-contrast-collar-polo.png"
  },

  // Men's Topwear - Shirts
  {
    id: 10,
    name: "Burgundy Linen Shirt",
    description: "Embrace relaxed sophistication with this burgundy linen shirt, featuring a loose, flowing fit and rolled-up three-quarter sleeves. The natural crinkle texture adds character and breathability, making it perfect for warm days. A single chest pocket and coconut-shell buttons complete the earthy, artisanal vibe. Style with linen pants or chinos for a resort-ready ensemble.",
    price: "₹2,299",
    priceValue: 2299,
    rating: 4.5,
    category: "topwear",
    range: "men",
    image: "/mens/burgundy-linen-shirt.png",
    imageurl: "https://i.postimg.cc/KvRhV3W4/burgundy-linen-shirt.png"
  },
  {
    id: 11,
    name: "Chocolate Button-Down Shirt",
    description: "This rich chocolate brown button-down shirt is crafted from soft, lightweight cotton with a subtle sheen for understated luxury. The relaxed fit and roll-up sleeves make it versatile for both casual and semi-formal settings. The clean lines and minimalist design allow it to be dressed up with tailored trousers or down with jeans and boots — a true wardrobe essential.",
    price: "₹2,199",
    priceValue: 2199,
    rating: 4.4,
    category: "topwear",
    range: "men",
    image: "/mens/chocolate-button-down-shirt.png",
    imageurl: "https://i.postimg.cc/TYFvXY8r/chocolate-button-down-shirt.png"
  },
  {
    id: 12,
    name: "Wine Red Crinkle Shirt",
    description: "Add depth and drama to your wardrobe with this wine red crinkle-texture shirt. The long sleeves and classic button-front design offer timeless appeal, while the crinkled fabric gives it a lived-in, effortlessly cool vibe. Slightly oversized for comfort, it pairs beautifully with dark denim or tailored trousers — perfect for evening dinners or creative workplaces.",
    price: "₹2,349",
    priceValue: 2349,
    rating: 4.3,
    category: "topwear",
    range: "men",
    image: "/mens/wine-red-crinkle-shirt.png",
    imageurl: "https://i.postimg.cc/Xv0MpHYp/wine-red-crinkle-shirt.png"
  },
  {
    id: 13,
    name: "Olive Green Casual Shirt",
    description: "Designed for the modern man who values versatility, this olive green casual shirt combines relaxed styling with functional details. Made from breathable cotton-linen blend, it features a single chest pocket, roll-up sleeves, and a curved hem for easy tucking or wearing untucked. The muted earth tone complements almost any palette — ideal for hiking, travel, or urban exploration.",
    price: "₹2,249",
    priceValue: 2249,
    rating: 4.6,
    category: "topwear",
    range: "men",
    image: "/mens/olive-green-casual-shirt.png",
    imageurl: "https://i.postimg.cc/P5DsfsTd/olive-green-casual-shirt.png"
  },
  {
    id: 14,
    name: "Black Crinkle Short Sleeve",
    description: "Minimalist meets modern in this black crinkle-texture short sleeve shirt. The relaxed fit and fluid drape create a comfortable, unstructured silhouette that's perfect for hot weather. The subtle crinkle pattern adds visual interest without overwhelming, making it easy to pair with anything from white chinos to cargo shorts. A go-to for beachside cafes or casual Fridays.",
    price: "₹2,149",
    priceValue: 2149,
    rating: 4.2,
    category: "topwear",
    range: "men",
    image: "/mens/black-crinkle-short-sleeve.png",
    imageurl: "https://i.postimg.cc/BQXfyPzb/black-crinkle-short-sleeve.png"
  },
  {
    id: 15,
    name: "Navy Minimalist Shirt",
    description: "Clean lines and quiet confidence define this navy minimalist shirt. Crafted from smooth, lightweight cotton, it features an open collar, side slits for ease of movement, and a slightly elongated hem for a modern drape. The solid navy hue makes it endlessly versatile — layer under a blazer for work or wear solo with shorts for a coastal vibe.",
    price: "₹2,099",
    priceValue: 2099,
    rating: 4.0,
    category: "topwear",
    range: "men",
    image: "/mens/navy-minimalist-shirt.png",
    imageurl: "https://i.postimg.cc/9FKHjF55/navy-minimalist-shirt.png"
  },
  {
    id: 16,
    name: "Sky Blue Striped Oxford",
    description: "Refresh your formal rotation with this sky blue striped oxford shirt. The fine vertical stripes add dimension and polish, while the crisp cotton weave ensures durability and a refined finish. With its classic button-down collar and neatly stitched cuffs, it's ideal for interviews, weddings, or boardroom meetings. Tuck it into grey trousers for a sharp, professional look.",
    price: "₹2,599",
    priceValue: 2599,
    rating: 4.7,
    category: "topwear",
    range: "men",
    image: "/mens/sky-blue-striped-oxford.png",
    imageurl: "https://i.postimg.cc/0ySR5RPN/sky-blue-striped-oxford.png"
  },

  // ============================================
  // WOMEN'S COLLECTION
  // ============================================
  {
    id: 17,
    name: "Ivory Cropped Blazer & Wide-Leg Pants Set",
    description: "A chic ivory ensemble featuring a tailored cropped blazer with a single-button closure and elegant wide-leg trousers. Crafted from a smooth, structured fabric, this set offers a sophisticated and modern silhouette. The blazer's sharp lines and the trousers' flowing drape make this outfit perfect for professional settings or formal events where understated elegance is key.",
    price: "₹2,999",
    priceValue: 2999,
    rating: 4.7,
    category: "topwear",
    range: "women",
    image: "/womens/ivory-cropped-blazer-wide-leg-pants-set.png",
    imageurl: "https://i.postimg.cc/8P2kmbCp/ivory-cropped-blazer-wide-leg-pants-set.png"
  },
  {
    id: 18,
    name: "Emerald Green Lace Tiered Chiffon Dress",
    description: "Flowing emerald green chiffon dress designed for graceful movement. Features a delicate lace-adorned V-neckline with intricate floral detailing, a flattering belted waist that cinches the silhouette, and multiple tiers of airy chiffon creating a voluminous, ethereal skirt. This dress is ideal for evening events, weddings, or any occasion calling for timeless sophistication and charm.",
    price: "₹2,499",
    priceValue: 2499,
    rating: 4.6,
    category: "topwear",
    range: "women",
    image: "/womens/emerald-green-lace-tiered-chiffon-dress.png",
    imageurl: "https://i.postimg.cc/HscsMNdf/emerald-green-lace-tiered-chiffon-dress.png"
  },
  {
    id: 19,
    name: "Pink Tulle Ballgown with Crystal Bow",
    description: "A show-stopping pink ballgown crafted from layers of ethereal tulle, creating a magnificent volume. The fitted bodice is meticulously embellished with sparkling crystals, leading to a dramatic oversized bow at the back. With its voluminous skirt and romantic, fairytale aesthetic, this gown is perfect for galas, proms, or any grand celebration.",
    price: "₹2,999",
    priceValue: 2999,
    rating: 4.9,
    category: "topwear",
    range: "women",
    image: "/womens/pink-tulle-ballgown-crystal-bow.png",
    imageurl: "https://i.postimg.cc/dVGsHT7y/pink-tulle-ballgown-crystal-bow.png"
  },
  {
    id: 20,
    name: "Black One-Shoulder Draped Midi Dress",
    description: "A sleek and sophisticated black midi dress designed for ultimate evening elegance. Features a flattering one-shoulder neckline with artful draping across the bodice and a daring thigh-high slit that adds a touch of allure. The form-fitting silhouette accentuates the figure beautifully, making it a perfect choice for cocktail parties or formal dinners.",
    price: "₹2,699",
    priceValue: 2699,
    rating: 4.7,
    category: "topwear",
    range: "women",
    image: "/womens/black-one-shoulder-draped-midi-dress.png",
    imageurl: "https://i.postimg.cc/Y2yCh7K6/black-one-shoulder-draped-midi-dress.png"
  },
  {
    id: 21,
    name: "Blue Puff Sleeve Crop Top & Midi Skirt Set",
    description: "A stylish coordinated set in a soft powder blue hue, perfect for a chic, summery look. The cropped top features dramatic puff sleeves and a flattering square neckline, paired with a fluid, high-waisted midi skirt that moves beautifully. Crafted from lightweight, breathable fabric, this set offers comfort and fashionable flair.",
    price: "₹2,199",
    priceValue: 2199,
    rating: 4.5,
    category: "topwear",
    range: "women",
    image: "/womens/powder-blue-puff-sleeve-crop-top-midi-skirt-set.png",
    imageurl: "https://i.postimg.cc/bw1yC2Gb/powder-blue-puff-sleeve-crop-top-midi-skirt-set.png"
  },
  {
    id: 22,
    name: "Sage Green Textured Tweed Suit",
    description: "A sophisticated sage green tweed suit comprising a structured, collarless jacket with elegant pearl button details and matching fitted pencil skirt. The textured fabric offers a refined, classic look, perfect for business attire, luncheons, or chic daytime events. The tailored fit ensures a polished and polished appearance.",
    price: "₹2,899",
    priceValue: 2899,
    rating: 4.8,
    category: "topwear",
    range: "women",
    image: "/womens/sage-green-textured-tweed-suit.png",
    imageurl: "https://i.postimg.cc/HkbYZ7Jv/sage-green-textured-tweed-suit.png"
  },
  {
    id: 23,
    name: "Lavender Ombre One-Shoulder Gown",
    description: "An elegant lavender gown that transitions beautifully from a soft pastel hue to a deeper shade, creating a mesmerizing ombre effect. Designed with a graceful one-shoulder silhouette and delicate embellishments on the strap, this floor-length dress flows majestically. Ideal for formal events, bridesmaids, or sophisticated evening wear.",
    price: "₹2,599",
    priceValue: 2599,
    rating: 4.7,
    category: "topwear",
    range: "women",
    image: "/womens/lavender-ombre-one-shoulder-gown.png",
    imageurl: "https://i.postimg.cc/vZ5Yq61c/lavender-ombre-one-shoulder-gown.png"
  },
  {
    id: 24,
    name: "Coral Ombré Sequin Lehenga Set",
    description: "A vibrant festive ensemble perfect for celebrations. Features a stunning coral to peach ombré gradient skirt paired with a heavily embellished sequined blouse. The intricate mirror work and shimmering sequins on the top add a glamorous touch, making this set ideal for weddings, parties, and cultural events.",
    price: "₹2,999",
    priceValue: 2999,
    rating: 4.8,
    category: "bottomwear",
    range: "women",
    image: "/womens/coral-ombre-sequin-lehenga-set.png",
    imageurl: "https://i.postimg.cc/9FRF9kCK/coral-ombre-sequin-lehenga-set.png"
  },
  {
    id: 25,
    name: "Emerald Brocade Embroidered Kurta Set",
    description: "A luxurious emerald green brocade kurta richly adorned with intricate gold thread embroidery on the neckline and sleeves. Paired with matching comfortable palazzo pants, this traditional ethnic wear set is perfect for festive gatherings, weddings, and cultural celebrations, offering both opulence and ease of wear.",
    price: "₹2,799",
    priceValue: 2799,
    rating: 4.7,
    category: "topwear",
    range: "women",
    image: "/womens/emerald-brocade-embroidered-kurta-set.png",
    imageurl: "https://i.postimg.cc/rF0F4HMB/emerald-brocade-embroidered-kurta-set.png"
  },
  {
    id: 26,
    name: "Ivory Satin Jumpsuit with Embellished Cape",
    description: "An elegant ivory satin jumpsuit featuring a sophisticated cowl neckline and fluid wide-leg trousers, paired with a sheer, delicately beaded cape. This ensemble offers a modern yet glamorous look suitable for formal events, evening gatherings, or even as a chic bridal alternative. The luxurious satin drapes beautifully.",
    price: "₹2,999",
    priceValue: 2999,
    rating: 4.8,
    category: "topwear",
    range: "women",
    image: "/womens/ivory-satin-jumpsuit-embellished-cape.png",
    imageurl: "https://i.postimg.cc/zXsDFkf3/ivory-satin-jumpsuit-embellished-cape.png"
  },
  {
    id: 27,
    name: "Navy Celestial Corset Dress",
    description: "A stunning navy satin dress featuring a dramatic corset bodice intricately embellished with celestial motifs like stars, moons, and planets. The skirt has a unique draped and gathered effect, creating a voluminous and artistic silhouette. Perfect for a statement evening look at galas or special events where fashion-forward design is desired.",
    price: "₹2,999",
    priceValue: 2999,
    rating: 4.9,
    category: "topwear",
    range: "women",
    image: "/womens/navy-celestial-corset-satin-dress.png",
    imageurl: "https://i.postimg.cc/g23zS6wx/navy-celestial-corset-satin-dress.png"
  },
  {
    id: 28,
    name: "Golden Satin Embroidered Kaftan Dress",
    description: "A luxurious golden brown satin kaftan dress featuring elaborate floral embroidery and a shimmering beaded neckline. The fluid, relaxed silhouette offers exceptional comfort and opulent style, ideal for resort wear, elegant evening events, or festive occasions. Side slits enhance the graceful flow and add a touch of modern design.",
    price: "₹2,599",
    priceValue: 2599,
    rating: 4.6,
    category: "topwear",
    range: "women",
    image: "/womens/golden-satin-embroidered-kaftan-dress.png",
    imageurl: "https://i.postimg.cc/4ND4Q13d/golden-satin-embroidered-kaftan-dress.png"
  },
  {
    id: 29,
    name: "Black Velvet Suit Set",
    description: "A luxurious black velvet suit set comprising a tailored single-button blazer, a sleek matching camisole, and elegant trousers. The plush velvet fabric offers a rich texture and sophisticated sheen, making this ensemble perfect for formal evenings, holiday parties, or upscale events requiring a touch of drama and refinement.",
    price: "₹2,999",
    priceValue: 2999,
    rating: 4.7,
    category: "topwear",
    range: "women",
    image: "/womens/black-velvet-suit-set.png",
    imageurl: "https://i.postimg.cc/PrprD7dG/black-velvet-suit-set.png"
  },
  {
    id: 30,
    name: "Silver Satin Slip Dress",
    description: "A minimalist yet striking silver satin slip dress. Featuring a delicate cowl neckline and a fluid, shimmering finish, this dress embodies effortless chic. It's perfect for evening wear, parties, or can be layered elegantly under jackets or with statement accessories. Its simple design makes it incredibly versatile for various occasions.",
    price: "₹1,899",
    priceValue: 1899,
    rating: 4.3,
    category: "topwear",
    range: "women",
    image: "/womens/silver-satin-slip-dress.png",
    imageurl: "https://i.postimg.cc/fRYz203p/silver-satin-slip-dress.png"
  },
  {
    id: 31,
    name: "Gold Sequin & Mirror Work Blouse with Silk Skirt Set",
    description: "A stunning festive ethnic wear set designed to make a statement. The heavily embellished blouse features intricate gold sequins and mirror work, paired with a flowing golden silk skirt. This opulent ensemble is perfect for grand celebrations, weddings, and cultural events, exuding traditional charm and luxurious style.",
    price: "₹2,999",
    priceValue: 2999,
    rating: 4.8,
    category: "bottomwear",
    range: "women",
    image: "/womens/gold-sequin-mirror-work-blouse-silk-skirt-set.png",
    imageurl: "https://i.postimg.cc/jdpq4hjd/gold-sequin-mirror-work-blouse-silk-skirt-set.png"
  },
  {
    id: 32,
    name: "Ruby Red Sequin Gown",
    description: "A breathtaking floor-length evening gown in a deep, luxurious ruby red satin. The fitted bodice features elegant ruching across the waistline, leading to a smooth, draped skirt that flows beautifully to the floor. The sheer illusion neckline is heavily adorned with matching red sequins, adding sparkle and intricate detail perfect for a formal gala, prom, or black-tie event.",
    price: "₹2,995",
    priceValue: 2995,
    rating: 4.9,
    category: "topwear",
    range: "women",
    image: "/womens/ruby-red-sequin-gown.png",
    imageurl: "https://i.postimg.cc/Z56b7y9j/ruby-red-sequin-gown.png"
  },

  // ============================================
  // KIDS' COLLECTION
  // ============================================
  {
    id: 33,
    name: "Navy Satin-Lapel Tux Jacket",
    description: "A miniature formal staple crafted with a smooth navy shell and glossy satin lapels for special occasions. Fully lined with a crisp white shirt-front detail peeking at the cuffs, this jacket features a classic single-button closure and subtle pocket trims for a refined silhouette. Perfect for weddings, parties or ceremonial events — pairs beautifully with slim black trousers and polished shoes.",
    price: "₹2,799",
    priceValue: 2799,
    rating: 4.8,
    category: "topwear",
    range: "kids",
    image: "/kids/navy-satin-lapel-tux-jacket.png",
    imageurl: "https://i.postimg.cc/C17dvn20/navy-satin-lapel-tux-jacket.png"
  },
  {
    id: 34,
    name: "Navy Cotton Shirt & Shorts Set",
    description: "A cool, coordinated summer set in deep navy: a soft cotton shirt matched with tailored shorts and a faux-leather belt. The shirt features a neat collar and button front for a smart look while the elastic-waist shorts offer comfort and easy wear for active days. Ideal for family outings or daytime events where comfort and neat styling are both needed.",
    price: "₹1,699",
    priceValue: 1699,
    rating: 4.4,
    category: "bottomwear",
    range: "kids",
    image: "/kids/navy-shirt-shorts-set.png",
    imageurl: "https://i.postimg.cc/J0h0S4wV/navy-shirt-shorts-set.png"
  },
  {
    id: 35,
    name: "Ivory Pearl-Embellished Tulle Dress",
    description: "An airy ivory party dress with delicate pearl appliqués across the bodice and sheer, beaded sleeves for a dreamy, ethereal effect. The full tulle skirt layers create soft volume, while an inner lining ensures comfort and modesty. A refined choice for flower girls, celebrations or festive portrait sessions — finishes with a zip-back for easy dressing.",
    price: "₹2,499",
    priceValue: 2499,
    rating: 4.7,
    category: "topwear",
    range: "kids",
    image: "/kids/ivory-pearl-tulle-dress.png",
    imageurl: "https://i.postimg.cc/PxTPzQ25/ivory-pearl-tulle-dress.png"
  },
  {
    id: 36,
    name: "Mustard Ruffle Top & Pleated Skirt Set",
    description: "A warm mustard two-piece set combining a ruffled cropped blouse with a matching high-waist pleated skirt. Lightweight, breathable fabric with delicate frill detailing at the neckline and sleeves creates playful movement, while the pleated skirt adds timeless charm. Perfect for daytime parties, family photos, or twirl-worthy moments.",
    price: "₹1,999",
    priceValue: 1999,
    rating: 4.5,
    category: "topwear",
    range: "kids",
    image: "/kids/mustard-ruffle-top-pleated-skirt-set.png",
    imageurl: "https://i.postimg.cc/xC5qsN45/mustard-ruffle-top-pleated-skirt-set.png"
  },
  {
    id: 37,
    name: "Pastel Floral Organza Party Dress",
    description: "A soft watercolor floral dress in sheer organza with a satin sash and bow at the waist for a polished, feminine finish. Puff sleeves and a gently gathered skirt give this dress a classic silhouette, ideal for spring weddings and special family gatherings. Fully lined for comfort, the delicate print brings a fresh, storybook charm to any occasion.",
    price: "₹2,399",
    priceValue: 2399,
    rating: 4.6,
    category: "topwear",
    range: "kids",
    image: "/kids/pastel-floral-organza-dress.png",
    imageurl: "https://i.postimg.cc/HnPnmDHx/pastel-floral-organza-dress.png"
  },
  {
    id: 38,
    name: "Cream Tweed Jacket & Skirt Set",
    description: "A textured cream tweed two-piece with pearl-button pockets and a softly tailored jacket matched to a neat skirt. The boucle-like weave gives a luxe, heirloom quality while a modest cut and careful lining make it comfortable for little ones. A sophisticated choice for formal family events or holiday gatherings, styled with tights and Mary Janes.",
    price: "₹2,799",
    priceValue: 2799,
    rating: 4.7,
    category: "topwear",
    range: "kids",
    image: "/kids/cream-tweed-jacket-skirt-set.png",
    imageurl: "https://i.postimg.cc/63tyLfYy/cream-tweed-jacket-skirt-set.png"
  },
  {
    id: 39,
    name: "Midnight Star Sparkle Dress",
    description: "A deep navy dress scattered with shimmering star motifs that catch the light for evening occasions. The fitted bodice and gathered skirt provide classic shape, while long sleeves add warmth and balance. Lined for comfort and with a discreet back zipper, this festive piece is perfect for holiday parties and seasonal celebrations.",
    price: "₹2,299",
    priceValue: 2299,
    rating: 4.6,
    category: "topwear",
    range: "kids",
    image: "/kids/navy-star-sparkle-dress.png",
    imageurl: "https://i.postimg.cc/MHGHgKk8/navy-star-sparkle-dress.png"
  },
  {
    id: 40,
    name: "Lilac Bell-Sleeve Jumpsuit with Pearl Belt",
    description: "A contemporary lilac jumpsuit featuring dramatic bell sleeves and a decorative pearl-embellished waist belt for an elevated look. The smooth, slightly structured fabric gives clean lines while the belted waist adds a touch of formal flair. Ideal for milestone events where comfort and style need to go hand-in-hand.",
    price: "₹2,399",
    priceValue: 2399,
    rating: 4.5,
    category: "topwear",
    range: "kids",
    image: "/kids/lilac-pearl-belt-jumpsuit.png",
    imageurl: "https://i.postimg.cc/k4sDjRpK/lilac-pearl-belt-jumpsuit.png"
  },
  {
    id: 41,
    name: "Butter Linen Suit Jacket & Trousers",
    description: "A soft butter-hued linen-blend suit set with a tailored jacket and matching trousers designed for warm-weather events. Lightweight and breathable, the set offers a relaxed yet polished silhouette with patch pockets and simple lines for effortless elegance. Great for outdoor ceremonies, family photos, or dressed-up daytime occasions.",
    price: "₹2,599",
    priceValue: 2599,
    rating: 4.4,
    category: "bottomwear",
    range: "kids",
    image: "/kids/butter-linen-suit-set.png",
    imageurl: "https://i.postimg.cc/fLDJjfBL/butter-linen-suit-set.png"
  },
  {
    id: 42,
    name: "Plaid Vest & Trousers Set",
    description: "A smart plaid ensemble featuring a tailored vest with coordinating trousers and a soft tee layer underneath for comfort. The warm brown tones and classic check pattern make it ideal for autumn celebrations and semi-formal events. The trousers offer an elasticized waist for a comfortable, secure fit while keeping a dapper appearance.",
    price: "₹2,199",
    priceValue: 2199,
    rating: 4.4,
    category: "bottomwear",
    range: "kids",
    image: "/kids/plaid-vest-trousers-set.png",
    imageurl: "https://i.postimg.cc/NFPFtqY9/plaid-vest-trousers-set.png"
  },
  {
    id: 43,
    name: "Royal Blue Embroidered Kurta Set",
    description: "A festive royal-blue kurta set with intricate gold embroidery at the yoke and cuffs, paired with coordinating tapered bottoms. Crafted from a gently lustrous fabric, this traditional outfit is fully lined for comfort and designed to shine at cultural celebrations and family functions. The rich color and detailed needlework make it a standout ceremonial choice.",
    price: "₹2,799",
    priceValue: 2799,
    rating: 4.8,
    category: "topwear",
    range: "kids",
    image: "/kids/royal-blue-embroidered-kurta-set.png",
    imageurl: "https://i.postimg.cc/J0d08Vm5/royal-blue-embroidered-kurta-set.png"
  },
  {
    id: 44,
    name: "Olive Utility Jacket & Cargo Pants Set",
    description: "A practical olive-green utility set featuring a button-front jacket with chest pockets and matching cargo-style pants. The midweight cotton blend is durable for play while retaining an on-trend, utilitarian aesthetic. Perfect for casual weekends, outdoor adventures, and easy outfit coordination.",
    price: "₹2,299",
    priceValue: 2299,
    rating: 4.3,
    category: "bottomwear",
    range: "kids",
    image: "/kids/olive-utility-jacket-cargo-set.png",
    imageurl: "https://i.postimg.cc/J0h0S4ws/olive-utility-jacket-cargo-set.png"
  },
  {
    id: 45,
    name: "Burgundy Velvet Tuxedo",
    description: "A luxurious burgundy velvet tuxedo jacket with matching bow tie and tailored black trousers — a rich, dramatic look for formal evenings. The velvet finish offers plush texture and a refined sheen, while a single-button front and satin lining ensure a comfortable, elegant fit. Ideal for special celebrations where standout style is desired.",
    price: "₹2,899",
    priceValue: 2899,
    rating: 4.9,
    category: "topwear",
    range: "kids",
    image: "/kids/burgundy-velvet-tuxedo.png",
    imageurl: "https://i.postimg.cc/wvg7cQ0x/burgundy-velvet-tuxedo.png"
  },
  {
    id: 46,
    name: "Classic White Shirt & Black Leggings Set",
    description: "A minimalist everyday outfit combining a crisp white button-up shirt with stretchy black leggings and casual sneakers. Built for comfort with clean lines and easy-care fabric, this versatile set moves from playdates to casual family outings effortlessly. The neutral palette makes it a reliable wardrobe staple.",
    price: "₹1,599",
    priceValue: 1599,
    rating: 4.2,
    category: "bottomwear",
    range: "kids",
    image: "/kids/white-shirt-black-leggings-set.png",
    imageurl: "https://i.postimg.cc/sx0xzdyn/white-shirt-black-leggings-set.png"
  },
  {
    id: 47,
    name: "Navy Double-Breasted Suit",
    description: "A sharp navy double-breasted suit jacket paired with tapered trousers for a structured, formal profile. Satin-trimmed lapels and a clean white shirt-front elevate the look for ceremonies and milestone events, while thoughtful tailoring maintains mobility and comfort. A classic pick for photo-ready moments and formal family gatherings.",
    price: "₹2,799",
    priceValue: 2799,
    rating: 4.7,
    category: "topwear",
    range: "kids",
    image: "/kids/navy-double-breasted-suit.png",
    imageurl: "https://i.postimg.cc/ZRH0fvMQ/navy-double-breasted-suit.png"
  },
  {
    id: 48,
    name: "Blush Embroidered Bow Dress",
    description: "A sweet blush-pink dress adorned with delicate floral embroidery and a satin bow at the waist for a polished, feminine finish. The soft fabric and gentle gathers create a comfortable, flattering silhouette ideal for parties and special occasions. Fully lined with a back zipper, it's both beautiful and practical for little ones.",
    price: "₹2,399",
    priceValue: 2399,
    rating: 4.5,
    category: "topwear",
    range: "kids",
    image: "/kids/blush-embroidered-bow-dress.png",
    imageurl: "https://i.postimg.cc/LszJ1bkC/blush-embroidered-bow-dress.png"
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all products
 */
export const getAllProducts = () => {
  return products;
};

/**
 * Get products by range (men, women, kids)
 */
export const getProductsByRange = (range) => {
  return products.filter(product => product.range === range);
};

/**
 * Get products by category (topwear, bottomwear)
 */
export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

/**
 * Get products by range and category
 */
export const getProductsByRangeAndCategory = (range, category) => {
  return products.filter(product => 
    product.range === range && product.category === category
  );
};

/**
 * Get a single product by ID
 */
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

/**
 * Search products by name
 */
export const searchProducts = (searchTerm, range = null) => {
  let filteredProducts = products;
  
  if (range) {
    filteredProducts = filteredProducts.filter(product => product.range === range);
  }
  
  return filteredProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Sort products by price
 */
export const sortProductsByPrice = (productList, order = 'asc') => {
  return [...productList].sort((a, b) => 
    order === 'asc' ? a.priceValue - b.priceValue : b.priceValue - a.priceValue
  );
};

/**
 * Filter and sort products
 */
export const filterAndSortProducts = (range, searchTerm = '', sortOption = '', filterCategory = '') => {
  let filteredProducts = getProductsByRange(range);
  
  // Apply search filter
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // Apply category filter
  if (filterCategory) {
    filteredProducts = filteredProducts.filter(product =>
      product.category === filterCategory
    );
  }
  
  // Apply sorting
  if (sortOption === 'priceLowToHigh') {
    filteredProducts = sortProductsByPrice(filteredProducts, 'asc');
  } else if (sortOption === 'priceHighToLow') {
    filteredProducts = sortProductsByPrice(filteredProducts, 'desc');
  }
  
  return filteredProducts;
};

// Export default for convenience
export default products;
