import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { PopoverModule } from './popover.module';

@Component({
  template: `
    <ng-template #content>
      <div class="content-wrapper">
        <h1>Test</h1>
      </div>
    </ng-template>
    <button
      id="element"
      [cxPopover]="content"
      [customClass]="'test-class'"
      [placement]="'top'"
      [appendToBody]="true"
    >
      Popover
    </button>
  `,
})
class PopoverTestComponent {}

describe('PopoverDirective', () => {
  let component: PopoverTestComponent;
  let fixture: ComponentFixture<PopoverTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, PopoverModule],
      declarations: [PopoverTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverTestComponent);
    component = fixture.componentInstance;
  });

  function getPopoverOpener(): DebugElement {
    return fixture.debugElement.query(By.css('#element'));
  }

  function getPopoverComponent(): DebugElement {
    return fixture.debugElement.query(By.css('cx-popover'));
  }

  function getPopoverCloseButton(): DebugElement {
    return fixture.debugElement.query(By.css('button.close'));
  }

  it('should create test component', () => {
    expect(component).toBeTruthy();
  });

  it('should open/close popover on button click', () => {
    getPopoverOpener().nativeElement.click();
    expect(getPopoverComponent()).toBeTruthy();

    getPopoverOpener().nativeElement.click();
    expect(getPopoverComponent()).toBeFalsy();
  });

  it(
    'should close popover on close button click',
    waitForAsync(async () => {
      getPopoverOpener().nativeElement.click();
      expect(getPopoverComponent()).toBeTruthy();
      await fixture.whenStable();

      getPopoverCloseButton().nativeElement.click();
      expect(getPopoverComponent()).toBeFalsy();
    })
  );

  it(
    'should close popover on outside popover area click',
    waitForAsync(async () => {
      getPopoverOpener().nativeElement.click();
      expect(getPopoverComponent()).toBeTruthy();
      await fixture.whenStable();

      document.body.click();
      expect(getPopoverComponent()).toBeFalsy();
    })
  );

  it('should popover contain passed `customClass`', () => {
    fixture.detectChanges();

    getPopoverOpener().nativeElement.click();
    expect(getPopoverComponent().nativeElement.classList).toContain(
      'test-class'
    );
  });

  it('should popover contain passed `position` as class', () => {
    fixture.detectChanges();

    getPopoverOpener().nativeElement.click();
    expect(getPopoverComponent().nativeElement.classList).toContain('top');
  });

  it('should popover display passed template', () => {
    fixture.detectChanges();

    getPopoverOpener().nativeElement.click();

    const template = getPopoverComponent().query(By.css('h1'));
    expect(template).toBeTruthy();
    expect(template.nativeElement.innerText).toContain('Test');
  });

  it('should append popover before closing `body` tag', () => {
    fixture.detectChanges();

    getPopoverOpener().nativeElement.click();
    expect(document.body.lastChild).toBe(getPopoverComponent().nativeElement);
  });
});
