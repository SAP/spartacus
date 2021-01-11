import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SelectFocusUtility } from '../services';
import { TabFocusService } from './tab-focus.service';

@Component({
  template: `
    <div id="a">
      <button id="a1"></button>
      <button id="a2"></button>
      <button id="a3"></button>
      <button id="a4"></button>
      <button id="a5"></button>
    </div>
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
  findFocusable() {}
}

describe('TabFocusService', () => {
  let service: TabFocusService;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MockComponent],
        providers: [
          TabFocusService,
          {
            provide: SelectFocusUtility,
            useClass: MockSelectFocusUtility,
          },
        ],
      }).compileComponents();

      service = TestBed.inject(TabFocusService);
      fixture = TestBed.createComponent(MockComponent);
    })
  );

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  const event = {
    preventDefault: () => {},
    stopPropagation: () => {},
  };

  it('should prevent bubbling', () => {
    spyOn(event, 'preventDefault');
    spyOn(event, 'stopPropagation');
    service.moveTab(null, { tab: true }, 1, event as KeyboardEvent);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  describe('tab right', () => {
    it('should focus 2nd child if no child has been selected before', () => {
      const children = fixture.debugElement.queryAll(By.css('#a button'));
      spyOn(service, 'findFocusable').and.returnValue(
        children.map((c) => c.nativeElement)
      );

      const host = fixture.debugElement.query(By.css('#a')).nativeElement;
      const el = fixture.debugElement.query(By.css('#a2')).nativeElement;

      spyOn(el, 'focus').and.callThrough();
      service.moveTab(host, { tab: true }, 1, event as KeyboardEvent);

      expect(el.focus).toHaveBeenCalled();
    });

    it('should focus item next to active child', () => {
      const children = fixture.debugElement.queryAll(By.css('#a button'));
      spyOn(service, 'findFocusable').and.returnValue(
        children.map((c) => c.nativeElement)
      );

      const host = fixture.debugElement.query(By.css('#a')).nativeElement;
      const current = fixture.debugElement.query(By.css('#a3')).nativeElement;
      const next = fixture.debugElement.query(By.css('#a4')).nativeElement;

      current.focus();
      fixture.detectChanges();

      spyOn(next, 'focus').and.callThrough();
      service.moveTab(host, { tab: true }, 1, event as KeyboardEvent);

      expect(next.focus).toHaveBeenCalled();
    });

    it('should focus item next to persisted child', () => {
      const children = fixture.debugElement.queryAll(By.css('#b button'));
      spyOn(service, 'findFocusable').and.returnValue(
        children.map((c) => c.nativeElement)
      );

      const host = fixture.debugElement.query(By.css('#b')).nativeElement;
      const next = fixture.debugElement.query(By.css('#b4')).nativeElement;

      fixture.detectChanges();
      service.set('b3');

      spyOn(next, 'focus').and.callThrough();
      service.moveTab(host, { tab: true }, 1, event as KeyboardEvent);

      expect(next.focus).toHaveBeenCalled();
    });

    it('should keep last item focused', () => {
      const children = fixture.debugElement.queryAll(By.css('#a button'));
      spyOn(service, 'findFocusable').and.returnValue(
        children.map((c) => c.nativeElement)
      );

      const host = fixture.debugElement.query(By.css('#a')).nativeElement;
      const last = fixture.debugElement.query(By.css('#a5')).nativeElement;
      last.focus();
      fixture.detectChanges();

      spyOn(last, 'focus').and.callThrough();
      service.moveTab(host, { tab: true }, 1, event as KeyboardEvent);

      expect(last.focus).toHaveBeenCalled();
    });
  });

  describe('tab left', () => {
    it('should keep first item focused', () => {
      const children = fixture.debugElement.queryAll(By.css('#a button'));
      spyOn(service, 'findFocusable').and.returnValue(
        children.map((c) => c.nativeElement)
      );

      const host = fixture.debugElement.query(By.css('#a')).nativeElement;
      const last = fixture.debugElement.query(By.css('#a1')).nativeElement;
      last.focus();
      fixture.detectChanges();

      spyOn(last, 'focus').and.callThrough();
      service.moveTab(host, { tab: true }, -1, event as KeyboardEvent);

      expect(last.focus).toHaveBeenCalled();
    });

    it('should focus item next to active child', () => {
      const children = fixture.debugElement.queryAll(By.css('#a button'));
      spyOn(service, 'findFocusable').and.returnValue(
        children.map((c) => c.nativeElement)
      );

      const host = fixture.debugElement.query(By.css('#a')).nativeElement;
      const current = fixture.debugElement.query(By.css('#a3')).nativeElement;
      const next = fixture.debugElement.query(By.css('#a2')).nativeElement;

      current.focus();
      fixture.detectChanges();

      spyOn(next, 'focus').and.callThrough();
      service.moveTab(host, { tab: true }, -1, event as KeyboardEvent);

      expect(next.focus).toHaveBeenCalled();
    });

    it('should focus item next to persisted child', () => {
      const children = fixture.debugElement.queryAll(By.css('#b button'));
      spyOn(service, 'findFocusable').and.returnValue(
        children.map((c) => c.nativeElement)
      );

      const host = fixture.debugElement.query(By.css('#b')).nativeElement;
      const next = fixture.debugElement.query(By.css('#b2')).nativeElement;

      fixture.detectChanges();
      service.set('b3');

      spyOn(next, 'focus').and.callThrough();
      service.moveTab(host, { tab: true }, -1, event as KeyboardEvent);

      expect(next.focus).toHaveBeenCalled();
    });
  });
});
