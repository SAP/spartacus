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
import { Observable, of } from 'rxjs';
import { MessageConfig } from '../config/message-config';
import * as ConfigurationTestData from '../configuration-test-data';
import { ConfigMessageComponent } from './config-message.component';

const owner: GenericConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;

let isConfigurationLoading: Boolean = false;
let hasPendingChanges: Boolean = false;
let waitingTime = 1000;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(ConfigurationTestData.mockRouterState);
  }
}

class MockConfiguratorCommonsService {
  hasPendingChanges(): Observable<Boolean> {
    return of(hasPendingChanges);
  }
  isConfigurationLoading(): Observable<Boolean> {
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
  let htmlElem: HTMLElement;

  beforeEach(async(() => {
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
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    configuratorUtils = TestBed.inject(
      GenericConfigUtilsService as Type<GenericConfigUtilsService>
    );
    configuratorUtils.setOwnerKey(owner);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should not show update banner if pending changes and loading is false', () => {
    component.ngOnInit();
    fixture.detectChanges();

    //Should contain d-none class
    expect(
      htmlElem.querySelectorAll('#cx-config-update-message.d-none').length
    ).toBe(1);
  });

  it('should show update banner if pending changes is true', () => {
    hasPendingChanges = true;
    isConfigurationLoading = false;
    component.ngOnInit();
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
    component.ngOnInit();
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
    component.ngOnInit();
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
    component.ngOnInit();
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
});
