// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Prize, Product, User } = initSchema(schema);

export {
  Prize,
  Product,
  User
};