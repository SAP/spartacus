import { Component, CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { WindowRef } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import { KeyboardFocusService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from './configurator-storefront-utils.service';
import { By } from '@angular/platform-browser';

let isGroupVisited: Observable<boolean> = of(false);

class MockConfiguratorGroupsService {
  isGroupVisited(): Observable<boolean> {
    return isGroupVisited;
  }
}

class MockKeyboardFocusService {
  findFocusable() {}
  set() {}
}

function createElement(id: string): HTMLElement {
  const element = document.createElement('label');
  element.id = id;
  return element;
}

function createFocusedElements(
  attribute: string,
  amountOfAttributes: number,
  amountOfValues: number
): HTMLElement[] {
  const focusedElements: HTMLElement[] = [];
  for (let i = 1; i <= amountOfAttributes; i++) {
    let attrId = attribute + '_' + i;
    for (let j = 1; j <= amountOfValues; j++) {
      let valueId = 'value_' + j;
      const value = createElement(attrId + '--' + valueId);
      focusedElements.push(value);
    }
  }
  return focusedElements;
}

@Component({
  selector: 'cx-configurator',
  template: `
    <cx-configurator-form>
      <label id="ATTR_1--value_1">value_1</label>
      <label id="ATTR_1--value_2">value_2</label>
      <label id="ATTR_1--value_3">value_3</label>
      <label id="ATTR_2--value_1">value_1</label>
      <label id="ATTR_2--value_2">value_2</label>
      <label id="ATTR_2--value_3">value_3</label>
    </cx-configurator-form>
  `,
})
class MockComponent {}

describe('ConfigUtilsService', () => {
  let classUnderTest: ConfiguratorStorefrontUtilsService;
  let fixture: ComponentFixture<MockComponent>;
  let focusedElements: any;
  const owner = ConfiguratorModelUtils.createOwner(
    CommonConfigurator.OwnerType.PRODUCT,
    'testProduct'
  );
  let windowRef: WindowRef;
  let keyboardFocusService: KeyboardFocusService;
  let querySelectorOriginal: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent],
      providers: [
        {
          provide: ConfiguratorGroupsService,
          useClass: MockConfiguratorGroupsService,
        },
        {
          provide: KeyboardFocusService,
          useClass: MockKeyboardFocusService,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    classUnderTest = TestBed.inject(ConfiguratorStorefrontUtilsService);
    fixture = TestBed.createComponent(MockComponent);
    windowRef = TestBed.inject(WindowRef as Type<WindowRef>);
    keyboardFocusService = TestBed.inject(
      KeyboardFocusService as Type<KeyboardFocusService>
    );
    querySelectorOriginal = document.querySelector;
  });

  afterEach(() => {
    document.querySelector = querySelectorOriginal;
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  function getCurrentResult() {
    let result = false;
    classUnderTest
      .isCartEntryOrGroupVisited(owner, 'group_01')
      .subscribe((data) => (result = data))
      .unsubscribe();
    return result;
  }

  it('should scroll to element', () => {
    const theElement = document.createElement('div');
    document.querySelector = jasmine
      .createSpy('HTML Element')
      .and.returnValue(theElement);
    spyOn(theElement, 'getBoundingClientRect').and.returnValue(
      new DOMRect(100, 2000, 100, 100)
    );
    spyOn(windowRef, 'isBrowser').and.returnValue(true);
    const nativeWindow = windowRef.nativeWindow;
    if (nativeWindow) {
      spyOn(nativeWindow, 'scroll').and.callThrough();
      classUnderTest.scrollToConfigurationElement(
        '.VariantConfigurationTemplate'
      );

      expect(nativeWindow.scroll).toHaveBeenCalledWith(0, 0);
    }
  });

  it("should not scroll to element because browser set to 'false' of windowRef", () => {
    spyOn(windowRef, 'isBrowser').and.returnValue(true);
    const nativeWindow = windowRef.nativeWindow;
    if (nativeWindow) {
      spyOn(nativeWindow, 'scroll').and.callThrough();
      classUnderTest.scrollToConfigurationElement(
        '.VariantConfigurationTemplate'
      );

      expect(nativeWindow.scroll).toHaveBeenCalledTimes(0);
    }
  });

  it('should return false because the product has not been added to the cart and the current group was not visited', () => {
    isGroupVisited = of(false);
    owner.type = CommonConfigurator.OwnerType.PRODUCT;
    expect(getCurrentResult()).toBe(false);
  });

  it('should return true because the product has been added to the cart', () => {
    isGroupVisited = of(false);
    owner.type = CommonConfigurator.OwnerType.CART_ENTRY;
    expect(getCurrentResult()).toBe(true);
  });

  it('should return true because the current group was visited', () => {
    isGroupVisited = of(true);
    expect(getCurrentResult()).toBe(true);
  });

  it('should assemble values from a checkbox list into an attribute value', () => {
    const controlArray = new Array<FormControl>();
    const control1 = new FormControl(true);
    const control2 = new FormControl(false);
    controlArray.push(control1, control2);
    const attribute: Configurator.Attribute = {
      name: 'attr',
      values: [{ valueCode: 'b' }, { name: 'blue', valueCode: 'a' }],
    };

    const values: Configurator.Value[] =
      classUnderTest.assembleValuesForMultiSelectAttributes(
        controlArray,
        attribute
      );
    if (attribute.values) {
      expect(values.length).toBe(2);
      expect(values[0].valueCode).toBe(attribute.values[0].valueCode);
      expect(values[0].selected).toBe(true);
      expect(values[1].name).toBe(attribute.values[1].name);
      expect(values[1].selected).toBe(false);
    } else fail();
  });

  it('should gracefully handle situation that control array has values not present in attribute', () => {
    const controlArray = new Array<FormControl>();
    const control1 = new FormControl(true);
    const control2 = new FormControl(false);
    controlArray.push(control1, control2);
    const attribute: Configurator.Attribute = {
      name: 'attr',
      values: [{ name: 'blue', valueCode: 'a' }],
    };

    const values: Configurator.Value[] =
      classUnderTest.assembleValuesForMultiSelectAttributes(
        controlArray,
        attribute
      );
    expect(values.length).toBe(1);
  });

  describe('Focused elements', () => {
    describe('focusFirstAttribute', () => {
      it('should delegate to keyboard focus service', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        const focusedElements = createFocusedElements('ATTR', 2, 3);
        document.querySelector = jasmine
          .createSpy('HTML Element')
          .and.returnValue(focusedElements);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue(
          focusedElements
        );
        classUnderTest.focusFirstAttribute();
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(1);
      });

      it('should not delegate to keyboard focus service because form is undefined', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        document.querySelector = jasmine
          .createSpy('HTML Element')
          .and.returnValue(undefined);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue([]);
        classUnderTest.focusFirstAttribute();
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(0);
      });

      it('should not delegate to keyboard focus service because there are no focused elements in form', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(false);
        spyOn(keyboardFocusService, 'findFocusable').and.callThrough();
        classUnderTest.focusFirstAttribute();
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(0);
      });

      it('should not delegate to keyboard focus service because keyboard focus service returns no focusable elements', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        const focusedElements = createFocusedElements('ATTR', 2, 3);
        document.querySelector = jasmine
          .createSpy('HTML Element')
          .and.returnValue(focusedElements);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue([]);
        classUnderTest.focusFirstAttribute();
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(1);
      });
    });

    describe('focusValue', () => {
      function createValue(name: string, isSelected: boolean) {
        const value: Configurator.Value = {
          valueCode: name,
          valueDisplay: name,
          name: name,
          selected: isSelected,
        };
        return value;
      }

      let attribute: Configurator.Attribute = {
        name: 'ATTR_2',
        uiType: Configurator.UiType.RADIOBUTTON,
        values: [],
      };

      function spyFocus(): HTMLElement | undefined {
        const selectedValue = attribute.values?.find((value) => value.selected);
        if (selectedValue) {
          const valueUiKey = attribute.name + '--' + selectedValue.valueCode;
          const focusedElement = focusedElements.find(
            (el) => el.id.indexOf(valueUiKey) !== -1
          );
          if (focusedElement) {
            spyOn(focusedElement, 'focus').and.callThrough();
          }
          return focusedElement;
        }
        return undefined;
      }

      beforeEach(() => {
        focusedElements = fixture.debugElement
          .queryAll(By.css('label'))
          .map((el) => el.nativeNode);

        document.querySelector = jasmine
          .createSpy('HTML Element')
          .and.returnValue(focusedElements);

        spyOn(keyboardFocusService, 'findFocusable').and.returnValue(
          focusedElements
        );
      });

      it('should not set focus because attribute does not contain any values', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        const focusedElement = spyFocus();
        classUnderTest.focusValue(attribute);
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(1);
        if (focusedElement) {
          expect(focusedElement.focus).toHaveBeenCalled();
        }
      });

      it('should set focus because attribute contains selected value', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);

        const value1 = createValue('value_1', false);
        const value2 = createValue('value_2', true);
        const value3 = createValue('value_3', false);
        attribute.values = [value1, value2, value3];
        const focusedElement = spyFocus();

        classUnderTest.focusValue(attribute);
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(1);
        if (focusedElement) {
          expect(focusedElement.focus).toHaveBeenCalled();
        }
      });

      it('should not set focus because no focused element is found', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        attribute.name = 'NO_ATTR_2';
        const focusedElement = spyFocus();

        classUnderTest.focusValue(attribute);
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(1);
        if (focusedElement) {
          expect(focusedElement.focus).toHaveBeenCalled();
        }
      });

      it('should not set focus because form is not defined', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        document.querySelector = jasmine
          .createSpy('HTML Element')
          .and.returnValue(undefined);
        classUnderTest.focusValue(attribute);
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(0);
      });

      it('should not set focus because browser context is not defined', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(false);
        classUnderTest.focusValue(attribute);
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('createGroupId', () => {
    it('should return empty string because group ID is undefined', () => {
      expect(classUnderTest.createGroupId(undefined)).toBeUndefined();
    });

    it('should return group ID string', () => {
      expect(classUnderTest.createGroupId('1234')).toBe('1234-group');
    });
  });

  describe('setFocus', () => {
    it('should not call keyboard focus service to set focus because no parameters are defined', () => {
      spyOn(keyboardFocusService, 'set').and.callThrough();
      classUnderTest.setFocus();
      expect(keyboardFocusService.set).toHaveBeenCalledTimes(0);
    });

    it('should not call keyboard focus service to set focus because key is not defined', () => {
      spyOn(keyboardFocusService, 'set').and.callThrough();
      classUnderTest.setFocus(undefined, 'GR_01');
      expect(keyboardFocusService.set).toHaveBeenCalledTimes(0);
    });

    it('should call keyboard focus service to set focus because key is defined', () => {
      spyOn(keyboardFocusService, 'set').and.callThrough();
      classUnderTest.setFocus('key');
      expect(keyboardFocusService.set).toHaveBeenCalledTimes(1);
    });
  });

  describe('change styling of selected element', () => {
    it('should not get HTML element based on query selector', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      expect(classUnderTest.getElement('elementMock')).toBeUndefined();
    });

    it('should get HTML element based on query selector', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      const theElement = document.createElement('elementMock');
      document.querySelector = jasmine
        .createSpy('HTML Element')
        .and.returnValue(theElement);

      expect(classUnderTest.getElement('elementMock')).toEqual(theElement);
    });

    it('should change styling of HTML element', () => {
      const theElement = document.createElement('elementMock');
      document.querySelector = jasmine
        .createSpy('HTML Element')
        .and.returnValue(undefined);

      classUnderTest.changeStyling('elementMock', 'position', 'sticky');
      expect(theElement.style.position).not.toEqual('sticky');
    });

    it('should change styling of HTML element', () => {
      const theElement = document.createElement('elementMock');
      document.querySelector = jasmine
        .createSpy('HTML Element')
        .and.returnValue(theElement);

      classUnderTest.changeStyling('elementMock', 'position', 'sticky');
      expect(theElement.style.position).toEqual('sticky');
    });
  });
});
