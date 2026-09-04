import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ICON_TYPE, IconLoaderService } from '@spartacus/storefront';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorMessageComponent } from './configurator-message.component';

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
    component.messageClass = 'cx-error-message';
    component.iconType = ICON_TYPE.ERROR;
    component.showIcon = true;
    component.idPrefix = 'cx-configurator--row-error-msg--888';
    component.role = 'alert';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('template rendering', () => {
    describe('when messages are missing', () => {
      it('renders no rows when messages are undefined', () => {
        component.messages = undefined;
        fixture.detectChanges();

        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          'div'
        );
      });

      it('renders no rows when messages are empty', () => {
        component.messages = [];
        fixture.detectChanges();

        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          'div'
        );
      });
    });

    describe('when messages are provided', () => {
      it('renders one row per message with messageClass and text', () => {
        fixture.detectChanges();

        CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
          expect,
          htmlElem,
          '.cx-error-message',
          2
        );
        CommonConfiguratorTestUtilsService.expectElementToContainText(
          expect,
          htmlElem,
          '.cx-error-message',
          'First message'
        );
        CommonConfiguratorTestUtilsService.expectElementToContainText(
          expect,
          htmlElem,
          '.cx-error-message',
          'Second message',
          1
        );
      });

      it('renders cx-icon when showIcon is true', () => {
        fixture.detectChanges();

        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          'cx-icon'
        );
      });

      it('omits cx-icon when showIcon is false', () => {
        component.showIcon = false;
        fixture.detectChanges();

        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          'cx-icon'
        );
      });

      it('resolves translatable messages via the translation pipe', () => {
        component.messages = [
          { key: 'configurator.attribute.containerMinRows' },
        ];
        component.messageClass = 'container-info-message';
        fixture.detectChanges();

        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.container-info-message'
        );
      });
    });
  });

  describe('getMessageId', () => {
    it('appends index to idPrefix', () => {
      expect(component.getMessageId(0)).toBe(
        'cx-configurator--row-error-msg--888-0'
      );
      expect(component.getMessageId(1)).toBe(
        'cx-configurator--row-error-msg--888-1'
      );
    });

    it('returns undefined without idPrefix', () => {
      component.idPrefix = undefined;
      expect(component.getMessageId(0)).toBeUndefined();
    });
  });

  describe('accessibility', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('sets aria-live, aria-atomic, role, aria-label and id on each row', () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-error-message',
        0,
        'aria-live',
        'assertive'
      );
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-error-message',
        0,
        'aria-atomic',
        'true'
      );
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-error-message',
        0,
        'role',
        'alert'
      );
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-error-message',
        0,
        'aria-label',
        'First message'
      );
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-error-message',
        0,
        'id',
        'cx-configurator--row-error-msg--888-0'
      );
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-error-message',
        1,
        'id',
        'cx-configurator--row-error-msg--888-1'
      );
    });
  });
});
