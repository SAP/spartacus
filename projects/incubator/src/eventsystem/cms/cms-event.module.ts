import { NgModule } from '@angular/core';
import { CmsEventService } from './cms-event.service';

/**
 * Premature event module for building cms related events.
 * There's currently only a very generic page load event being added,
 * which doens't add a lot of value. We'd rather have a product page, category
 * page, content page load event, all with a usefull payload.
 */
@NgModule()
export class CmsEventModule {
  // simply add the CartEventService to the module constructor so
  // it gets initialized when added
  constructor(_cmsEventService: CmsEventService) {}
}
