import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ItemCounterComponent, MediaModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorShowMoreComponent } from '../../../show-more/configurator-show-more.component';
import {
  ConfiguratorAttributeProductCardComponent,
  ConfiguratorAttributeProductCardComponentOptions,
} from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeMultiSelectionBundleComponent } from './configurator-attribute-multi-selection-bundle.component';
import { ConfiguratorTestUtils } from '../../../../testing/configurator-test-utils';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';

@Component({
  selector: 'cx-configurator-attribute-product-card',
  template: '',
})
class MockProductCardComponent {
  @Input()
  productCardOptions: ConfiguratorAttributeProductCardComponentOptions;
}

@Component({
  selector: 'cx-configurator-attribute-quantity',
  template: '',
})
class MockConfiguratorAttributeQuantityComponent {
  @Input() quantityOptions: ConfiguratorAttributeQuantityComponentOptions;
  @Output() changeQuantity = new EventEmitter<number>();
}

@Component({
  selector: 'cx-configurator-price',
  template: '',
})
class MockConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;
}

function getSelected(
  component: ConfiguratorAttributeMultiSelectionBundleComponent,
  index: number
): boolean | undefined {
  const values = component.attribute.values;
  return values ? values[index].selected : false;
}

class MockConfiguratorCommonsService {
  updateConfiguration(): void {}
}

describe('ConfiguratorAttributeMultiSelectionBundleComponent', () => {
  let component: ConfiguratorAttributeMultiSelectionBundleComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeMultiSelectionBundleComponent>;
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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          RouterTestingModule,
          UrlTestingModule,
          ReactiveFormsModule,
          MediaModule,
        ],
        declarations: [
          ConfiguratorAttributeMultiSelectionBundleComponent,
          ConfiguratorShowMoreComponent,
          ItemCounterComponent,
          MockProductCardComponent,
          MockConfiguratorAttributeQuantityComponent,
          MockConfiguratorPriceComponent,
        ],
        providers: [
          {
            provide: ConfiguratorAttributeCompositionContext,
            useValue: ConfiguratorTestUtils.getAttributeContext(),
          },
          {
            provide: ConfiguratorCommonsService,
            useClass: MockConfiguratorCommonsService,
          },
        ],
      })
        .overrideComponent(ConfiguratorAttributeMultiSelectionBundleComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
            providers: [
              {
                provide: ConfiguratorAttributeProductCardComponent,
                useClass: MockProductCardComponent,
              },
            ],
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    const values: Configurator.Value[] = [
      createValue(
        '1111 Description',
        [createImage('url', 'alt')],
        'valueName',
        1,
        true,
        '1111',
        '1111Display'
      ),
      createValue(
        '2222 Description',
        [createImage('url', 'alt')],
        'valueName',
        1,
        true,
        '2222',
        '2222Display'
      ),
      createValue(
        '3333 Description',
        [createImage('url', 'alt')],
        'valueName',
        1,
        false,
        '3333',
        '3333Display'
      ),
      createValue(
        '4444 Description',
        [createImage('url', 'alt')],
        'valueName',
        1,
        false,
        '4444',
        '4444Display'
      ),
    ];

    fixture = TestBed.createComponent(
      ConfiguratorAttributeMultiSelectionBundleComponent
    );
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;

    component.ownerKey = 'theOwnerKey';
    component.attribute = {
      name: 'attributeName',
      attrCode: 1111,
      uiType: Configurator.UiType.CHECKBOXLIST_PRODUCT,
      required: true,
      groupId: 'testGroup',
      values: values,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 multi selection bundle items after init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const cardList = htmlElem.querySelectorAll(
      'cx-configurator-attribute-product-card'
    );

    expect(cardList.length).toBe(4);
  });

  it('should mark two items as selected', () => {
    component.ngOnInit();

    expect(getSelected(component, 0)).toEqual(true);
    expect(getSelected(component, 1)).toEqual(true);
    expect(getSelected(component, 2)).toEqual(false);
    expect(getSelected(component, 3)).toEqual(false);
  });

  it('should call facade update onChangeValueQuantity', () => {
    spyOn(
      component['configuratorCommonsService'],
      'updateConfiguration'
    ).and.callThrough();

    component.ngOnInit();

    component.onChangeValueQuantity({
      valueCode: '1111',
      quantity: 2,
    });

    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).toHaveBeenCalledWith(
      component.ownerKey,
      {
        ...component.attribute,
        values: [
          {
            name: 'valueName',
            quantity: 2,
            selected: true,
            valueCode: '1111',
          },
        ],
      },
      Configurator.UpdateType.VALUE_QUANTITY
    );
  });

  it('should call facade update on event onDeselect', () => {
    spyOn(
      component['configuratorCommonsService'],
      'updateConfiguration'
    ).and.callThrough();

    component.ngOnInit();

    component.onDeselect('1111');

    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).toHaveBeenCalledWith(
      component.ownerKey,
      {
        ...component.attribute,
        values: [
          {
            name: 'valueName',
            quantity: 1,
            selected: false,
            valueCode: '1111',
          },
          {
            name: 'valueName',
            quantity: 1,
            selected: true,
            valueCode: '2222',
          },
          {
            name: 'valueName',
            quantity: 1,
            selected: false,
            valueCode: '3333',
          },
          {
            name: 'valueName',
            quantity: 1,
            selected: false,
            valueCode: '4444',
          },
        ],
      },
      Configurator.UpdateType.ATTRIBUTE
    );
  });

  it('should call selectionChange on event onSelect', () => {
    spyOn(
      component['configuratorCommonsService'],
      'updateConfiguration'
    ).and.callThrough();

    component.ngOnInit();

    component.onSelect('3333');

    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).toHaveBeenCalledWith(
      component.ownerKey,
      {
        ...component.attribute,
        values: [
          {
            name: 'valueName',
            quantity: 1,
            selected: true,
            valueCode: '1111',
          },
          {
            name: 'valueName',
            quantity: 1,
            selected: true,
            valueCode: '2222',
          },
          {
            name: 'valueName',
            quantity: 1,
            selected: true,
            valueCode: '3333',
          },
          {
            name: 'valueName',
            quantity: 1,
            selected: false,
            valueCode: '4444',
          },
        ],
      },
      Configurator.UpdateType.ATTRIBUTE
    );
  });

  it('should call facade update onDeselectAll', () => {
    spyOn(
      component['configuratorCommonsService'],
      'updateConfiguration'
    ).and.callThrough();
    component.ngOnInit();
    component.onDeselectAll();
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).toHaveBeenCalled();
  });

  it('should call onHandleAttributeQuantity of event onChangeAttributeQuantity', () => {
    spyOn<any>(component, 'onHandleAttributeQuantity');
    component.onChangeAttributeQuantity(2);
    expect(component['onHandleAttributeQuantity']).toHaveBeenCalled();
  });

  it('should call onDeselectAll of event onChangeAttributeQuantity', () => {
    spyOn(component, 'onDeselectAll');
    component.onChangeAttributeQuantity(0);
    expect(component.onDeselectAll).toHaveBeenCalled();
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
      component.attribute.attributePriceTotal = {
        currencyIso: '$',
        formattedValue: '$100',
        value: 100,
      };
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
      component.attribute.dataType =
        Configurator.DataType.USER_SELECTION_NO_QTY;
      component.attribute.attributePriceTotal = undefined;
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
      component.attribute.attributePriceTotal = {
        currencyIso: '$',
        formattedValue: '$100',
        value: 100,
      };
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-price'
      );
    });
  });

  describe('extractProductCardParameters', () => {
    it('should be able to cope with no values', () => {
      component.attribute.values = undefined;
      const options = component.extractProductCardParameters(
        false,
        true,
        { valueCode: 'A' },
        1
      );
      expect(options.itemCount).toBe(0);
      expect(options.disableAllButtons).toBe(false);
      expect(options.hideRemoveButton).toBe(true);
    });

    it('should be able to handle null values for boolean attributes', () => {
      const options = component.extractProductCardParameters(
        null,
        null,
        { valueCode: 'A' },
        1
      );
      expect(options.disableAllButtons).toBe(false);
      expect(options.hideRemoveButton).toBe(false);
    });
  });

  describe('initialize', () => {
    it('should prevent actions in case attribute is required and less than 2 selected values present', () => {
      component.attribute.values = undefined;
      component.attribute.required = true;
      component.multipleSelectionValues = [];
      component['initialize']();
      component.preventAction$.subscribe((prevent) =>
        expect(prevent).toBe(true)
      );
    });
  });

  describe('updateMultipleSelectionValuesQuantity', () => {
    it('should return undefined event in case value code is not known ', () => {
      expect(
        component['updateMultipleSelectionValuesQuantity']({
          valueCode: 'Not known',
          quantity: 1,
        })
      ).toBeUndefined();
    });
  });
});
