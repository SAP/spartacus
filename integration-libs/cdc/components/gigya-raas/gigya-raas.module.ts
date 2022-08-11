import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { LayoutConfig } from '@spartacus/storefront';
import { GigyaRaasComponent } from './gigya-raas.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig | LayoutConfig>{
      cmsComponents: {
        GigyaRaasComponent: { component: GigyaRaasComponent },
      },
      layoutSlots: {
        GigyaLoginPageTemplate: {
          slots: ['BodyContent', 'BottomContent'],
        },
      },
    }),
  ],
  declarations: [GigyaRaasComponent],
  exports: [GigyaRaasComponent],
})
export class GigyaRaasModule {}
