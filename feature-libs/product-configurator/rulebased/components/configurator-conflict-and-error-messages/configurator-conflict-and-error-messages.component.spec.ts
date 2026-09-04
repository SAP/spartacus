import { Component, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
  ConfiguratorModelUtils,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { IconComponent, IconLoaderService } from '@spartacus/storefront';
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

const ROOT_TAB_ID = '1';
const ROW_GROUP_ID = 'CONTAINER_ROW@1067@row-1';
const NESTED_TAB_ID = 'CONTAINER_ROW@1067@row-1@1';
const INNER_ROW_GROUP_ID = 'CONTAINER_ROW@2000@row-2';
const INNER_NESTED_TAB_ID = 'CONTAINER_ROW@2000@row-2@1';

const nestedInfoMessage1 = 'test nested info message 1';
const nestedInfoMessage2 = 'test nested info message 2';
const nestedWarningMessage1 = 'test nested warning message 1';
const nestedWarningMessage2 = 'test nested warning message 2';
const innerNestedInfoMessage = 'test inner nested info message';
const typedInfoMessage = 'typed info message';
const typedWarningMessage = 'typed warning message';
const typedUnspecifiedMessage = 'typed unspecified message';

function createContainerRowGroup(
  groupId: string,
  subGroups: Configurator.Group[],
  messages?: Configurator.Message[]
): Configurator.Group {
  return {
    ...ConfiguratorTestUtils.createGroup(groupId),
    groupType: Configurator.GroupType.CONTAINER_ROW_GROUP,
    subGroups: subGroups,
    messages: messages,
  };
}

/**
 * Creates a configuration with root level messages and a container row within a
 * container row, so that the messages of the viewed nested configuration can be
 * distinguished from the root and the enclosing ones.
 */
function createConfigWithContainerRows(
  currentGroup: string,
  rowGroupMessages?: Configurator.Message[]
): Configurator.Configuration {
  const innerRowGroup = createContainerRowGroup(
    INNER_ROW_GROUP_ID,
    [ConfiguratorTestUtils.createGroup(INNER_NESTED_TAB_ID)],
    [
      {
        message: innerNestedInfoMessage,
        severity: Configurator.MessageSeverity.INFO,
      },
    ]
  );
  const rowGroup = createContainerRowGroup(
    ROW_GROUP_ID,
    [
      {
        ...ConfiguratorTestUtils.createGroup(NESTED_TAB_ID),
        subGroups: [innerRowGroup],
      },
    ],
    rowGroupMessages
  );
  return {
    ...configWithMessages,
    groups: [
      {
        ...ConfiguratorTestUtils.createGroup(ROOT_TAB_ID),
        subGroups: [rowGroup],
      },
    ],
    interactionState: { currentGroup: currentGroup },
  };
}

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
  imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
})
class MockCxIconComponent {
  @Input() type: any;
}

describe('ConfiguratorConflictAndErrorMessagesComponent', () => {
  let component: ConfiguratorConflictAndErrorMessagesComponent;
  let fixture: ComponentFixture<ConfiguratorConflictAndErrorMessagesComponent>;
  let configuratorUtils: CommonConfiguratorUtilsService;
  let htmlElem: HTMLElement;
  let featureToggles: MockFeatureTogglesController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgSelectModule,
        ConfiguratorConflictAndErrorMessagesComponent,
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
        provideMockFeatureToggles({
          productConfiguratorCPQContainer: false,
        }),
      ],
    }).overrideComponent(ConfiguratorConflictAndErrorMessagesComponent, {
      remove: {
        imports: [IconComponent],
      },
      add: { imports: [MockCxIconComponent] },
    });
  }));
  beforeEach(() => {
    featureToggles = TestBed.inject(MockFeatureTogglesController);
    featureToggles.set('productConfiguratorCPQContainer', false);

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

  describe('nested configuration', () => {
    it('should render info and warning messages in the warning section', () => {
      configuration = createConfigWithContainerRows(NESTED_TAB_ID, [
        {
          message: nestedInfoMessage1,
          severity: Configurator.MessageSeverity.INFO,
        },
        {
          message: nestedWarningMessage1,
          severity: Configurator.MessageSeverity.WARNING,
        },
        {
          message: nestedInfoMessage2,
          severity: Configurator.MessageSeverity.INFO,
        },
        {
          message: nestedWarningMessage2,
          severity: Configurator.MessageSeverity.WARNING,
        },
      ]);
      component.toggleWarnings();
      component.toggleErrors();
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-warning-message:nth-child(1)',
        nestedInfoMessage1
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-warning-message:nth-child(2)',
        nestedInfoMessage2
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-warning-message:nth-child(3)',
        nestedWarningMessage1
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-warning-message:nth-child(4)',
        nestedWarningMessage2
      );
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-error-message'
      );
    });

    it('should not render the messages of the root configuration', () => {
      configuration = createConfigWithContainerRows(NESTED_TAB_ID, [
        {
          message: nestedInfoMessage1,
          severity: Configurator.MessageSeverity.INFO,
        },
      ]);
      fixture.detectChanges();

      expect(htmlElem.textContent).not.toContain(errorMessage1);
      expect(htmlElem.textContent).not.toContain(warningMessage1);
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-error-message'
      );
    });

    it('should render a message without severity as info in the warning section', () => {
      configuration = createConfigWithContainerRows(NESTED_TAB_ID, [
        { message: nestedInfoMessage1 },
      ]);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-warning-message',
        nestedInfoMessage1
      );
    });

    it('should not render any message if the nested configuration has none', () => {
      configuration = createConfigWithContainerRows(NESTED_TAB_ID);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.alert-message'
      );
    });

    it('should only render the messages of the innermost nested configuration', () => {
      configuration = createConfigWithContainerRows(INNER_NESTED_TAB_ID, [
        {
          message: nestedInfoMessage1,
          severity: Configurator.MessageSeverity.INFO,
        },
      ]);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-warning-message',
        innerNestedInfoMessage
      );
      expect(htmlElem.textContent).not.toContain(nestedInfoMessage1);
    });

    it('should render the messages of the root configuration if a root group is viewed', () => {
      configuration = createConfigWithContainerRows(ROOT_TAB_ID, [
        {
          message: nestedInfoMessage1,
          severity: Configurator.MessageSeverity.INFO,
        },
      ]);
      component.toggleWarnings();
      component.toggleErrors();
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-warning-message:nth-child(1)',
        warningMessage1
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-error-message:nth-child(1)',
        errorMessage1
      );
      expect(htmlElem.textContent).not.toContain(nestedInfoMessage1);
    });
  });

  describe('typed root messages with productConfiguratorCPQContainer', () => {
    const typedRootMessages: Configurator.Message[] = [
      {
        message: typedInfoMessage,
        severity: Configurator.MessageSeverity.INFO,
      },
      {
        message: typedWarningMessage,
        severity: Configurator.MessageSeverity.WARNING,
      },
      { message: typedUnspecifiedMessage },
    ];

    function createConfigWithTypedRootMessages(
      hasFullConfigurationState?: boolean,
      messages?: Configurator.Message[]
    ): Configurator.Configuration {
      return {
        ...configWithMessages,
        hasFullConfigurationState,
        messages,
      };
    }

    it('should render legacy messages when the feature toggle is disabled even if hasFullConfigurationState is true', () => {
      configuration = createConfigWithTypedRootMessages(
        true,
        typedRootMessages
      );
      component.toggleWarnings();
      component.toggleErrors();
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-warning-message:nth-child(1)',
        warningMessage1
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-error-message:nth-child(1)',
        errorMessage1
      );
      expect(htmlElem.textContent).not.toContain(typedInfoMessage);
      expect(htmlElem.textContent).not.toContain(typedWarningMessage);
    });

    it('should render legacy messages when hasFullConfigurationState is false', () => {
      featureToggles.set('productConfiguratorCPQContainer', true);
      configuration = createConfigWithTypedRootMessages(
        false,
        typedRootMessages
      );
      component.toggleWarnings();
      component.toggleErrors();
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-warning-message:nth-child(1)',
        warningMessage1
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-error-message:nth-child(1)',
        errorMessage1
      );
      expect(htmlElem.textContent).not.toContain(typedInfoMessage);
    });

    it('should render legacy messages when hasFullConfigurationState is absent', () => {
      featureToggles.set('productConfiguratorCPQContainer', true);
      configuration = createConfigWithTypedRootMessages(
        undefined,
        typedRootMessages
      );
      component.toggleWarnings();
      component.toggleErrors();
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-warning-message:nth-child(1)',
        warningMessage1
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-error-message:nth-child(1)',
        errorMessage1
      );
    });

    it('should render only typed messages when the feature is enabled', () => {
      featureToggles.set('productConfiguratorCPQContainer', true);
      configuration = createConfigWithTypedRootMessages(
        true,
        typedRootMessages
      );
      component.toggleWarnings();
      component.toggleErrors();
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-warning-message:nth-child(1)',
        typedInfoMessage
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-warning-message:nth-child(2)',
        typedUnspecifiedMessage
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-warning-message:nth-child(3)',
        typedWarningMessage
      );
      expect(htmlElem.textContent).not.toContain(warningMessage1);
      expect(htmlElem.textContent).not.toContain(errorMessage1);
      expect(htmlElem.textContent).not.toContain(errorMessage2);
    });

    it('should not render legacy messages when typed messages are empty', () => {
      featureToggles.set('productConfiguratorCPQContainer', true);
      configuration = createConfigWithTypedRootMessages(true, []);
      fixture.detectChanges();

      expect(htmlElem.querySelector('.cx-warning-message')).toBeNull();
      expect(htmlElem.querySelector('.cx-error-message')).toBeNull();
    });

    it('should render a message only once when it is present in both the typed and the legacy list', () => {
      const duplicateMessage = 'Clean-Up services are needed in addition';
      featureToggles.set('productConfiguratorCPQContainer', true);
      configuration = {
        ...configWOMessages,
        hasFullConfigurationState: true,
        warningMessages: [duplicateMessage],
        messages: [
          {
            message: duplicateMessage,
            severity: Configurator.MessageSeverity.WARNING,
          },
        ],
      };
      fixture.detectChanges();

      expect(htmlElem.querySelectorAll('.cx-warning-message').length).toBe(1);
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-warning-message',
        duplicateMessage
      );
    });

    it('should still render nested configuration messages rather than typed root messages', () => {
      featureToggles.set('productConfiguratorCPQContainer', true);
      configuration = {
        ...createConfigWithContainerRows(NESTED_TAB_ID, [
          {
            message: nestedInfoMessage1,
            severity: Configurator.MessageSeverity.INFO,
          },
        ]),
        hasFullConfigurationState: true,
        messages: typedRootMessages,
      };
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-warning-message',
        nestedInfoMessage1
      );
      expect(htmlElem.textContent).not.toContain(typedInfoMessage);
      expect(htmlElem.textContent).not.toContain(warningMessage1);
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      configuration = configWithMessages;
      fixture.detectChanges();
    });

    it("should contain div element with class name 'alert-message-invalid-warning' and 'aria-live' attribute that indicates that an element will be updated, and describes the types of updates a user can expect from the live region", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'alert-message-invalid-warning',
        0,
        'aria-live',
        'assertive'
      );
    });

    it("should contain div element with class name 'alert-message-invalid-warning' and 'aria-atomic' attribute that indicates whether a screen reader will present a changed region based on the change notifications defined by the aria-relevant attribute", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'alert-message-invalid-warning',
        0,
        'aria-atomic',
        'true'
      );
    });

    it("should contain div element with class name 'alert-message-error' and 'aria-live' attribute that indicates that an element will be updated, and describes the types of updates a user can expect from the live region", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'alert-message-error',
        0,
        'aria-live',
        'assertive'
      );
    });

    it("should contain div element with class name 'alert-message-error' and 'aria-atomic' attribute that indicates whether a screen reader will present a changed region based on the change notifications defined by the aria-relevant attribute", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'alert-message-error',
        0,
        'aria-atomic',
        'true'
      );
    });
  });
  it("should contain button element with class name 'cx-error-toggle' and initially 'aria-expanded' attribute set to false.", () => {
    configuration = configWithMessages;
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementContainsA11y(
      expect,
      htmlElem,
      'button',
      'cx-error-toggle',
      0,
      'aria-expanded',
      'false'
    );
  });
  it("should contain button element with class name 'cx-error-toggle' and 'aria-expanded' attribute set to true because toggle was triggered.", () => {
    configuration = configWithMessages;
    component.toggleErrors();
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementContainsA11y(
      expect,
      htmlElem,
      'button',
      'cx-error-toggle',
      0,
      'aria-expanded',
      'true'
    );
  });
});
