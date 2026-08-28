import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ICON_TYPE, IconLoaderService } from '@spartacus/storefront';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { Configurator } from '../../core/model/configurator.model';
import {
  ConfiguratorMessageComponent,
  ConfiguratorMessagesView,
  enrichMessagesWithContainerContext,
  filterMessagesByProductSelection,
  mergeMessagesViews,
  prependContainerContextMessageGroups,
  splitMessagesBySeverity,
} from './configurator-message.component';

class MockIconFontLoaderService {
  useSvg(_iconType: ICON_TYPE) {
    return false;
  }

  getStyleClasses(_iconType: ICON_TYPE): string {
    return 'fas fa-exclamation-circle';
  }

  addLinkResource() {}
  getHtml(_iconType: ICON_TYPE) {}
  getFlipDirection(): void {}
}

describe('ConfiguratorMessageComponent', () => {
  let component: ConfiguratorMessageComponent;
  let fixture: ComponentFixture<ConfiguratorMessageComponent>;
  let htmlElem: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ConfiguratorMessageComponent, I18nTestingModule],
      providers: [
        { provide: IconLoaderService, useClass: MockIconFontLoaderService },
      ],
    })
      .overrideComponent(ConfiguratorMessageComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorMessageComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    component.messages = ['First message', 'Second message'];
    component.messageClass = 'container-error-message';
    component.iconClass = 'container-error-symbol';
    component.iconType = ICON_TYPE.ERROR;
    component.showIcon = true;
    component.idPrefix = 'cx-configurator--row-error-msg--888';
    component.role = 'alert';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render nothing if messages are undefined', () => {
    component.messages = undefined;
    fixture.detectChanges();

    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'div'
    );
  });

  it('should render nothing if messages are empty', () => {
    component.messages = [];
    fixture.detectChanges();

    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'div'
    );
  });

  it('should render a row for each message', () => {
    fixture.detectChanges();

    CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      '.container-error-message',
      2
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.container-error-message',
      'First message'
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.container-error-message',
      'Second message',
      1
    );
  });

  it('should render the severity icon', () => {
    fixture.detectChanges();

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.container-error-symbol'
    );
  });

  it('should not render an icon if showIcon is false', () => {
    component.showIcon = false;
    fixture.detectChanges();

    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'cx-icon'
    );
  });

  it('should render translatable messages', () => {
    component.messages = [{ key: 'configurator.attribute.containerMinRows' }];
    component.messageClass = 'container-info-message';
    fixture.detectChanges();

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.container-info-message'
    );
  });

  describe('getMessageId', () => {
    it('should append the index to the id prefix', () => {
      expect(component.getMessageId(0)).toBe(
        'cx-configurator--row-error-msg--888-0'
      );
      expect(component.getMessageId(1)).toBe(
        'cx-configurator--row-error-msg--888-1'
      );
    });

    it('should return undefined if no prefix is provided', () => {
      component.idPrefix = undefined;
      expect(component.getMessageId(0)).toBeUndefined();
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should set aria-live, aria-atomic, role and id on each message row', () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'container-error-message',
        0,
        'aria-live',
        'assertive'
      );
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'container-error-message',
        0,
        'aria-atomic',
        'true'
      );
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'container-error-message',
        0,
        'role',
        'alert'
      );
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'container-error-message',
        0,
        'aria-label',
        'First message'
      );
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'container-error-message',
        0,
        'id',
        'cx-configurator--row-error-msg--888-0'
      );
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'container-error-message',
        1,
        'id',
        'cx-configurator--row-error-msg--888-1'
      );
    });
  });

  describe('splitMessagesBySeverity', () => {
    it('should return empty arrays if messages are undefined', () => {
      expect(splitMessagesBySeverity()).toEqual({
        infoMessages: [],
        errorMessages: [],
        warningMessages: [],
      });
    });

    it('should map severities to the corresponding buckets', () => {
      expect(
        splitMessagesBySeverity([
          {
            message: 'Too many units',
            severity: Configurator.MessageSeverity.WARNING,
          },
          {
            message: 'Check quantity',
            severity: Configurator.MessageSeverity.INFO,
          },
          {
            message: 'Invalid configuration',
            severity: Configurator.MessageSeverity.ERROR,
          },
        ])
      ).toEqual({
        infoMessages: ['Check quantity'],
        warningMessages: ['Too many units'],
        errorMessages: ['Invalid configuration'],
      });
    });

    it('should treat messages without severity as info', () => {
      expect(
        splitMessagesBySeverity([{ message: 'Unspecified message' }])
      ).toEqual({
        infoMessages: ['Unspecified message'],
        errorMessages: [],
        warningMessages: [],
      });
    });
  });

  describe('enrichMessagesWithContainerContext', () => {
    it('should prepend container info and required messages', () => {
      expect(
        enrichMessagesWithContainerContext(
          {
            infoMessages: ['Info'],
            warningMessages: [],
            errorMessages: ['Error'],
          },
          {
            minRows: 2,
            maxRows: 4,
            rows: [],
            includeContainerInfo: true,
            includeRequiredError: true,
            getContainerRowInfoKey: () => ({
              key: 'configurator.attribute.containerMinMaxRows',
              params: { minRows: 2, maxRows: 4 },
            }),
            getContainerRequiredMessageKey: () => ({
              key: 'configurator.attribute.containerRequiredMessage',
              params: { count: 2 },
            }),
          }
        )
      ).toEqual({
        infoMessages: ['Info'],
        warningMessages: [],
        errorMessages: ['Error'],
        containerInfoMessages: [
          {
            key: 'configurator.attribute.containerMinMaxRows',
            params: { minRows: 2, maxRows: 4 },
          },
        ],
        requiredErrorMessages: [
          {
            key: 'configurator.attribute.containerRequiredMessage',
            params: { count: 2 },
          },
        ],
      });
    });

    it('should preserve existing container context when include flags are false', () => {
      expect(
        enrichMessagesWithContainerContext(
          {
            infoMessages: ['Info'],
            warningMessages: [],
            errorMessages: ['Error'],
            containerInfoMessages: [
              {
                key: 'configurator.attribute.containerMinRows',
                params: { count: 2 },
              },
            ],
          },
          {
            minRows: 2,
            rows: [],
            includeContainerInfo: false,
            includeRequiredError: true,
            getContainerRowInfoKey: () => ({
              key: 'configurator.attribute.containerMinMaxRows',
              params: { minRows: 2, maxRows: 4 },
            }),
            getContainerRequiredMessageKey: () => ({
              key: 'configurator.attribute.containerRequiredMessage',
              params: { count: 1 },
            }),
          }
        )
      ).toEqual({
        infoMessages: ['Info'],
        warningMessages: [],
        errorMessages: ['Error'],
        containerInfoMessages: [
          {
            key: 'configurator.attribute.containerMinRows',
            params: { count: 2 },
          },
        ],
        requiredErrorMessages: [
          {
            key: 'configurator.attribute.containerRequiredMessage',
            params: { count: 1 },
          },
        ],
      });
    });
  });

  describe('mergeMessagesViews', () => {
    it('should append messages by severity', () => {
      expect(
        mergeMessagesViews(
          {
            infoMessages: ['Info 1'],
            warningMessages: ['Warning 1'],
            errorMessages: ['Error 1'],
          },
          {
            infoMessages: ['Info 2'],
            warningMessages: ['Warning 2'],
            errorMessages: ['Error 2'],
          }
        )
      ).toEqual({
        infoMessages: ['Info 1', 'Info 2'],
        warningMessages: ['Warning 1', 'Warning 2'],
        errorMessages: ['Error 1', 'Error 2'],
        containerInfoMessages: [],
        requiredErrorMessages: [],
      });
    });
  });

  describe('filterMessagesByProductSelection', () => {
    const view: ConfiguratorMessagesView = {
      infoMessages: ['Info'],
      warningMessages: ['Warning'],
      errorMessages: ['Error'],
      containerInfoMessages: [
        {
          key: 'configurator.attribute.containerMinRows',
          params: { count: 2 },
        },
      ],
      requiredErrorMessages: [
        {
          key: 'configurator.attribute.containerRequiredMessage',
          params: { count: 1 },
        },
      ],
    };

    it('should keep warnings only for selected products', () => {
      expect(filterMessagesByProductSelection(view, true)).toEqual({
        infoMessages: [],
        warningMessages: ['Warning'],
        errorMessages: [],
        containerInfoMessages: [],
        requiredErrorMessages: [],
      });
    });

    it('should keep info and errors only for unselected products', () => {
      expect(filterMessagesByProductSelection(view, false)).toEqual({
        infoMessages: ['Info'],
        warningMessages: [],
        errorMessages: ['Error'],
        containerInfoMessages: [
          {
            key: 'configurator.attribute.containerMinRows',
            params: { count: 2 },
          },
        ],
        requiredErrorMessages: [
          {
            key: 'configurator.attribute.containerRequiredMessage',
            params: { count: 1 },
          },
        ],
      });
    });
  });

  describe('prependContainerContextMessageGroups', () => {
    it('should place container context groups before severity groups', () => {
      const groups = prependContainerContextMessageGroups(
        [
          {
            messages: ['Error'],
            messageClass: 'error',
            showIcon: true,
            uiKeyPrefix: 'error-msg',
          },
        ],
        {
          infoMessages: [],
          warningMessages: [],
          errorMessages: ['Error'],
          containerInfoMessages: [
            {
              key: 'configurator.attribute.containerMinRows',
              params: { count: 2 },
            },
          ],
          requiredErrorMessages: [
            {
              key: 'configurator.attribute.containerRequiredMessage',
              params: { count: 1 },
            },
          ],
        },
        {
          containerInfoMessageClass: 'info',
          requiredErrorMessageClass: 'required',
          iconTypeError: ICON_TYPE.ERROR,
          containerInfoUiKeyPrefix: 'container-info-msg',
          requiredErrorUiKeyPrefix: 'required-msg',
        }
      );

      expect(groups.map((group) => group.uiKeyPrefix)).toEqual([
        'container-info-msg',
        'required-msg',
        'error-msg',
      ]);
    });
  });
});
