import { TestBed } from '@angular/core/testing';
import { CxEvent, EventService, LanguageSetEvent } from '@spartacus/core';
import { Subject, Subscription } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Type } from '@angular/core';
import { ConfiguratorLanguageSetEventListener } from '@spartacus/product-configurator/rulebased';
import { vi } from 'vitest';

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = vi.fn().mockReturnValue(mockEventStream$.asObservable());
  dispatch = vi.fn();
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

    vi.spyOn(
      configuratorCommonsService,
      'removeProductBoundConfigurations'
    );
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
