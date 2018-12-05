export abstract class ProductModuleConfig {
  styles?: {
    blue?: boolean;
    imageSpinner?: boolean;
  };
}

export const defaultProductConfig: ProductModuleConfig = {
  styles: {
    blue: false,
    imageSpinner: false
  }
};
