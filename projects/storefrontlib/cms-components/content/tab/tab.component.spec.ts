import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { TabComponent } from './tab.component';
import { TAB_MODE } from './tab.model';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;

  const mockTabs = [
    {
      headerKey: 'tab0',
      header: 'tab 0',
      id: 0,
    },
    {
      headerKey: 'tab1',
      header: 'tab 1',
      id: 1,
    },
    {
      headerKey: 'tab2',
      header: 'tab 2',
      id: 2,
    },
    {
      headerKey: 'tab3',
      header: 'tab 3',
      id: 3,
    },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [TabComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    component.tabs = mockTabs;
  });

  describe('Tab Mode', () => {
    beforeEach(() => {
      component.config = {
        label: 'test',
        mode: TAB_MODE.TAB,
        openTabs: [0],
      };
      fixture.detectChanges();
    });

    it('should display menu buttons for tabs', () => {
      const tabEl = document.querySelector('div[class="tab"]');
      expect(tabEl?.role).toEqual('tablist');

      const buttonEls = document.querySelectorAll('button[role="tab"]');
      expect(buttonEls.length).toEqual(4);

      const firstButton = buttonEls[0];
      expect(firstButton.getAttribute('id')).toEqual('0');
      expect(firstButton.getAttribute('class')).toEqual('tab-btn active');
      expect(firstButton.getAttribute('aria-selected')).toEqual('true');
      expect(firstButton.getAttribute('aria-expanded')).toEqual('true');
      expect(firstButton.getAttribute('aria-controls')).toEqual('section-0');
      expect(firstButton.getAttribute('tabindex')).toEqual('0');

      const secondButton = buttonEls[1];
      expect(secondButton.getAttribute('id')).toEqual('1');
      expect(secondButton.getAttribute('class')).toEqual('tab-btn');
      expect(secondButton.getAttribute('aria-selected')).toEqual('false');
      expect(secondButton.getAttribute('aria-expanded')).toEqual('false');
      expect(secondButton.getAttribute('aria-controls')).toEqual('section-1');
      expect(secondButton.getAttribute('tabindex')).toEqual('-1');
    });

    it('should navigate menu buttons with arrow keys', () => {
      expect(component.isOpen(0)).toEqual(true);
      expect(component.isOpen(1)).toEqual(false);
      expect(component.isOpen(2)).toEqual(false);

      component.handleKeydownEvent(
        0,
        component.tabs,
        component.config.mode,
        new KeyboardEvent('keydown', { key: 'ArrowRight' })
      );

      expect(component.isOpen(0)).toEqual(false);
      expect(component.isOpen(1)).toEqual(true);
      expect(component.isOpen(2)).toEqual(false);

      component.handleKeydownEvent(
        1,
        component.tabs,
        component.config.mode,
        new KeyboardEvent('keydown', { key: 'ArrowDown' })
      );

      expect(component.isOpen(0)).toEqual(false);
      expect(component.isOpen(1)).toEqual(false);
      expect(component.isOpen(2)).toEqual(true);

      component.handleKeydownEvent(
        2,
        component.tabs,
        component.config.mode,
        new KeyboardEvent('keydown', { key: 'ArrowLeft' })
      );

      expect(component.isOpen(0)).toEqual(false);
      expect(component.isOpen(1)).toEqual(true);
      expect(component.isOpen(2)).toEqual(false);

      component.handleKeydownEvent(
        1,
        component.tabs,
        component.config.mode,
        new KeyboardEvent('keydown', { key: 'ArrowUp' })
      );

      expect(component.isOpen(0)).toEqual(true);
      expect(component.isOpen(1)).toEqual(false);
      expect(component.isOpen(2)).toEqual(false);
    });

    it('should wrap navigation on menu buttons with arrow keys', () => {
      expect(component.isOpen(0)).toEqual(true);
      expect(component.isOpen(3)).toEqual(false);

      component.handleKeydownEvent(
        0,
        component.tabs,
        component.config.mode,
        new KeyboardEvent('keydown', { key: 'ArrowUp' })
      );

      expect(component.isOpen(0)).toEqual(false);
      expect(component.isOpen(3)).toEqual(true);

      component.handleKeydownEvent(
        3,
        component.tabs,
        component.config.mode,
        new KeyboardEvent('keydown', { key: 'ArrowDown' })
      );

      expect(component.isOpen(0)).toEqual(true);
      expect(component.isOpen(3)).toEqual(false);

      component.handleKeydownEvent(
        0,
        component.tabs,
        component.config.mode,
        new KeyboardEvent('keydown', { key: 'ArrowLeft' })
      );

      expect(component.isOpen(0)).toEqual(false);
      expect(component.isOpen(3)).toEqual(true);

      component.handleKeydownEvent(
        3,
        component.tabs,
        component.config.mode,
        new KeyboardEvent('keydown', { key: 'ArrowRight' })
      );

      expect(component.isOpen(0)).toEqual(true);
      expect(component.isOpen(3)).toEqual(false);
    });

    it('should navigate to last tab with END key', () => {
      expect(component.isOpen(0)).toEqual(true);
      expect(component.isOpen(1)).toEqual(false);
      expect(component.isOpen(3)).toEqual(false);

      component.handleKeydownEvent(
        0,
        component.tabs,
        component.config.mode,
        new KeyboardEvent('keydown', { key: 'ArrowDown' })
      );

      expect(component.isOpen(0)).toEqual(false);
      expect(component.isOpen(1)).toEqual(true);
      expect(component.isOpen(3)).toEqual(false);

      component.handleKeydownEvent(
        1,
        component.tabs,
        component.config.mode,
        new KeyboardEvent('keydown', { key: 'End' })
      );

      expect(component.isOpen(0)).toEqual(false);
      expect(component.isOpen(1)).toEqual(false);
      expect(component.isOpen(3)).toEqual(true);
    });

    it('should navigate to first tab with HOME key', () => {
      component.handleKeydownEvent(
        0,
        component.tabs,
        component.config.mode,
        new KeyboardEvent('keydown', { key: 'ArrowUp' })
      );

      expect(component.isOpen(3)).toEqual(true);
      expect(component.isOpen(2)).toEqual(false);
      expect(component.isOpen(0)).toEqual(false);

      component.handleKeydownEvent(
        3,
        component.tabs,
        component.config.mode,
        new KeyboardEvent('keydown', { key: 'ArrowUp' })
      );

      expect(component.isOpen(3)).toEqual(false);
      expect(component.isOpen(2)).toEqual(true);
      expect(component.isOpen(0)).toEqual(false);

      component.handleKeydownEvent(
        2,
        component.tabs,
        component.config.mode,
        new KeyboardEvent('keydown', { key: 'Home' })
      );

      expect(component.isOpen(3)).toEqual(false);
      expect(component.isOpen(2)).toEqual(false);
      expect(component.isOpen(0)).toEqual(true);
    });
  });

  describe('Accordian Mode', () => {
    beforeEach(() => {
      component.config = {
        label: 'test',
        mode: TAB_MODE.ACCORDIAN,
        openTabs: [0],
      };
      fixture.detectChanges();
    });

    it('should display menu buttons for tabs', () => {
      const accordianEl = document.querySelector('div[class="accordian"]');
      expect(accordianEl?.role).toEqual('presentation');
      const buttonEls = document.querySelectorAll('button[role="button"]');
      expect(buttonEls.length).toEqual(4);

      const firstButton = buttonEls[0];
      expect(firstButton.getAttribute('id')).toEqual('0');
      expect(firstButton.getAttribute('class')).toEqual('tab-btn active');
      expect(firstButton.getAttribute('aria-selected')).toEqual('true');
      expect(firstButton.getAttribute('aria-expanded')).toEqual('true');
      expect(firstButton.getAttribute('aria-controls')).toEqual('section-0');
      expect(firstButton.getAttribute('tabindex')).toEqual('0');

      const secondButton = buttonEls[1];
      expect(secondButton.getAttribute('id')).toEqual('1');
      expect(secondButton.getAttribute('class')).toEqual('tab-btn');
      expect(secondButton.getAttribute('aria-selected')).toEqual('false');
      expect(secondButton.getAttribute('aria-expanded')).toEqual('false');
      expect(secondButton.getAttribute('aria-controls')).toEqual('section-1');
      expect(secondButton.getAttribute('tabindex')).toEqual('0');
    });

    it('should toggle tabs correctly in accordian mode', () => {
      expect(component.isOpen(0)).toEqual(true);
      expect(component.isOpen(1)).toEqual(false);
      expect(component.isOpen(2)).toEqual(false);
      component.toggleTab(1);

      expect(component.isOpen(0)).toEqual(true);
      expect(component.isOpen(1)).toEqual(true);
      expect(component.isOpen(2)).toEqual(false);
      component.toggleTab(2);

      expect(component.isOpen(0)).toEqual(true);
      expect(component.isOpen(1)).toEqual(true);
      expect(component.isOpen(2)).toEqual(true);
      component.toggleTab(1);

      expect(component.isOpen(0)).toEqual(true);
      expect(component.isOpen(1)).toEqual(false);
      expect(component.isOpen(2)).toEqual(true);

      component.toggleTab(0);
      expect(component.isOpen(0)).toEqual(false);
      expect(component.isOpen(1)).toEqual(false);
      expect(component.isOpen(2)).toEqual(true);
    });
  });
});
