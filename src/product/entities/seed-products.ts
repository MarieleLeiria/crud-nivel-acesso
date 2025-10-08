import { ProductEntity } from './product.entity';
import { v4 as uuidv4 } from 'uuid';
import { ProductCategorys } from 'src/enums/category';
import { ProductSubcategory } from 'src/enums/subcategory';
import { ProductProperties } from 'src/enums/properties';
import { ProductScore } from 'src/enums/score';

export const seedProducts: ProductEntity[] = [
  {
    id: uuidv4(),
    name: 'Sample Product',
    price: 100.0,
    category: ProductCategorys.EYES,
    subcategory: ProductSubcategory.SHADOW,
    properties: ProductProperties.CRUELTY_FREE,
    reviews: [],
    score: ProductScore.THREE, // or another appropriate value
    characteristics: 'sample description',
    storage: 0,
  },
  {
    id: uuidv4(),
    name: 'Sample Product',
    price: 100.0,
    category: ProductCategorys.MOUTH,
    subcategory: ProductSubcategory.LIPSTICK,
    properties: ProductProperties.ORANGE,
    reviews: [], // Add an empty array or appropriate value for reviews
    score: ProductScore.THREE,
    characteristics: 'sample description',
    storage: 2,
  },
  {
    id: uuidv4(),
    name: 'Sample Product',
    price: 100.0,
    category: ProductCategorys.EYES,
    subcategory: ProductSubcategory.SHADOW,
    properties: ProductProperties.BROWN,
    reviews: [], // Add an empty array or appropriate value for reviews
    score: ProductScore.FIVE,
    characteristics: 'sample description',
    storage: 3, // Add a default value for storage, adjust as needed
  },
];
