export namespace GenericConfigurator {
  export interface Owner {
    type?: OwnerType;
    key?: string;
    id?: string;

    /* Indicates that owner has an obsolete state and needs re-reading from the back end. 
    Example: A product has been added to the cart. Then on the next edit attempt, we need to re-read to ensure
    that the SPA representation is updated, in order to have it refer to a draft cart entry configuration
    that can also be discarded*/
    hasObsoleteState?: boolean;
  }

  export enum OwnerType {
    PRODUCT = 'product',
    CART_ENTRY = 'cartEntry',
  }
}
