import { Injectable } from '@angular/core';
import {
  ProfileTagPushEvent,
  ProfileTagPushEventsService,
} from '@spartacus/cds';
import {
  ActiveCartService,
  EventService,
  PersonalizationContextService,
} from '@spartacus/core';
import { of } from 'rxjs';

class MyCustomEvent implements ProfileTagPushEvent {
  name = 'TestMe';
}

@Injectable()
export class CdsSpartacusEventService extends ProfileTagPushEventsService {
  constructor(
    protected activeCartService: ActiveCartService,
    protected eventService: EventService,
    protected personalizationContextService: PersonalizationContextService
  ) {
    super(activeCartService, eventService, personalizationContextService);
    this.addPushEvent(of(new MyCustomEvent()));
  }
}
