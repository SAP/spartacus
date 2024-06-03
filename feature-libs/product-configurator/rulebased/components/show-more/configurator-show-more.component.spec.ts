import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Config, I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorShowMoreComponent } from './configurator-show-more.component';

class MockConfig {
  features = [{ productConfiguratorAttributeTypesV2: true }];
}

describe('ConfiguratorShowMoreComponent', () => {
  let component: ConfiguratorShowMoreComponent;
  let fixture: ComponentFixture<ConfiguratorShowMoreComponent>;
  let htmlElem: HTMLElement;
  let config: Config;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [ConfiguratorShowMoreComponent],
        providers: [{ provide: Config, useClass: MockConfig }],
      })
        .overrideComponent(ConfiguratorShowMoreComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorShowMoreComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;

    component.text =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    config = TestBed.inject(Config);
    (config.features ?? {}).productConfiguratorAttributeTypesV2 = true;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should render component in case 'productConfiguratorAttributeTypesV2' feature flag is enabled", () => {
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

  it("should not render component in case 'productConfiguratorAttributeTypesV2' feature flag is disabled", () => {
    (config.features ?? {}).productConfiguratorAttributeTypesV2 = false;
    fixture.detectChanges();

    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'span'
    );
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
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
      component.text = 'Here is a short description to the product';
      component.productName = 'Camera bundle';
      component.ngAfterViewInit();
      fixture.detectChanges();
    });

    it("should contain span element with 'aria-label' attribute that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        undefined,
        0,
        'aria-label',
        'configurator.a11y.itemDescription item:Camera bundle'
      );
    });

    it("should contain button element with a content 'configurator.button.less'", () => {
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

    it("should contain button element with a content 'configurator.button.more'", () => {
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
        'configurator.button.more'
      );
    });
  });
});
