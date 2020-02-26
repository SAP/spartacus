export namespace GenericConfigurator {
  export interface Owner {
    type?: OwnerType;
    key?: string;
    id?: string;
    hasObsoleteState?: boolean;
  }

  export enum OwnerType {
    PRODUCT = 'product',
    CART_ENTRY = 'cartEntry',
  }
}
