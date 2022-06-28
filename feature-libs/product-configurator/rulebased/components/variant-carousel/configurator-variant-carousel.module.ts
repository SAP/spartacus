import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorVariantCarouselComponent } from './configurator-variant-carousel.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorVariantCarousel: {
          component: ConfiguratorVariantCarouselComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorVariantCarouselComponent],
  exports: [ConfiguratorVariantCarouselComponent],
})
export class ConfiguratorVariantCarouselModule {}
