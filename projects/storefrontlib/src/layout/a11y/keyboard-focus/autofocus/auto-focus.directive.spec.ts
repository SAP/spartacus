import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutoFocusDirective } from './auto-focus.directive';
import { AutoFocusService } from './auto-focus.service';

@Component({
  selector: 'cx-host',
  template: `
    <div cxAutoFocus id="a">
      <button id="a1"></button>
      <button id="a2"></button>
    </div>

    <div [cxAutoFocus]="{ autofocus: true }" id="b">
      <button id="b1"></button>
      <button id="b2"></button>
    </div>

    <div [cxAutoFocus]="{ autofocus: false }" id="c">
      <button id="c1"></button>
      <button id="c2"></button>
    </div>

    <div [cxAutoFocus]="{ autofocus: 'button:nth-child(2)' }" id="d">
      <button id="d1"></button>
      <button id="d2"></button>
    </div>
  `,
})
class MockComponent {}

class MockAutoFocusService {
  hasPersistedFocus() {
    return true;
  }
  findFirstFocusable() {}
  shouldFocus() {}
}

describe('AutoFocusDirective', () => {
  let fixture: ComponentFixture<MockComponent>;
  let service: AutoFocusService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent, AutoFocusDirective],
      providers: [
        {
          provide: AutoFocusService,
          useClass: MockAutoFocusService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MockComponent);
    service = TestBed.inject(AutoFocusService);
  }));
  const event = {
    preventDefault: () => {},
    stopPropagation: () => {},
  };
  describe('default', () => {
    it('should focus host element by default if autofocus is not provided', () => {
      const host: HTMLElement = fixture.debugElement.query(By.css('#a'))
        .nativeElement;
      spyOn(host, 'focus').and.callThrough();
      fixture.detectChanges();
      expect(host.focus).toHaveBeenCalled();
    });
  });

  describe('autofocus = true', () => {
    it('should focus host element if autofocus is required', () => {
      const host: HTMLElement = fixture.debugElement.query(By.css('#b'))
        .nativeElement;
      spyOn(host, 'focus').and.callThrough();
      fixture.detectChanges();
      expect(host.focus).toHaveBeenCalled();
    });

    it('should focus first focusable only', () => {
      const host = fixture.debugElement.query(By.css('#b'));
      const f1 = fixture.debugElement.query(By.css('#b1')).nativeElement;
      const f2 = fixture.debugElement.query(By.css('#b2')).nativeElement;

      spyOn(service, 'findFirstFocusable').and.returnValue(f1);
      spyOn(f1, 'focus').and.callThrough();
      spyOn(f2, 'focus').and.callThrough();

      fixture.detectChanges();
      host.triggerEventHandler('focus', event);

      expect(f1.focus).toHaveBeenCalled();
      expect(f2.focus).not.toHaveBeenCalled();
    });

    it('should avoid autofocus when mousedown was used', () => {
      const host = fixture.debugElement.query(By.css('#b'));
      const f1 = fixture.debugElement.query(By.css('#b1')).nativeElement;
      const f2 = fixture.debugElement.query(By.css('#b2')).nativeElement;

      spyOn(service, 'findFirstFocusable').and.returnValue(f1);
      spyOn(f1, 'focus').and.callThrough();
      spyOn(f2, 'focus').and.callThrough();

      fixture.detectChanges();
      host.triggerEventHandler('mousedown', event);
      host.triggerEventHandler('focus', event);

      expect(f1.focus).not.toHaveBeenCalled();
      expect(f2.focus).not.toHaveBeenCalled();
    });
  });

  describe('autofocus = false', () => {
    it('should not focus host element if autofocus = false', () => {
      const el: HTMLElement = fixture.debugElement.query(By.css('#c'))
        .nativeElement;
      spyOn(el, 'focus').and.callThrough();
      fixture.detectChanges();
      expect(el.focus).not.toHaveBeenCalled();
    });

    it('should not focus any focusable elements', () => {
      const host = fixture.debugElement.query(By.css('#c'));
      const f1 = fixture.debugElement.query(By.css('#c1')).nativeElement;
      const f2 = fixture.debugElement.query(By.css('#c2')).nativeElement;

      spyOn(service, 'findFirstFocusable').and.returnValue(f1);
      spyOn(f1, 'focus').and.callThrough();
      spyOn(f2, 'focus').and.callThrough();

      fixture.detectChanges();
      host.triggerEventHandler('focus', {
        preventDefault: () => {},
        stopPropagation: () => {},
      });

      expect(f1.focus).not.toHaveBeenCalled();
      expect(f2.focus).not.toHaveBeenCalled();
    });
  });

  describe('selector', () => {
    it('should focus host element if autofocus is a selector', () => {
      const host: HTMLElement = fixture.debugElement.query(By.css('#d'))
        .nativeElement;
      spyOn(host, 'focus').and.callThrough();
      fixture.detectChanges();
      expect(host.focus).toHaveBeenCalled();
    });
  });
});
