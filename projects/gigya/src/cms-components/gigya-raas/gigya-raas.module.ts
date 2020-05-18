import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { GigyaRaasComponent } from './gigya-raas.component';
import { LayoutConfig } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
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
  entryComponents: [GigyaRaasComponent],
})
export class GigyaRaasModule {}
