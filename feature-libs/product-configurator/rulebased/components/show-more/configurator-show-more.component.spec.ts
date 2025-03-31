import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorShowMoreComponent } from './configurator-show-more.component';

describe('ConfiguratorShowMoreComponent', () => {
  let component: ConfiguratorShowMoreComponent;
  let fixture: ComponentFixture<ConfiguratorShowMoreComponent>;
  let htmlElem: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ConfiguratorShowMoreComponent],
    })
      .overrideComponent(ConfiguratorShowMoreComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

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

  it('should render component', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'span'
    );
  });

  it('should remove script tags from input text', () => {
    const input = '<script>alert("XSS")</script><b>Sanitized Text</b>';
    const result = component.removeScriptTags(input);

    expect(result).toEqual('<b>Sanitized Text</b>');
  });

  it('should return empty SafeHtml when input is null', () => {
    const result = component.removeScriptTags(null as unknown as string);
    expect(result.toString()).toEqual('');
  });

  it('should return empty SafeHtml when input is undefined', () => {
    const result = component.removeScriptTags(undefined as unknown as string);
    expect(result.toString()).toEqual('');
  });

  it('should return SafeHtml unchanged if no HTML elements', () => {
    const result = component.removeScriptTags('Plain Text');
    expect(result.toString()).toEqual('Plain Text');
  });

  it('should remove script tags to prevent XSS', () => {
    const result = component.removeScriptTags(
      '<script>alert("XSS")</script>Safe Content'
    );
    expect(result.toString()).toEqual('Safe Content');
  });

  it('should handle special characters properly', () => {
    const result = component.removeScriptTags('Text & Special Chars ©');
    expect(result).toEqual('Text & Special Chars ©');
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      component.text = 'Here is a short description to the product';
      component.productName = 'Camera bundle';
      component.ngAfterViewInit();
      fixture.detectChanges();
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
