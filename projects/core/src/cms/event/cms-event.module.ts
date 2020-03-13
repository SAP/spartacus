import { NgModule } from '@angular/core';
import { CmsEventService } from './cms-event.service';

/**
 * Premature event module for building cms related events.
 * There's currently only a very generic page load success event being added,
 * which doesn't add a lot of value. We'd rather have a product page, category
 * page, content page load event, all with a useful payload.
 */
@NgModule()
export class CmsEventModule {
  constructor(_: CmsEventService) {}
}
