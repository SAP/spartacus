import { NgModule } from '@angular/core';
import { PageEventCollectorModule } from './page-event-collector.module';
import { PageEventBuilder } from './page-event.builder';

@NgModule({ imports: [PageEventCollectorModule.forRoot()] })
export class PageEventModule {
  constructor(_pageEventBuilder: PageEventBuilder) {}
}
