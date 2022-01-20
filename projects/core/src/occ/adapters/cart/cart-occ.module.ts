import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartAdapter } from '../../../cart/connectors/cart/cart.adapter';
import { CART_NORMALIZER } from '../../../cart/connectors/cart/converters';
import { CartEntryAdapter } from '../../../cart/connectors/entry/cart-entry.adapter';
import { SaveCartAdapter } from '../../../cart/connectors/save-cart/save-cart.adapter';
import { CartVoucherAdapter } from '../../../cart/connectors/voucher/cart-voucher.adapter';
import { provideDefaultConfig } from '../../../config/config-providers';
import { OccCartNormalizer } from './converters/occ-cart-normalizer';
import { defaultOccCartConfig } from './default-occ-cart-config';
import { OccCartEntryAdapter } from './occ-cart-entry.adapter';
import { OccCartVoucherAdapter } from './occ-cart-voucher.adapter';
import { OccCartAdapter } from './occ-cart.adapter';
import { OccSaveCartAdapter } from './occ-save-cart.adapter';
import { OccCartValidationAdapter } from './occ-cart-validation.adapter';
import { CartValidationAdapter } from '../../../cart/connectors/validation/cart-validation.adapter';

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
