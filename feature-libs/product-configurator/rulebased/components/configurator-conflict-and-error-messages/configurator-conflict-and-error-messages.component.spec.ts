import { Component, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorTestUtilsService,
  CommonConfiguratorUtilsService,
} from '@spartacus/product-configurator/common';
import { IconLoaderService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorConflictAndErrorMessagesComponent } from './configurator-conflict-and-error-messages.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIG_ID = '12342';
const CONFIGURATOR_ROUTE = 'configureCPQCONFIGURATOR';

const mockRouterState: any = {
  state: {
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: CommonConfigurator.OwnerType.PRODUCT,
    },
    semanticRoute: CONFIGURATOR_ROUTE,
  },
};

const configWOMessages: Configurator.Configuration = {
  owner: {
    id: PRODUCT_CODE,
    type: CommonConfigurator.OwnerType.PRODUCT,
  },
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
};
const configWithMessages: Configurator.Configuration = {
  owner: {
    id: PRODUCT_CODE,
    type: CommonConfigurator.OwnerType.PRODUCT,
  },
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
  errorMessages: ['test error message 1', 'test error message 2'],
  warningMessages: [
    'test warning message 1',
    'test warning message 2',
    'test warning message 3',
  ],
};
const configWithOnlyOneMessage: Configurator.Configuration = {
  owner: {
    id: PRODUCT_CODE,
    type: CommonConfigurator.OwnerType.PRODUCT,
  },
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
  errorMessages: ['test error message 1'],
  warningMessages: ['test warning message 1'],
};

let configuration: Configurator.Configuration;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
  }
}

class MockRouter {
  public events = of('');
}

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return of(configuration);
  }
}

export class MockIconFontLoaderService {
  getFlipDirection(): void {}
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: any;
}

describe('ConfiguratorConflictAndErrorMessagesComponent', () => {
  let component: ConfiguratorConflictAndErrorMessagesComponent;
  let fixture: ComponentFixture<ConfiguratorConflictAndErrorMessagesComponent>;
  let configuratorUtils: CommonConfiguratorUtilsService;
  let htmlElem: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
        declarations: [
          ConfiguratorConflictAndErrorMessagesComponent,
          MockCxIconComponent,
        ],
        providers: [
          {
            provide: Router,
            useClass: MockRouter,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: ConfiguratorCommonsService,
            useClass: MockConfiguratorCommonsService,
          },

          { provide: IconLoaderService, useClass: MockIconFontLoaderService },
        ],
      });
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorConflictAndErrorMessagesComponent
    );
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;

    configuratorUtils = TestBed.inject(
      CommonConfiguratorUtilsService as Type<CommonConfiguratorUtilsService>
    );
    if (configWOMessages?.owner) {
      configuratorUtils.setOwnerKey(configWOMessages.owner);
    }
    if (configWithMessages?.owner) {
      configuratorUtils.setOwnerKey(configWithMessages.owner);
    }
    if (configWithOnlyOneMessage?.owner) {
      configuratorUtils.setOwnerKey(configWithOnlyOneMessage.owner);
    }
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should not render component without messages', () => {
    configuration = configWOMessages;
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.alert-message'
    );
  });
  it('should not render all messages initially', () => {
    configuration = configWithMessages;
    fixture.detectChanges();
    expect(component.showWarnings).toBe(false);
    expect(component.showErrors).toBe(false);
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.alert-message'
    );
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-error-text'
    );
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-warning-text'
    );
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-error-message.open'
    );
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-warning-message.open'
    );
  });

  it('should render all messages', () => {
    configuration = configWithMessages;

    component.toggleErrors();
    component.toggleWarnings();
    fixture.detectChanges();

    expect(component.showWarnings).toBe(true);
    expect(component.showErrors).toBe(true);
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.alert-message'
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-error-message:nth-child(1)',
      configWithMessages.errorMessages[0]
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-error-message:nth-child(2)',
      configWithMessages.errorMessages[1]
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-warning-message:nth-child(1)',
      configWithMessages.warningMessages[0]
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-warning-message:nth-child(2)',
      configWithMessages.warningMessages[1]
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-warning-message:nth-child(3)',
      configWithMessages.warningMessages[2]
    );
  });

  it('should show message directly if only one message', () => {
    configuration = configWithOnlyOneMessage;
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.alert-message'
    );
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-error-text'
    );
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-warning-text'
    );
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-error-message.open'
    );
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-warning-message.open'
    );
  });
});
