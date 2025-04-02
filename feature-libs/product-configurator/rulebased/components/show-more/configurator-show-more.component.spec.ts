import { ChangeDetectionStrategy, SecurityContext } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorShowMoreComponent } from './configurator-show-more.component';
import { DomSanitizer } from '@angular/platform-browser';

describe('ConfiguratorShowMoreComponent', () => {
  let component: ConfiguratorShowMoreComponent;
  let fixture: ComponentFixture<ConfiguratorShowMoreComponent>;
  let htmlElem: HTMLElement;
  let sanitizerSpy: jasmine.SpyObj<DomSanitizer>;

  beforeEach(waitForAsync(() => {
    sanitizerSpy = jasmine.createSpyObj<DomSanitizer>('DomSanitizer', [
      'sanitize',
    ]);
    sanitizerSpy.sanitize.and.callFake(
      (_context: SecurityContext, value: string) => value
    );
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ConfiguratorShowMoreComponent],
      providers: [{ provide: DomSanitizer, useValue: sanitizerSpy }],
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

  // Testing 'normalize' method
  it('should sanitize input text by removing HTML tags', () => {
    const result = component.normalize('<b>Sanitized Text</b>');
    expect(sanitizerSpy.sanitize).toHaveBeenCalledWith(
      SecurityContext.HTML,
      'Sanitized Text'
    );
    expect(result).toEqual('Sanitized Text');
  });

  it('should return an empty string when input is null', () => {
    const result = component.normalize(null as unknown as string);
    expect(sanitizerSpy.sanitize).toHaveBeenCalledWith(
      SecurityContext.HTML,
      ''
    );
    expect(result).toEqual('');
  });

  it('should return an empty string when input is undefined', () => {
    const result = component.normalize(undefined as unknown as string);
    expect(sanitizerSpy.sanitize).toHaveBeenCalledWith(
      SecurityContext.HTML,
      ''
    );
    expect(result).toEqual('');
  });

  it('should return the same text if there are no HTML elements', () => {
    const result = component.normalize('Plain Text');
    expect(sanitizerSpy.sanitize).toHaveBeenCalledWith(
      SecurityContext.HTML,
      'Plain Text'
    );
    expect(result).toEqual('Plain Text');
  });

  it('should remove script tags to prevent XSS', () => {
    const input = '<script>alert("XSS")</script>Safe Content';
    const result = component.normalize(input);
    expect(sanitizerSpy.sanitize).toHaveBeenCalledWith(
      SecurityContext.HTML,
      'alert("XSS")Safe Content'
    );
    expect(result).toEqual('alert("XSS")Safe Content');
  });

  it('should handle special characters properly', () => {
    const input = 'Text & Special Chars ©';
    const result = component.normalize(input);
    expect(sanitizerSpy.sanitize).toHaveBeenCalledWith(
      SecurityContext.HTML,
      'Text & Special Chars ©'
    );
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
