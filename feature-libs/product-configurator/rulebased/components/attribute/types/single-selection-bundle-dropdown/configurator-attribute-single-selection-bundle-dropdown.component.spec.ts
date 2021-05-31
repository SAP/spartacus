import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '@spartacus/product-configurator/common';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorShowMoreComponent } from '../../../show-more/configurator-show-more.component';
import {
  ConfiguratorAttributeProductCardComponent,
  ConfiguratorAttributeProductCardComponentOptions,
} from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBundleDropdownComponent } from './configurator-attribute-single-selection-bundle-dropdown.component';

@Component({
  selector: 'cx-configurator-attribute-product-card',
  template: '',
})
class MockProductCardComponent {
  @Input() productCardOptions: ConfiguratorAttributeProductCardComponentOptions;
}

@Component({
  selector: 'cx-configurator-attribute-quantity',
  template: '',
})
class MockConfiguratorAttributeQuantityComponent {
  @Input() quantityOptions: ConfiguratorAttributeQuantityComponentOptions;
}

@Component({
  selector: 'cx-configurator-price',
  template: '',
})
class MockConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;
}

@Directive({
  selector: '[cxFocus]',
})
export class MockFocusDirective {
  @Input('cxFocus') protected config: any;
}

describe('ConfiguratorAttributeSingleSelectionBundleDropdownComponent', () => {
  let component: ConfiguratorAttributeSingleSelectionBundleDropdownComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeSingleSelectionBundleDropdownComponent>;
  let htmlElem: HTMLElement;

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
          MockConfiguratorAttributeQuantityComponent,
          MockConfiguratorPriceComponent,
          MockFocusDirective,
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

  it('should show product card when product selected', () => {
    component.selectionValue = values[1];
    fixture.detectChanges();

    const card = htmlElem.querySelector(
      'cx-configurator-attribute-product-card'
    );

    expect(card).toBeTruthy();
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
});
