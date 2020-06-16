import { Injectable } from '@angular/core';
import { ProfileTagPushEventsService } from '@spartacus/cds';
import {
  ActiveCartService,
  EventService,
  PersonalizationContextService,
} from '@spartacus/core';
import { ProfileTagEvent } from 'projects/cds/src/profiletag';
import { of } from 'rxjs';

class MyCustomEvent implements ProfileTagEvent {
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
