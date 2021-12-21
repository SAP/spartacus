import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorShowMoreComponent } from './configurator-show-more.component';

describe('ConfiguratorShowMoreComponent', () => {
  let component: ConfiguratorShowMoreComponent;
  let fixture: ComponentFixture<ConfiguratorShowMoreComponent>;
  let htmlElem: HTMLElement;

  beforeEach(
    waitForAsync(() => {
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
    })
  );

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
