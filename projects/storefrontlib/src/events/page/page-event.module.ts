import { NgModule } from '@angular/core';
import { PageEventBuilder } from './page-event.builder';

// TODO: #10896 - delete this whole file
/**
 * @deprecated @since 3.1 - this will be removed in 4.0. Please use NavigationEventModule instead.
 */
@NgModule({})
export class PageEventModule {
  constructor(_pageEventBuilder: PageEventBuilder) {}
}
