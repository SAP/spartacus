import { OrderEntry } from '../../../model/order.model';
import { MultiCartEvent } from '../cart.event';

export class MultiCartAddEntryEvent extends MultiCartEvent {
  productCode: string;
  quantity: number;
}

export class MultiCartAddEntrySuccessEvent {
  productCode: string;
  quantity: number;
  entry: OrderEntry;
  quantityAdded: number;
  deliveryModeChanged: boolean;
}

export class MultiCartAddEntryFailEvent {
  productCode: string;
  quantity: number;
}
