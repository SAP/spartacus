import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../../../core/facade/configurator-groups.service';
import { ConfiguratorUtilsService } from '../../../../core/facade/utils/configurator-utils.service';
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
  @Output() handleSelect = new EventEmitter<string>();
  @Output() handleDeselect = new EventEmitter<string>();
  @Output() handleRowAction =
    new EventEmitter<Configurator.ContainerRowAction>();
}

class MockConfiguratorCommonsService {
  addContainerRow(): void {}
  removeContainerRow(): void {}
  isConfigurationLoading(): Observable<boolean> {
    return of(false);
  }
  getConfiguration(): Observable<Configurator.Configuration> {
    return of(ConfiguratorTestUtils.createConfiguration('config-id'));
  }
}

class MockConfiguratorGroupsService {
  navigateToGroup(): void {}
}

describe('ConfiguratorAttributeContainerComponent', () => {
  let component: ConfiguratorAttributeContainerComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeContainerComponent>;
  let htmlElem: HTMLElement;
  let configuratorCommonsService: ConfiguratorCommonsService;
  let configuratorGroupsService: ConfiguratorGroupsService;

  const rowGroupId = 'CONTAINER_ROW@1111@row-1';
  const firstTabId = 'CONTAINER_ROW@1111@row-1@1';
  const secondTabId = 'CONTAINER_ROW@1111@row-1@2';

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
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
        {
          provide: ConfiguratorGroupsService,
          useClass: MockConfiguratorGroupsService,
        },
        ConfiguratorUtilsService,
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
    configuratorCommonsService = TestBed.inject(ConfiguratorCommonsService);
    configuratorGroupsService = TestBed.inject(ConfiguratorGroupsService);
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
        '.cx-accordion',
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
      const sections = htmlElem.querySelectorAll('.cx-accordion');
      CommonConfiguratorTestUtilsService.expectNumberOfElements(
        expect,
        sections[0],
        'cx-configurator-attribute-product-card',
        1
      );
      CommonConfiguratorTestUtilsService.expectNumberOfElements(
        expect,
        sections[1],
        'cx-configurator-attribute-product-card',
        2
      );
    });

    it('should render toggle buttons when the lists are not empty', () => {
      CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-header button',
        2
      );
    });

    it('should render the toggle icon in each section that has products', () => {
      const sections = htmlElem.querySelectorAll('.cx-accordion');

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        sections[0],
        '.cx-header button cx-icon'
      );
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        sections[1],
        '.cx-header button cx-icon'
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

      const sections = htmlElem.querySelectorAll('.cx-accordion');

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        sections[0],
        '.cx-header button'
      );
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        sections[0],
        'cx-icon'
      );
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        sections[1],
        '.cx-header button cx-icon'
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

      const sections = htmlElem.querySelectorAll('.cx-accordion');

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        sections[0],
        '.cx-header button cx-icon'
      );
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        sections[1],
        '.cx-header button'
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
        '.cx-header button'
      );
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-icon'
      );
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-product-card'
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
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem.querySelectorAll('.cx-accordion')[0],
        'cx-configurator-attribute-product-card'
      );

      component.toggleSelectedProducts();
      fixture.detectChanges();

      expect(component.selectedProductsExpanded).toBe(true);
      expect(component.selectedProductsToggleIcon).toBe(ICON_TYPE.COLLAPSE);
      CommonConfiguratorTestUtilsService.expectNumberOfElements(
        expect,
        htmlElem.querySelectorAll('.cx-accordion')[0],
        'cx-configurator-attribute-product-card',
        1
      );
    });

    it('should collapse the selected products section when the toggle is clicked', () => {
      const toggle = htmlElem.querySelector(
        '.cx-header button'
      ) as HTMLButtonElement;
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
      const toggles = htmlElem.querySelectorAll('.cx-header button');
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
      const selectedSection = htmlElem.querySelectorAll('.cx-accordion')[0];
      CommonConfiguratorTestUtilsService.expectNumberOfElements(
        expect,
        selectedSection,
        'cx-configurator-attribute-product-card',
        1
      );
    });

    it('should render available product cards in the available section', () => {
      const availableSection = htmlElem.querySelectorAll('.cx-accordion')[1];
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

    it('should include loading$', () => {
      const options = component.extractProductCardParameters(
        component.availableProducts[0],
        0,
        component.availableProducts.length
      );

      expect(options.loading$).toBe(component.loading$);
    });

    it('should pass the container row to the product card', () => {
      const row = component.selectedProducts[0];
      const options = component.extractProductCardParameters(
        row,
        0,
        component.selectedProducts.length
      );

      expect(options.containerRow).toBe(row);
    });
  });

  describe('onAdd', () => {
    it('should call addContainerRow with owner key, attribute code and product system id', () => {
      spyOn(configuratorCommonsService, 'addContainerRow');

      component.onAdd(component.availableProducts[0]);

      expect(configuratorCommonsService.addContainerRow).toHaveBeenCalledWith(
        component.ownerKey,
        1111,
        'SYS_B',
        undefined
      );
    });

    it('should pass containerRowId as parent row id for nested containers', () => {
      spyOn(configuratorCommonsService, 'addContainerRow');
      component.attribute.containerRowId = 'parent-1';

      component.onAdd(component.availableProducts[0]);

      expect(configuratorCommonsService.addContainerRow).toHaveBeenCalledWith(
        component.ownerKey,
        1111,
        'SYS_B',
        'parent-1'
      );
    });

    it('should set loading$ before calling addContainerRow', () => {
      spyOn(configuratorCommonsService, 'addContainerRow');

      component.onAdd(component.availableProducts[0]);

      expect(component.loading$.value).toBe(true);
    });

    it('should not call addContainerRow when productSystemId is missing', () => {
      spyOn(configuratorCommonsService, 'addContainerRow');

      component.onAdd({
        id: 'row-without-product',
        productName: 'Incomplete product',
        selected: false,
      });

      expect(configuratorCommonsService.addContainerRow).not.toHaveBeenCalled();
      expect(component.loading$.value).toBe(false);
    });
  });

  describe('onRemove', () => {
    it('should call removeContainerRow with owner key and row id', () => {
      spyOn(configuratorCommonsService, 'removeContainerRow');

      component.onRemove(component.selectedProducts[0]);

      expect(
        configuratorCommonsService.removeContainerRow
      ).toHaveBeenCalledWith(component.ownerKey, 'row-1');
    });

    it('should set loading$ before calling removeContainerRow', () => {
      spyOn(configuratorCommonsService, 'removeContainerRow');

      component.onRemove(component.selectedProducts[0]);

      expect(component.loading$.value).toBe(true);
    });
  });

  describe('onEdit', () => {
    function createNestedRowGroup(
      subGroups: Configurator.Group[]
    ): Configurator.Group {
      return {
        id: rowGroupId,
        groupType: Configurator.GroupType.CONTAINER_ROW_GROUP,
        attributes: [],
        subGroups,
      };
    }

    function createConfigurationWithNestedRow(
      rowGroup?: Configurator.Group
    ): Configurator.Configuration {
      return {
        ...ConfiguratorTestUtils.createConfiguration('config-id'),
        groups: [
          {
            id: 'testGroup',
            attributes: [],
            subGroups: rowGroup ? [rowGroup] : [],
          },
        ],
      };
    }

    function createConfigurableRow(): Configurator.ContainerRow {
      return {
        id: 'row-1',
        productName: 'Product A',
        productSystemId: 'SYS_A',
        selected: true,
        groupId: rowGroupId,
      };
    }

    it('should navigate to the first tab of the nested configuration', () => {
      const configuration = createConfigurationWithNestedRow(
        createNestedRowGroup([
          {
            id: firstTabId,
            groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
            attributes: [],
            subGroups: [],
          },
          {
            id: secondTabId,
            groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
            attributes: [],
            subGroups: [],
          },
        ])
      );
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        of(configuration)
      );
      spyOn(configuratorGroupsService, 'navigateToGroup');

      component.onEdit(createConfigurableRow());

      expect(configuratorGroupsService.navigateToGroup).toHaveBeenCalledWith(
        configuration,
        firstTabId
      );
    });

    it('should not navigate when groupId is missing', () => {
      spyOn(configuratorCommonsService, 'getConfiguration');
      spyOn(configuratorGroupsService, 'navigateToGroup');

      component.onEdit(component.selectedProducts[0]);

      expect(
        configuratorCommonsService.getConfiguration
      ).not.toHaveBeenCalled();
      expect(configuratorGroupsService.navigateToGroup).not.toHaveBeenCalled();
    });

    it('should not navigate when the nested row group cannot be resolved', () => {
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        of(createConfigurationWithNestedRow())
      );
      spyOn(configuratorGroupsService, 'navigateToGroup');

      component.onEdit(createConfigurableRow());

      expect(configuratorGroupsService.navigateToGroup).not.toHaveBeenCalled();
    });

    it('should not navigate when the nested row group has no tabs', () => {
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        of(createConfigurationWithNestedRow(createNestedRowGroup([])))
      );
      spyOn(configuratorGroupsService, 'navigateToGroup');

      component.onEdit(createConfigurableRow());

      expect(configuratorGroupsService.navigateToGroup).not.toHaveBeenCalled();
    });
  });

  describe('onRowAction', () => {
    it('should remove row for `DELETE`', () => {
      spyOn(component, 'onRemove');
      const row = component.selectedProducts[0];

      component.onRowAction(row, Configurator.ContainerRowAction.DELETE);
      expect(component.onRemove).toHaveBeenCalledWith(row);
    });

    it('should add row for `ADD`', () => {
      spyOn(component, 'onAdd');
      const row = component.availableProducts[0];

      component.onRowAction(row, Configurator.ContainerRowAction.ADD);
      expect(component.onAdd).toHaveBeenCalledWith(row);
    });

    it('should edit row for `EDIT`', () => {
      spyOn(component, 'onEdit');
      const row = component.selectedProducts[0];

      component.onRowAction(row, Configurator.ContainerRowAction.EDIT);
      expect(component.onEdit).toHaveBeenCalledWith(row);
    });

    it('should ignore actions that are not yet handled', () => {
      spyOn(component, 'onRemove');
      spyOn(component, 'onAdd');
      spyOn(component, 'onEdit');

      component.onRowAction(
        component.selectedProducts[0],
        Configurator.ContainerRowAction.COPY
      );

      expect(component.onRemove).not.toHaveBeenCalled();
      expect(component.onAdd).not.toHaveBeenCalled();
      expect(component.onEdit).not.toHaveBeenCalled();
    });
  });
});
