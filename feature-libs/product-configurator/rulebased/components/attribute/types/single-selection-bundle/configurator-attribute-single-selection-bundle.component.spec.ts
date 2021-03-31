import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '@spartacus/product-configurator/common';
import { ItemCounterComponent } from '@spartacus/storefront';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorShowMoreComponent } from '../../../show-more/configurator-show-more.component';
import { ConfiguratorAttributeProductCardComponent } from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeSingleSelectionBundleComponent } from './configurator-attribute-single-selection-bundle.component';

const selectedValue = 'a';
const attributeQuantity = 4;
const createTestValue = (
  price: number | undefined,
  total: number | undefined,
  selected = true
): Configurator.Value => ({
  selected,
  valuePrice: {
    currencyIso: '$',
    formattedValue: price ? '$' + price : '',
    value: price,
  },
  valuePriceTotal: {
    currencyIso: '$',
    formattedValue: price ? '$' + price : '',
    value: total,
  },
});

@Component({
  selector: 'cx-configurator-attribute-product-card',
  template: '',
})
class MockProductCardComponent {}

@Component({
  selector: 'cx-configurator-price',
  template: '',
})
class MockConfiguratorPriceComponent {
  @Input() productPrice: number;
  @Input() quantity = 1;
  @Input() totalPrice: number;
}

function getSelected(
  component: ConfiguratorAttributeSingleSelectionBundleComponent,
  index: number
): boolean | undefined {
  const values = component?.attribute?.values;
  return values ? values[index].selected : false;
}
function getFirstValue(
  component: ConfiguratorAttributeSingleSelectionBundleComponent
): Configurator.Value {
  const values = component?.attribute?.values;
  return values ? values[0] : {};
}
describe('ConfiguratorAttributeSingleSelectionBundleComponent', () => {
  let component: ConfiguratorAttributeSingleSelectionBundleComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeSingleSelectionBundleComponent>;
  let htmlElem: HTMLElement;

  const createImage = (url: string, altText: string): Configurator.Image => {
    const image: Configurator.Image = {
      url: url,
      altText: altText,
    };
    return image;
  };

  const createValue = (
    description: string,
    images: Configurator.Image[],
    name: string,
    quantity: number,
    selected: boolean,
    valueCode: string,
    valueDisplay: string
  ): Configurator.Value => {
    const value: Configurator.Value = {
      description,
      images,
      name,
      quantity,
      selected,
      valueCode,
      valueDisplay,
    };
    return value;
  };

  let values: Configurator.Value[];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule, ReactiveFormsModule],
        declarations: [
          ConfiguratorAttributeSingleSelectionBundleComponent,
          ConfiguratorShowMoreComponent,
          ItemCounterComponent,
          MockProductCardComponent,
          MockConfiguratorPriceComponent,
        ],
      })
        .overrideComponent(
          ConfiguratorAttributeSingleSelectionBundleComponent,
          {
            set: {
              changeDetection: ChangeDetectionStrategy.Default,
              providers: [
                {
                  provide: ConfiguratorAttributeProductCardComponent,
                  useClass: MockProductCardComponent,
                },
              ],
            },
          }
        )
        .compileComponents();
    })
  );

  beforeEach(() => {
    values = [
      createValue(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        [createImage('url', 'alt')],
        'valueName',
        1,
        true,
        '1111',
        'Lorem Ipsum Dolor'
      ),
      createValue(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        [createImage('url', 'alt')],
        'valueName',
        1,
        false,
        '2222',
        'Lorem Ipsum Dolor'
      ),
      createValue(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        [createImage('url', 'alt')],
        'valueName',
        1,
        false,
        '3333',
        'Lorem Ipsum Dolor'
      ),
      createValue(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        [createImage('url', 'alt')],
        'valueName',
        1,
        false,
        '4444',
        'Lorem Ipsum Dolor'
      ),
    ];

    fixture = TestBed.createComponent(
      ConfiguratorAttributeSingleSelectionBundleComponent
    );

    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;

    component.ownerKey = 'theOwnerKey';
    component.attribute = {
      name: 'attributeName',
      attrCode: 1111,
      uiType: Configurator.UiType.RADIOBUTTON_PRODUCT,
      required: true,
      groupId: 'testGroup',
      values,
      dataType: Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 multi selection bundle items after init', () => {
    fixture.detectChanges();

    const cardList = htmlElem.querySelectorAll(
      'cx-configurator-attribute-product-card'
    );

    expect(cardList.length).toBe(4);
  });

  it('should mark one item as selected', () => {
    expect(getSelected(component, 0)).toEqual(true);
    expect(getSelected(component, 1)).toEqual(false);
    expect(getSelected(component, 2)).toEqual(false);
    expect(getSelected(component, 3)).toEqual(false);
  });

  it('should call emit of event onSelect', () => {
    spyOn(component.selectionChange, 'emit').and.callThrough();

    component.onSelect('1111');

    expect(component.selectionChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        changedAttribute: jasmine.objectContaining({
          ...component.attribute,
          selectedSingleValue: '1111',
        }),
        ownerKey: component.ownerKey,
        updateType: Configurator.UpdateType.ATTRIBUTE,
      })
    );
  });

  it('should call emit of event onDeselect', () => {
    spyOn(component.selectionChange, 'emit').and.callThrough();

    component.onDeselect();

    expect(component.selectionChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        changedAttribute: jasmine.objectContaining({
          ...component.attribute,
          selectedSingleValue: '',
        }),
        ownerKey: component.ownerKey,
        updateType: Configurator.UpdateType.ATTRIBUTE,
      })
    );
  });

  it('should call emit of event onHandleQuantity', () => {
    spyOn(component.selectionChange, 'emit').and.callThrough();

    component.onHandleQuantity(2);

    expect(component.selectionChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        changedAttribute: jasmine.objectContaining({
          ...component.attribute,
          quantity: 2,
        }),
        ownerKey: component.ownerKey,
        updateType: Configurator.UpdateType.ATTRIBUTE_QUANTITY,
      })
    );
  });

  it('should call onHandleQuantity of event onChangeQuantity', () => {
    spyOn(component, 'onHandleQuantity');

    const quantity = { quantity: 2 };

    component.onChangeQuantity(quantity);

    expect(component.onHandleQuantity).toHaveBeenCalled();
  });

  it('should call onDeselect of event onChangeQuantity', () => {
    spyOn(component, 'onDeselect');

    const quantity = { quantity: 0 };

    component.onChangeQuantity(quantity);

    expect(component.onDeselect).toHaveBeenCalled();
  });

  describe('selected value price calculation', () => {
    describe('should return number', () => {
      it('on selected value only', () => {
        component.attribute = {
          name: 'testAttribute',
          values: [createTestValue(100, 100)],
        };
        fixture.detectChanges();

        const valuePrice = component['getSelectedValuePrice']();
        expect(valuePrice?.value).toEqual(100);
      });

      it('on selected value', () => {
        component.attribute = {
          name: 'testAttribute',
          values: [createTestValue(100, 100), createTestValue(100, 100, false)],
        };
        fixture.detectChanges();

        const valuePrice = component['getSelectedValuePrice']();
        expect(valuePrice?.value).toEqual(100);
      });
    });

    describe('should not return price', () => {
      it('without values property', () => {
        component.attribute = {
          name: 'testAttribute',
        };
        fixture.detectChanges();

        const valuePrice = component['getSelectedValuePrice']();
        expect(valuePrice).toBeUndefined();
      });

      it('without values', () => {
        component.attribute = {
          name: 'testAttribute',
          values: [],
        };
        fixture.detectChanges();

        const valuePrice = component['getSelectedValuePrice']();
        expect(valuePrice).toBeUndefined();
      });

      it('without price property', () => {
        component.attribute = {
          name: 'testAttribute',
          values: [createTestValue(undefined, undefined)],
        };
        fixture.detectChanges();

        const valuePrice = component['getSelectedValuePrice']();
        expect(valuePrice?.value).toBeUndefined();
      });
    });
  });

  describe('quantity at attribute level', () => {
    it('should not display attribute quantity when dataType is no quantity', () => {
      component.attribute.dataType =
        Configurator.DataType.USER_SELECTION_NO_QTY;

      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-quantity'
      );
    });

    it('should display attribute quantity when dataType is with attribute quantity', () => {
      component.attribute.dataType =
        Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL;

      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-quantity'
      );
    });
  });

  describe('price info at attribute level', () => {
    it('should not display price component', () => {
      component.attribute.quantity = undefined;
      component.attribute.dataType =
        Configurator.DataType.USER_SELECTION_NO_QTY;
      getFirstValue(component).valuePrice = undefined;
      getFirstValue(component).valuePriceTotal = undefined;
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-configurator-price'
      );
    });

    it('should display price component', () => {
      component.attribute.dataType =
        Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL;
      component.attribute.quantity = 5;
      component.attribute.attributePriceTotal = {
        currencyIso: '$',
        formattedValue: '$10',
        value: 50,
      };
      getFirstValue(component).valuePrice = {
        currencyIso: '$',
        formattedValue: '$10',
        value: 10,
      };
      getFirstValue(component).valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$50',
        value: 50,
      };
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-price'
      );
    });
  });

  describe('extractQuantityParameters', () => {
    it('should return 0 as initial if no selected value is specified  ', () => {
      const quantityParameters = component.extractQuantityParameters();
      expect(quantityParameters.initialQuantity?.quantity).toBe(0);
    });

    it('should return 0 as initial if a selected value but no attribute quantity is specified', () => {
      component.attribute.selectedSingleValue = selectedValue;
      const quantityParameters = component.extractQuantityParameters();
      expect(quantityParameters.initialQuantity?.quantity).toBe(0);
    });

    it('should return attribute quantity as initial if a selected value is specified', () => {
      component.attribute.selectedSingleValue = selectedValue;
      component.attribute.quantity = attributeQuantity;
      const quantityParameters = component.extractQuantityParameters();
      expect(quantityParameters.initialQuantity?.quantity).toBe(
        attributeQuantity
      );
    });
  });

  describe('getFcousIdOfNearestValue', () => {
    it('should find second value when first is provided', () => {
      expect(component.getFcousIdOfNearestValue(values[0])).toBe(
        '1111--2222--focus'
      );
    });

    it('should find first value when second is provided', () => {
      expect(component.getFcousIdOfNearestValue(values[1])).toBe(
        '1111--1111--focus'
      );
    });
    it('should find first value when there is only one value', () => {
      component.attribute.values = [values[0]];
      expect(component.getFcousIdOfNearestValue(values[0])).toBe(
        '1111--1111--focus'
      );
    });
  });
});
