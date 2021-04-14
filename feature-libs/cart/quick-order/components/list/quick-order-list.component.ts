import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ImageType, OrderEntry } from 'projects/core/src/model';
import { Observable, of } from 'rxjs';

// TO remove in future
const mockEntries: OrderEntry[] = [
  {
    basePrice: {
      formattedValue: '$60.00',
      value: 60.0,
    },
    entryNumber: 1,
    product: {
      availableForPickup: false,
      code: '2116283',
      configurable: false,
      images: {
        PRIMARY: {
          cart: {
            altText: 'Test alt text',
            format: 'cart',
            imageType: ImageType.PRIMARY,
            url:
              'https://spartacus-dev4.eastus.cloudapp.azure.com:9002//medias/?context=bWFzdGVyfGltYWdlc3wxMjQwfGltYWdlL2pwZWd8aW1hZ2VzL2gyYS9oYTMvODc5Njk0NDU2NDI1NC5qcGd8ODI3NjA2NjhiOTNiNDYxOTMxMzdiNjIxMmFmNjFiZGUxMWVkMmQ5ZDA3ZGU4YmU2Mzg0MzcxNDRjMDJmNzdjMQ',
          },
        },
      },
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
    quantity: 2,
    returnableQuantity: 0,
    totalPrice: {
      currencyIso: 'USD',
      formattedValue: '$120.00',
      value: 120.0,
    },
    updateable: true,
  },
  {
    basePrice: {
      formattedValue: '$60.00',
      value: 60.0,
    },
    entryNumber: 2,
    product: {
      availableForPickup: false,
      code: '2116283',
      configurable: false,
      name: 'fdsfsd fsdfs',
      summary: 'Product summary',
      manufacturer: 'Black & Decker',
      purchasable: true,
      stock: {
        stockLevel: 353,
        stockLevelStatus: 'inStock',
      },
      url: '/Open-Catalogue/Tools/Sanders/KA86/p/2116283',
    },
    quantity: 2,
    returnableQuantity: 0,
    totalPrice: {
      currencyIso: 'USD',
      formattedValue: '$120.00',
      value: 120.0,
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
