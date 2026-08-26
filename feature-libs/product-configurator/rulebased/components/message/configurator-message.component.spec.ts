import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ICON_TYPE, IconLoaderService } from '@spartacus/storefront';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { Configurator } from '../../core/model/configurator.model';
import {
  ConfiguratorMessageComponent,
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
      imports: [ConfiguratorMessageComponent],
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

  it('should not render an icon if iconType is not provided', () => {
    component.iconType = undefined;
    fixture.detectChanges();

    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'cx-icon'
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
        errorMessages: [],
        warningMessages: [],
      });
    });

    it('should map warning severity to errors and info to warnings', () => {
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
        ])
      ).toEqual({
        errorMessages: ['Too many units'],
        warningMessages: ['Check quantity'],
      });
    });

    it('should treat messages without severity as warnings', () => {
      expect(
        splitMessagesBySeverity([{ message: 'Unspecified message' }])
      ).toEqual({
        errorMessages: [],
        warningMessages: ['Unspecified message'],
      });
    });
  });
});
