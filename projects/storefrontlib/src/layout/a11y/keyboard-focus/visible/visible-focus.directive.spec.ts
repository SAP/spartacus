import { Component, DebugElement, Directive } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BaseFocusService } from '../base/base-focus.service';
import { VisibleFocusDirective } from './visible-focus.directive';

@Directive({
  selector: '[cxCustomFocus]',
})
class CustomFocusDirective extends VisibleFocusDirective {
  protected defaultConfig = {};
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

const MockEvent = {
  preventDefault: () => {},
  stopPropagation: () => {},
};

describe('VisibleFocusDirective', () => {
  let fixture: ComponentFixture<MockComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent,
        VisibleFocusDirective,
        CustomFocusDirective,
      ],
      providers: [
        {
          provide: BaseFocusService,
          useClass: MockVisibleFocusService,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(MockComponent);
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
      host.triggerEventHandler('mousedown', MockEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).toContain(
        'mouse-focus'
      );
    });

    it('should remove "mouse-focus" class when keydown is triggered after mousedown', () => {
      host.triggerEventHandler('mousedown', MockEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).toContain(
        'mouse-focus'
      );
      host.triggerEventHandler('keydown', MockEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).not.toContain(
        'mouse-focus'
      );
    });

    it('should add "mouse-focus" class when mousedown is triggered after keydown', () => {
      host.triggerEventHandler('keydown', MockEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).not.toContain(
        'mouse-focus'
      );
      host.triggerEventHandler('mousedown', MockEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).toContain(
        'mouse-focus'
      );
    });
  });

  describe('explicitily set disableMouseFocus to false', () => {
    let host: DebugElement;
    beforeEach(() => {
      host = fixture.debugElement.query(By.css('#b'));
      fixture.detectChanges();
    });

    it('should not add "mouse-focus" class when mousedown is triggered', () => {
      host.triggerEventHandler('mousedown', MockEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).not.toContain(
        'mouse-focus'
      );
    });
  });

  describe('default behaviour for child directives', () => {
    it('should not add "mouse-focus" class when mousedown is triggered', () => {
      const host = fixture.debugElement.query(By.css('#c'));
      host.triggerEventHandler('mousedown', MockEvent);
      fixture.detectChanges();
      expect((host.nativeElement as HTMLElement).classList).not.toContain(
        'mouse-focus'
      );
    });
  });
});
