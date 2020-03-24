import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SelectFocusUtility } from './select-focus.util';

@Component({
  template: `
    <div id="a">
      <button id="a1">focusable</button>
      <a href="" tabindex="-1">locked focus</a>
      <div tabindex="0">focusable</div>
      <a>not focusable</a>
      <p>not focusable</p>
    </div>
    <div id="b" tabindex="5">
      <button id="b1">focusable</button>
      <a href="" tabindex="-1" id="b2" autofocus>focusable</a>
      <button id="b3">focusable</button>
    </div>
    <div id="c">
      <button id="c1">focusable</button>
      <button id="c2" disabled>focusable</button>
    </div>
    <div id="d">
      <button id="d1">focusable</button>
      <button id="d2" hidden>focusable</button>
    </div>
  `,
})
class MockComponent {}

describe('SelectFocusUtility', () => {
  let service: SelectFocusUtility;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent],
      providers: [SelectFocusUtility],
    }).compileComponents();

    service = TestBed.inject(SelectFocusUtility);

    fixture = TestBed.createComponent(MockComponent);
  }));

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('findFocusable()', () => {
    it('should find focusable children', () => {
      const host = fixture.debugElement.query(By.css('#a')).nativeElement;
      expect(service.findFocusable(host).length).toEqual(2);
    });

    it('should find (locked) focusable children', () => {
      const host = fixture.debugElement.query(By.css('#a')).nativeElement;
      expect(service.findFocusable(host, true).length).toEqual(3);
    });

    it('should not find disabled children', () => {
      const host = fixture.debugElement.query(By.css('#c')).nativeElement;
      const button = fixture.debugElement.query(By.css('#c1')).nativeElement;
      expect(service.findFocusable(host).length).toEqual(1);
      expect(service.findFocusable(host)[0]).toEqual(button);
    });

    it('should not find hidden children', () => {
      const host = fixture.debugElement.query(By.css('#d')).nativeElement;
      const button = fixture.debugElement.query(By.css('#d1')).nativeElement;
      expect(service.findFocusable(host).length).toEqual(1);
      expect(service.findFocusable(host)[0]).toEqual(button);
    });
  });

  describe('findFirstFocusable()', () => {
    it('should find first focusable child', () => {
      const host = fixture.debugElement.query(By.css('#a')).nativeElement;
      const child = fixture.debugElement.query(By.css('#a1')).nativeElement;
      expect(service.findFirstFocusable(host)).toEqual(child);
    });

    it('should find autofocus child', () => {
      const host = fixture.debugElement.query(By.css('#b')).nativeElement;
      const child = fixture.debugElement.query(By.css('#b2')).nativeElement;
      expect(service.findFirstFocusable(host)).toEqual(child);
    });

    it('should find specific child', () => {
      const host = fixture.debugElement.query(By.css('#b')).nativeElement;
      const child = fixture.debugElement.query(By.css('#b3')).nativeElement;
      expect(
        service.findFirstFocusable(host, { autofocus: 'button:nth-of-type(2)' })
      ).toEqual(child);
    });
  });

  describe('query', () => {
    it('should return list based on selector', () => {
      const host = fixture.debugElement.query(By.css('#b')).nativeElement;
      const child = fixture.debugElement.query(By.css('#b3')).nativeElement;
      expect(service.query(host, 'button:nth-of-type(2)')).toEqual([child]);
    });

    it('should return empty list with falsy selector', () => {
      const host = fixture.debugElement.query(By.css('#b')).nativeElement;
      expect(service.query(host, null)).toEqual([]);
    });

    it('should return empty list with empty string selector', () => {
      const host = fixture.debugElement.query(By.css('#b')).nativeElement;
      expect(service.query(host, '')).toEqual([]);
    });
  });
});
