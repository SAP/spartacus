import { TestBed } from '@angular/core/testing';
import { ConfiguratorGroupMenuService } from './configurator-group-menu.component.service';
import { BreakpointService } from '@spartacus/storefront';
import { Type } from '@angular/core';
import { Observable, of } from 'rxjs';

function createElement(id: string): HTMLElement {
  const element = document.createElement('button');
  element.id = id;
  element.setAttribute('role', 'tab');
  return element;
}

function createGroupMenuForDesktop(amount: number) {
  let groups = [];
  const mainElement = document.createElement('main');
  document.body.append(mainElement);
  const groupMenuElement = document.createElement('cx-configurator-group-menu');
  mainElement.append(groupMenuElement);
  for (let index = 0; index < amount; index++) {
    const groupItemElement = createElement('groupId-' + index);
    groups.push(groupItemElement);
    groupMenuElement.append(groupItemElement);
  }
  return groups;
}

function createGroupMenuForMobile(amount: number) {
  let groups = [];
  const cxElement = document.createElement('cx-page-layout');
  cxElement.setAttribute('class', 'navigation');
  document.body.append(cxElement);
  const groupMenuElement = document.createElement('cx-configurator-group-menu');
  cxElement.append(groupMenuElement);
  for (let index = 0; index < amount; index++) {
    const groupItemElement = createElement('groupId-' + index);
    groups.push(groupItemElement);
    groupMenuElement.append(groupItemElement);
  }
  return groups;
}

function createBackButton() {
  const backButton = document.createElement('button');
  backButton.setAttribute('class', 'cx-menu-back');
  backButton.setAttribute('role', 'tab');
  return backButton;
}

let isDesktop: boolean;
class MockBreakpointService {
  isUp(): Observable<boolean> {
    return of(isDesktop);
  }
}

describe('ConfiguratorGroupMenuService', () => {
  let classUnderTest: ConfiguratorGroupMenuService;
  let breakpointService: BreakpointService;
  let groups: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: BreakpointService, useClass: MockBreakpointService },
      ],
    });
    groups = createGroupMenuForDesktop(3);
    classUnderTest = TestBed.inject(ConfiguratorGroupMenuService);

    breakpointService = TestBed.inject(
      BreakpointService as Type<BreakpointService>
    );

    spyOn(breakpointService, 'isUp').and.callThrough();
    isDesktop = true;
  });

  afterEach(() => {
    const mainElement = document.body.querySelector('main');
    if (mainElement) {
      document.body.removeChild(mainElement);
    }

    const cxElement = document.body.querySelector('cx-page-layout');
    if (cxElement) {
      document.body.removeChild(cxElement);
    }
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  describe('getTabs', () => {
    describe('desktop widgets (screen size larger than lg)', () => {
      it('should return no groups', () => {
        const element = document.body.querySelector('main');
        document.body.removeChild(element);
        const result = classUnderTest['getGroups']();
        expect(result.length).toBe(0);
      });

      it('should return a number of groups for large size widgets', () => {
        const result = classUnderTest['getGroups']();
        expect(result.length).toEqual(groups.length);
        expect(result[0]).toEqual(groups[0]);
        expect(result[1]).toEqual(groups[1]);
        expect(result[2]).toEqual(groups[2]);
      });
    });

    describe('mobile widgets (screen size smaller than sm)', () => {
      beforeEach(() => {
        isDesktop = false;
        const mainElement = document.body.querySelector('main');
        if (mainElement) {
          document.body.removeChild(mainElement);
        }
      });

      it('should return no groups', () => {
        const result = classUnderTest['getGroups']();
        expect(result.length).toBe(0);
      });

      it('should return a number of groups for small size widgets', () => {
        groups = createGroupMenuForMobile(3);
        const result = classUnderTest['getGroups']();
        expect(result.length).toEqual(groups.length);
        expect(result[0]).toEqual(groups[0]);
        expect(result[1]).toEqual(groups[1]);
        expect(result[2]).toEqual(groups[2]);
      });
    });
  });

  describe('getFocusedElementTabIndex', () => {
    it('should return undefined because there are no element in the groups list', () => {
      groups = null;
      expect(classUnderTest['getFocusedGroupIndex'](groups)).toBeUndefined();
    });

    it('should return undefined because focused element is not in the groups list', () => {
      const item = createElement('groupId-100');
      document.body.append(item);
      item.focus();
      expect(classUnderTest['getFocusedGroupIndex'](groups)).toBeUndefined();
    });

    it('should return index of focused element', () => {
      groups[2].focus();
      expect(classUnderTest['getFocusedGroupIndex'](groups)).toBe(2);
    });
  });

  describe('updateCurrentTabIndex', () => {
    it('should return current index', () => {
      expect(classUnderTest['updateCurrentGroupIndex'](1, 1)).toBe(1);
    });

    it('should return group index', () => {
      expect(classUnderTest['updateCurrentGroupIndex'](1, 2)).toBe(2);
    });
  });

  describe('focusNextTab', () => {
    it('should focus next group items', () => {
      groups[0].focus();
      let focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-0');

      classUnderTest['focusNextGroup'](0);
      focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-1');

      classUnderTest['focusNextGroup'](1);
      focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-2');

      classUnderTest['focusNextGroup'](2);
      focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-0');

      classUnderTest['focusNextGroup'](0);
      focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-1');
    });

    it('should take `back-button` into account by navigation through group items', () => {
      const backButton = createBackButton();
      let groupMenu = document.querySelector('main cx-configurator-group-menu');
      groupMenu.prepend(backButton);
      backButton.focus();
      let focusedElement = document.activeElement;
      expect(focusedElement.classList.value).toBe('cx-menu-back');

      classUnderTest['focusNextGroup'](0);
      focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-0');

      classUnderTest['focusPreviousGroup'](0);
      focusedElement = document.activeElement;
      expect(focusedElement.classList.value).toBe('cx-menu-back');
    });
  });

  describe('focusPreviousTab', () => {
    it('should focus previous group items', () => {
      groups[0].focus();
      let focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-0');

      classUnderTest['focusPreviousGroup'](0);
      focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-2');

      classUnderTest['focusPreviousGroup'](2);
      focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-1');

      classUnderTest['focusPreviousGroup'](1);
      focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-0');

      classUnderTest['focusPreviousGroup'](0);
      focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-2');
    });
  });

  describe('switchTabOnArrowPress', () => {
    it('should focus next group items', () => {
      const event = new KeyboardEvent('keydown', {
        code: 'ArrowUp',
      });

      groups[0].focus();
      let focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-0');

      classUnderTest['switchGroupOnArrowPress'](event, 0);
      focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-2');

      classUnderTest['switchGroupOnArrowPress'](event, 2);
      focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-1');

      classUnderTest['switchGroupOnArrowPress'](event, 1);
      focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-0');

      classUnderTest['switchGroupOnArrowPress'](event, 0);
      focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-2');
    });

    it('should focus previous group items', () => {
      const event = new KeyboardEvent('keydown', {
        code: 'ArrowDown',
      });

      groups[0].focus();
      let focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-0');

      classUnderTest['switchGroupOnArrowPress'](event, 0);
      focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-1');

      classUnderTest['switchGroupOnArrowPress'](event, 1);
      focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-2');

      classUnderTest['switchGroupOnArrowPress'](event, 2);
      focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-0');

      classUnderTest['switchGroupOnArrowPress'](event, 0);
      focusedElement = document.activeElement;
      expect(focusedElement.id).toBe('groupId-1');
    });
  });

  describe('isBackBtnFocused', () => {
    it('should return `false` because there is no `cx-menu-back` in the group menu', () => {
      groups[2].focus();
      expect(classUnderTest['isBackBtnFocused']()).toBe(false);
    });

    it('should return `true` because there is a `cx-menu-back` in the group menu', () => {
      const backButton = createBackButton();
      let groupMenu = document.querySelector('main cx-configurator-group-menu');
      groupMenu.prepend(backButton);
      backButton.focus();
      expect(classUnderTest['isBackBtnFocused']()).toBe(true);
    });
  });
});
