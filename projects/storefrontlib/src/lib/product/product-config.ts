export abstract class ProductModuleConfig {
  product?: {
    styles?: {
      summary?: {
        cssIncludePaths?: string[];
      };
    };
  };
}

export const defaultProductConfig: ProductModuleConfig = {
  product: {
    styles: {
      summary: null
    }
  }
};
