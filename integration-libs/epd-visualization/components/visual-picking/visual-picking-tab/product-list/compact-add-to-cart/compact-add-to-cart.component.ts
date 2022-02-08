import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Optional,
} from '@angular/core';
import { AddToCartComponent } from '@spartacus/cart/base/components/add-to-cart';
import {
  ActiveCartFacade,
  ADD_TO_CART_FEATURE,
} from '@spartacus/cart/base/root';
import {
  CmsAddToCartComponent,
  EventService,
  FeatureModulesService,
} from '@spartacus/core';
import {
  CmsComponentData,
  CurrentProductService,
  ProductListItemContext,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-epd-visualization-compact-add-to-cart',
  templateUrl: './compact-add-to-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompactAddToCartComponent extends AddToCartComponent {
  constructor(
    protected featureModulesService: FeatureModulesService,
    protected currentProductService: CurrentProductService,
    protected cd: ChangeDetectorRef,
    protected activeCartService: ActiveCartFacade,
    protected component: CmsComponentData<CmsAddToCartComponent>,
    protected eventService: EventService,
    @Optional() protected productListItemContext?: ProductListItemContext
  ) {
    super(
      currentProductService,
      cd,
      activeCartService,
      component,
      eventService,
      productListItemContext
    );
  }

  public get requiredFeaturesEnabled(): boolean {
    return this.featureModulesService.isConfigured(ADD_TO_CART_FEATURE);
  }
}
