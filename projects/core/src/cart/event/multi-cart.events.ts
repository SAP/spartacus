import { BaseEvent } from '../../event';

export namespace MultiCartEvents {
  export class MultiCartAddEntry extends BaseEvent<MultiCartAddEntry> {
    userId: string;
    cartId: string;
    productCode: string;
    quantity: number;
  }
}
