import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EscapeFocusConfig } from '../keyboard-focus.model';
import { SelectFocusUtility } from '../services';
import { EscapeFocusService } from './escape-focus.service';

@Component({ template: '<div id="a"></div><div id="b" tabindex="5"></div>' })
class MockComponent {}

class MockSelectFocusUtility {
  findFirstFocusable() {}
}
describe('EscapeFocusService', () => {
  let service: EscapeFocusService;
  let focusUtility: SelectFocusUtility;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MockComponent],
        providers: [
          EscapeFocusService,
          {
            provide: SelectFocusUtility,
            useClass: MockSelectFocusUtility,
          },
        ],
      }).compileComponents();

      service = TestBed.inject(EscapeFocusService);
      focusUtility = TestBed.inject(SelectFocusUtility);

      fixture = TestBed.createComponent(MockComponent);
    })
  );

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('shouldFocus()', () => {
    it('should return false with noconfig', () => {
      const noConfig: EscapeFocusConfig = undefined;
      expect(service.shouldFocus(noConfig)).toBeFalsy();
    });

    it('should return false with empty config', () => {
      const emptyConfig: EscapeFocusConfig = {};
      expect(service.shouldFocus(emptyConfig)).toBeFalsy();
    });

    it('should return false with focusOnEscape = false', () => {
      const emptyConfig: EscapeFocusConfig = { focusOnEscape: false };
      expect(service.shouldFocus(emptyConfig)).toBeFalsy();
    });

    it('should return true with focusOnEscape = true', () => {
      const emptyConfig: EscapeFocusConfig = { focusOnEscape: true };
      expect(service.shouldFocus(emptyConfig)).toBeTruthy();
    });
  });

  describe('handleEscape()', () => {
    let el: HTMLElement;
    const ev = {
      preventDefault() {},
      stopPropagation() {},
      target: undefined,
    };

    beforeEach(() => {
      spyOn(ev, 'preventDefault');
      spyOn(ev, 'stopPropagation');

      el = fixture.debugElement.query(By.css('#a')).nativeElement;

      spyOn(el, 'focus');
    });

    describe('focusOnEscape = true', () => {
      it('should focus host', () => {
        service.handleEscape(el, { focusOnEscape: true }, ev as KeyboardEvent);
        expect(el.focus).toHaveBeenCalled();
      });

      it('should stop event bubbling', () => {
        service.handleEscape(el, { focusOnEscape: true }, ev as KeyboardEvent);
        expect(ev.preventDefault).toHaveBeenCalled();
        expect(ev.stopPropagation).toHaveBeenCalled();
      });

      describe('host is already focused', () => {
        beforeEach(() => {
          ev.target = el;

          spyOn(focusUtility, 'findFirstFocusable');
        });
        it('should not focus', () => {
          service.handleEscape(
            el,
            { focusOnEscape: true },
            ev as KeyboardEvent
          );
          expect(el.focus).not.toHaveBeenCalled();
        });

        it('should focus first focusable focusOnDoubleEscape = true', () => {
          service.handleEscape(
            el,
            { focusOnEscape: true, focusOnDoubleEscape: true },
            ev as KeyboardEvent
          );
          expect(focusUtility.findFirstFocusable).toHaveBeenCalled();
        });

        it('should not focus first focusable focusOnDoubleEscape = false', () => {
          service.handleEscape(
            el,
            { focusOnEscape: true, focusOnDoubleEscape: false },
            ev as KeyboardEvent
          );
          expect(focusUtility.findFirstFocusable).not.toHaveBeenCalled();
        });
      });
    });

    describe('focusOnEscape = false', () => {
      it('should not focus host', () => {
        service.handleEscape(el, { focusOnEscape: false }, ev as KeyboardEvent);
        expect(el.focus).not.toHaveBeenCalled();
      });

      it('should not stop event bubbling', () => {
        service.handleEscape(el, { focusOnEscape: false }, ev as KeyboardEvent);
        expect(ev.preventDefault).not.toHaveBeenCalled();
        expect(ev.stopPropagation).not.toHaveBeenCalled();
      });
    });
  });
});
