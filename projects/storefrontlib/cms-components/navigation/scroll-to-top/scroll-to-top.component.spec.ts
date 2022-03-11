import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { ScrollToTopComponent } from '@spartacus/storefront';

@Component({
  template: `
    <div style="height: 2000px;">
      <h1>Test page</h1>
      <cx-scroll-to-top></cx-scroll-to-top>
    </div>
  `,
})
class MockComponent {}

fdescribe('ScrollToTopComponent', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;
  let winRef: WindowRef;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent, ScrollToTopComponent],
    }).compileComponents();

    winRef = TestBed.inject(WindowRef);
    fixture = TestBed.createComponent(MockComponent);

    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be visible at top of page', () => {
    winRef.nativeWindow?.scrollTo(0, 0);
    fixture.detectChanges();
    expect(el.query(By.css('.scroll-to-top-btn'))).toBeNull();
  });

  it('should be visible scroll to top of page', fakeAsync(() => {
    winRef.nativeWindow?.scrollTo(0, 200);
    winRef.nativeWindow?.dispatchEvent(new Event('scroll'));

    fixture.detectChanges();
    const scrollBtn = el.query(By.css('.scroll-to-top-btn')).nativeElement;
    expect(el.query(By.css('.scroll-to-top-btn'))).toBeTruthy();

    scrollBtn.click();

    fixture.detectChanges();
    expect(winRef.nativeWindow?.scrollY).toEqual(0);
  }));
});
