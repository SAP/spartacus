import { Component, Directive, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutoFocusConfig } from '../keyboard-focus.model';
import { AutoFocusDirective } from './auto-focus.directive';
import { AutoFocusService } from './auto-focus.service';

@Directive({
  selector: '[cxAutoFocus]',
})
class CustomFocusDirective extends AutoFocusDirective {
  @Input('cxAutoFocus') protected config: AutoFocusConfig;
}

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
  getPersistenceGroup() {}
  set() {}
}

describe('AutoFocusDirective', () => {
  let fixture: ComponentFixture<MockComponent>;
  let service: AutoFocusService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent, CustomFocusDirective],
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
    it('should handle focus by default when no autofocus config is provided', () => {
      const host = fixture.debugElement.query(By.css('#a'));

      spyOn(service, 'findFirstFocusable');

      fixture.detectChanges();
      host.triggerEventHandler('focus', event);

      expect(service.findFirstFocusable).toHaveBeenCalled();
      expect(service.findFirstFocusable).toHaveBeenCalledWith(
        host.nativeElement,
        {
          autofocus: true,
        }
      );
      expect(service.findFirstFocusable).toHaveBeenCalledTimes(1);
    });
  });

  it('should handle focus when autofocus=true', () => {
    const host = fixture.debugElement.query(By.css('#b'));
    spyOn(service, 'findFirstFocusable');
    fixture.detectChanges();
    host.triggerEventHandler('focus', event);
    expect(service.findFirstFocusable).toHaveBeenCalledWith(
      host.nativeElement,
      {
        autofocus: true,
      }
    );
    expect(service.findFirstFocusable).toHaveBeenCalledTimes(1);
  });

  it('should handle focus when autofocus is a selector', () => {
    const host = fixture.debugElement.query(By.css('#d'));
    spyOn(service, 'findFirstFocusable');
    fixture.detectChanges();
    host.triggerEventHandler('focus', event);
    expect(service.findFirstFocusable).toHaveBeenCalledWith(
      host.nativeElement,
      {
        autofocus: 'button:nth-child(2)',
      }
    );
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

  it('should not focus host element if autofocus = false', () => {
    const el = fixture.debugElement.query(By.css('#c'));
    spyOn(service, 'findFirstFocusable');

    fixture.detectChanges();
    el.triggerEventHandler('focus', event);
    expect(service.findFirstFocusable).not.toHaveBeenCalled();
  });
});
