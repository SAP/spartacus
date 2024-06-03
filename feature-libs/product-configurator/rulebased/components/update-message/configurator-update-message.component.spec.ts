import { Component, Type } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
} from '@spartacus/product-configurator/common';
import { Observable, of } from 'rxjs';
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

let hasPendingChanges = false;
let waitingTime: number | undefined = 1000;

class MockConfiguratorCommonsService {
  hasPendingChanges(): Observable<boolean> {
    return of(hasPendingChanges);
  }
}

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
})
class MockCxSpinnerComponent {}
describe('ConfigurationUpdateMessageComponent', () => {
  let component: ConfiguratorUpdateMessageComponent;
  let configuratorUtils: CommonConfiguratorUtilsService;
  let fixture: ComponentFixture<ConfiguratorUpdateMessageComponent>;
  let htmlElem: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      routerStateObservable = of(ConfigurationTestData.mockRouterState);
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
        declarations: [
          ConfiguratorUpdateMessageComponent,
          MockCxSpinnerComponent,
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
      });
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorUpdateMessageComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    configuratorUtils = TestBed.inject(
      CommonConfiguratorUtilsService as Type<CommonConfiguratorUtilsService>
    );
    configuratorUtils.setOwnerKey(owner);
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

  it('should show update banner after delay time if pending changes is true', fakeAsync(() => {
    //Should be hidden first
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      0
    );
    hasPendingChanges = true;
    fixture.detectChanges();

    //Should appear after a bit
    tick(2000);

    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      1
    );
    expect(htmlElem.querySelectorAll('div').length).toBe(2);
  }));

  it('should show update banner after default delay time if pending changes is true and no delay time configured', fakeAsync(() => {
    //Should be hidden first
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      0
    );
    hasPendingChanges = true;
    fixture.detectChanges();
    waitingTime = undefined;

    //Should appear after a bit
    tick(2000);

    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      1
    );
  }));

  it('should not show update banner if pending changes is true but delay time not reached', fakeAsync(() => {
    //Should be hidden first
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      0
    );
    hasPendingChanges = true;
    fixture.detectChanges();

    //Wait a bit, but don't reach delay time
    tick(500);

    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('div.cx-update-msg.visible').length).toBe(
      0
    );
    tick(1000);
  }));
});
