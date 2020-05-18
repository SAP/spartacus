import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GigyaStorefrontComponent } from './gigya.storefront/gigya.storefront.component';
import { MainModule, GlobalMessageComponentModule, OutletModule, OutletRefModule, PwaModule, PageLayoutModule, SeoModule, PageSlotModule } from '@spartacus/storefront';
import { RouterModule } from '@angular/router';
import { AnonymousConsentsModule, FeaturesConfigModule } from '@spartacus/core';
import { GigyaJsModule } from '../cms-components/gigya-js/gigya-js.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GlobalMessageComponentModule,
    OutletModule,
    OutletRefModule,
    PwaModule,
    PageLayoutModule,
    SeoModule,
    PageSlotModule,
    AnonymousConsentsModule,
    FeaturesConfigModule,
    GigyaJsModule
  ],
  declarations: [GigyaStorefrontComponent],
  exports: [GigyaStorefrontComponent],
})
export class GigyaMainModule extends MainModule { }
