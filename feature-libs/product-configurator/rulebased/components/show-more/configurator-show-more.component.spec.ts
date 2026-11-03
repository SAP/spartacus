import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorShowMoreComponent } from './configurator-show-more.component';

describe('ConfiguratorShowMoreComponent', () => {
  let component: ConfiguratorShowMoreComponent;
  let fixture: ComponentFixture<ConfiguratorShowMoreComponent>;
  let htmlElem: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ConfiguratorShowMoreComponent],
    })
      .overrideComponent(ConfiguratorShowMoreComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorShowMoreComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;

    component.text =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render component', () => {
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'span'
    );
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'button'
    );
  });

  it('should set showMore after view init', () => {
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(component.showMore).toBe(true);
    expect(component.textToShow).toBe(component.text.substring(0, 60));
  });

  it('should not set showMore after view init', () => {
    component.text = 'short text';

    component.ngAfterViewInit();
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'button'
    );
    expect(component.showMore).toBe(false);
    expect(component.textToShow).toBe(component.text);
  });

  it('should set showHiddenText after toggleShowMore action', () => {
    fixture.detectChanges();
    component.ngAfterViewInit();
    component.toggleShowMore();
    fixture.detectChanges();
    expect(component.showHiddenText).toBe(true);
    expect(component.textToShow).toBe(component.text);
  });

  describe('Sanitization of suspicious input', () => {
    const suspiciousTextWithFormatting =
      '<h1>Digital camera</h1> is a great product <p> <script';
    const suspiciousTextWithoutFormatting =
      'Digital camera is a great product  <script';
    const sanitizedText = 'Digital camera is a great product';

    it('does not happen through method normalize because that is meant for removing HTML tags for better readibility', () => {
      component.text = suspiciousTextWithFormatting;
      component.ngAfterViewInit();
      fixture.detectChanges();
      expect(component.textNormalized).toBe(suspiciousTextWithoutFormatting);
      expect(component['normalize'](suspiciousTextWithFormatting)).toBe(
        suspiciousTextWithoutFormatting
      );
    });

    it('should happen on view', () => {
      component.text = suspiciousTextWithFormatting;
      component.ngAfterViewInit();
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'span',
        sanitizedText
      );
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      component.ngAfterViewInit();
      fixture.detectChanges();
    });

    it("should contain button element with a content 'configurator.button.less' in case toggle has been invoked", () => {
      component.toggleShowMore();
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        undefined,
        0,
        undefined,
        undefined,
        'configurator.button.less'
      );
    });

    it("should contain button element with a content 'configurator.button.more' in the initial state", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        undefined,
        0,
        undefined,
        undefined,
        'configurator.button.more'
      );
    });

    it('should not set an aria-label on the button if no attribute label is provided', () => {
      const button = htmlElem.querySelector('button') as HTMLButtonElement;
      expect(button.hasAttribute('aria-label')).toBe(false);
      expect(component.ariaLabelKey).toBeUndefined();
    });

    it('should set an aria-label with attribute context on the button', () => {
      fixture.componentRef.setInput('attributeLabel', 'Color');
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        'button',
        'aria-label',
        'configurator.a11y.showMoreAttributeDescription attribute:Color item:undefined value:undefined'
      );
    });

    it('should set an aria-label with value and attribute context on the button', () => {
      fixture.componentRef.setInput('attributeLabel', 'Color');
      fixture.componentRef.setInput('valueLabel', 'Red');
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        'button',
        'aria-label',
        'configurator.a11y.showMoreValueDescription attribute:Color item:undefined value:Red'
      );
    });

    it('should set an aria-label with item and attribute context on the button', () => {
      fixture.componentRef.setInput('attributeLabel', 'Camera Body');
      fixture.componentRef.setInput('itemLabel', 'NIKON_D7500');
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        'button',
        'aria-label',
        'configurator.a11y.showMoreItemDescription attribute:Camera Body item:NIKON_D7500 value:undefined'
      );
    });

    it('should switch the aria-label to show less after toggling', () => {
      component.attributeLabel = 'Color';
      component.valueLabel = 'Red';
      component.toggleShowMore();
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        'button',
        'aria-label',
        'configurator.a11y.showLessValueDescription attribute:Color item:undefined value:Red'
      );
    });

    it('should resolve the show less keys for attribute and item descriptions', () => {
      component.attributeLabel = 'Color';
      component.showHiddenText = true;
      expect(component.ariaLabelKey).toBe(
        'configurator.a11y.showLessAttributeDescription'
      );

      component.itemLabel = 'NIKON_D7500';
      expect(component.ariaLabelKey).toBe(
        'configurator.a11y.showLessItemDescription'
      );
    });
  });
});
