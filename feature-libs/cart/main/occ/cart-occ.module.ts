import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CartAdapter,
  CartEntryAdapter,
  CartVoucherAdapter,
  SaveCartAdapter,
} from '@spartacus/cart/main/core';
import { CART_NORMALIZER } from '@spartacus/cart/main/root';
import { provideDefaultConfig } from '@spartacus/core';
import { CartValidationAdapter } from '../../../cart/connectors/validation/cart-validation.adapter';
import { OccCartNormalizer } from './adapters/converters/occ-cart-normalizer';
import { defaultOccCartConfig } from './adapters/default-occ-cart-config';
import { OccCartEntryAdapter } from './adapters/occ-cart-entry.adapter';
import { OccCartVoucherAdapter } from './adapters/occ-cart-voucher.adapter';
import { OccCartAdapter } from './adapters/occ-cart.adapter';
import { OccSaveCartAdapter } from './adapters/occ-save-cart.adapter';
import { OccCartValidationAdapter } from './occ-cart-validation.adapter';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccCartConfig),
    {
      provide: CartAdapter,
      useClass: OccCartAdapter,
    },
    {
      provide: CART_NORMALIZER,
      useExisting: OccCartNormalizer,
      multi: true,
    },
    {
      provide: CartEntryAdapter,
      useClass: OccCartEntryAdapter,
    },
    {
      provide: CartVoucherAdapter,
      useClass: OccCartVoucherAdapter,
    },
    {
      provide: SaveCartAdapter,
      useClass: OccSaveCartAdapter,
    },
    {
      provide: CartValidationAdapter,
      useClass: OccCartValidationAdapter,
    },
  ],
})
export class CartOccModule {}
