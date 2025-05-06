import { TestBed } from '@angular/core/testing';
import { CxEvent, EventService, LanguageSetEvent } from '@spartacus/core';
import { Subject, Subscription } from 'rxjs';
import createSpy = jasmine.createSpy;
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Type } from '@angular/core';
import { ConfiguratorLanguageSetEventListener } from '@spartacus/product-configurator/rulebased';

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

class MockConfiguratorCommonsService {
  removeProductBoundConfigurations(): void {}
}

describe(`ConfiguratorLanguageSetEventListener`, () => {
  let classUnderTest: ConfiguratorLanguageSetEventListener;
  let configuratorCommonsService: ConfiguratorCommonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfiguratorLanguageSetEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
      ],
    });

    classUnderTest = TestBed.inject(ConfiguratorLanguageSetEventListener);

    configuratorCommonsService = TestBed.inject(
      ConfiguratorCommonsService as Type<ConfiguratorCommonsService>
    );

    spyOn(
      configuratorCommonsService,
      'removeProductBoundConfigurations'
    ).and.callThrough();
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
      const spyUnsubscribe = spyOn(Subscription.prototype, 'unsubscribe');
      classUnderTest.ngOnDestroy();
      expect(spyUnsubscribe).toHaveBeenCalled();
    });
  });
});
