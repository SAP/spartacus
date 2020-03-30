import {
  MultiCartAddEntryEvent,
  MultiCartAddEntryFailEvent,
  MultiCartAddEntrySuccessEvent,
} from '../multi-cart/multi-cart.events';

export class ActiveCartAddEntryEvent extends MultiCartAddEntryEvent {}
export class ActiveCartAddEntrySuccessEvent extends MultiCartAddEntrySuccessEvent {}
export class ActiveCartAddEntryFailEvent extends MultiCartAddEntryFailEvent {}
