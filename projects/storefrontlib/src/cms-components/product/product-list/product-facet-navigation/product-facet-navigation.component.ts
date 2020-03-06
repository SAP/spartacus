import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Breadcrumb, Facet } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/index';
import { ProductFacetService } from './product-facet.service';

@Component({
  selector: 'cx-product-facet-navigation',
  templateUrl: './product-facet-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFacetNavigationComponent {
  iconTypes = ICON_TYPE;

  /**
   * indicates that the navigation is opened,
   * typically used in mobile
   */
  showNav = false;

  facets$: Observable<Facet[]> = this.productFacetService.facets$;
  activeFacets$: Observable<Breadcrumb[]> = this.productFacetService
    .breadcrumbs$;

  @HostBinding('class.container') container = true;

  constructor(protected productFacetService: ProductFacetService) {}

  toggleNavigation() {
    this.showNav = !this.showNav;
  }
}
