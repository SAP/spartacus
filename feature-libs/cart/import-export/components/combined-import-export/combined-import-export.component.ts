import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from '@spartacus/core';
import { CartTypes } from '@spartacus/cart/import-export/core';

@Component({
  selector: 'cx-combined-import-export',
  templateUrl: './combined-import-export.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CombinedImportExportComponent {
  constructor(protected routingService: RoutingService) {}

  protected importButtonDisplayPages = ['savedCarts', 'savedCartsDetails'];
  protected exportButtonDisplayPages = ['savedCartsDetails', 'cart'];
  protected routesCartMapping = new Map<string, CartTypes>([
    ['savedCarts', CartTypes.NEW_SAVED_CART],
    ['savedCartsDetails', CartTypes.EXISTING_SAVED_CART],
    ['cart', CartTypes.ACTIVE_CART],
  ]);

  get route$(): Observable<string> {
    return this.routingService
      .getRouterState()
      .pipe(map((route) => route.state?.semanticRoute as string));
  }

  getCartType(semanticRoute: string) {
    return this.routesCartMapping.get(semanticRoute);
  }

  shouldDisplayImportButton(semanticRoute: string) {
    return this.importButtonDisplayPages.includes(semanticRoute);
  }

  shouldDisplayExportButton(semanticRoute: string) {
    return this.exportButtonDisplayPages.includes(semanticRoute);
  }
}
