export namespace GenericConfigurator {
  /**
   * Specifies the owner of a product configuration
   */
  export interface Owner {
    /**
     * Type of the owner, can be product or document related
     */
    type?: OwnerType;
    /**
     * Specifies an owner uniquely, is used as key in the configuration store
     */
    key?: string;
    /**
     * Business identifier of the owner.
     * Can be a product code, a cart entry number, or an order code with order entry number
     */
    id?: string;

    /**  Indicates that owner has an obsolete state and needs re-reading from the back end. 
    Example: A product has been added to the cart. Then on the next edit attempt, we need to re-read to ensure
    that the SPA representation is updated, in order to have it refer to a draft cart entry configuration
    that can also be discarded */
    hasObsoleteState?: boolean;
  }

  export interface ReadConfigurationFromCartEntryParameters {
    userId?: string;
    cartId?: string;
    cartEntryNumber?: string;
    owner?: GenericConfigurator.Owner;
  }

  export interface ReadConfigurationFromOrderEntryParameters {
    userId?: string;
    orderId?: string;
    orderEntryNumber?: string;
    owner?: GenericConfigurator.Owner;
  }
  /**
   * Possible types of owners: Product, cart or order entry
   */
  export enum OwnerType {
    PRODUCT = 'product',
    CART_ENTRY = 'cartEntry',
    ORDER_ENTRY = 'orderEntry',
  }
}
