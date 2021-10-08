import { Component, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
  ConfiguratorModelUtils,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { IconLoaderService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorConflictAndErrorMessagesComponent } from './configurator-conflict-and-error-messages.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIG_ID = '12342';

const mockRouterData: any = {
  pageType: ConfiguratorRouter.PageType.CONFIGURATION,
  isOwnerCartEntry: false,
  owner: {
    type: CommonConfigurator.OwnerType.PRODUCT,
    id: PRODUCT_CODE,
    configuratorType: ConfiguratorType.CPQ,
  },
  displayOnly: false,
  forceReload: false,
  resolveIssues: false,
};

const configWOMessages: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(CONFIG_ID, {
    id: PRODUCT_CODE,
    type: CommonConfigurator.OwnerType.PRODUCT,
    key: ConfiguratorModelUtils.getOwnerKey(
      CommonConfigurator.OwnerType.PRODUCT,
      PRODUCT_CODE
    ),
    configuratorType: ConfiguratorType.VARIANT,
  }),
};
const errorMessage1 = 'test error message 1';
const errorMessage2 = 'test error message 2';
const warningMessage1 = 'test warning message 1';
const warningMessage2 = 'test warning message 2';
const warningMessage3 = 'test warning message 3';
const configWithMessages: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(CONFIG_ID, {
    id: PRODUCT_CODE,
    type: CommonConfigurator.OwnerType.PRODUCT,
    key: ConfiguratorModelUtils.getOwnerKey(
      CommonConfigurator.OwnerType.PRODUCT,
      PRODUCT_CODE
    ),
    configuratorType: ConfiguratorType.VARIANT,
  }),
  errorMessages: [errorMessage1, errorMessage2],
  warningMessages: [warningMessage1, warningMessage2, warningMessage3],
};
const configWithOnlyOneMessage: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(CONFIG_ID, {
    id: PRODUCT_CODE,
    type: CommonConfigurator.OwnerType.PRODUCT,
    key: ConfiguratorModelUtils.getOwnerKey(
      CommonConfigurator.OwnerType.PRODUCT,
      PRODUCT_CODE
    ),
    configuratorType: ConfiguratorType.VARIANT,
  }),
  errorMessages: ['test error message 1'],
  warningMessages: ['test warning message 1'],
};

let configuration: Configurator.Configuration;

class MockConfiguratorRouterExtractorService {
  extractRouterData(): Observable<ConfiguratorRouter.Data> {
    return of(mockRouterData);
  }
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
            provide: ConfiguratorRouterExtractorService,
            useClass: MockConfiguratorRouterExtractorService,
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
    if (configWOMessages.owner) {
      configuratorUtils.setOwnerKey(configWOMessages.owner);
    }
    if (configWithMessages.owner) {
      configuratorUtils.setOwnerKey(configWithMessages.owner);
    }
    if (configWithOnlyOneMessage.owner) {
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
      errorMessage1
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-error-message:nth-child(2)',
      errorMessage2
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-warning-message:nth-child(1)',
      warningMessage1
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-warning-message:nth-child(2)',
      warningMessage2
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-warning-message:nth-child(3)',
      warningMessage3
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
