import { TestBed } from '@angular/core/testing';
import { CxEvent, EventService, LogoutEvent } from '@spartacus/core';
import { Subject, Subscription } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorExpertModeService } from '../services/configurator-expert-mode.service';
import { ConfiguratorLogoutEventListener } from './configurator-logout-event.listener';
import { Type } from '@angular/core';
import { vi } from 'vitest';

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = vi.fn().mockReturnValue(mockEventStream$.asObservable());
  dispatch = vi.fn();
}

class MockConfiguratorExpertModeService {
  setExpModeRequested(): void {}
  getExpModeRequested() {}
  setExpModeActive(): void {}
  getExpModeActive() {}
}

class MockConfiguratorCommonsService {
  removeProductBoundConfigurations(): void {}
}

describe(`ConfiguratorLogoutEventListener`, () => {
  let classUnderTest: ConfiguratorLogoutEventListener;
  let configuratorExpertModeService: ConfiguratorExpertModeService;
  let configuratorCommonsService: ConfiguratorCommonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfiguratorLogoutEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
        {
          provide: ConfiguratorExpertModeService,
          useClass: MockConfiguratorExpertModeService,
        },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
      ],
    });

    classUnderTest = TestBed.inject(ConfiguratorLogoutEventListener);

    configuratorExpertModeService = TestBed.inject(
      ConfiguratorExpertModeService as Type<ConfiguratorExpertModeService>
    );
    vi.spyOn(
      configuratorExpertModeService,
      'setExpModeRequested'
    );
    vi.spyOn(configuratorExpertModeService, 'setExpModeActive');

    configuratorCommonsService = TestBed.inject(
      ConfiguratorCommonsService as Type<ConfiguratorCommonsService>
    );

    vi.spyOn(
      configuratorCommonsService,
      'removeProductBoundConfigurations'
    );
  });

  describe(`onLogout`, () => {
    beforeEach(() => {
      mockEventStream$.next(new LogoutEvent());
    });

    it(`should set active and requested expert mode to \'false\'`, () => {
      classUnderTest['onLogout']();
      expect(
        configuratorExpertModeService.setExpModeActive
      ).toHaveBeenCalledWith(false);
      expect(
        configuratorExpertModeService.setExpModeActive
      ).toHaveBeenCalledTimes(1);

      expect(
        configuratorExpertModeService.setExpModeRequested
      ).toHaveBeenCalledWith(false);
      expect(
        configuratorExpertModeService.setExpModeRequested
      ).toHaveBeenCalledTimes(1);

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
