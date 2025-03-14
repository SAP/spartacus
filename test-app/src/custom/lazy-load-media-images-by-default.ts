import { Provider } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { ImageLoadingStrategy } from '@spartacus/storefront';

export const lazyLoadMediaImagesByDefault: Provider = provideConfig({
  imageLoadingStrategy: ImageLoadingStrategy.LAZY,
});
