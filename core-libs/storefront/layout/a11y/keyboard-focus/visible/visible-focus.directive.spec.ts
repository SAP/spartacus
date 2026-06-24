import {
  Component,
  DebugElement,
  Directive,
  ElementRef,
  Input,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FeatureToggles } from '@spartacus/core';
import { BaseFocusService } from '../base/base-focus.service';
import { VisibleFocusConfig } from '../keyboard-focus.model';
import { VisibleFocusDirective } from './visible-focus.directive';
import { provideMockFeatureToggles } from 'core-libs/core/src/features-config/feature-toggles/testing';

@Directive({ selector: '[cxVisibleFocus]' })
class CustomFocusDirective extends VisibleFocusDirective {
  @Input('cxVisibleFocus') protected config: VisibleFocusConfig;

  constructor(
    protected elementRef: ElementRef<HTMLElement>,
    protected service: BaseFocusService
  ) {
    super(elementRef, service);
  }
}

@Directive({ selector: '[cxCustomFocus]' })
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
  imports: [VisibleFocusDirective, CustomFakeFocusDirective],
})
class MockComponent {}

class MockVisibleFocusService {}

const mockFeatureToggles: FeatureToggles = {
  a11yConsentManagementFocusPreservation: false,
};

const buttonTarget = { tagName: 'BUTTON' };
const inputTarget = {
  tagName: 'INPUT',
  type: 'text',
};
const checkboxTarget = {
  tagName: 'INPUT',
  type: 'checkbox',
};
const radioTarget = {
  tagName: 'INPUT',
  type: 'radio',
};

const MockMouseEvent = {
  preventDefault: () => {},
  stopPropagation: () => {},
  metaKey: false,
  target: buttonTarget,
};

const MockOskeyEvent = {
  preventDefault: () => {},
  stopPropagation: () => {},
  metaKey: true,
  target: buttonTarget,
};

const MockFillFormEvent = {
  preventDefault: () => {},
  stopPropagation: () => {},
  metaKey: false,
  target: inputTarget,
};

const MockTabKeyEvent = {
  preventDefault: () => {},
  stopPropagation: () => {},
  metaKey: false,
  code: 'Tab',
  target: inputTarget,
};

const MockCheckboxSpaceEvent = {
  preventDefault: () => {},
  stopPropagation: () => {},
  metaKey: false,
  code: 'Space',
  target: checkboxTarget,
};

const MockRadioEnterEvent = {
  preventDefault: () => {},
  stopPropagation: () => {},
  metaKey: false,
  code: 'Enter',
  target: radioTarget,
};

describe('VisibleFocusDirective', () => {
  let fixture: ComponentFixture<MockComponent>;
  let featureToggles: FeatureToggles;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CustomFocusDirective, CustomFakeFocusDirective],
      providers: [
        {
          provide: BaseFocusService,
          useClass: MockVisibleFocusService,
        },
        provideMockFeatureToggles({ ...mockFeatureToggles }),
      ],
    })
      .overrideComponent(MockComponent, {
        remove: { imports: [VisibleFocusDirective, CustomFakeFocusDirective] },
        add: { imports: [CustomFocusDirective, CustomFakeFocusDirective] },
      })
      .compileComponents();
    fixture = TestBed.createComponent(MockComponent);
    featureToggles = TestBed.inject(FeatureToggles);
  }));

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

  describe('checkbox/radio with a11yConsentManagementFocusPreservation feature', () => {
    let host: DebugElement;
    beforeEach(() => {
      host = fixture.debugElement.query(By.css('#a'));
      host.triggerEventHandler('mousedown', MockMouseEvent);
      fixture.detectChanges();
    });

    it('should remove "mouse-focus" class on Space pressed on a checkbox when feature is enabled', () => {
      featureToggles.a11yConsentManagementFocusPreservation = true;
      expect((host.nativeElement as HTMLElement).classList).toContain(
        'mouse-focus'
      );
      host.triggerEventHandler('keydown', MockCheckboxSpaceEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).not.toContain(
        'mouse-focus'
      );
    });

    it('should remove "mouse-focus" class on Enter pressed on a radio when feature is enabled', () => {
      featureToggles.a11yConsentManagementFocusPreservation = true;
      expect((host.nativeElement as HTMLElement).classList).toContain(
        'mouse-focus'
      );
      host.triggerEventHandler('keydown', MockRadioEnterEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).not.toContain(
        'mouse-focus'
      );
    });

    it('should keep "mouse-focus" class on Space pressed on a checkbox when feature is disabled', () => {
      featureToggles.a11yConsentManagementFocusPreservation = false;
      expect((host.nativeElement as HTMLElement).classList).toContain(
        'mouse-focus'
      );
      host.triggerEventHandler('keydown', MockCheckboxSpaceEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).toContain(
        'mouse-focus'
      );
    });
  });
});
