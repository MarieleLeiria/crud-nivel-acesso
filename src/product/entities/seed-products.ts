import { ProductEntity } from './product.entity';
import { v4 as uuidv4 } from 'uuid';
import { ProductCategorys } from 'src/enums/category';
import { ProductSubcategory } from 'src/enums/subcategory';
import { ProductProperties } from 'src/enums/properties';

export const seedProducts: ProductEntity[] = [
  {
    id: uuidv4(),
    name: 'Sample Product',
    price: 100.0,
    category: ProductCategorys.EYES,
    subcategory: ProductSubcategory.SHADOW,
    properties: ProductProperties.CRUELTY_FREE,
    score: 3,
    characteristics: 'sample description',
  },
  {
    id: uuidv4(),
    name: 'Sample Product',
    price: 100.0,
    category: ProductCategorys.MOUTH,
    subcategory: ProductSubcategory.LIPSTICK,
    properties: ProductProperties.ORANGE,
    score: 3,
    characteristics: 'sample description',
  },
  {
    id: uuidv4(),
    name: 'Sample Product',
    price: 100.0,
    category: ProductCategorys.EYES,
    subcategory: ProductSubcategory.SHADOW,
    properties: ProductProperties.BROWN,
    score: 5,
    characteristics: 'sample description',
  },
];
