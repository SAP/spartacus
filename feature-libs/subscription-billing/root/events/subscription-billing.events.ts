import { CxEvent } from '@spartacus/core';

export class GetSubscriptionByCodeReloadEvent extends CxEvent {
  static readonly type = 'GetSubscriptionByCodeReloadEvent';
}

export class GetSubscriptionListReloadEvent extends CxEvent {
  static readonly type = 'GetSubscriptionListReloadEvent';
}
