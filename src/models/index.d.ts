import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Product {
  readonly id: string;
  readonly description?: string;
  readonly applicants?: (string | null)[];
  readonly title: string;
  readonly createdAt: string;
  readonly max_applicants: number;
  readonly image?: string;
  readonly isFree: boolean;
  readonly type: string;
  readonly winner?: (Winner | null)[];
  readonly updatedAt?: string;
  constructor(init: ModelInit<Product>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}

export declare class Winner {
  readonly id: string;
  readonly product?: Product;
  readonly winneremail: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Winner>);
  static copyOf(source: Winner, mutator: (draft: MutableModel<Winner>) => MutableModel<Winner> | void): Winner;
}

export declare class User {
  readonly id: string;
  readonly email: string;
  readonly nickname: string;
  readonly ticket: number;
  readonly freeTicket: number;
  readonly appliedList?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}