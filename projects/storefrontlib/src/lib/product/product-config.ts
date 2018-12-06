export abstract class ProductModuleConfig {
  product?: {
    styles?: {
      pdp?: string;
      summary?: string;
    };
  };
}

export const defaultProductConfig: ProductModuleConfig = {
  product: {
    styles: {
      pdp: null,
      summary: null
    }
  }
};
