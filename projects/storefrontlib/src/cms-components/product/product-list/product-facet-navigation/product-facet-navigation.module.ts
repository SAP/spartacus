import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '../../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { IconModule } from '../../../misc';
import { ActiveFacetsModule } from './active-facets/active-facets.module';
import { FacetModule } from './facet/facet.module';
import { ProductFacetNavigationComponent } from './product-facet-navigation.component';
@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    FacetModule,
    ActiveFacetsModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductRefinementComponent: {
          component: ProductFacetNavigationComponent,
        },
      },
    }),
    KeyboardFocusModule,
  ],
  declarations: [ProductFacetNavigationComponent],
  exports: [ProductFacetNavigationComponent],
})
export class ProductFacetNavigationModule {}
