import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../../../testing/configurator-test-utils';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';
import { defaultConfiguratorUISettingsConfig } from '../../../config/default-configurator-ui-settings.config';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import {
  ConfiguratorAttributeProductCardComponent,
  ConfiguratorAttributeProductCardComponentOptions,
} from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeContainerComponent } from './configurator-attribute-container.component';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Component({
  selector: 'cx-configurator-attribute-product-card',
  template: '',
})
class MockProductCardComponent {
  @Input() productCardOptions: ConfiguratorAttributeProductCardComponentOptions;
}

describe('ConfiguratorAttributeContainerComponent', () => {
  let component: ConfiguratorAttributeContainerComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeContainerComponent>;
  let htmlElem: HTMLElement;

  function createAttribute(
    rows: Configurator.ContainerRow[] = [
      {
        id: 'row-1',
        productName: 'Product A',
        productSystemId: 'SYS_A',
        selected: true,
      },
      {
        id: 'row-2',
        productName: 'Product B',
        productSystemId: 'SYS_B',
        selected: false,
      },
      {
        id: 'row-3',
        productName: 'Product C',
        productSystemId: 'SYS_C',
        selected: false,
      },
    ]
  ): Configurator.Attribute {
    return {
      name: 'attributeName',
      attrCode: 1111,
      uiType: Configurator.UiType.CONTAINER,
      required: true,
      groupId: 'testGroup',
      container: {
        rows,
      },
    };
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ConfiguratorAttributeContainerComponent],
      providers: [
        {
          provide: ConfiguratorUISettingsConfig,
          useValue: defaultConfiguratorUISettingsConfig,
        },
        {
          provide: ConfiguratorAttributeCompositionContext,
          useValue: ConfiguratorTestUtils.getAttributeContext(),
        },
        {
          provide: ConfiguratorStorefrontUtilsService,
          useValue: {},
        },
      ],
    })
      .overrideComponent(ConfiguratorAttributeContainerComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .overrideComponent(ConfiguratorAttributeContainerComponent, {
        remove: {
          imports: [IconComponent, ConfiguratorAttributeProductCardComponent],
        },
        add: { imports: [MockCxIconComponent, MockProductCardComponent] },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorAttributeContainerComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    component.attribute = createAttribute();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture?.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the container host element', () => {
    expect(htmlElem.querySelector('div')).toBeTruthy();
  });

  describe('product lists', () => {
    it('should return selected container rows', () => {
      expect(component.selectedProducts.length).toBe(1);
      expect(component.selectedProducts[0].id).toBe('row-1');
    });

    it('should return available container rows', () => {
      expect(component.availableProducts.length).toBe(2);
      expect(component.availableProducts[0].id).toBe('row-2');
    });

    it('should return empty lists when the container has no rows', () => {
      component.attribute = createAttribute([]);
      expect(component.selectedProducts).toEqual([]);
      expect(component.availableProducts).toEqual([]);
    });

    it('should return empty lists when the container is missing', () => {
      component.attribute = {
        ...createAttribute(),
        container: undefined,
      };
      expect(component.selectedProducts).toEqual([]);
      expect(component.availableProducts).toEqual([]);
    });
  });

  describe('accordion sections', () => {
    it('should render selected and available product sections', () => {
      CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-section',
        2
      );
    });

    it('should display the selected products count', () => {
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-title',
        'configurator.attribute.selectedProducts count:1'
      );
    });

    it('should display the available products count', () => {
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-title',
        'configurator.attribute.availableProducts count:2',
        1
      );
    });

    it('should expand both sections initially', () => {
      expect(component.selectedProductsExpanded).toBe(true);
      expect(component.availableProductsExpanded).toBe(true);
      CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-content',
        2
      );
    });

    it('should render toggle buttons when the lists are not empty', () => {
      CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-toggle',
        2
      );
    });

    it('should render the toggle icon in each section that has products', () => {
      const sections = htmlElem.querySelectorAll('.cx-section');

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        sections[0],
        '.cx-toggle cx-icon'
      );
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        sections[1],
        '.cx-toggle cx-icon'
      );
    });

    it('should hide the selected products toggle icon when there are no selected products', () => {
      component.attribute = createAttribute([
        {
          id: 'row-2',
          productName: 'Product B',
          selected: false,
        },
      ]);
      fixture.detectChanges();

      const sections = htmlElem.querySelectorAll('.cx-section');

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        sections[0],
        '.cx-toggle'
      );
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        sections[0],
        'cx-icon'
      );
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        sections[1],
        '.cx-toggle cx-icon'
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-title',
        'configurator.attribute.selectedProducts count:0'
      );
    });

    it('should hide the available products toggle icon when there are no available products', () => {
      component.attribute = createAttribute([
        {
          id: 'row-1',
          productName: 'Product A',
          selected: true,
        },
      ]);
      fixture.detectChanges();

      const sections = htmlElem.querySelectorAll('.cx-section');

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        sections[0],
        '.cx-toggle cx-icon'
      );
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        sections[1],
        '.cx-toggle'
      );
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        sections[1],
        'cx-icon'
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-title',
        'configurator.attribute.availableProducts count:0',
        1
      );
    });

    it('should hide both toggle icons when both lists are empty', () => {
      component.attribute = createAttribute([]);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-toggle'
      );
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-icon'
      );
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-content'
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-title',
        'configurator.attribute.selectedProducts count:0'
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-title',
        'configurator.attribute.availableProducts count:0',
        1
      );
    });
  });

  describe('toggleSelectedProducts', () => {
    it('should collapse and expand the selected products section', () => {
      component.toggleSelectedProducts();
      fixture.detectChanges();

      expect(component.selectedProductsExpanded).toBe(false);
      expect(component.selectedProductsToggleIcon).toBe(ICON_TYPE.EXPAND);
      CommonConfiguratorTestUtilsService.expectNumberOfElements(
        expect,
        htmlElem,
        '.cx-content',
        1
      );

      component.toggleSelectedProducts();
      fixture.detectChanges();

      expect(component.selectedProductsExpanded).toBe(true);
      expect(component.selectedProductsToggleIcon).toBe(ICON_TYPE.COLLAPSE);
      CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-content',
        2
      );
    });

    it('should collapse the selected products section when the toggle is clicked', () => {
      const toggle = htmlElem.querySelector('.cx-toggle') as HTMLButtonElement;
      toggle.click();
      fixture.detectChanges();

      expect(component.selectedProductsExpanded).toBe(false);
    });
  });

  describe('toggleAvailableProducts', () => {
    it('should collapse and expand the available products section', () => {
      component.toggleAvailableProducts();
      fixture.detectChanges();

      expect(component.availableProductsExpanded).toBe(false);
      expect(component.availableProductsToggleIcon).toBe(ICON_TYPE.EXPAND);

      component.toggleAvailableProducts();
      fixture.detectChanges();

      expect(component.availableProductsExpanded).toBe(true);
      expect(component.availableProductsToggleIcon).toBe(ICON_TYPE.COLLAPSE);
    });

    it('should collapse the available products section when the toggle is clicked', () => {
      const toggles = htmlElem.querySelectorAll('.cx-toggle');
      (toggles[1] as HTMLButtonElement).click();
      fixture.detectChanges();

      expect(component.availableProductsExpanded).toBe(false);
    });
  });

  describe('product cards', () => {
    it('should render a product card for each selected and available product', () => {
      CommonConfiguratorTestUtilsService.expectNumberOfElements(
        expect,
        htmlElem,
        'cx-configurator-attribute-product-card',
        3
      );
    });

    it('should render selected product cards in the selected section', () => {
      const selectedSection = htmlElem.querySelectorAll('.cx-content')[0];
      CommonConfiguratorTestUtilsService.expectNumberOfElements(
        expect,
        selectedSection,
        'cx-configurator-attribute-product-card',
        1
      );
    });

    it('should render available product cards in the available section', () => {
      const availableSection = htmlElem.querySelectorAll('.cx-content')[1];
      CommonConfiguratorTestUtilsService.expectNumberOfElements(
        expect,
        availableSection,
        'cx-configurator-attribute-product-card',
        2
      );
    });

    it('should hide product cards when a section is collapsed', () => {
      component.toggleSelectedProducts();
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectNumberOfElements(
        expect,
        htmlElem,
        'cx-configurator-attribute-product-card',
        2
      );
    });
  });

  describe('extractProductCardParameters', () => {
    it('should map a selected container row to product card options', () => {
      const row = component.selectedProducts[0];
      const options = component.extractProductCardParameters(
        row,
        0,
        component.selectedProducts.length
      );

      expect(options.multiSelect).toBe(true);
      expect(options.attributeId).toBe(1111);
      expect(options.attributeName).toBe('attributeName');
      expect(options.itemCount).toBe(1);
      expect(options.itemIndex).toBe(0);
      expect(options.productBoundValue).toEqual({
        valueCode: 'row-1',
        name: 'Product A',
        valueDisplay: 'Product A',
        productSystemId: 'SYS_A',
        selected: true,
      });
    });

    it('should map an available container row as unselected', () => {
      const row = component.availableProducts[0];
      const options = component.extractProductCardParameters(
        row,
        0,
        component.availableProducts.length
      );

      expect(options.itemCount).toBe(2);
      expect(options.productBoundValue.valueCode).toBe('row-2');
      expect(options.productBoundValue.selected).toBe(false);
      expect(options.productBoundValue.productSystemId).toBe('SYS_B');
    });
  });
});
