import { Injectable } from '@angular/core';
import { SpartacusEventService } from '@spartacus/cds';
import {
  ActiveCartService,
  EventService,
  PersonalizationContextService,
} from '@spartacus/core';
import { ProfileTagEvent } from 'projects/cds/src/profiletag';
import { merge, of } from 'rxjs';
import { tap } from 'rxjs/operators';

class MyCustomEvent implements ProfileTagEvent {
  name = 'TestMe';
}

@Injectable()
export class CdsSpartacusEventService extends SpartacusEventService {
  constructor(
    protected activeCartService: ActiveCartService,
    protected eventService: EventService,
    protected personalizationContextService: PersonalizationContextService
  ) {
    super(activeCartService, eventService, personalizationContextService);
    this.init();
  }
  init() {
    this.pushEvents$ = merge(this.pushEvents$, of(new MyCustomEvent())).pipe(
      tap((item) => {
        console.log(item);
      })
    );
  }
}
