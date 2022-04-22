import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SelectFocusUtility } from '../services';
import { AutoFocusService } from './auto-focus.service';

@Component({
  template: `
    <div id="a"></div>
    <div id="b">
      <button id="b1"></button>
      <button id="b2" data-cx-focus="b2"></button>
    </div>
    <div id="c" data-cx-focus-group="group-c">
      <button id="c1"></button>
      <button id="c2" data-cx-focus="c2"></button>
    </div>
    <div id="d">
      <button id="d1"></button>
      <button id="d2"></button>
    </div>
    <div id="e">
      <div id="e1"></div>
      <div id="e2"></div>
    </div>
  `,
})
class MockComponent {}

class MockSelectFocusUtility {
  findFirstFocusable() {}
}

describe('AutoFocusService', () => {
  let service: AutoFocusService;
  let focusUtility: SelectFocusUtility;

  let fixture: ComponentFixture<MockComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MockComponent],
        providers: [
          AutoFocusService,
          {
            provide: SelectFocusUtility,
            useClass: MockSelectFocusUtility,
          },
        ],
      }).compileComponents();

      service = TestBed.inject(AutoFocusService);
      focusUtility = TestBed.inject(SelectFocusUtility);

      fixture = TestBed.createComponent(MockComponent);
    })
  );

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('findFirstFocusable', () => {
    it('should find host element', () => {
      const host = fixture.debugElement.query(By.css('#a')).nativeElement;
      expect(service.findFirstFocusable(host, { autofocus: ':host' })).toEqual(
        host
      );
    });

    it('should find persisted element', () => {
      service.set('b2');
      const host = fixture.debugElement.query(By.css('#b')).nativeElement;
      const el = fixture.debugElement.query(By.css('#b2')).nativeElement;
      expect(service.findFirstFocusable(host, { autofocus: true })).toEqual(el);
    });

    it('should find persisted element by group', () => {
      service.set('c2', 'group-c');
      const host = fixture.debugElement.query(By.css('#c')).nativeElement;
      const el = fixture.debugElement.query(By.css('#c2')).nativeElement;
      expect(service.findFirstFocusable(host, { autofocus: true })).toEqual(el);
    });

    it('should find first focusable element from utility', () => {
      const host = fixture.debugElement.query(By.css('#d')).nativeElement;
      const el = fixture.debugElement.query(By.css('#d1')).nativeElement;
      spyOn(focusUtility, 'findFirstFocusable').and.returnValue(el);
      expect(service.findFirstFocusable(host, { autofocus: true })).toEqual(el);
    });

    it('should retun host element if no focusable childs are available', () => {
      const host = fixture.debugElement.query(By.css('#e')).nativeElement;
      spyOn(focusUtility, 'findFirstFocusable').and.returnValue(null);
      expect(service.findFirstFocusable(host, { autofocus: true })).toEqual(
        host
      );
    });
  });

  describe('hasPersistedFocus', () => {
    it('should not have persisted focus for host without children', () => {
      const host = fixture.debugElement.query(By.css('#a')).nativeElement;
      expect(service.hasPersistedFocus(host, {})).toEqual(false);
    });

    it('should have global persisted element', () => {
      service.set('b2');
      const host = fixture.debugElement.query(By.css('#b')).nativeElement;
      expect(service.hasPersistedFocus(host, {})).toEqual(true);
    });

    it('should have persisted element for configured group', () => {
      service.set('b2', 'group-b');
      const host = fixture.debugElement.query(By.css('#b')).nativeElement;
      expect(service.hasPersistedFocus(host, { group: 'group-b' })).toEqual(
        true
      );
    });

    it('should have persisted element for persisted group', () => {
      service.set('c2', 'group-c');
      const host = fixture.debugElement.query(By.css('#c')).nativeElement;
      expect(service.hasPersistedFocus(host, {})).toEqual(true);
    });
  });
});
