import { CartService } from './cart.service';
import { CartDataService } from './cart-data.service';
import { SaveForLaterService } from './save-for-later.service';
import { SaveForLaterDataService } from './save-for-later-data.service';

export const services: any[] = [
  CartService,
  CartDataService,
  SaveForLaterService,
  SaveForLaterDataService,
];

export * from './cart.service';
export * from './cart-data.service';
export * from './save-for-later.service';
export * from './save-for-later-data.service';
