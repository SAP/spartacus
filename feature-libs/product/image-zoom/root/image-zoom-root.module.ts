import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import {
  PRODUCT_IMAGE_ZOOM_CORE_FEATURE,
  PRODUCT_IMAGE_ZOOM_FEATURE,
} from './feature-name';

export function defaultImageZoomComponentsConfig() {
  const config = {
    featureModules: {
      [PRODUCT_IMAGE_ZOOM_FEATURE]: {
        cmsComponents: ['ProductImagesComponent'],
      },
      // by default core is bundled together with components
      [PRODUCT_IMAGE_ZOOM_CORE_FEATURE]: PRODUCT_IMAGE_ZOOM_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [],
  providers: [provideDefaultConfigFactory(defaultImageZoomComponentsConfig)],
})
export class ImageZoomRootModule {}
