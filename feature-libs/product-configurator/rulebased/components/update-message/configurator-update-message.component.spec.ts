import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CxDatePipe, I18nTestingModule, TranslatePipe } from '@spartacus/core';
import { CommonConfigurator } from '../../../common/core/model/common-configurator.model';
import { CommonConfiguratorUtilsService } from '../../../common/shared/utils/common-configurator-utils.service';
import { SpinnerComponent } from '@spartacus/storefront';
import { of } from 'rxjs';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorMessageConfig } from '../config/configurator-message.config';
import { ConfiguratorUpdateMessageComponent } from './configurator-update-message.component';
import {
  provideConfiguratorMockCommonsService,
  provideConfiguratorMockRoutingService,
} from '../../testing';

let routerStateObservable: any = null;
const owner: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;

let hasPendingChanges = false;
let waitingTime: number | undefined = 1000;

class MockMessageConfig {
  productConfigurator = {
    updateConfigurationMessage: {
      waitingTime: waitingTime,
    },
  };
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
        provideConfiguratorMockRoutingService(() => routerStateObservable),
        {
          provide: ConfiguratorMessageConfig,
          useClass: MockMessageConfig,
        },
        provideConfiguratorMockCommonsService({
          hasPendingChangesSource: () => of(hasPendingChanges),
        }),
      ],
    }).overrideComponent(ConfiguratorUpdateMessageComponent, {
      remove: {
        imports: [TranslatePipe, CxDatePipe, SpinnerComponent],
      },
      add: {
        imports: [I18nTestingModule, MockCxSpinnerComponent],
      },
    });
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorUpdateMessageComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    configuratorUtils = TestBed.inject(CommonConfiguratorUtilsService);
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

  it('should not show update banner if pending changes is false', () => {
    hasPendingChanges = false;
    fixture.detectChanges();

    //Should contain d-none class
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      0
    );
  });

  it('should show update banner after delay time if pending changes is true', async () => {
    //Should be hidden first
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      0
    );
    hasPendingChanges = true;
    fixture.detectChanges();

    //Should appear after a bit
    await vi.advanceTimersByTimeAsync(2000);

    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      1
    );
    expect(htmlElem.querySelectorAll('div').length).toBe(2);
  });

  it('should show update banner after default delay time if pending changes is true and no delay time configured', async () => {
    //Should be hidden first
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      0
    );
    hasPendingChanges = true;
    fixture.detectChanges();
    waitingTime = undefined;

    //Should appear after a bit
    await vi.advanceTimersByTimeAsync(2000);

    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      1
    );
  });

  it('should not show update banner if pending changes is true but delay time not reached', async () => {
    //Should be hidden first
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      0
    );
    hasPendingChanges = true;
    fixture.detectChanges();

    //Wait a bit, but don't reach delay time
    await vi.advanceTimersByTimeAsync(500);

    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      0
    );
    await vi.advanceTimersByTimeAsync(1000);
  });
});
