import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MOVE_FOCUS, TrapFocus } from '../keyboard-focus.model';
import { SelectFocusUtility } from '../services';
import { TrapFocusService } from './trap-focus.service';

@Component({
  template: `
    <div id="a"></div>
    <div id="b">
      <button id="b1"></button>
      <button id="b2"></button>
      <button id="b3" data-cx-focus="b3"></button>
      <button id="b4"></button>
      <button id="b5"></button>
    </div>
    <div id="c"></div>
  `,
})
class MockComponent {}

class MockSelectFocusUtility {
  findFirstFocusable() {}
  findFocusable() {
    return [];
  }
}

describe('TrapFocusService', () => {
  let service: TrapFocusService;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent],
      providers: [
        TrapFocusService,
        {
          provide: SelectFocusUtility,
          useClass: MockSelectFocusUtility,
        },
      ],
    }).compileComponents();

    service = TestBed.inject(TrapFocusService);
    fixture = TestBed.createComponent(MockComponent);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('hasFocusableChildren', () => {
    it('should return false when there are no children', () => {
      const host = fixture.debugElement.query(By.css('#a')).nativeElement;
      expect(service.hasFocusableChildren(host)).toBeFalsy();
    });

    it('should return true when there are children', () => {
      const host = fixture.debugElement.query(By.css('#b')).nativeElement;
      const children = fixture.debugElement.queryAll(By.css('#b > *'));
      spyOn(service, 'findFocusable').and.returnValue(
        children.map((c) => c.nativeElement)
      );
      expect(service.hasFocusableChildren(host)).toBeTruthy();
    });
  });

  describe('moveFocus', () => {
    const event = {
      preventDefault: () => {},
      stopPropagation: () => {},
    };
    let host;
    let children;

    beforeEach(() => {
      host = fixture.debugElement.query(By.css('#b')).nativeElement;
      children = fixture.debugElement.queryAll(By.css('#b > *'));
      spyOn(service, 'findFocusable').and.returnValue(
        children.map((c) => c.nativeElement)
      );
    });

    it('should stop bubbling event', () => {
      spyOn(event, 'preventDefault');
      spyOn(event, 'stopPropagation');
      service.moveFocus(host, { trap: true }, 1, event as KeyboardEvent);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    });

    describe('trap next', () => {
      it('should focus next element', () => {
        const current = fixture.debugElement.query(By.css('#b1')).nativeElement;
        const next = fixture.debugElement.query(By.css('#b2')).nativeElement;
        spyOn(next, 'focus').and.callThrough();

        (event as any).target = current;
        service.moveFocus(
          host,
          { trap: true },
          MOVE_FOCUS.NEXT,
          event as KeyboardEvent
        );
        expect(next.focus).toHaveBeenCalled();
      });

      describe('trap focus on last element', () => {
        let last;
        let next;

        beforeEach(() => {
          last = fixture.debugElement.query(By.css('#b5')).nativeElement;
          next = fixture.debugElement.query(By.css('#b1')).nativeElement;
          spyOn(next, 'focus').and.callThrough();
          (event as any).target = last;
        });

        it('should focus if trap = true', () => {
          service.moveFocus(
            host,
            { trap: true },
            MOVE_FOCUS.NEXT,
            event as KeyboardEvent
          );
          expect(next.focus).toHaveBeenCalled();
        });

        it(`should focus if trap = 'end'`, () => {
          service.moveFocus(
            host,
            { trap: TrapFocus.end },
            MOVE_FOCUS.NEXT,
            event as KeyboardEvent
          );
          expect(next.focus).toHaveBeenCalled();
        });

        it('should not focus if trap = false', () => {
          service.moveFocus(
            host,
            { trap: false },
            MOVE_FOCUS.NEXT,
            event as KeyboardEvent
          );
          expect(next.focus).not.toHaveBeenCalled();
        });

        it(`should not focus if trap = 'start'`, () => {
          service.moveFocus(
            host,
            { trap: TrapFocus.start },
            MOVE_FOCUS.NEXT,
            event as KeyboardEvent
          );
          expect(next.focus).not.toHaveBeenCalled();
        });

        it(`should not focus if trap = undefined`, () => {
          service.moveFocus(host, {}, MOVE_FOCUS.NEXT, event as KeyboardEvent);
          expect(next.focus).not.toHaveBeenCalled();
        });

        it(`should not stop bubbling on last element if trap = 'start'`, () => {
          spyOn(event, 'preventDefault');
          spyOn(event, 'stopPropagation');

          service.moveFocus(
            host,
            { trap: TrapFocus.start },
            MOVE_FOCUS.NEXT,
            event as KeyboardEvent
          );

          expect(event.preventDefault).not.toHaveBeenCalled();
          expect(event.stopPropagation).not.toHaveBeenCalled();
        });
      });
    });

    describe('trap prev', () => {
      it('should focus prev element', () => {
        const current = fixture.debugElement.query(By.css('#b3')).nativeElement;
        const prev = fixture.debugElement.query(By.css('#b2')).nativeElement;
        spyOn(prev, 'focus').and.callThrough();

        (event as any).target = current;
        service.moveFocus(
          host,
          { trap: true },
          MOVE_FOCUS.PREV,
          event as KeyboardEvent
        );
        expect(prev.focus).toHaveBeenCalled();
      });

      it('should focus prev element', () => {
        const current = fixture.debugElement.query(By.css('#b3')).nativeElement;
        const prev = fixture.debugElement.query(By.css('#b2')).nativeElement;
        spyOn(prev, 'focus').and.callThrough();

        (event as any).target = current;
        service.moveFocus(
          host,
          { trap: TrapFocus.start },
          MOVE_FOCUS.PREV,
          event as KeyboardEvent
        );
        expect(prev.focus).toHaveBeenCalled();
      });

      describe('trap focus on first element', () => {
        let current;
        let next;

        beforeEach(() => {
          current = fixture.debugElement.query(By.css('#b1')).nativeElement;
          next = fixture.debugElement.query(By.css('#b5')).nativeElement;
          spyOn(next, 'focus').and.callThrough();
          (event as any).target = current;
        });

        it('should focus if trap = true', () => {
          service.moveFocus(
            host,
            { trap: true },
            MOVE_FOCUS.PREV,
            event as KeyboardEvent
          );
          expect(next.focus).toHaveBeenCalled();
        });

        it(`should not focus if trap = false`, () => {
          service.moveFocus(
            host,
            { trap: false },
            MOVE_FOCUS.PREV,
            event as KeyboardEvent
          );
          expect(next.focus).not.toHaveBeenCalled();
        });

        it(`should not focus if trap = 'end'`, () => {
          service.moveFocus(
            host,
            { trap: TrapFocus.end },
            MOVE_FOCUS.PREV,
            event as KeyboardEvent
          );
          expect(next.focus).not.toHaveBeenCalled();
        });

        it(`should not focus if trap = undefined`, () => {
          service.moveFocus(host, {}, MOVE_FOCUS.NEXT, event as KeyboardEvent);
          expect(next.focus).not.toHaveBeenCalled();
        });

        it(`should not stop bubbling on last element if trap = 'end'`, () => {
          spyOn(event, 'preventDefault');
          spyOn(event, 'stopPropagation');

          service.moveFocus(
            host,
            { trap: TrapFocus.end },
            MOVE_FOCUS.PREV,
            event as KeyboardEvent
          );

          expect(event.preventDefault).not.toHaveBeenCalled();
          expect(event.stopPropagation).not.toHaveBeenCalled();
        });
      });
    });
  });
});
