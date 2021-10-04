import {
  Component,
  DebugElement,
  Directive,
  ElementRef,
  Input,
} from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BaseFocusService } from '../base/base-focus.service';
import { VisibleFocusConfig } from '../keyboard-focus.model';
import { VisibleFocusDirective } from './visible-focus.directive';

@Directive({
  selector: '[cxVisibleFocus]',
})
class CustomFocusDirective extends VisibleFocusDirective {
  @Input('cxVisibleFocus') protected config: VisibleFocusConfig;

  constructor(
    protected elementRef: ElementRef<HTMLElement>,
    protected service: BaseFocusService
  ) {
    super(elementRef, service);
  }
}

@Directive({
  selector: '[cxCustomFocus]',
})
class CustomFakeFocusDirective extends VisibleFocusDirective {
  protected defaultConfig = {};

  constructor(
    protected elementRef: ElementRef<HTMLElement>,
    protected service: BaseFocusService
  ) {
    super(elementRef, service);
  }
}

@Component({
  selector: 'cx-host',
  template: `
    <div id="a" cxVisibleFocus></div>
    <div id="b" [cxVisibleFocus]="{ disableMouseFocus: false }"></div>
    <div id="c" cxCustomFocus></div>
  `,
})
class MockComponent {}

class MockVisibleFocusService {}

const MockMouseEvent = {
  preventDefault: () => {},
  stopPropagation: () => {},
  metaKey: false,
  target: {
    tagName: 'BUTTON',
  },
};

const MockOskeyEvent = {
  preventDefault: () => {},
  stopPropagation: () => {},
  metaKey: true,
  target: {
    tagName: 'BUTTON',
  },
};

const MockFillFormEvent = {
  preventDefault: () => {},
  stopPropagation: () => {},
  metaKey: false,
  target: {
    tagName: 'INPUT',
  },
};

const MockTabKeyEvent = {
  preventDefault: () => {},
  stopPropagation: () => {},
  metaKey: false,
  code: 'Tab',
  target: {
    tagName: 'INPUT',
  },
};

describe('VisibleFocusDirective', () => {
  let fixture: ComponentFixture<MockComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          MockComponent,
          CustomFocusDirective,
          CustomFakeFocusDirective,
        ],
        providers: [
          {
            provide: BaseFocusService,
            useClass: MockVisibleFocusService,
          },
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(MockComponent);
    })
  );

  beforeEach(() => {
    fixture.detectChanges();
  });

  describe('default behaviour', () => {
    let host: DebugElement;
    beforeEach(() => {
      host = fixture.debugElement.query(By.css('#a'));
      fixture.detectChanges();
    });

    it('should not have "mouse-focus" class on the host by default', () => {
      expect((host.nativeElement as HTMLElement).classList).not.toContain(
        'mouse-focus'
      );
    });

    it('should add "mouse-focus" class when mousedown is triggered', () => {
      host.triggerEventHandler('mousedown', MockMouseEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).toContain(
        'mouse-focus'
      );
    });

    it('should not have "mouse-focus" class when keydown is triggered after mousedown', () => {
      host.triggerEventHandler('mousedown', MockMouseEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).toContain(
        'mouse-focus'
      );
      host.triggerEventHandler('keydown', MockMouseEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).not.toContain(
        'mouse-focus'
      );
    });

    it('should have "mouse-focus" class when keydown is used for OS functions', () => {
      host.triggerEventHandler('mousedown', MockMouseEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).toContain(
        'mouse-focus'
      );
      host.triggerEventHandler('keydown', MockOskeyEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).toContain(
        'mouse-focus'
      );
    });

    it('should have "mouse-focus" class when keydown is used for filling in a FORM', () => {
      host.triggerEventHandler('mousedown', MockMouseEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).toContain(
        'mouse-focus'
      );
      host.triggerEventHandler('keydown', MockFillFormEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).toContain(
        'mouse-focus'
      );
    });

    it('should not have "mouse-focus" class when Tab key is used', () => {
      host.triggerEventHandler('mousedown', MockMouseEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).toContain(
        'mouse-focus'
      );
      host.triggerEventHandler('keydown', MockTabKeyEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).not.toContain(
        'mouse-focus'
      );
    });

    it('should have "mouse-focus" class when mousedown is triggered after keydown', () => {
      host.triggerEventHandler('keydown', MockMouseEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).not.toContain(
        'mouse-focus'
      );
      host.triggerEventHandler('mousedown', MockMouseEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).toContain(
        'mouse-focus'
      );
    });
  });

  describe('explicitly set disableMouseFocus to false', () => {
    let host: DebugElement;
    beforeEach(() => {
      host = fixture.debugElement.query(By.css('#b'));
      fixture.detectChanges();
    });

    it('should not add "mouse-focus" class when mousedown is triggered', () => {
      host.triggerEventHandler('mousedown', MockMouseEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).not.toContain(
        'mouse-focus'
      );
    });
  });

  describe('default behaviour for child directives', () => {
    it('should not add "mouse-focus" class when mousedown is triggered', () => {
      const host = fixture.debugElement.query(By.css('#c'));
      host.triggerEventHandler('mousedown', MockMouseEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).not.toContain(
        'mouse-focus'
      );
    });
  });
});
