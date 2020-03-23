import { BaseEvent } from '../../event';

export class MultiCartAddEntryEvent extends BaseEvent<MultiCartAddEntryEvent> {
  userId: string;
  cartId: string;
  productCode: string;
  quantity: number;
}
