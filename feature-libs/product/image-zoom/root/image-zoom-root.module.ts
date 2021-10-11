import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { IMAGE_ZOOM_FEATURE} from './feature-name';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultImageZoomComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [IMAGE_ZOOM_FEATURE]: {
        cmsComponents: ['ImageZoomProductImages'],
      },
    },
  };

  return config;
}

@NgModule({
  imports: [],
  providers: [
    provideDefaultConfigFactory(defaultImageZoomComponentsConfig),
  ],
})
export class ImageZoomRootModule {}
