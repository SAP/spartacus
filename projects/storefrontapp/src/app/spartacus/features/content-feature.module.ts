import { NgModule } from '@angular/core';
import { CarouselRootModule } from '@spartacus/content/carousel/root';
import { provideConfig } from '@spartacus/core';

@NgModule({
  imports: [CarouselRootModule],
  providers: [
    provideConfig({
      featureModules: {
        carousel: {
          module: () =>
            import('@spartacus/content/carousel').then((m) => m.CarouselModule),
        },
      },
    }),
  ],
})
export class ContentFeatureModule {}
