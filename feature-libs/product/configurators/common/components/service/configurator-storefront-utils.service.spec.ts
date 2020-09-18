import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { GenericConfigurator } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from './../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from './configurator-storefront-utils.service';

let isGroupVisited: Observable<boolean> = of(false);

class MockConfiguratorGroupsService {
  isGroupVisited(): Observable<boolean> {
    return isGroupVisited;
  }
}

describe('ConfigUtilsService', () => {
  let classUnderTest: ConfiguratorStorefrontUtilsService;

  const owner: GenericConfigurator.Owner = {
    id: 'testProduct',
    type: GenericConfigurator.OwnerType.PRODUCT,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConfiguratorGroupsService,
          useClass: MockConfiguratorGroupsService,
        },
      ],
    });
    classUnderTest = TestBed.inject(ConfiguratorStorefrontUtilsService);
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  function getCurrentResult() {
    let result: boolean;
    classUnderTest
      .isCartEntryOrGroupVisited(owner, 'group_01')
      .subscribe((data) => (result = data))
      .unsubscribe();
    return result;
  }

  it('should return false because the product has not been added to the cart and the current group was not visited', () => {
    isGroupVisited = of(false);
    owner.type = GenericConfigurator.OwnerType.PRODUCT;
    expect(getCurrentResult()).toBe(false);
  });

  it('should return true because the product has been added to the cart', () => {
    isGroupVisited = of(false);
    owner.type = GenericConfigurator.OwnerType.CART_ENTRY;
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
      values: [{ valueCode: 'b' }, { name: 'blue' }],
    };

    const values: Configurator.Value[] = classUnderTest.assembleValuesForMultiSelectAttributes(
      controlArray,
      attribute
    );
    expect(values.length).toBe(2);
    expect(values[0].valueCode).toBe(attribute.values[0].valueCode);
    expect(values[0].selected).toBe(true);
    expect(values[1].name).toBe(attribute.values[1].name);
    expect(values[1].selected).toBe(false);
  });

  describe('Get attribute ID', () => {
    it('getAttributeId should extract the attribute id', () => {
      const attributeId = classUnderTest.getAttributeId(
        'cx-config--radioGroup--CAMERA_COLOR--BLACK'
      );
      expect(attributeId).toEqual('cx-config--radioGroup--CAMERA_COLOR');
    });

    it('getAttributeId should return undefined if radio button id is undefined', () => {
      const attributeId = classUnderTest.getAttributeId(undefined);
      expect(attributeId).toBeUndefined();
    });
  });

  describe('Verify whether the attribute lost focus', () => {
    it('attributeLostFocus should return true if attributeId of relatedTarget and target is different', () => {
      const he: HTMLElement = document.createElement('input');
      he.id = 'cx-config--radioGroup--CAMERA_COLOR--BLACK';
      const et: EventTarget = he;
      const he2: HTMLElement = document.createElement('input');
      he2.id = 'cx-config--radioGroup--CAMERA_SENSOR--G124';
      const et2: EventTarget = he2;
      const ev: FocusEvent = { relatedTarget: et, target: et2 } as FocusEvent;
      expect(classUnderTest.attributeLostFocus(ev)).toBeTrue();
    });

    it('attributeLostFocus should return true if attributeId of relatedTarget and target is different with target being undefined', () => {
      const he: HTMLElement = document.createElement('input');
      he.id = 'cx-config--radioGroup--CAMERA_COLOR--BLACK';
      const et: EventTarget = he;
      const ev: FocusEvent = {
        relatedTarget: et,
        target: undefined,
      } as FocusEvent;
      expect(classUnderTest.attributeLostFocus(ev)).toBeTrue();
    });

    it('attributeLostFocus should return true if attributeId of relatedTarget and target is different with relatedTarget being undefined', () => {
      const he: HTMLElement = document.createElement('input');
      he.id = 'cx-config--radioGroup--CAMERA_COLOR--BLACK';
      const et: EventTarget = he;
      const ev: FocusEvent = {
        relatedTarget: undefined,
        target: et,
      } as FocusEvent;
      expect(classUnderTest.attributeLostFocus(ev)).toBeTrue();
    });

    it('should return false if attributeId of relatedTarget and target are the same', () => {
      const he: HTMLElement = document.createElement('input');
      he.id = 'cx-config--radioGroup--CAMERA_COLOR--BLACK';
      const et: EventTarget = he;
      const he2: HTMLElement = document.createElement('input');
      he2.id = 'cx-config--radioGroup--CAMERA_COLOR--BROWN';
      const et2: EventTarget = he2;
      const ev: FocusEvent = { relatedTarget: et, target: et2 } as FocusEvent;
      expect(classUnderTest.attributeLostFocus(ev)).toBeFalse();
    });
  });
});
