import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  RoutingService,
  TranslatePipe,
} from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
} from '@spartacus/product-configurator/common';
import { SpinnerComponent } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorMessageConfig } from '../config/configurator-message.config';
import { ConfiguratorUpdateMessageComponent } from './configurator-update-message.component';

let routerStateObservable: any = null;
class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }
}

const owner: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;

const hasPendingChangesSubject = new BehaviorSubject<boolean>(false);
let waitingTime: number | undefined = 1000;
let hideWaitingTime: number | undefined;

class MockConfiguratorCommonsService {
  hasPendingChanges(): Observable<boolean> {
    return hasPendingChangesSubject.asObservable();
  }
}

class MockMessageConfig {
  get productConfigurator() {
    return {
      updateConfigurationMessage: {
        waitingTime: waitingTime,
        hideWaitingTime: hideWaitingTime,
      },
    };
  }
}
@Component({
  selector: 'cx-spinner',
  template: '',
  imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
})
class MockCxSpinnerComponent {}
describe('ConfiguratorUpdateMessageComponent', () => {
  let component: ConfiguratorUpdateMessageComponent;
  let configuratorUtils: CommonConfiguratorUtilsService;
  let fixture: ComponentFixture<ConfiguratorUpdateMessageComponent>;
  let htmlElem: HTMLElement;

  beforeEach(async () => {
    routerStateObservable = of(ConfigurationTestData.mockRouterState);
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgSelectModule,
        ConfiguratorUpdateMessageComponent,
      ],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: ConfiguratorMessageConfig,
          useClass: MockMessageConfig,
        },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
      ],
    }).overrideComponent(ConfiguratorUpdateMessageComponent, {
      remove: {
        imports: [TranslatePipe, CxDatePipe, SpinnerComponent],
      },
      add: {
        imports: [MockTranslatePipe, MockDatePipe, MockCxSpinnerComponent],
      },
    });
  });
  beforeEach(() => {
    hasPendingChangesSubject.next(false);
    waitingTime = 1000;
    hideWaitingTime = undefined;
    fixture = TestBed.createComponent(ConfiguratorUpdateMessageComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    configuratorUtils = TestBed.inject(
      CommonConfiguratorUtilsService as Type<CommonConfiguratorUtilsService>
    );
    configuratorUtils.setOwnerKey(owner);
  });

  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should not show update banner if pending changes is false', async () => {
    fixture.detectChanges();
    await vi.advanceTimersByTimeAsync(2000);
    fixture.detectChanges();

    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      0
    );
  });

  it('should show update banner after delay time if pending changes is true', async () => {
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      0
    );
    hasPendingChangesSubject.next(true);
    fixture.detectChanges();

    await vi.advanceTimersByTimeAsync(2000);

    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      1
    );
    expect(htmlElem.querySelectorAll('div').length).toBe(2);
  });

  it('should show update banner after default delay time if pending changes is true and no delay time configured', async () => {
    waitingTime = undefined;
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      0
    );
    hasPendingChangesSubject.next(true);
    fixture.detectChanges();

    await vi.advanceTimersByTimeAsync(2000);

    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      1
    );
  });

  it('should not show update banner if pending changes is true but delay time not reached', async () => {
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      0
    );
    hasPendingChangesSubject.next(true);
    fixture.detectChanges();

    await vi.advanceTimersByTimeAsync(500);

    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      0
    );
    await vi.advanceTimersByTimeAsync(1000);
  });

  it('should hide update banner after hide delay when pending changes become false', async () => {
    hasPendingChangesSubject.next(true);
    fixture.detectChanges();
    await vi.advanceTimersByTimeAsync(1000);
    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      1
    );

    hasPendingChangesSubject.next(false);
    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      1
    );

    await vi.advanceTimersByTimeAsync(999);
    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      1
    );

    await vi.advanceTimersByTimeAsync(1);
    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      0
    );
  });

  it('should use hideWaitingTime when configured', async () => {
    hideWaitingTime = 500;
    hasPendingChangesSubject.next(true);
    fixture.detectChanges();
    await vi.advanceTimersByTimeAsync(1000);
    fixture.detectChanges();

    hasPendingChangesSubject.next(false);
    fixture.detectChanges();

    await vi.advanceTimersByTimeAsync(499);
    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      1
    );

    await vi.advanceTimersByTimeAsync(1);
    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      0
    );
  });
});
