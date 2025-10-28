import { PrismaClient } from '@prisma/client';
import { products } from '../src/data/products';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding products...\n');

  // First, delete all existing products to avoid duplicates
  console.log('🗑️  Clearing existing products...');
  await prisma.product.deleteMany({});
  console.log('✅ Existing products cleared\n');

  for (const product of products) {
    try {
      await prisma.product.create({
        data: {
          id: product.id.toString(),
          name: product.name,
          description: product.description,
          price: product.priceValue,
          priceValue: product.priceValue,
          rating: product.rating,
          category: product.category,
          range: product.range,
          image: product.image,
          stock: 100,
        },
      });
      console.log(`✅ Added: ${product.name}`);
    } catch (error) {
      console.error(`❌ Failed to add ${product.name}:`, error);
    }
  }

  console.log('\n✨ Seeding completed!');
  console.log(`📦 Total products: ${products.length}`);
  
  // Show breakdown by range
  const menCount = products.filter(p => p.range === 'men').length;
  const womenCount = products.filter(p => p.range === 'women').length;
  const kidsCount = products.filter(p => p.range === 'kids').length;
  
  console.log(`   - Men's products: ${menCount}`);
  console.log(`   - Women's products: ${womenCount}`);
  console.log(`   - Kids' products: ${kidsCount}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
