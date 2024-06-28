//import { TemplateRef } from '@angular/core';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Tab } from '../tab.model';
import { TabPanelComponent } from './tab-panel.component';

const mockTab: Tab = {
  id: 'test',
};

@Component({
  template: `<ng-template #templateRef
    ><span id="tempRef">hello</span></ng-template
  >`,
})
class MockComponent {
  @ViewChild('templateRef') templateRef: TemplateRef<any>;
}

fdescribe('TabPanelComponent', () => {
  let component: TabPanelComponent;
  let fixture: ComponentFixture<TabPanelComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TabPanelComponent, MockComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPanelComponent);
    component = fixture.componentInstance;
    component.tab = mockTab;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  describe('tab panel rendering', () => {
    it('should have correct attribues when is open', () => {
      component.isOpen = true;
      component.tabNum = 1;
      fixture.detectChanges();
      const tabPanel = document.querySelector('div[role="tabpanel"]');
      expect(tabPanel?.getAttribute('id')).toEqual('section-1');
      expect(tabPanel?.getAttribute('tabindex')).toEqual('0');
      expect(tabPanel?.getAttribute('class')).toEqual('active');
      expect(tabPanel?.getAttribute('style')).toEqual('display: block;');
      expect(tabPanel?.getAttribute('aria-labelledby')).toEqual('test');
    });

    it('should have correct attribues when is closed', () => {
      component.isOpen = false;
      component.tabNum = 1;
      fixture.detectChanges();
      const tabPanel = document.querySelector('div[role="tabpanel"]');
      expect(tabPanel?.getAttribute('id')).toEqual('section-1');
      expect(tabPanel?.getAttribute('tabindex')).toEqual('-1');
      expect(tabPanel?.getAttribute('class')).toBeNull();
      expect(tabPanel?.getAttribute('style')).toEqual('display: none;');
      expect(tabPanel?.getAttribute('aria-labelledby')).toEqual('test');
    });

    it('should display template ref', () => {
      const mockFixture = TestBed.createComponent(MockComponent);
      mockFixture.detectChanges();
      const templateRef = mockFixture.componentInstance.templateRef;

      component.tab.content = templateRef;
      component.isOpen = true;
      component.tabNum = 1;
      mockFixture.detectChanges();
      fixture.detectChanges();

      const tabPanel = document.querySelector('div[role="tabpanel"]');
      console.log(document, tabPanel);
      expect(tabPanel).toEqual(undefined);
    });
  });
});
