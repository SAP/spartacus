import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderEntry } from 'projects/core/src/model';
import { Observable, of } from 'rxjs';

const mockEntries: OrderEntry[] = [
  {
    basePrice: {
      formattedValue: '$63.00',
      value: 63.0,
    },
    entryNumber: 1,
    product: {
      availableForPickup: false,
      code: '2116283',
      configurable: false,
      name: 'Product title',
      summary: 'Product summary',
      manufacturer: 'Black & Decker',
      purchasable: true,
      stock: {
        stockLevel: 353,
        stockLevelStatus: 'inStock',
      },
      url: '/Open-Catalogue/Tools/Sanders/KA86/p/2116283',
    },
    quantity: 5,
    returnableQuantity: 0,
    totalPrice: {
      currencyIso: 'USD',
      formattedValue: '$63.00',
      value: 63.0,
    },
    updateable: true,
  },
];

@Component({
  selector: 'cx-quick-order-list',
  templateUrl: './quick-order-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderListComponent {
  entries$: Observable<OrderEntry[]> = of(mockEntries);
}
