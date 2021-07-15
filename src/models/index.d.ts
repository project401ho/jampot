import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Prize {
  readonly id: string;
  readonly prize_code?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Prize>);
  static copyOf(source: Prize, mutator: (draft: MutableModel<Prize>) => MutableModel<Prize> | void): Prize;
}

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
  readonly winner?: string;
  readonly Prize?: Prize;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Product>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}

export declare class User {
  readonly id: string;
  readonly email: string;
  readonly nickname: string;
  readonly ticket: number;
  readonly freeTicket: number;
  readonly appliedList?: (string | null)[];
  readonly checkedAppliedList?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}