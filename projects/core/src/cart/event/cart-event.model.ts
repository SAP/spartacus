import { BaseEvent } from '../../event/base-event.model';
import { Cart } from '../../model/cart.model';
import { OrderEntry } from '../../model/order.model';

export namespace CartEvents {
  export class AddCartEntry extends BaseEvent<AddCartEntry> {
    entry: OrderEntry;
    quantity: number;
    quantityAdded: number;
    statusCode: string;
  }

  export class AddCartEntrySuccess extends BaseEvent<AddCartEntrySuccess> {
    userId: string;
    cartId: string;
    productCode: string;
    quantity: string;
  }

  export class CreateCartSuccess extends BaseEvent<CreateCartSuccess> {
    cart: Cart;
  }
}
