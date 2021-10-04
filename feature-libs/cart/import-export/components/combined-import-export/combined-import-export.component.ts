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

  get cartType$(): Observable<CartTypes> {
    return this.routingService.getRouterState().pipe(
      map((route) => route.state?.semanticRoute as string),
      map((semanticRoute) => this.routesCartMapping.get(semanticRoute))
    );
  }

  protected routesCartMapping = new Map<string, CartTypes>([
    ['savedCarts', CartTypes.NEW_SAVED_CART],
    ['savedCartsDetails', CartTypes.EXISTING_SAVED_CART],
    ['cart', CartTypes.ACTIVE_CART],
  ]);
}
