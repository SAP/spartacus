//import { TemplateRef } from '@angular/core';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Tab, TAB_PANEL_CONTENT_TYPE } from '../tab.model';
import { TabPanelComponent } from './tab-panel.component';

const mockTab: Tab = {
  id: 'test',
  content: undefined,
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
        declarations: [TabPanelComponent],
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

  describe('getContentType()', () => {
    it('should return "TEMPLATE_REF" when content is TemplateRef', () => {
      const mockFixture = TestBed.createComponent(MockComponent);
      mockFixture.detectChanges();
      const templateRef = mockFixture.componentInstance.templateRef;

      component.tab.content = templateRef;
      expect(component.getContentType()).toBe(
        TAB_PANEL_CONTENT_TYPE.TEMPLATE_REF
      );
    });

    it('should return "CONTENT_SLOT_COMPONENT_DATA" when content has flexType', () => {
      const contentSlotComponentData = { flexType: 'component' };
      component.tab.content = contentSlotComponentData;
      expect(component.getContentType()).toBe(
        TAB_PANEL_CONTENT_TYPE.CONTENT_SLOT_COMPONENT_DATA
      );
    });

    it('should return undefined when content is null or undefined', () => {
      component.tab.content = null;
      expect(component.getContentType()).toBeUndefined();

      component.tab.content = undefined;
      expect(component.getContentType()).toBeUndefined();
    });
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
      fixture.detectChanges();

      expect(component.getContentType()).toEqual(
        TAB_PANEL_CONTENT_TYPE.TEMPLATE_REF
      );

      const tabPanel = document.querySelector('div[role="tabpanel"]');
      console.log(tabPanel);
      expect(tabPanel).toEqual(undefined);
    });

    // TODO: Content Slot and NO DATA should not be valid cases when
    // referring only to TemplateRef.

    //  it('should display content slot component data', () => {
    //    component.isOpen = true;
    //    component.tabNum = 1;
    //    component.content = fixture.detectChanges();
    //    const tabPanel = document.querySelector('div[role="tabpanel"]');
    //  });

    // it('should not display when no valid content data', () => {});
  });
});
