import { NgModule } from '@angular/core';
import { CommerceQuotesListEventListener } from './commerce-quotes-list-event.listener';

@NgModule({})
export class CommerceQuotesEventModule {
  constructor(
    _commerceQuotesListEventListener: CommerceQuotesListEventListener
  ) {}
}
