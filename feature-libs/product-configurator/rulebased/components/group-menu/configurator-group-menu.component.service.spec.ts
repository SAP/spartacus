import { ElementRef, QueryList } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConfiguratorGroupMenuService } from './configurator-group-menu.component.service';

function createElement(id: string): HTMLElement {
  const element = document.createElement('button');
  element.id = id;
  element.setAttribute('role', 'tab');
  return element;
}

function createGroupMenu(amount: number): QueryList<ElementRef<HTMLElement>> {
  const queryList = new QueryList<ElementRef<HTMLElement>>();
  let elementRefs = [];
  const mainElement = document.createElement('main');
  document.body.append(mainElement);
  const groupMenuElement = document.createElement('cx-configurator-group-menu');
  mainElement.append(groupMenuElement);
  for (let index = 0; index < amount; index++) {
    const groupItemElement = createElement('groupId-' + index);
    const elementElementRef = new ElementRef(groupItemElement);
    elementRefs.push(elementElementRef);
    groupMenuElement.append(groupItemElement);
  }
  queryList.reset(elementRefs);
  return queryList;
}

function createBackButton() {
  const backButton = document.createElement('button');
  backButton.setAttribute('class', 'cx-menu-back');
  backButton.setAttribute('role', 'tab');
  return backButton;
}

describe('ConfiguratorGroupMenuService', () => {
  let classUnderTest: ConfiguratorGroupMenuService;
  let groups: QueryList<ElementRef<HTMLElement>>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    groups = createGroupMenu(3);
    classUnderTest = TestBed.inject(ConfiguratorGroupMenuService);
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

  describe('getFocusedElementTabIndex', () => {
    it('should return index of focused element', () => {
      groups.toArray()[2].nativeElement?.focus();
      expect(classUnderTest['getFocusedGroupIndex'](groups)).toBe(2);
    });
  });

  describe('updateCurrentGroupIndex', () => {
    it('should return current index because focused index is `undefined`', () => {
      expect(classUnderTest['updateCurrentGroupIndex'](0, undefined)).toBe(0);
    });

    it('should return current index because current index and focused index are equal', () => {
      expect(classUnderTest['updateCurrentGroupIndex'](0, 0)).toBe(0);
    });

    it('should return focused index because current index and focused index are not equal', () => {
      expect(classUnderTest['updateCurrentGroupIndex'](1, 2)).toBe(2);
    });
  });

  describe('focusNextGroup', () => {
    it('should focus next group items', () => {
      groups.toArray()[0].nativeElement?.focus();
      let focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-0');

      classUnderTest['focusNextGroup'](0, groups);
      focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-1');

      classUnderTest['focusNextGroup'](1, groups);
      focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-2');

      classUnderTest['focusNextGroup'](2, groups);
      focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-0');

      classUnderTest['focusNextGroup'](0, groups);
      focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-1');
    });

    it('should take `back-button` into account by navigation through group items', () => {
      const backButton = createBackButton();
      let groupMenu = document.querySelector('main cx-configurator-group-menu');
      if (groupMenu) {
        groupMenu.prepend(backButton);
        const group = new ElementRef(backButton);
        const array = groups.toArray();
        array.unshift(group);
        groups.reset(array);
        groups.toArray()[0].nativeElement?.focus();
        let focusedElement = document.activeElement;
        expect(focusedElement?.classList.value).toBe('cx-menu-back');

        classUnderTest['focusNextGroup'](0, groups);
        focusedElement = document.activeElement;
        expect(focusedElement?.id).toBe('groupId-0');

        classUnderTest['focusPreviousGroup'](0, groups);
        focusedElement = document.activeElement;
        expect(focusedElement?.classList.value).toBe('cx-menu-back');
      } else {
        fail('Group menu not available');
      }
    });
  });

  describe('focusPreviousGroup', () => {
    it('should focus previous group items', () => {
      groups.toArray()[0].nativeElement?.focus();
      let focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-0');

      classUnderTest['focusPreviousGroup'](0, groups);
      focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-2');

      classUnderTest['focusPreviousGroup'](2, groups);
      focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-1');

      classUnderTest['focusPreviousGroup'](1, groups);
      focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-0');

      classUnderTest['focusPreviousGroup'](0, groups);
      focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-2');
    });
  });

  describe('switchGroupOnArrowPress', () => {
    it('should focus next group items', () => {
      const event = new KeyboardEvent('keydown', {
        code: 'ArrowUp',
      });

      groups.toArray()[0].nativeElement?.focus();
      let focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-0');

      classUnderTest['switchGroupOnArrowPress'](event, 0, groups);
      focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-2');

      classUnderTest['switchGroupOnArrowPress'](event, 2, groups);
      focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-1');

      classUnderTest['switchGroupOnArrowPress'](event, 1, groups);
      focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-0');

      classUnderTest['switchGroupOnArrowPress'](event, 0, groups);
      focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-2');
    });

    it('should focus previous group items', () => {
      const event = new KeyboardEvent('keydown', {
        code: 'ArrowDown',
      });

      groups.toArray()[0].nativeElement?.focus();
      let focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-0');

      classUnderTest['switchGroupOnArrowPress'](event, 0, groups);
      focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-1');

      classUnderTest['switchGroupOnArrowPress'](event, 1, groups);
      focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-2');

      classUnderTest['switchGroupOnArrowPress'](event, 2, groups);
      focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-0');

      classUnderTest['switchGroupOnArrowPress'](event, 0, groups);
      focusedElement = document.activeElement;
      expect(focusedElement?.id).toBe('groupId-1');
    });
  });

  describe('isBackBtnFocused', () => {
    it('should return `false` because there is no `cx-menu-back` in the group menu', () => {
      groups.toArray()[2].nativeElement?.focus();
      expect(classUnderTest['isBackBtnFocused'](groups)).toBe(false);
    });

    it('should return `true` because there is a `cx-menu-back` in the group menu and has focus', () => {
      const backButton = createBackButton();
      let groupMenu = document.querySelector('main cx-configurator-group-menu');
      if (groupMenu) {
        groupMenu.prepend(backButton);
        const group = new ElementRef(backButton);
        const array = groups.toArray();
        array.unshift(group);
        groups.reset(array);
        groups.toArray()[0].nativeElement?.focus();
        expect(classUnderTest['isBackBtnFocused'](groups)).toBe(true);
      } else {
        fail('Group menu not available');
      }
    });
  });
});
