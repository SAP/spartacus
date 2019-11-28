import { NgModule } from '@angular/core';
import { CmsEventService } from './cms-event.service';

@NgModule({})
export class CmsEventModule {
  // simply add the CartEventService to the module constructor so
  // it gets initialized when added
  constructor(_cmsEventService: CmsEventService) {}
}
