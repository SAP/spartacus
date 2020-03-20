import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { Breadcrumb, Facet } from '@spartacus/core';
import { BreakpointService } from 'projects/storefrontlib/src/layout';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/index';
import { FacetService } from './facet.service';
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

  @ViewChild('filterBy') filterBy: ElementRef;

  facets$: Observable<Facet[]> = this.productFacetService.facets$;
  activeFacets$: Observable<Breadcrumb[]> = this.productFacetService
    .breadcrumbs$;

  @HostBinding('class.container') container = true;

  constructor(
    protected productFacetService: ProductFacetService,
    protected facetService: FacetService,
    protected breakpointService: BreakpointService
  ) {}

  toggleNavigation() {
    this.showNav = !this.showNav;
    if (!this.showNav) {
      this.filterBy?.nativeElement?.focus();
    }
  }

  toggleGroup(unlockEvent: boolean, facet: Facet) {
    if (unlockEvent && !this.facetService.getState(facet).value.expanded) {
      this.facetService.toggleGroup(facet, true);
    }
  }
}
