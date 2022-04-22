import { Component, Directive, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PersistFocusConfig } from '../keyboard-focus.model';
import { PersistFocusDirective } from './persist-focus.directive';
import { PersistFocusService } from './persist-focus.service';

@Directive({
  selector: '[cxPersistFocus]',
})
class CustomFocusDirective extends PersistFocusDirective {
  @Input('cxPersistFocus') protected config: PersistFocusConfig;
}
@Component({
  selector: 'cx-host',
  template: `
    <div id="a" cxPersistFocus></div>
    <div id="b" cxPersistFocus="key-b"></div>
    <div id="c" [cxPersistFocus]="{ key: 'key-c' }"></div>
    <div id="d" [cxPersistFocus]="{ key: 'key-d' }"></div>
  `,
})
class MockComponent {}

class MockPersistFocusService {
  set(): void {}
  get() {
    return 'key-d';
  }
  getPersistenceGroup() {
    return 'test-group';
  }
}

describe('PersistFocusDirective', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;
  let service: PersistFocusService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MockComponent, CustomFocusDirective],
        providers: [
          {
            provide: PersistFocusService,
            useClass: MockPersistFocusService,
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(MockComponent);
      component = fixture.componentInstance;
      service = TestBed.inject(PersistFocusService);

      spyOn(service, 'get').and.callThrough();
      spyOn(service, 'set').and.callThrough();
    })
  );

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('store key', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });
    it('should not create `data-cx-focus`', () => {
      const el: HTMLElement = fixture.debugElement.query(
        By.css('#a')
      ).nativeElement;
      expect(el.getAttribute('data-cx-focus')).toBeFalsy();
    });

    it('should create `data-cx-focus` attribute for string value', () => {
      const el: HTMLElement = fixture.debugElement.query(
        By.css('#b')
      ).nativeElement;
      expect(el.getAttribute('data-cx-focus')).toEqual('key-b');
      expect(service.get).toHaveBeenCalledWith('test-group');
    });

    it('should create `data-cx-focus` attribute for configured key', () => {
      const el: HTMLElement = fixture.debugElement.query(
        By.css('#c')
      ).nativeElement;
      expect(el.getAttribute('data-cx-focus')).toEqual('key-c');
    });

    it('should use key-group (if any) for getting the value', () => {
      expect(service.get).toHaveBeenCalledWith('test-group');
    });
  });

  describe('focused', () => {
    it('should focus persisted element`', () => {
      const el: HTMLElement = fixture.debugElement.query(
        By.css('#d')
      ).nativeElement;
      spyOn(el, 'focus');
      fixture.detectChanges();

      expect(el.focus).toHaveBeenCalled();
    });

    it('should handle focus`', () => {
      const el = fixture.debugElement.query(By.css('#b'));
      fixture.detectChanges();
      const mockEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
      };
      el.triggerEventHandler('focus', mockEvent);

      expect(service.set).toHaveBeenCalledWith('key-b', 'test-group');
    });
  });
});
