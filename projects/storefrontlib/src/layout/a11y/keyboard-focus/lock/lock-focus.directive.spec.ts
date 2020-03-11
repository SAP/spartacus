import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LockFocusConfig } from '../keyboard-focus.model';
import { LockFocusDirective } from './lock-focus.directive';
import { LockFocusService } from './lock-focus.service';

@Component({
  selector: 'cx-host',
  template: `
    <div cxLockFocus id="a">
      <button id="a1"></button>
      <a href="" id="a2"></a>
    </div>
    <div [cxLockFocus]="{ lock: true, group: 'g1' }" id="b" tabindex="-1">
      <button id="b1"></button>
      <a href="" id="b2"></a>
      <textarea id="b3"></textarea>
      <a id="b4"></a>
      <p id="b5"></p>
    </div>
    <div [cxLockFocus]="{ lock: false }" id="c" tabindex="5">
      <button id="c1"></button>
      <a href="" id="c2"></a>
    </div>
    <div
      [cxLockFocus]="{ lock: true, focusOnEscape: false, autofocus: false }"
      id="d"
    >
      <button id="d1"></button>
      <a href="" id="d2" data-cx-focus="d2"></a>
    </div>
  `,
})
class MockComponent {}

class MockLockFocusService {
  hasFocusableChildren() {
    return true;
  }
  findFocusable() {}
  focusable() {}
  findFirstFocusable() {}

  hasPersistedFocus() {
    return false;
  }
  getPersistenceGroup() {
    return undefined;
  }
  handleEscape() {}
  shouldFocus(config: LockFocusConfig) {
    return !!config.focusOnEscape;
  }
}

describe('LockFocusDirective', () => {
  let fixture: ComponentFixture<MockComponent>;
  let service: LockFocusService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent, LockFocusDirective],
      providers: [
        {
          provide: LockFocusService,
          useClass: MockLockFocusService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MockComponent);
    service = TestBed.inject(LockFocusService);
  }));

  beforeEach(() => {
    const children = fixture.debugElement.queryAll(
      By.css('#a1,#a2,#b1,#b2,#b3,#d1,#d2')
    );
    spyOn(service, 'findFocusable').and.returnValue(
      children.map(c => c.nativeElement)
    );
  });

  const event = {
    preventDefault: () => {},
    stopPropagation: () => {},
  };

  describe('configuration', () => {
    beforeEach(() => {
      spyOn(event, 'preventDefault');
      spyOn(service, 'hasFocusableChildren').and.returnValue(false);
      fixture.detectChanges();
    });

    it('should unlock with default configuration', () => {
      const host = fixture.debugElement.query(By.css('#a'));
      host.triggerEventHandler('keydown.enter', event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should unlock when lock=true', () => {
      const host = fixture.debugElement.query(By.css('#b'));
      host.triggerEventHandler('keydown.enter', event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not unlock when lock=false', () => {
      const host = fixture.debugElement.query(By.css('#c'));
      host.triggerEventHandler('keydown.enter', event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('make host focusable', () => {
    it('should add tabindex=0 to host element', () => {
      const host: HTMLElement = fixture.debugElement.query(By.css('#a'))
        .nativeElement;
      fixture.detectChanges();
      expect(host.getAttribute('tabindex')).toEqual('0');
    });

    it('should replace tabindex -1 by 0 on host element', () => {
      const host: HTMLElement = fixture.debugElement.query(By.css('#b'))
        .nativeElement;
      fixture.detectChanges();
      expect(host.getAttribute('tabindex')).toEqual('0');
    });

    it('should not replace tabindex 5 by 0 on host element', () => {
      const host: HTMLElement = fixture.debugElement.query(By.css('#c'))
        .nativeElement;
      fixture.detectChanges();
      expect(host.getAttribute('tabindex')).not.toEqual('0');
      expect(host.getAttribute('tabindex')).toEqual('5');
    });
  });

  describe('lock focusable children', () => {
    it('should lock child elements', () => {
      const b1 = fixture.debugElement.query(By.css('#b1')).nativeElement;
      const b2 = fixture.debugElement.query(By.css('#b2')).nativeElement;
      const b3 = fixture.debugElement.query(By.css('#b3')).nativeElement;
      fixture.detectChanges();
      expect(b1.getAttribute('tabindex')).toEqual('-1');
      expect(b2.getAttribute('tabindex')).toEqual('-1');
      expect(b3.getAttribute('tabindex')).toEqual('-1');
    });

    it('should not lock non-focusable', () => {
      const b4 = fixture.debugElement.query(By.css('#b4')).nativeElement;
      const b5 = fixture.debugElement.query(By.css('#b5')).nativeElement;
      fixture.detectChanges();
      expect(b4.getAttribute('tabindex')).toBeFalsy();
      expect(b5.getAttribute('tabindex')).toBeFalsy();
    });

    it('should not lock if lock=false', () => {
      const c1 = fixture.debugElement.query(By.css('#c1')).nativeElement;
      const c2 = fixture.debugElement.query(By.css('#c2')).nativeElement;
      fixture.detectChanges();
      expect(c1.getAttribute('tabindex')).toBeFalsy();
      expect(c2.getAttribute('tabindex')).toBeFalsy();
    });

    it('should not lock if child has persisted ...', () => {
      spyOn(service, 'hasPersistedFocus').and.returnValue(true);
      const d1 = fixture.debugElement.query(By.css('#d1')).nativeElement;
      const d2 = fixture.debugElement.query(By.css('#d2')).nativeElement;
      fixture.detectChanges();
      expect(d1.getAttribute('tabindex')).not.toEqual('-1');
      expect(d2.getAttribute('tabindex')).not.toEqual('-1');
    });
  });

  describe('unlock group', () => {
    beforeEach(() => {
      spyOn(service, 'hasFocusableChildren').and.returnValue(false);
      fixture.detectChanges();
    });

    it('should unlock focusable children', () => {
      const b1 = fixture.debugElement.query(By.css('#b1')).nativeElement;
      const b2 = fixture.debugElement.query(By.css('#b2')).nativeElement;
      const b3 = fixture.debugElement.query(By.css('#b3')).nativeElement;
      const host = fixture.debugElement.query(By.css('#b'));
      host.triggerEventHandler('keydown.enter', event);

      expect(b1.getAttribute('tabindex')).toEqual('0');
      expect(b2.getAttribute('tabindex')).toEqual('0');
      expect(b3.getAttribute('tabindex')).toEqual('0');
    });

    it('should not unlock non-focusable children', () => {
      const b4 = fixture.debugElement.query(By.css('#b4')).nativeElement;
      const b5 = fixture.debugElement.query(By.css('#b5')).nativeElement;
      const host = fixture.debugElement.query(By.css('#b'));
      host.triggerEventHandler('keydown.enter', event);

      expect(b4.hasAttribute('tabindex')).toBeFalsy();
      expect(b5.hasAttribute('tabindex')).toBeFalsy();
    });
  });

  describe('persist group on focusable children', () => {
    it('should persist group on focusable children', () => {
      spyOn(service, 'getPersistenceGroup').and.returnValue('g1');
      const b1 = fixture.debugElement.query(By.css('#b1')).nativeElement;
      const b2 = fixture.debugElement.query(By.css('#b2')).nativeElement;
      const b3 = fixture.debugElement.query(By.css('#b3')).nativeElement;
      fixture.detectChanges();
      expect(b1.getAttribute('data-cx-focus-group')).toEqual('g1');
      expect(b2.getAttribute('data-cx-focus-group')).toEqual('g1');
      expect(b3.getAttribute('data-cx-focus-group')).toEqual('g1');
    });

    it('should not persist group on non-focusable children', () => {
      spyOn(service, 'getPersistenceGroup').and.returnValue('g1');
      const b4 = fixture.debugElement.query(By.css('#b4')).nativeElement;
      const b5 = fixture.debugElement.query(By.css('#b5')).nativeElement;
      fixture.detectChanges();
      expect(b4.hasAttribute('data-cx-focus-group')).toBeFalsy();
      expect(b5.hasAttribute('data-cx-focus-group')).toBeFalsy();
    });
  });

  describe('select host element on escape', () => {
    it('should focus on escape by default', () => {
      const host = fixture.debugElement.query(By.css('#a'));
      spyOn(service, 'handleEscape');
      fixture.detectChanges();
      host.triggerEventHandler('keydown.escape', event);
      expect(service.handleEscape).toHaveBeenCalledTimes(1);
    });

    it('should focus on escape if lock=true', () => {
      const host = fixture.debugElement.query(By.css('#b'));
      spyOn(service, 'handleEscape');
      fixture.detectChanges();
      host.triggerEventHandler('keydown.escape', event);
      expect(service.handleEscape).toHaveBeenCalledTimes(1);
    });

    it('should not focus on escape if lock=false', () => {
      const host = fixture.debugElement.query(By.css('#c'));
      spyOn(service, 'handleEscape').and.callThrough();
      fixture.detectChanges();
      host.triggerEventHandler('keydown.escape', event);
      expect(service.handleEscape).not.toHaveBeenCalled();
    });

    it('should focus on escape if configured to false', () => {
      const host = fixture.debugElement.query(By.css('#d'));
      spyOn(service, 'handleEscape').and.callThrough();
      fixture.detectChanges();
      host.triggerEventHandler('keydown.escape', event);
      expect(service.handleEscape).not.toHaveBeenCalled();
    });
  });

  describe('use autofocus', () => {
    beforeEach(() => {
      spyOn(service, 'hasFocusableChildren').and.returnValue(false);
      fixture.detectChanges();
    });

    it('should autofocus by default', () => {
      const host = fixture.debugElement.query(By.css('#a'));
      const f1 = fixture.debugElement.query(By.css('#a1')).nativeElement;
      const f2 = fixture.debugElement.query(By.css('#a2')).nativeElement;

      spyOn(service, 'findFirstFocusable').and.returnValue(f1);
      spyOn(f1, 'focus').and.callThrough();
      spyOn(f2, 'focus').and.callThrough();

      host.triggerEventHandler('keydown.enter', event);
      host.triggerEventHandler('focus', event);

      expect(f1.focus).toHaveBeenCalled();
      expect(f2.focus).not.toHaveBeenCalled();
    });

    it('should autofocus if lock=true', () => {
      const host = fixture.debugElement.query(By.css('#b'));
      const f1 = fixture.debugElement.query(By.css('#b1')).nativeElement;
      const f2 = fixture.debugElement.query(By.css('#b2')).nativeElement;

      spyOn(service, 'findFirstFocusable').and.returnValue(f1);
      spyOn(f1, 'focus').and.callThrough();
      spyOn(f2, 'focus').and.callThrough();

      host.triggerEventHandler('keydown.enter', event);
      host.triggerEventHandler('focus', event);

      expect(f1.focus).toHaveBeenCalled();
      expect(f2.focus).not.toHaveBeenCalled();
    });

    it('should not autofocus if lock=false', () => {
      const host = fixture.debugElement.query(By.css('#c'));
      const f1 = fixture.debugElement.query(By.css('#c1')).nativeElement;
      const f2 = fixture.debugElement.query(By.css('#c2')).nativeElement;

      spyOn(service, 'findFirstFocusable').and.returnValue(f1);
      spyOn(f1, 'focus').and.callThrough();
      spyOn(f2, 'focus').and.callThrough();

      host.triggerEventHandler('keydown.enter', event);
      host.triggerEventHandler('focus', event);

      expect(f1.focus).not.toHaveBeenCalled();
      expect(f2.focus).not.toHaveBeenCalled();
    });

    it('should not autofocus if autofocus=false', () => {
      const host = fixture.debugElement.query(By.css('#d'));
      const f1 = fixture.debugElement.query(By.css('#d1')).nativeElement;
      const f2 = fixture.debugElement.query(By.css('#d2')).nativeElement;

      spyOn(service, 'findFirstFocusable').and.returnValue(f1);
      spyOn(f1, 'focus').and.callThrough();
      spyOn(f2, 'focus').and.callThrough();

      host.triggerEventHandler('keydown.enter', event);
      host.triggerEventHandler('focus', event);

      expect(f1.focus).not.toHaveBeenCalled();
      expect(f2.focus).not.toHaveBeenCalled();
    });
  });
});
