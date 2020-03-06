import { BaseEvent, Page } from '@spartacus/core';

export class AddedToCartContextAware extends BaseEvent<
  AddedToCartContextAware
> {
  url: string;
  page: Page;
  added: any;
}
