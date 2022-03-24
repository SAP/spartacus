import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import {
  WindowRef,
  CmsScrollToTopComponent,
  ScrollBehavior,
} from '@spartacus/core';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { ScrollToTopComponent } from './scroll-to-top.component';
import { IconTestingModule } from '../../misc/icon/testing/icon-testing.module';
import { of } from 'rxjs';

@Component({
  template: `
    <div style="height: 2000px;">
      <h1>Test page</h1>
      <cx-scroll-to-top></cx-scroll-to-top>
    </div>
  `,
})
class MockComponent {}

class MockWinRef {
  nativeWindow = window;
}

const mockData: CmsScrollToTopComponent = {
  scrollBehavior: ScrollBehavior.SMOOTH,
  displayThreshold: 100,
};

const MockCmsComponentData = <CmsComponentData<any>>{
  data$: of(mockData),
};

describe('ScrollToTopComponent', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;
  let winRef: WindowRef;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IconTestingModule],
      declarations: [MockComponent, ScrollToTopComponent],
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData,
        },
        { provide: WindowRef, useClass: MockWinRef },
      ],
    }).compileComponents();

    winRef = TestBed.inject(WindowRef);
    fixture = TestBed.createComponent(MockComponent);

    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be displayed at top of page', () => {
    fixture.detectChanges();
    winRef.nativeWindow?.scrollTo(0, 0);
    fixture.detectChanges();
    const scrollComponent = el.query(By.css('.display'));
    expect(scrollComponent).toBeNull();
  });

  it('should be visible and scroll to top of page', () => {
    fixture.detectChanges();

    spyOn(window, 'scrollTo').and.callThrough();
    winRef.nativeWindow?.scrollTo(0, 200);
    winRef.nativeWindow?.dispatchEvent(new Event('scroll'));

    fixture.detectChanges();

    const scrollComponent = el.query(By.css('.display'));
    const scrollBtn = el.query(By.css('.scroll-to-top-btn')).nativeElement;

    expect(scrollComponent.nativeElement).toBeTruthy();
    expect(scrollBtn).toBeTruthy();

    scrollBtn.click();

    expect((window.scrollTo as jasmine.Spy).calls.allArgs()).toEqual([
      [0, 200],
      [{ top: 0, behavior: 'smooth' }],
    ]);
  });

  it('should focus top most focusable element of the page', () => {
    fixture.detectChanges();
    spyOn(window, 'scrollTo').and.callThrough();
    winRef.nativeWindow?.scrollTo(0, 200);
    winRef.nativeWindow?.dispatchEvent(new Event('scroll'));

    fixture.detectChanges();

    const scrollBtn = el.query(By.css('.scroll-to-top-btn')).nativeElement;
    scrollBtn.click();
  });
});
