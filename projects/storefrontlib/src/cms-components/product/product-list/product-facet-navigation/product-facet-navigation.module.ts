import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { IconModule } from '../../../misc';
import { FacetModule } from './facet/facet.module';
import { ProductFacetNavigationComponent } from './product-facet-navigation.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    IconModule,
    FacetModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductRefinementComponent: {
          component: ProductFacetNavigationComponent,
        },
      },
    }),
  ],
  declarations: [ProductFacetNavigationComponent],
  exports: [ProductFacetNavigationComponent],
})
export class ProductFacetNavigationModule {}
