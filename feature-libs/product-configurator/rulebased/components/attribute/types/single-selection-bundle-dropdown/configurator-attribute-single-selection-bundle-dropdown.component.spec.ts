import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '@spartacus/product-configurator/common';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorShowMoreComponent } from '../../../show-more/configurator-show-more.component';
import { ConfiguratorAttributeProductCardComponent } from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBundleDropdownComponent } from './configurator-attribute-single-selection-bundle-dropdown.component';

@Component({
  selector: 'cx-configurator-attribute-product-card',
  template: '',
})
class MockProductCardComponent {}

describe('ConfiguratorAttributeSingleSelectionBundleDropdownComponent', () => {
  let component: ConfiguratorAttributeSingleSelectionBundleDropdownComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeSingleSelectionBundleDropdownComponent>;
  let htmlElem: HTMLElement;

  const ownerKey = 'theOwnerKey';
  const nameFake = 'nameAttribute';
  const attrCode = 1234;
  const groupId = 'theGroupId';
  const selectedSingleValue = '0';
  let values: Configurator.Value[];

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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeSingleSelectionBundleDropdownComponent,
          ConfiguratorShowMoreComponent,
          MockProductCardComponent,
        ],
        imports: [
          ReactiveFormsModule,
          NgSelectModule,
          I18nTestingModule,
          RouterTestingModule,
          UrlTestingModule,
        ],
      })
        .overrideComponent(
          ConfiguratorAttributeSingleSelectionBundleDropdownComponent,
          {
            set: {
              changeDetection: ChangeDetectionStrategy.Default,
              providers: [
                {
                  provide: ConfiguratorAttributeProductCardComponent,
                  useClass: MockProductCardComponent,
                },
                {
                  provide: ConfiguratorAttributeQuantityService,
                  useClass: ConfiguratorAttributeQuantityService,
                },
              ],
            },
          }
        )
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorAttributeSingleSelectionBundleDropdownComponent
    );

    values = [
      createValue('', [], '', 1, true, '0', 'No Selected'),
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

    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;

    component.selectionValue = values[0];

    component.attribute = {
      uiType: Configurator.UiType.DROPDOWN_PRODUCT,
      attrCode,
      groupId,
      name: nameFake,
      required: true,
      selectedSingleValue,
      values,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should set selectedSingleValue on init', () => {
    component.ngOnInit();
    expect(component.attributeDropDownForm.value).toEqual(selectedSingleValue);
  });

  it('should call emit of selectionChange onSelect', () => {
    component.ownerKey = ownerKey;

    spyOn(component.selectionChange, 'emit').and.callThrough();

    component.onSelect();

    expect(component.selectionChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        ownerKey: ownerKey,
        changedAttribute: jasmine.objectContaining({
          name: nameFake,
          groupId: groupId,
          selectedSingleValue: component.attributeDropDownForm.value,
        }),
      })
    );
  });

  it('should show product card when product selected', () => {
    component.selectionValue = values[1];

    fixture.detectChanges();

    const card = htmlElem.querySelector(
      'cx-configurator-attribute-product-card'
    );

    expect(card).toBeTruthy();
  });

  it('should call emit of event onDeselect', () => {
    spyOn(component.selectionChange, 'emit').and.callThrough();

    component.onDeselect();

    expect(component.selectionChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        changedAttribute: jasmine.objectContaining({
          ...component.attribute,
          selectedSingleValue: '0',
        }),
        ownerKey: component.ownerKey,
        updateType: Configurator.UpdateType.ATTRIBUTE,
      })
    );
  });

  it('should call selectionChange on event onChangeQuantity', () => {
    spyOn(component.selectionChange, 'emit').and.callThrough();

    component.onChangeQuantity({
      quantity: 2,
    });

    expect(component.selectionChange.emit).toHaveBeenCalled();
  });

  it('should extract initial quantity from attribute, if a selection is already made', () => {
    component.attribute.quantity = 3;
    component.attributeDropDownForm.setValue(values[1].valueCode);
    expect(
      component.extractQuantityParameters().initialQuantity?.quantity
    ).toBe(3);
  });

  it('should set initial quantity to zero if only the "No Option Selected"-Value is selected', () => {
    component.attribute.quantity = 3;
    component.attributeDropDownForm.setValue(values[0].valueCode); // value 0 is the "No Option Selected"-Value
    expect(
      component.extractQuantityParameters().initialQuantity?.quantity
    ).toBe(0);
  });

  it('should set initial quantity to zero if no quantity is provided.', () => {
    component.attributeDropDownForm.setValue(values[1].valueCode);
    component.attribute.quantity = undefined;
    expect(
      component.extractQuantityParameters().initialQuantity?.quantity
    ).toBe(0);
  });

  it('should set initial quantity to zero if nothing selected', () => {
    component.attributeDropDownForm.setValue(undefined);
    expect(
      component.extractQuantityParameters().initialQuantity?.quantity
    ).toBe(0);
  });

  describe('quantity at attribute level', () => {
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

    it('should not display attribute quantity when dataType is no quantity', () => {
      component.attribute.dataType =
        Configurator.DataType.USER_SELECTION_NO_QTY;
      fixture.detectChanges();
      checkQuantityStepperNotDisplayed(htmlElem);
    });

    it('should not display attribute quantity when dataType is not filled', () => {
      component.attribute.dataType = undefined;
      fixture.detectChanges();
      checkQuantityStepperNotDisplayed(htmlElem);
    });

    it('should not display attribute quantity when uiType is not filled', () => {
      component.attribute.uiType = undefined;
      fixture.detectChanges();
      checkQuantityStepperNotDisplayed(htmlElem);
    });

    function checkQuantityStepperNotDisplayed(htmlElem: HTMLElement) {
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-quantity'
      );
    }
  });

  describe('price info at attribute level', () => {
    it('should not display price component', () => {
      component.attribute.quantity = undefined;
      component.attribute.dataType =
        Configurator.DataType.USER_SELECTION_NO_QTY;
      values[0].valuePrice = undefined;
      values[0].valuePriceTotal = undefined;
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
      values[0].selected = false;
      values[1].valuePrice = {
        currencyIso: '$',
        formattedValue: '$10',
        value: 10,
      };
      values[1].valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$100',
        value: values[1].valuePrice.value ?? 0 * component.attribute.quantity,
      };
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-price'
      );
    });
  });
});
