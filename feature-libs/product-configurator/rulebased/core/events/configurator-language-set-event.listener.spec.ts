import { TestBed } from '@angular/core/testing';
import {
  CxEvent,
  EventService,
  EventTestingModule,
  LanguageSetEvent,
} from '@spartacus/core';
import { Subject, Subscription } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorLanguageSetEventListener } from '@spartacus/product-configurator/rulebased';

const mockEventStream$ = new Subject<CxEvent>();


class MockConfiguratorCommonsService {
  removeProductBoundConfigurations(): void {}
}

describe(`ConfiguratorLanguageSetEventListener`, () => {
  let classUnderTest: ConfiguratorLanguageSetEventListener;
  let configuratorCommonsService: ConfiguratorCommonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EventTestingModule],
      providers: [
        ConfiguratorLanguageSetEventListener,
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
      ],
    });

    const eventService = TestBed.inject(EventService);
    vi.spyOn(eventService, 'get').mockReturnValue(
      mockEventStream$.asObservable()
    );

    classUnderTest = TestBed.inject(ConfiguratorLanguageSetEventListener);

    configuratorCommonsService = TestBed.inject(ConfiguratorCommonsService);

    vi.spyOn(configuratorCommonsService, 'removeProductBoundConfigurations');
  });

  describe(`onLanguageSet`, () => {
    beforeEach(() => {
      mockEventStream$.next(new LanguageSetEvent());
    });

    it(`should remove product bound configurations`, () => {
      classUnderTest['onLanguageSet']();

      expect(
        configuratorCommonsService.removeProductBoundConfigurations
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe on ngOnDestroy', () => {
      const spyUnsubscribe = vi.spyOn(Subscription.prototype, 'unsubscribe');
      classUnderTest.ngOnDestroy();
      expect(spyUnsubscribe).toHaveBeenCalled();
    });
  });
});
