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
import { ConfigMessageComponent } from './config-message.component';

const PRODUCT_CODE = 'CONF_LAPTOP';

const mockRouterState: any = {
  state: {
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: GenericConfigurator.OwnerType.PRODUCT,
    },
    queryParams: {},
  },
};
const owner: GenericConfigurator.Owner = {
  id: PRODUCT_CODE,
  type: GenericConfigurator.OwnerType.PRODUCT,
};

let configurationIsLoading: Boolean = false;
let hasPendingChanges: Boolean = false;
let waitingTime = 1000;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
  }
}

class MockConfiguratorCommonsService {
  hasPendingChanges(): Observable<Boolean> {
    return of(hasPendingChanges);
  }
  configurationIsLoading(): Observable<Boolean> {
    return of(configurationIsLoading);
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
    configuratorUtils = TestBed.get(
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

    //Should NOT appear after
    setTimeout(() => {
      expect(
        htmlElem.querySelectorAll('#cx-config-update-message.d-none').length
      ).toBe(1);
    }, 2000);
  });

  it('should show update banner if pending changes is true', () => {
    hasPendingChanges = true;
    configurationIsLoading = false;
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
    configurationIsLoading = true;
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
    configurationIsLoading = true;
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
    configurationIsLoading = true;
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
    }, 200);
  });
});
