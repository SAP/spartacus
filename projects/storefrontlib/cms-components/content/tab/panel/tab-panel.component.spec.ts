import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Tab, TAB_MODE } from '../tab.model';
import { TabPanelComponent } from './tab-panel.component';

const mockTab: Tab | any = {
  id: 1,
};

@Component({
  template: `<ng-template #templateRef
    ><span id="tempRef">hello</span></ng-template
  >`,
})
class MockComponent {
  @ViewChild('templateRef') templateRef: TemplateRef<any>;
}

describe('TabPanelComponent', () => {
  let component: TabPanelComponent;
  let fixture: ComponentFixture<TabPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TabPanelComponent, MockComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    console.log('Starting TabPanelComponent test');
    fixture = TestBed.createComponent(TabPanelComponent);
    component = fixture.componentInstance;
    component.tab = mockTab;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct attribues when is open in TAB mode', () => {
    const tabPanel = document.querySelector('div[role="tabpanel"]');
    expect(tabPanel?.getAttribute('id')).toEqual('section-1');
    expect(tabPanel?.getAttribute('tabindex')).toEqual('0');
    expect(tabPanel?.getAttribute('role')).toEqual('tabpanel');
    expect(tabPanel?.getAttribute('class')).toEqual('active');
    expect(tabPanel?.getAttribute('aria-labelledby')).toEqual('1');
  });

  it('should have correct attribues when is open in ACCORDIAN mode', () => {
    component.mode = TAB_MODE.ACCORDIAN;
    fixture.detectChanges();

    const tabPanel = document.querySelector('div[role="region"]');
    expect(tabPanel?.getAttribute('id')).toEqual('section-1');
    expect(tabPanel?.getAttribute('tabindex')).toEqual('0');
    expect(tabPanel?.getAttribute('role')).toEqual('region');
    expect(tabPanel?.getAttribute('class')).toEqual('active');
    expect(tabPanel?.getAttribute('aria-labelledby')).toEqual('1');
  });

  it('should display template ref', () => {
    const mockFixture = TestBed.createComponent(MockComponent);
    mockFixture.detectChanges();
    const templateRef = mockFixture.componentInstance.templateRef;

    fixture = TestBed.createComponent(TabPanelComponent);
    component = fixture.componentInstance;
    component.tab = {
      ...mockTab,
      content: templateRef,
    };
    fixture.detectChanges();

    const el = document.querySelector('span[id="tempRef"]');
    expect(el?.innerHTML).toEqual('hello');
  });
});
