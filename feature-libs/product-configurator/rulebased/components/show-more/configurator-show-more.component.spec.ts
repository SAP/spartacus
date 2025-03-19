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
      'bypassSecurityTrustHtml',
    ]);
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

  // removed unit testing because now i used sanitized dom and i did unit testing for this
   it('should remove HTML tags from input text', () => {
     sanitizerSpy.sanitize.and.returnValue('Sanitized Text');

     const result = component.normalize('<b>Sanitized Text</b>');

     expect(sanitizerSpy.sanitize).toHaveBeenCalledWith(
       SecurityContext.HTML,
       '<b>Sanitized Text</b>'
     );
     expect(result).toEqual('Sanitized Text');
   });

   it('should return an empty string when input is null', () => {
     sanitizerSpy.sanitize.and.returnValue(null);

     const result = component.normalize(null as unknown as string);

     expect(result).toEqual('');
   });

   it('should return an empty string when input is undefined', () => {
     sanitizerSpy.sanitize.and.returnValue(undefined);

     const result = component.normalize(undefined as unknown as string);

     expect(result).toEqual('');
   });

   it('should return the same text if there are no HTML elements', () => {
     sanitizerSpy.sanitize.and.returnValue('Plain Text');

     const result = component.normalize('Plain Text');

     expect(result).toEqual('Plain Text');
   });

   it('should remove script tags to prevent XSS', () => {
     sanitizerSpy.sanitize.and.returnValue('Safe Content');

     const result = component.normalize(
       '<script>alert("XSS Attack")</script>Safe Content'
     );

     expect(result).toEqual('Safe Content');
   });

   it('should handle special characters properly', () => {
     sanitizerSpy.sanitize.and.returnValue('Text & Special Chars ©');

     const result = component.normalize('Text & Special Chars ©');

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
