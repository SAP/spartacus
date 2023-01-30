import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DirectionMode, DirectionService } from '../../direction';

import { TabListDirective } from './tab-list.directive';
import { TabDirective } from './tab.directive';

describe('TabListDirective', () => {
  @Component({
    selector: 'cx-test-component',
    template: `
      <div
        cxTabList
        [selectedIndex]="selectedIndex"
        (changeTab)="changeTabSpy.push($event)"
      >
        <div cxTab>Foo</div>
        <div cxTab>Bar</div>
        <div cxTab>Baz</div>
      </div>
    `,
  })
  class TestComponent {
    @ViewChild(TabListDirective, { read: ElementRef })
    tabListElement: ElementRef<HTMLElement>;

    @ViewChild(TabListDirective)
    tabListDirective: TabListDirective;

    @Input()
    selectedIndex: number;

    changeTabSpy: Array<number> = [];
  }

  class MockDirectionService {
    getDirection(): DirectionMode {
      return DirectionMode.LTR;
    }
  }

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TabListDirective, TabDirective, TestComponent],
        providers: [
          { provide: DirectionService, useClass: MockDirectionService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    component.selectedIndex = 0;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('for RTL', () => {
    beforeEach(() => {
      const directionService = TestBed.inject(DirectionService);
      spyOn(directionService, 'getDirection').and.returnValue(
        DirectionMode.RTL
      );
    });

    it('should increment when receiving an arrow-left keydown', (done) => {
      component.tabListDirective.changeTab.subscribe((value) => {
        expect(value).toBe(1);
        done();
      });

      component.tabListElement.nativeElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'arrowleft' })
      );

      component.tabListElement.nativeElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'enter' })
      );
    });

    it('should decrement when receiving an arrow-left keydown', (done) => {
      component.tabListDirective.changeTab.subscribe((value) => {
        expect(value).toBe(2);
        done();
      });

      component.tabListElement.nativeElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'arrowright' })
      );

      component.tabListElement.nativeElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'enter' })
      );
    });
  });

  describe('for LTR', () => {
    beforeEach(() => {
      const directionService = TestBed.inject(DirectionService);
      spyOn(directionService, 'getDirection').and.returnValue(
        DirectionMode.LTR
      );
    });

    it('should decrement when receiving an arrow-left keydown', (done) => {
      component.tabListDirective.changeTab.subscribe((value) => {
        expect(value).toBe(2);
        done();
      });

      component.tabListElement.nativeElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'arrowleft' })
      );

      component.tabListElement.nativeElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'enter' })
      );
    });

    it('should increment when receiving an arrow-left keydown', (done) => {
      component.tabListDirective.changeTab.subscribe((value) => {
        expect(value).toBe(1);
        done();
      });

      component.tabListElement.nativeElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'arrowright' })
      );

      component.tabListElement.nativeElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'enter' })
      );
    });
  });

  it('should set selected index', () => {
    component.selectedIndex = 1;

    fixture.detectChanges();

    const tabs = fixture.debugElement.queryAll(By.css('[cxTab]'));

    expect(tabs[0].attributes['aria-selected']).toBe('false');
    expect(tabs[0].attributes['tabindex']).toBe('-1');

    expect(tabs[1].attributes['aria-selected']).toBe('true');
    expect(tabs[1].attributes['tabindex']).toBe('0');

    expect(tabs[2].attributes['aria-selected']).toBe('false');
    expect(tabs[2].attributes['tabindex']).toBe('-1');
  });

  it('should go to the beginning of the list when HOME is pressed', (done) => {
    component.tabListDirective.changeTab.subscribe((value) => {
      expect(value).toBe(0);
      done();
    });

    component.tabListElement.nativeElement.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'home' })
    );

    component.tabListElement.nativeElement.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'enter' })
    );
  });

  it('should go to the end of the list when END is pressed', (done) => {
    component.tabListDirective.changeTab.subscribe((value) => {
      expect(value).toBe(2);
      done();
    });

    component.tabListElement.nativeElement.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'end' })
    );

    component.tabListElement.nativeElement.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'enter' })
    );
  });
});
