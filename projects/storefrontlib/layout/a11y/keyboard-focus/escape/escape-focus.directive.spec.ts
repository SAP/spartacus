import { Component, Directive, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EscapeFocusConfig } from '../keyboard-focus.model';
import { EscapeFocusDirective } from './escape-focus.directive';
import { EscapeFocusService } from './escape-focus.service';

@Directive({
  selector: '[cxEscFocus]',
})
class CustomFocusDirective extends EscapeFocusDirective {
  @Input('cxEscFocus') protected config: EscapeFocusConfig;
}
@Component({
  selector: 'cx-host',
  template: `
    <div id="a" cxEscFocus (esc)="handleEmit($event)"></div>
    <div
      id="b"
      [cxEscFocus]="{ focusOnEscape: true }"
      (esc)="handleEmit($event)"
    ></div>
    <div
      id="c"
      [cxEscFocus]="{ focusOnEscape: false }"
      (esc)="handleEmit($event)"
    ></div>

    <div id="d">
      <div
        id="d-1"
        [cxEscFocus]="{ focusOnEscape: true }"
        (esc)="handleEmit($event)"
        tabindex="0"
      >
        <div
          id="d-1-1"
          [cxEscFocus]="{ focusOnEscape: true }"
          (esc)="handleEmit($event)"
        ></div>
      </div>
    </div>
  `,
})
class MockComponent {
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-match
  handleEmit(_event: boolean): void {}
}

class MockEscapeFocusService {
  handleEscape(_host, _config, _event): void {}

  shouldFocus(config: EscapeFocusConfig): boolean {
    return !!config?.focusOnEscape;
  }
}

describe('EscapeFocusDirective', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;
  let service: EscapeFocusService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MockComponent, CustomFocusDirective],
        providers: [
          {
            provide: EscapeFocusService,
            useClass: MockEscapeFocusService,
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(MockComponent);
      component = fixture.componentInstance;
      service = TestBed.inject(EscapeFocusService);

      spyOn(service, 'shouldFocus').and.callThrough();
      spyOn(service, 'handleEscape').and.callThrough();

      spyOn(component, 'handleEmit');

      fixture.detectChanges();
    })
  );

  describe('config', () => {
    it('should use focusOnEscape by default', () => {
      const el = fixture.debugElement.query(By.css('#a'));
      el.triggerEventHandler('keydown.escape', {});
      expect(service.shouldFocus).toHaveBeenCalledWith({ focusOnEscape: true });
    });

    it('should use focusOnEscape per configuration', () => {
      const el = fixture.debugElement.query(By.css('#b'));
      el.triggerEventHandler('keydown.escape', {});
      expect(service.shouldFocus).toHaveBeenCalledWith({ focusOnEscape: true });
    });

    it('should use focusOnEscape: false per configuration', () => {
      const el = fixture.debugElement.query(By.css('#c'));
      el.triggerEventHandler('keydown.escape', {});
      expect(service.shouldFocus).toHaveBeenCalledWith({
        focusOnEscape: false,
      });
    });
  });

  describe('focus on escape', () => {
    it('should delegate handling to service ', () => {
      const el = fixture.debugElement.query(By.css('#a'));
      const mockEvent = {};
      el.triggerEventHandler('keydown.escape', mockEvent);
      expect(service.handleEscape).toHaveBeenCalledWith(
        el.nativeElement,
        { focusOnEscape: true },
        mockEvent as KeyboardEvent
      );
    });

    it('should add tabindex -1 to host if no tabindex is available', () => {
      const el: HTMLElement = fixture.debugElement.query(
        By.css('#b')
      ).nativeElement;
      expect(el.getAttribute('tabindex')).toEqual('-1');
    });

    it('should not add tabindex -1 to host if tabindex is already set', () => {
      const el: HTMLElement = fixture.debugElement.query(
        By.css('#d-1')
      ).nativeElement;
      expect(el.getAttribute('tabindex')).not.toEqual('-1');
    });
  });

  describe('emit', () => {
    it('should emit true on escape', () => {
      const el = fixture.debugElement.query(By.css('#a'));
      el.triggerEventHandler('keydown.escape', {});
      expect(component.handleEmit).toHaveBeenCalledWith(true);
    });

    it('should emit false on escape', () => {
      const el = fixture.debugElement.query(By.css('#c'));
      el.triggerEventHandler('keydown.escape', {});
      expect(component.handleEmit).toHaveBeenCalledWith(false);
    });

    it('should not emit on escape', () => {
      const el = fixture.debugElement.query(By.css('#d'));
      el.triggerEventHandler('keydown.escape', {});
      expect(component.handleEmit).not.toHaveBeenCalled();
    });

    describe('Emit escape on nested elements', () => {
      it('should only emit once on nested elements', () => {
        const d11 = fixture.debugElement.query(By.css('#d-1-1'));
        d11.triggerEventHandler('keydown.escape', {});
        expect(component.handleEmit).toHaveBeenCalledTimes(1);
      });
    });
  });
});
