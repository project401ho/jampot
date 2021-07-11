// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Product, Winner, User } = initSchema(schema);

export {
  Product,
  Winner,
  User
};