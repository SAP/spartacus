import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Tab, TAB_MODE } from '../tab.model';
import { TabPanelComponent } from './tab-panel.component';
import { KeyboardFocusTestingModule } from '@spartacus/storefront';

const mockTab: Tab | any = {
  id: 1,
};

@Component({
  template: `<ng-template #templateRef
    ><span id="tempRef">hello</span></ng-template
  >`,
  standalone: false,
})
class MockComponent {
  @ViewChild('templateRef') templateRef: TemplateRef<any>;
}

describe('TabPanelComponent', () => {
  let component: TabPanelComponent;
  let fixture: ComponentFixture<TabPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [KeyboardFocusTestingModule],
      declarations: [TabPanelComponent, MockComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
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

  it('should have correct attribues when disableBorderFocus is active', () => {
    component.tab = {
      ...mockTab,
      disableBorderFocus: true,
    };
    fixture.detectChanges();

    const tabPanel = document.querySelector('div[role="tabpanel"]');
    expect(tabPanel?.getAttribute('tabindex')).toEqual('-1');
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
