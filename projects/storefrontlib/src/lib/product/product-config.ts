export abstract class ProductModuleConfig {
  product?: {
    styles?: {
      blue?: boolean;
      imageSpinner?: boolean;
    };
  };
}

export const defaultProductConfig: ProductModuleConfig = {
  product: {
    styles: {
      blue: false,
      imageSpinner: false
    }
  }
};
