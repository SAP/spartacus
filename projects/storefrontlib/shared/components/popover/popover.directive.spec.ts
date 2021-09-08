import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
      [cxPopoverOptions]="{
        class: 'test-class',
        placement: 'top',
        appendToBody: true,
        displayCloseButton: true,
        autoPositioning: false
      }"
      (openPopover)="open()"
      (closePopover)="close()"
    >
      Popover
    </button>
  `,
})
class PopoverTestComponent {
  open() {
    return 'Opened';
  }

  close() {
    return 'Closed';
  }
}

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
    fixture.detectChanges();

    getPopoverOpener().nativeElement.click();
    expect(getPopoverComponent()).toBeTruthy();

    getPopoverOpener().nativeElement.click();
    expect(getPopoverComponent()).toBeFalsy();
  });

  it('should close popover on close button click', () => {
    fixture.detectChanges();

    getPopoverOpener().nativeElement.click();
    expect(getPopoverComponent()).toBeTruthy();

    getPopoverCloseButton().nativeElement.click();
    expect(getPopoverComponent()).toBeFalsy();
  });

  it('should close popover on outside popover area click', () => {
    fixture.detectChanges();

    getPopoverOpener().nativeElement.click();
    expect(getPopoverComponent()).toBeTruthy();

    document.body.click();
    expect(getPopoverComponent()).toBeFalsy();
  });

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

  it('should call passed method on popover `open` event', () => {
    const spy = spyOn(component, 'open');
    fixture.detectChanges();

    getPopoverOpener().nativeElement.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should call passed method on popover `close` event', () => {
    fixture.detectChanges();

    getPopoverOpener().nativeElement.click();
    const spy = spyOn(component, 'close');
    fixture.detectChanges();

    getPopoverOpener().nativeElement.click();
    expect(spy).toHaveBeenCalled();
  });
});
