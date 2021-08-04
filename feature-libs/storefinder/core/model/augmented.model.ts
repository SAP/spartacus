import { Configurator } from '@spartacus/product-configurator/rulebased';
//import { Product } from '@spartacus/core';

export function dummy(): Configurator.Attribute{
  return {name:''};
}


declare module '@spartacus/product-configurator/rulebased' {
  namespace Configurator {
    interface Configuration {
      attributeFromStoreFinder?: boolean;
    }
  }
}



