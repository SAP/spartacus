import { NgModule } from '@angular/core';
import { EventModule } from '../../event';
import { EventSourceMapping } from '../../event/event-source-mapping';
import { RoutingEvents } from './routing-event.model';
import { RoutingEventService } from './routing-event.service';

export function routingEventSourcesFactory(
  service: RoutingEventService
): EventSourceMapping<any>[] {
  return [
    {
      type: RoutingEvents.NavigationSuccess,
      source$: service.navigationSuccess$,
    },
    {
      type: RoutingEvents.Navigation,
      source$: service.navigation$,
    },
    {
      type: RoutingEvents.NavigationCancel,
      source$: service.navigationCancel$,
    },
  ];
}

@NgModule({
  imports: [
    EventModule.forChild(routingEventSourcesFactory, [RoutingEventService]),
  ],
})
export class RoutingEventModule {}
