import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  ConfiguratorCommonsService,
  GenericConfigurator,
  GenericConfigUtilsService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { MessageConfig } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import * as ConfigurationTestData from '../../../../../../../projects/storefrontlib/src/cms-components/configurator/commons/configuration-test-data';
import { ConfigMessageComponent } from './config-message.component';

let routerStateObservable = null;
class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }
}

const owner: GenericConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;

let isConfigurationLoading = false;
let hasPendingChanges = false;
let waitingTime = 1000;

class MockConfiguratorCommonsService {
  hasPendingChanges(): Observable<boolean> {
    return of(hasPendingChanges);
  }
  isConfigurationLoading(): Observable<boolean> {
    return of(isConfigurationLoading);
  }
}

class MockMessageConfig {
  updateConfigurationMessage = {
    waitingTime: waitingTime,
  };
}

describe('ConfigurationMessageComponent', () => {
  let component: ConfigMessageComponent;
  let configuratorUtils: GenericConfigUtilsService;
  let fixture: ComponentFixture<ConfigMessageComponent>;
  //let htmlElem: HTMLElement;

  beforeEach(async(() => {
    routerStateObservable = of(ConfigurationTestData.mockRouterState);
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
      declarations: [],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },

        {
          provide: MessageConfig,
          useClass: MockMessageConfig,
        },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
      ],
    });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigMessageComponent);
    //htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    configuratorUtils = TestBed.inject(
      GenericConfigUtilsService as Type<GenericConfigUtilsService>
    );
    configuratorUtils.setOwnerKey(owner);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });
  /*
  it('should not show update banner if pending changes and loading is false', () => {
    fixture.detectChanges();

    //Should contain d-none class
    expect(
      htmlElem.querySelectorAll('#cx-config-update-message.d-none').length
    ).toBe(1);
  });

  it('should show update banner if pending changes is true', () => {
    hasPendingChanges = true;
    isConfigurationLoading = false;
    fixture.detectChanges();

    //Should be hidden first
    expect(
      htmlElem.querySelectorAll('#cx-config-update-message.d-none').length
    ).toBe(1);

    //Should appear after a bit
    setTimeout(() => {
      expect(
        htmlElem.querySelectorAll('#cx-config-update-message.d-none').length
      ).toBe(0);

      expect(
        htmlElem.querySelectorAll('#cx-config-update-message').length
      ).toBe(1);
    }, 2000);
  });

  it('should show update banner if loading is true', () => {
    hasPendingChanges = false;
    isConfigurationLoading = true;
    fixture.detectChanges();

    //Should be hidden first
    expect(
      htmlElem.querySelectorAll('#cx-config-update-message.d-none').length
    ).toBe(1);

    //Should appear after a bit
    setTimeout(() => {
      expect(
        htmlElem.querySelectorAll('#cx-config-update-message.d-none').length
      ).toBe(0);

      expect(
        htmlElem.querySelectorAll('#cx-config-update-message').length
      ).toBe(1);
    }, 2000);
  });


  it('should show update banner if loading and pending changes are true', () => {
    hasPendingChanges = true;
    isConfigurationLoading = true;
    fixture.detectChanges();

    //Should be hidden first
    expect(
      htmlElem.querySelectorAll('#cx-config-update-message.d-none').length
    ).toBe(1);

    //Should appear after a bit
    setTimeout(() => {
      expect(
        htmlElem.querySelectorAll('#cx-config-update-message.d-none').length
      ).toBe(0);

      expect(
        htmlElem.querySelectorAll('#cx-config-update-message').length
      ).toBe(1);
    }, 2000);
  });

  it('should consider the configured timeout', () => {
    hasPendingChanges = true;
    isConfigurationLoading = true;
    waitingTime = 100;
    fixture.detectChanges();

    //Should be hidden first
    expect(
      htmlElem.querySelectorAll('#cx-config-update-message.d-none').length
    ).toBe(1);

    //Should appear after a bit
    setTimeout(() => {
      expect(
        htmlElem.querySelectorAll('#cx-config-update-message.d-none').length
      ).toBe(0);

      expect(
        htmlElem.querySelectorAll('#cx-config-update-message').length
      ).toBe(1);
    }, 2000);
  });
  */
});
