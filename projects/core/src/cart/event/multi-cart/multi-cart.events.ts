import { OrderEntry } from '../../../model/order.model';
import { MultiCartEvent } from './multi-cart.event';

export class MultiCartAddEntryEvent extends MultiCartEvent {
  productCode?: string;
  quantity?: number;
}

export class MultiCartAddEntrySuccessEvent extends MultiCartAddEntryEvent {
  entry?: OrderEntry;
  quantityAdded?: number;
}

export class MultiCartAddEntryFailEvent extends MultiCartAddEntryEvent {}
