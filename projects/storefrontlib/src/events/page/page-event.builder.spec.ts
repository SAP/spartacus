import { TestBed } from '@angular/core/testing';
import {
  createFrom,
  EventService,
  FeatureConfigService,
} from '@spartacus/core';
import { take } from 'rxjs/operators';
import { NavigationEvent } from '../navigation';
import { PageEventBuilder } from './page-event.builder';
import { PageEvent } from './page.events';

// TODO: #10896 - delete this whole file
class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isLevel(_version: string): boolean {
    return true;
  }
}

describe('PageEventBuilder', () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    });

    TestBed.inject(PageEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  it('PageEvent', () => {
    let result: PageEvent;
    eventService
      .get(PageEvent)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    const navigationEvent = createFrom(NavigationEvent, {
      context: { id: 'aPage' },
      semanticRoute: 'aPage',
      url: 'random url',
      params: undefined,
    });
    eventService.dispatch(navigationEvent);
    expect(result).toBeTruthy();
    expect(result).toEqual(jasmine.objectContaining({ ...navigationEvent }));
  });
});
