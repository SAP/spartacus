import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
  template: `
    <button
      type="button"
      class="btn btn-primary"
      (click)="handleSelect.emit()"
    ></button>
    <button
      type="button"
      class="btn btn-tertiary"
      (click)="handleDeselect.emit()"
    ></button>
    <button
      type="button"
      class="cx-product-card-actions-menu-item"
      data-row-action="DELETE"
      (click)="handleRowAction.emit(deleteAction)"
    ></button>
    <button
      type="button"
      class="cx-product-card-actions-menu-item"
      data-row-action="ADD"
      (click)="handleRowAction.emit(addAction)"
    ></button>
    <button
      type="button"
      class="cx-product-card-actions-menu-item"
      data-row-action="EDIT"
      (click)="handleRowAction.emit(editAction)"
    ></button>
    <button
      type="button"
      class="cx-product-card-actions-menu-item"
      data-row-action="COPY"
      (click)="handleRowAction.emit(copyAction)"
    ></button>
  `,
})
class MockProductCardComponent {
  @Input() productCardOptions: ConfiguratorAttributeProductCardComponentOptions;
  @Output() handleSelect = new EventEmitter<string>();
  @Output() handleDeselect = new EventEmitter<string>();
  @Output() handleRowAction =
    new EventEmitter<Configurator.ContainerRowAction>();

  deleteAction = Configurator.ContainerRowAction.DELETE;
  addAction = Configurator.ContainerRowAction.ADD;
  editAction = Configurator.ContainerRowAction.EDIT;
  copyAction = Configurator.ContainerRowAction.COPY;
}

class MockConfiguratorCommonsService {
  configuration$ = new BehaviorSubject(
    ConfiguratorTestUtils.createConfiguration('config-id')
  );

  addContainerRow(): void {}
  removeContainerRow(): void {}
  copyContainerRow(): void {}
  isConfigurationLoading(): Observable<boolean> {
    return of(false);
  }
  getConfiguration(): Observable<Configurator.Configuration> {
    return this.configuration$;
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

  function getProductCard(sectionIndex: number): HTMLElement {
    const sections = htmlElem.querySelectorAll('.cx-accordion');
    return sections[sectionIndex].querySelector(
      'cx-configurator-attribute-product-card'
    ) as HTMLElement;
  }

  function clickProductCardAction(
    sectionIndex: number,
    selector: string
  ): void {
    fixture.detectChanges();
    const button = getProductCard(sectionIndex).querySelector(
      selector
    ) as HTMLButtonElement;
    button.click();
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
          useValue: {
            isCartEntryOrGroupVisited: () => of(true),
          },
        },
      ],
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the container host element', () => {
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
      expect,
      htmlElem,
      'div',
      'id',
      component.createAttributeIdForConfigurator(component.attribute)
    );
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
    describe('with products in both sections', () => {
      beforeEach(() => {
        fixture.detectChanges();
      });

      it('should render selected and available product sections', () => {
        CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
          expect,
          htmlElem,
          '.cx-accordion',
          2
        );
      });

      it('should set ids on the selected and available product sections', () => {
        const sections = htmlElem.querySelectorAll('.cx-accordion');
        expect(sections[0].id).toBe(
          component.createAttributeUiKey(
            'selected-products',
            component.attribute.name
          )
        );
        expect(sections[1].id).toBe(
          component.createAttributeUiKey(
            'available-products',
            component.attribute.name
          )
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

        const icons = fixture.debugElement.queryAll(
          By.css('.cx-header button cx-icon')
        );
        expect(icons[0].componentInstance.type).toBe(ICON_TYPE.COLLAPSE);
        expect(icons[1].componentInstance.type).toBe(ICON_TYPE.COLLAPSE);
      });
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
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should collapse and expand the selected products section', () => {
      const toggle = htmlElem.querySelector(
        '.cx-header button'
      ) as HTMLButtonElement;
      toggle.click();
      fixture.detectChanges();

      expect(component.selectedProductsExpanded).toBe(false);
      expect(component.selectedProductsToggleIcon).toBe(ICON_TYPE.EXPAND);
      expect(
        fixture.debugElement.query(By.css('.cx-header button cx-icon'))
          .componentInstance.type
      ).toBe(ICON_TYPE.EXPAND);
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem.querySelectorAll('.cx-accordion')[0],
        'cx-configurator-attribute-product-card'
      );

      toggle.click();
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

      expect(component.availableProductsExpanded).toBe(false);
      expect(component.availableProductsToggleIcon).toBe(ICON_TYPE.EXPAND);

      component.toggleAvailableProducts();

      expect(component.availableProductsExpanded).toBe(true);
      expect(component.availableProductsToggleIcon).toBe(ICON_TYPE.COLLAPSE);
    });

    it('should collapse the available products section when the toggle is clicked', () => {
      fixture.detectChanges();
      const toggles = htmlElem.querySelectorAll('.cx-header button');
      (toggles[1] as HTMLButtonElement).click();
      fixture.detectChanges();

      expect(component.availableProductsExpanded).toBe(false);
      expect(
        fixture.debugElement.queryAll(By.css('.cx-header button cx-icon'))[1]
          .componentInstance.type
      ).toBe(ICON_TYPE.EXPAND);
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem.querySelectorAll('.cx-accordion')[1],
        'cx-configurator-attribute-product-card'
      );
      CommonConfiguratorTestUtilsService.expectNumberOfElements(
        expect,
        htmlElem.querySelectorAll('.cx-accordion')[0],
        'cx-configurator-attribute-product-card',
        1
      );
    });

    it('should close the available products drop-down when the section is collapsed', () => {
      component.isAvailableProductsDropdownOpen = true;
      component.availableProductsSearchTerm = 'Product';

      component.toggleAvailableProducts();

      expect(component.availableProductsExpanded).toBe(false);
      expect(component.isAvailableProductsDropdownOpen).toBe(false);
      expect(component.availableProductsSearchTerm).toBe('');
    });

    it('should not close the available products drop-down when the section is expanded', () => {
      component.availableProductsExpanded = false;
      component.isAvailableProductsDropdownOpen = true;
      component.availableProductsSearchTerm = 'Product';

      component.toggleAvailableProducts();

      expect(component.availableProductsExpanded).toBe(true);
      expect(component.isAvailableProductsDropdownOpen).toBe(true);
      expect(component.availableProductsSearchTerm).toBe('Product');
    });
  });

  describe('product cards', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

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

    it('should set configurator value ids on the product cards', () => {
      const cards = htmlElem.querySelectorAll(
        'cx-configurator-attribute-product-card'
      );
      expect(cards[0].id).toBe(
        component.createValueUiKey(
          'selected-products',
          component.attribute.name,
          'row-1'
        )
      );
      expect(cards[1].id).toBe(
        component.createValueUiKey(
          'available-products',
          component.attribute.name,
          '0'
        )
      );
      expect(cards[2].id).toBe(
        component.createValueUiKey(
          'available-products',
          component.attribute.name,
          '1'
        )
      );
    });

    it('should bind product card options for selected and available products', () => {
      const cards = fixture.debugElement.queryAll(
        By.directive(MockProductCardComponent)
      );

      expect(cards[0].componentInstance.productCardOptions).toEqual(
        component.extractProductCardParameters(
          component.selectedProducts[0],
          0,
          component.selectedProducts.length
        )
      );
      expect(cards[1].componentInstance.productCardOptions).toEqual(
        component.extractProductCardParameters(
          component.availableProducts[0],
          0,
          component.availableProducts.length
        )
      );
      expect(cards[2].componentInstance.productCardOptions).toEqual(
        component.extractProductCardParameters(
          component.availableProducts[1],
          1,
          component.availableProducts.length
        )
      );
    });

    it('should hide product cards when a section is collapsed', () => {
      const toggle = htmlElem.querySelector(
        '.cx-header button'
      ) as HTMLButtonElement;
      toggle.click();
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
      expect(options.attribute.attrCode).toBe(1111);
      expect(options.attribute.name).toBe('attributeName');
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

    it('should reflect selection state via containerRow.selected on all cards', () => {
      const selectedRow = component.selectedProducts[0];
      const selectedCardOptions = component.extractProductCardParameters(
        selectedRow,
        0,
        component.selectedProducts.length
      );
      const availableRow = component.availableProducts[0];
      const firstAvailableCardOptions = component.extractProductCardParameters(
        availableRow,
        0,
        component.availableProducts.length
      );
      const secondAvailableCardOptions = component.extractProductCardParameters(
        component.availableProducts[1],
        1,
        component.availableProducts.length
      );

      expect(selectedCardOptions.containerRow?.selected).toBe(true);
      expect(firstAvailableCardOptions.containerRow?.selected).toBeFalsy();
      expect(secondAvailableCardOptions.containerRow?.selected).toBeFalsy();
      expect(firstAvailableCardOptions.attribute.container?.rows).toBe(
        component.attribute.container?.rows
      );
      expect(firstAvailableCardOptions.attribute.required).toBe(
        component.attribute.required
      );
      expect(firstAvailableCardOptions.attribute.incomplete).toBe(
        component.attribute.incomplete
      );
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

    it('should pass the attribute label', () => {
      component.attribute.label = 'Container attribute';
      const options = component.extractProductCardParameters(
        component.selectedProducts[0],
        0,
        component.selectedProducts.length
      );

      expect(options.attributeLabel).toBe('Container attribute');
    });

    it('should treat a missing selected flag as unselected', () => {
      const options = component.extractProductCardParameters(
        {
          id: 'row-x',
          productName: 'Product X',
          productSystemId: 'SYS_X',
        },
        0,
        1
      );

      expect(options.productBoundValue.selected).toBe(false);
    });
  });

  describe('buildMessagesMap', () => {
    const rowGroupId = 'CONTAINER_ROW@1111@row-1';

    function configurationWithRowMessages(
      groupId: string,
      messages: Configurator.Message[]
    ): Configurator.Configuration {
      return {
        ...ConfiguratorTestUtils.createConfiguration('config-id'),
        groups: [
          {
            ...ConfiguratorTestUtils.createGroup(groupId),
            messages,
          },
        ],
      };
    }

    it('builds severity groups from row group messages on init', () => {
      component.attribute = createAttribute([
        {
          id: 'row-1',
          productName: 'Product A',
          productSystemId: 'SYS_A',
          selected: true,
          groupId: rowGroupId,
        },
      ]);
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        of(
          configurationWithRowMessages(rowGroupId, [
            {
              message: 'Too many units',
              severity: Configurator.MessageSeverity.ERROR,
            },
          ])
        )
      );

      component.ngOnInit();

      const options = component.extractProductCardParameters(
        component.selectedProducts[0],
        0,
        1
      );
      const errorGroup = options.messages?.find(
        (group) => group.uiKeyPrefix === 'error-msg'
      );
      expect(errorGroup?.messages).toEqual(['Too many units']);
      expect(errorGroup?.messageClass).toBe('cx-error-msg');
    });

    it('resolves messages from nested subgroups', () => {
      const nestedGroup = {
        ...ConfiguratorTestUtils.createGroup(rowGroupId),
        messages: [
          {
            message: 'Nested error',
            severity: Configurator.MessageSeverity.ERROR,
          },
        ],
      };
      component.attribute = createAttribute([
        {
          id: 'row-1',
          productName: 'Product A',
          productSystemId: 'SYS_A',
          selected: true,
          groupId: rowGroupId,
        },
      ]);
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        of({
          ...ConfiguratorTestUtils.createConfiguration('config-id'),
          groups: [
            {
              ...ConfiguratorTestUtils.createGroup('parent-group'),
              subGroups: [nestedGroup],
            },
          ],
        })
      );

      component.ngOnInit();

      const options = component.extractProductCardParameters(
        component.selectedProducts[0],
        0,
        1
      );
      expect(
        options.messages?.find((group) => group.uiKeyPrefix === 'error-msg')
          ?.messages
      ).toEqual(['Nested error']);
    });

    it('builds a separate map entry per container row', () => {
      const selectedRowGroupId = 'CONTAINER_ROW@1111@row-1';
      const availableRowGroupId = 'CONTAINER_ROW@1111@row-2';
      component.attribute = createAttribute([
        {
          id: 'row-1',
          productName: 'Product A',
          productSystemId: 'SYS_A',
          selected: true,
          groupId: selectedRowGroupId,
        },
        {
          id: 'row-2',
          productName: 'Product B',
          productSystemId: 'SYS_B',
          selected: false,
          groupId: availableRowGroupId,
        },
      ]);
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        of({
          ...ConfiguratorTestUtils.createConfiguration('config-id'),
          groups: [
            {
              ...ConfiguratorTestUtils.createGroup(selectedRowGroupId),
              messages: [
                {
                  message: 'Selected row error',
                  severity: Configurator.MessageSeverity.ERROR,
                },
              ],
            },
            {
              ...ConfiguratorTestUtils.createGroup(availableRowGroupId),
              messages: [
                {
                  message: 'Available row info',
                  severity: Configurator.MessageSeverity.INFO,
                },
              ],
            },
          ],
        })
      );

      component.ngOnInit();

      const selectedOptions = component.extractProductCardParameters(
        component.selectedProducts[0],
        0,
        1
      );
      const availableOptions = component.extractProductCardParameters(
        component.availableProducts[0],
        0,
        1
      );

      expect(
        selectedOptions.messages?.find(
          (group) => group.uiKeyPrefix === 'error-msg'
        )?.messages
      ).toEqual(['Selected row error']);
      expect(
        availableOptions.messages?.find(
          (group) => group.uiKeyPrefix === 'info-msg'
        )?.messages
      ).toEqual(['Available row info']);
    });

    it('updates row messages when configuration changes', () => {
      const configuration$ = new BehaviorSubject(
        configurationWithRowMessages(rowGroupId, [
          {
            message: 'Initial error',
            severity: Configurator.MessageSeverity.ERROR,
          },
        ])
      );
      component.attribute = createAttribute([
        {
          id: 'row-1',
          productName: 'Product A',
          productSystemId: 'SYS_A',
          selected: true,
          groupId: rowGroupId,
        },
      ]);
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        configuration$
      );
      component.ngOnInit();

      let options = component.extractProductCardParameters(
        component.selectedProducts[0],
        0,
        1
      );
      expect(
        options.messages?.find((group) => group.uiKeyPrefix === 'error-msg')
          ?.messages
      ).toEqual(['Initial error']);

      configuration$.next(
        configurationWithRowMessages(rowGroupId, [
          {
            message: 'Updated error',
            severity: Configurator.MessageSeverity.ERROR,
          },
        ])
      );

      options = component.extractProductCardParameters(
        component.selectedProducts[0],
        0,
        1
      );
      expect(
        options.messages?.find((group) => group.uiKeyPrefix === 'error-msg')
          ?.messages
      ).toEqual(['Updated error']);
    });
  });

  describe('getRowMessageGroups', () => {
    const selectedRowGroupId = 'CONTAINER_ROW@1111@row-1';
    const availableRowGroupId = 'CONTAINER_ROW@1111@row-2';

    function configurationWithMessages(
      groupId: string,
      messages: Configurator.Message[]
    ): Configurator.Configuration {
      return {
        ...ConfiguratorTestUtils.createConfiguration('config-id'),
        groups: [
          {
            ...ConfiguratorTestUtils.createGroup(groupId),
            messages,
          },
        ],
      };
    }

    function mockVisited(visited: boolean): void {
      const utils = TestBed.inject(ConfiguratorStorefrontUtilsService);
      spyOn(utils, 'isCartEntryOrGroupVisited').and.returnValue(of(visited));
    }

    describe('selected rows', () => {
      it('includes error severity groups from row group messages', () => {
        component.attribute = createAttribute([
          {
            id: 'row-1',
            productName: 'Product A',
            productSystemId: 'SYS_A',
            selected: true,
            groupId: selectedRowGroupId,
          },
        ]);
        spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
          of(
            configurationWithMessages(selectedRowGroupId, [
              {
                message: 'Some info',
                severity: Configurator.MessageSeverity.INFO,
              },
              {
                message: 'Too many units',
                severity: Configurator.MessageSeverity.ERROR,
              },
            ])
          )
        );

        component.ngOnInit();

        const options = component.extractProductCardParameters(
          component.selectedProducts[0],
          0,
          1
        );
        const prefixes = options.messages?.map((group) => group.uiKeyPrefix);
        expect(prefixes).toContain('error-msg');
        expect(prefixes).not.toContain('info-msg');
      });

      it('excludes container info messages', () => {
        component.attribute = {
          name: 'attributeName',
          attrCode: 1111,
          uiType: Configurator.UiType.CONTAINER,
          required: true,
          groupId: 'testGroup',
          container: {
            maxRows: 4,
            rows: [
              {
                id: 'row-1',
                productName: 'Product A',
                productSystemId: 'SYS_A',
                selected: true,
                groupId: selectedRowGroupId,
              },
            ],
          },
        };
        spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
          of(configurationWithMessages(selectedRowGroupId, []))
        );

        component.ngOnInit();

        const options = component.extractProductCardParameters(
          component.selectedProducts[0],
          0,
          1
        );
        expect(
          options.messages?.some(
            (group) => group.uiKeyPrefix === 'row-container-info-msg'
          )
        ).toBeFalsy();
      });

      it('excludes warning messages', () => {
        component.attribute = createAttribute([
          {
            id: 'row-1',
            productName: 'Product A',
            productSystemId: 'SYS_A',
            selected: true,
            groupId: selectedRowGroupId,
          },
        ]);
        spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
          of(
            configurationWithMessages(selectedRowGroupId, [
              {
                message: 'Too many units',
                severity: Configurator.MessageSeverity.WARNING,
              },
            ])
          )
        );

        component.ngOnInit();

        const options = component.extractProductCardParameters(
          component.selectedProducts[0],
          0,
          1
        );
        expect(
          options.messages?.map((group) => group.uiKeyPrefix)
        ).not.toContain('warning-msg');
      });
    });

    describe('unselected rows', () => {
      it('prepends container info when row bounds are set', () => {
        component.attribute = {
          name: 'attributeName',
          attrCode: 1111,
          uiType: Configurator.UiType.CONTAINER,
          required: true,
          groupId: 'testGroup',
          container: {
            rows: [
              {
                id: 'row-2',
                productName: 'Product B',
                productSystemId: 'SYS_B',
                selected: false,
                groupId: availableRowGroupId,
                maxRows: 4,
              },
            ],
          },
        };
        spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
          of(configurationWithMessages(availableRowGroupId, []))
        );

        component.ngOnInit();

        const options = component.extractProductCardParameters(
          component.availableProducts[0],
          0,
          1
        );
        expect(options.messages?.map((group) => group.uiKeyPrefix)).toContain(
          'row-container-info-msg'
        );
      });

      it('includes info and excludes engine errors', () => {
        component.attribute = {
          name: 'attributeName',
          attrCode: 1111,
          uiType: Configurator.UiType.CONTAINER,
          groupId: 'testGroup',
          container: {
            rows: [
              {
                id: 'row-2',
                productName: 'Product B',
                productSystemId: 'SYS_B',
                selected: false,
                groupId: availableRowGroupId,
              },
            ],
          },
        };
        spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
          of(
            configurationWithMessages(availableRowGroupId, [
              {
                message: 'Some info',
                severity: Configurator.MessageSeverity.INFO,
              },
              {
                message: 'Engine error',
                severity: Configurator.MessageSeverity.ERROR,
              },
            ])
          )
        );

        component.ngOnInit();

        const options = component.extractProductCardParameters(
          component.availableProducts[0],
          0,
          1
        );
        const prefixes = options.messages?.map((group) => group.uiKeyPrefix);
        expect(prefixes).toContain('info-msg');
        expect(prefixes).not.toContain('error-msg');
      });

      it('includes warning messages', () => {
        component.attribute = {
          name: 'attributeName',
          attrCode: 1111,
          uiType: Configurator.UiType.CONTAINER,
          groupId: 'testGroup',
          container: {
            rows: [
              {
                id: 'row-2',
                productName: 'Product B',
                productSystemId: 'SYS_B',
                selected: false,
                groupId: availableRowGroupId,
              },
            ],
          },
        };
        spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
          of(
            configurationWithMessages(availableRowGroupId, [
              {
                message: 'Too many units',
                severity: Configurator.MessageSeverity.WARNING,
              },
            ])
          )
        );

        component.ngOnInit();

        const options = component.extractProductCardParameters(
          component.availableProducts[0],
          0,
          1
        );
        expect(options.messages?.map((group) => group.uiKeyPrefix)).toContain(
          'warning-msg'
        );
      });

      it('places container info and required before engine messages', () => {
        mockVisited(true);
        component.attribute = {
          name: 'attributeName',
          attrCode: 1111,
          uiType: Configurator.UiType.CONTAINER,
          required: true,
          incomplete: true,
          groupId: 'testGroup',
          container: {
            minRows: 2,
            rows: [
              {
                id: 'row-2',
                productName: 'Product B',
                productSystemId: 'SYS_B',
                selected: false,
                groupId: availableRowGroupId,
                minRows: 2,
                maxRows: 4,
              },
            ],
          },
        };
        spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
          of(
            configurationWithMessages(availableRowGroupId, [
              {
                message: 'Engine info',
                severity: Configurator.MessageSeverity.INFO,
              },
            ])
          )
        );

        component.ngOnInit();

        const options = component.extractProductCardParameters(
          component.availableProducts[0],
          0,
          1
        );
        expect(options.messages?.map((group) => group.uiKeyPrefix)).toEqual([
          'row-container-info-msg',
          'row-required-msg',
          'info-msg',
        ]);
        expect(
          options.messages?.find(
            (group) => group.uiKeyPrefix === 'row-container-info-msg'
          )?.messageClass
        ).toBe('cx-container-info-msg');
        expect(
          options.messages?.find(
            (group) => group.uiKeyPrefix === 'row-required-msg'
          )?.messageClass
        ).toBe('cx-container-error-msg');
      });
    });

    describe('without row groupId', () => {
      it('returns empty groups when row has no groupId', () => {
        component.attribute = createAttribute([
          {
            id: 'row-1',
            productName: 'Product A',
            productSystemId: 'SYS_A',
            selected: true,
          },
        ]);
        spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
          of(ConfiguratorTestUtils.createConfiguration('config-id'))
        );

        component.ngOnInit();

        const options = component.extractProductCardParameters(
          component.selectedProducts[0],
          0,
          1
        );
        expect(options.messages).toEqual([]);
      });

      it('returns empty groups when row is not in the cache', () => {
        const options = component.extractProductCardParameters(
          {
            id: 'unknown-row',
            productName: 'Product Z',
            productSystemId: 'SYS_Z',
            selected: false,
          },
          0,
          1
        );

        expect(options.messages).toEqual([]);
      });
    });

    describe('required message gating', () => {
      it('prepends required message when visited, required and incomplete', () => {
        mockVisited(true);
        component.attribute = {
          name: 'attributeName',
          attrCode: 1111,
          uiType: Configurator.UiType.CONTAINER,
          required: true,
          incomplete: true,
          groupId: 'testGroup',
          container: {
            minRows: 2,
            rows: [
              {
                id: 'row-2',
                productName: 'Product B',
                productSystemId: 'SYS_B',
                selected: false,
                groupId: availableRowGroupId,
                minRows: 2,
              },
            ],
          },
        };
        spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
          of(configurationWithMessages(availableRowGroupId, []))
        );

        component.ngOnInit();

        const options = component.extractProductCardParameters(
          component.availableProducts[0],
          0,
          1
        );
        expect(options.messages?.map((group) => group.uiKeyPrefix)).toContain(
          'row-required-msg'
        );
      });

      it('omits required message when parent group has no id', () => {
        TestBed.inject(ConfiguratorAttributeCompositionContext).group = {
          id: undefined as unknown as string,
          subGroups: [],
        };
        component.attribute = {
          name: 'attributeName',
          attrCode: 1111,
          uiType: Configurator.UiType.CONTAINER,
          required: true,
          incomplete: true,
          groupId: 'testGroup',
          container: {
            minRows: 2,
            rows: [
              {
                id: 'row-2',
                productName: 'Product B',
                productSystemId: 'SYS_B',
                selected: false,
                groupId: availableRowGroupId,
                minRows: 2,
              },
            ],
          },
        };
        spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
          of(configurationWithMessages(availableRowGroupId, []))
        );

        component.ngOnInit();

        const options = component.extractProductCardParameters(
          component.availableProducts[0],
          0,
          1
        );
        expect(
          options.messages?.map((group) => group.uiKeyPrefix)
        ).not.toContain('row-required-msg');
      });

      it('omits required message when group has not been visited', () => {
        mockVisited(false);
        component.attribute = {
          name: 'attributeName',
          attrCode: 1111,
          uiType: Configurator.UiType.CONTAINER,
          required: true,
          incomplete: true,
          groupId: 'testGroup',
          container: {
            minRows: 2,
            rows: [
              {
                id: 'row-2',
                productName: 'Product B',
                productSystemId: 'SYS_B',
                selected: false,
                groupId: availableRowGroupId,
                minRows: 2,
              },
            ],
          },
        };
        spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
          of(configurationWithMessages(availableRowGroupId, []))
        );

        component.ngOnInit();

        const options = component.extractProductCardParameters(
          component.availableProducts[0],
          0,
          1
        );
        expect(
          options.messages?.map((group) => group.uiKeyPrefix)
        ).not.toContain('row-required-msg');
      });

      it('omits required message when attribute is complete', () => {
        mockVisited(true);
        component.attribute = {
          name: 'attributeName',
          attrCode: 1111,
          uiType: Configurator.UiType.CONTAINER,
          required: true,
          incomplete: false,
          groupId: 'testGroup',
          container: {
            minRows: 2,
            rows: [
              {
                id: 'row-2',
                productName: 'Product B',
                productSystemId: 'SYS_B',
                selected: false,
                groupId: availableRowGroupId,
                minRows: 2,
              },
            ],
          },
        };
        spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
          of(configurationWithMessages(availableRowGroupId, []))
        );

        component.ngOnInit();

        const options = component.extractProductCardParameters(
          component.availableProducts[0],
          0,
          1
        );
        expect(
          options.messages?.map((group) => group.uiKeyPrefix)
        ).not.toContain('row-required-msg');
      });
    });
  });

  describe('onAdd', () => {
    it('should call addContainerRow when the `ADD` button is clicked', () => {
      spyOn(configuratorCommonsService, 'addContainerRow');

      clickProductCardAction(1, '.btn-primary');

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

      clickProductCardAction(1, '.btn-primary');

      expect(configuratorCommonsService.addContainerRow).toHaveBeenCalledWith(
        component.ownerKey,
        1111,
        'SYS_B',
        'parent-1'
      );
    });

    it('should set loading$ before calling addContainerRow', () => {
      spyOn(configuratorCommonsService, 'addContainerRow');

      clickProductCardAction(1, '.btn-primary');

      expect(component.loading$.value).toBe(true);
    });

    it('should not call addContainerRow when productSystemId is missing', () => {
      spyOn(configuratorCommonsService, 'addContainerRow');
      component.attribute = createAttribute([
        {
          id: 'row-without-product',
          productName: 'Incomplete product',
          selected: false,
        },
      ]);

      clickProductCardAction(1, '.btn-primary');

      expect(configuratorCommonsService.addContainerRow).not.toHaveBeenCalled();
      expect(component.loading$.value).toBe(false);
    });
  });

  describe('onRemove', () => {
    it('should call removeContainerRow when the `REMOVE` button is clicked', () => {
      spyOn(configuratorCommonsService, 'removeContainerRow');

      clickProductCardAction(0, '.btn-tertiary');

      expect(
        configuratorCommonsService.removeContainerRow
      ).toHaveBeenCalledWith(component.ownerKey, 'row-1');
    });

    it('should set loading$ before calling removeContainerRow', () => {
      spyOn(configuratorCommonsService, 'removeContainerRow');

      clickProductCardAction(0, '.btn-tertiary');

      expect(component.loading$.value).toBe(true);
    });
  });

  describe('onCopy', () => {
    it('should call copyContainerRow when the `COPY` action is clicked', () => {
      spyOn(configuratorCommonsService, 'copyContainerRow');

      clickProductCardAction(0, '[data-row-action="COPY"]');

      expect(configuratorCommonsService.copyContainerRow).toHaveBeenCalledWith(
        component.ownerKey,
        'row-1'
      );
    });

    it('should set loading$ before calling copyContainerRow', () => {
      spyOn(configuratorCommonsService, 'copyContainerRow');

      clickProductCardAction(0, '[data-row-action="COPY"]');

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
    it('should remove row when `DELETE` is clicked', () => {
      spyOn(configuratorCommonsService, 'removeContainerRow');

      clickProductCardAction(0, '[data-row-action="DELETE"]');

      expect(
        configuratorCommonsService.removeContainerRow
      ).toHaveBeenCalledWith(component.ownerKey, 'row-1');
    });

    it('should add row when `ADD` is clicked', () => {
      spyOn(configuratorCommonsService, 'addContainerRow');

      clickProductCardAction(1, '[data-row-action="ADD"]');

      expect(configuratorCommonsService.addContainerRow).toHaveBeenCalledWith(
        component.ownerKey,
        1111,
        'SYS_B',
        undefined
      );
    });

    it('should edit row when `EDIT` is clicked', () => {
      spyOn(component, 'onEdit');

      clickProductCardAction(0, '[data-row-action="EDIT"]');

      expect(component.onEdit).toHaveBeenCalledWith(
        component.selectedProducts[0]
      );
    });

    it('should copy row when `COPY` is clicked', () => {
      spyOn(configuratorCommonsService, 'copyContainerRow');

      clickProductCardAction(0, '[data-row-action="COPY"]');

      expect(configuratorCommonsService.copyContainerRow).toHaveBeenCalledWith(
        component.ownerKey,
        'row-1'
      );
    });

    it('should ignore an unknown row action', () => {
      spyOn(configuratorCommonsService, 'addContainerRow');
      spyOn(configuratorCommonsService, 'removeContainerRow');
      spyOn(configuratorCommonsService, 'copyContainerRow');
      spyOn(component, 'onEdit');

      component.onRowAction(
        component.selectedProducts[0],
        'UNKNOWN' as Configurator.ContainerRowAction
      );

      expect(configuratorCommonsService.addContainerRow).not.toHaveBeenCalled();
      expect(
        configuratorCommonsService.removeContainerRow
      ).not.toHaveBeenCalled();
      expect(
        configuratorCommonsService.copyContainerRow
      ).not.toHaveBeenCalled();
      expect(component.onEdit).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should set the selected products toggle aria-label to collapse when the section is expanded', () => {
      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        '.cx-header button',
        'aria-label',
        'configurator.a11y.collapseSelectedProducts'
      );
      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        '.cx-header button',
        'aria-expanded',
        'true'
      );
      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        '.cx-header button',
        'aria-controls',
        component.createAttributeUiKey(
          'selected-products',
          component.attribute.name
        )
      );
    });

    it('should set the selected products toggle aria-label to expand when the section is collapsed', () => {
      const toggle = htmlElem.querySelector(
        '.cx-header button'
      ) as HTMLButtonElement;
      toggle.click();
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        '.cx-header button',
        'aria-label',
        'configurator.a11y.expandSelectedProducts'
      );
      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        '.cx-header button',
        'aria-expanded',
        'false'
      );
    });

    it('should set the available products toggle aria-label to collapse when the section is expanded', () => {
      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        '.cx-header button',
        'aria-label',
        'configurator.a11y.collapseAvailableProducts',
        1
      );
      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        '.cx-header button',
        'aria-expanded',
        'true',
        1
      );
      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        '.cx-header button',
        'aria-controls',
        component.createAttributeUiKey(
          'available-products',
          component.attribute.name
        ),
        1
      );
    });

    it('should set the available products toggle aria-label to expand when the section is collapsed', () => {
      const toggles = htmlElem.querySelectorAll('.cx-header button');
      (toggles[1] as HTMLButtonElement).click();
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        '.cx-header button',
        'aria-label',
        'configurator.a11y.expandAvailableProducts',
        1
      );
      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        '.cx-header button',
        'aria-expanded',
        'false',
        1
      );
    });

    it('should expose section titles as headings', () => {
      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        '.cx-title',
        'role',
        'heading'
      );
      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        '.cx-title',
        'aria-level',
        '2'
      );
      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        '.cx-title',
        'role',
        'heading',
        1
      );
      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        '.cx-title',
        'aria-level',
        '2',
        1
      );
    });

    it('should hide toggle icons from the accessibility tree', () => {
      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        '.cx-header button cx-icon',
        'aria-hidden',
        'true'
      );
      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        '.cx-header button cx-icon',
        'aria-hidden',
        'true',
        1
      );
    });
  });

  describe('available products drop-down', () => {
    const DEFAULT_THRESHOLD =
      defaultConfiguratorUISettingsConfig.productConfigurator
        ?.cpqContainerDropDownListThreshold ?? 10;

    function createAvailableRows(count: number): Configurator.ContainerRow[] {
      return Array.from({ length: count }, (_, index) => ({
        id: `available-${index}`,
        productName: `Available ${index}`,
        productSystemId: `SYS_${index}`,
        selected: false,
      }));
    }

    function renderWithAvailableProducts(count: number): void {
      component.attribute = createAttribute(createAvailableRows(count));
      fixture.detectChanges();
    }

    function openDropdown(): void {
      (htmlElem.querySelector('.cx-trigger') as HTMLElement).click();
      fixture.detectChanges();
    }

    function typeSearchTerm(term: string): void {
      const searchInput = getSearchInput();
      searchInput.value = term;
      searchInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }

    function getSearchInput(): HTMLInputElement {
      return htmlElem.querySelector('.cx-search-input') as HTMLInputElement;
    }

    it('should render available products as a list when the count is not larger than the threshold', () => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD);

      expect(component.showAvailableProductsAsDropdown).toBe(false);
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-drop-down'
      );
      CommonConfiguratorTestUtilsService.expectNumberOfElements(
        expect,
        htmlElem,
        'cx-configurator-attribute-product-card',
        DEFAULT_THRESHOLD
      );
    });

    it('should render available products as a drop-down when the count is larger than the threshold', () => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);

      expect(component.showAvailableProductsAsDropdown).toBe(true);
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-drop-down'
      );
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-search-input'
      );
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-product-card'
      );
    });

    it('should show product cards after the drop-down is opened', () => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);
      openDropdown();

      expect(component.isAvailableProductsDropdownOpen).toBe(true);
      expect(component.availableProductsDropdownIcon).toBe(ICON_TYPE.CARET_UP);
      expect(
        fixture.debugElement.query(By.css('.cx-trigger button cx-icon'))
          .componentInstance.type
      ).toBe(ICON_TYPE.CARET_UP);
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-list'
      );
      CommonConfiguratorTestUtilsService.expectNumberOfElements(
        expect,
        htmlElem,
        'cx-configurator-attribute-product-card',
        DEFAULT_THRESHOLD + 1
      );
    });

    it('should open the drop-down when the trigger is clicked', () => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);
      openDropdown();

      expect(component.isAvailableProductsDropdownOpen).toBe(true);
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-list'
      );
    });

    it('should toggle the drop-down when the caret button is clicked', () => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);

      const caret = htmlElem.querySelector(
        '.cx-trigger button'
      ) as HTMLButtonElement;
      caret.click();
      fixture.detectChanges();

      expect(component.isAvailableProductsDropdownOpen).toBe(true);

      caret.click();
      fixture.detectChanges();

      expect(component.isAvailableProductsDropdownOpen).toBe(false);
      expect(component.availableProductsDropdownIcon).toBe(
        ICON_TYPE.CARET_DOWN
      );
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-list'
      );
    });

    it('should filter available products by the search term while the drop-down is open', () => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);
      openDropdown();
      typeSearchTerm(`Available ${DEFAULT_THRESHOLD}`);

      expect(component.availableProductsSearchTerm).toBe(
        `Available ${DEFAULT_THRESHOLD}`
      );
      expect(component.filteredAvailableProducts.length).toBe(1);
      expect(component.filteredAvailableProducts[0].id).toBe(
        `available-${DEFAULT_THRESHOLD}`
      );
      CommonConfiguratorTestUtilsService.expectNumberOfElements(
        expect,
        htmlElem,
        'cx-configurator-attribute-product-card',
        1
      );
    });

    it('should return all available products when the drop-down is closed', () => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);
      component.availableProductsSearchTerm = 'Available 7';

      expect(component.filteredAvailableProducts.length).toBe(
        DEFAULT_THRESHOLD + 1
      );
    });

    it('should show a no-results message when the search does not match', () => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);
      openDropdown();
      typeSearchTerm('does-not-exist');

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-no-results'
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-no-results',
        'configurator.attribute.noAvailableProductsFound'
      );
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-product-card'
      );
    });

    it('should return the original index of a filtered available product', () => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);
      const row = component.availableProducts[DEFAULT_THRESHOLD];

      expect(component.getAvailableProductIndex(row)).toBe(DEFAULT_THRESHOLD);
    });

    it('should return -1 when the available product is not found', () => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);

      expect(
        component.getAvailableProductIndex({
          id: 'missing-row',
        })
      ).toBe(-1);
    });

    it('should bind the original index on a filtered drop-down product card', () => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);
      openDropdown();
      typeSearchTerm(`Available ${DEFAULT_THRESHOLD}`);

      const card = fixture.debugElement.query(
        By.directive(MockProductCardComponent)
      );
      expect(card.componentInstance.productCardOptions.itemIndex).toBe(
        DEFAULT_THRESHOLD
      );
      expect(card.componentInstance.productCardOptions.itemCount).toBe(
        DEFAULT_THRESHOLD + 1
      );
    });

    it('should use the configured drop-down threshold', () => {
      component['configuratorUISettingsConfig'] = {
        productConfigurator: { cpqContainerDropDownListThreshold: 1 },
      };
      component.attribute = createAttribute(createAvailableRows(2));
      fixture.detectChanges();

      expect(component.showAvailableProductsAsDropdown).toBe(true);
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-drop-down'
      );
    });

    it('should fall back to a threshold of 10 when the configuration is missing', () => {
      component['configuratorUISettingsConfig'] = {};
      component.attribute = createAttribute(createAvailableRows(2));

      expect(component.showAvailableProductsAsDropdown).toBe(false);
    });

    it('should stop click events from bubbling when the drop-down is opened', () => {
      const event = new Event('click');
      spyOn(event, 'stopPropagation');

      component.openAvailableProductsDropdown(event);

      expect(event.stopPropagation).toHaveBeenCalled();
      expect(component.isAvailableProductsDropdownOpen).toBe(true);
    });

    it('should stop click events from bubbling when the drop-down is toggled', () => {
      const event = new Event('click');
      spyOn(event, 'stopPropagation');

      component.toggleAvailableProductsDropdown(event);

      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should clear the search term when the drop-down is closed with the caret button', () => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);
      openDropdown();
      component.availableProductsSearchTerm = 'Available';

      const caret = htmlElem.querySelector(
        '.cx-trigger button'
      ) as HTMLButtonElement;
      caret.click();
      fixture.detectChanges();

      expect(component.isAvailableProductsDropdownOpen).toBe(false);
      expect(component.availableProductsSearchTerm).toBe('');
    });

    it('should focus the search input when the drop-down is opened', fakeAsync(() => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);
      const searchInput = getSearchInput();
      spyOn(searchInput, 'focus');

      component.openAvailableProductsDropdown(new Event('click'));
      tick();

      expect(searchInput.focus).toHaveBeenCalled();
    }));

    it('should focus the search input when the drop-down is opened with the caret button', fakeAsync(() => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);
      const searchInput = getSearchInput();
      spyOn(searchInput, 'focus');

      component.toggleAvailableProductsDropdown(new Event('click'));
      tick();

      expect(searchInput.focus).toHaveBeenCalled();
    }));

    it('should make the search input writable and update its placeholder when the drop-down is open', () => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);
      const searchInput = getSearchInput();

      expect(searchInput.readOnly).toBe(true);
      expect(searchInput.placeholder).toBe(
        'configurator.attribute.selectAvailableProducts'
      );

      openDropdown();

      expect(searchInput.readOnly).toBe(false);
      expect(searchInput.placeholder).toBe(
        'configurator.attribute.searchAvailableProducts'
      );
    });

    it('should open the drop-down when the search input is focused', () => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);

      getSearchInput().dispatchEvent(new Event('focus'));
      fixture.detectChanges();

      expect(component.isAvailableProductsDropdownOpen).toBe(true);
    });

    it('should keep the drop-down open when clicking the search input', () => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);
      openDropdown();

      getSearchInput().click();
      fixture.detectChanges();

      expect(component.isAvailableProductsDropdownOpen).toBe(true);
    });

    it('should keep the drop-down open when clicking inside the panel', () => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);
      openDropdown();

      (htmlElem.querySelector('.cx-list') as HTMLElement).click();
      fixture.detectChanges();

      expect(component.isAvailableProductsDropdownOpen).toBe(true);
    });

    it('should close the drop-down when clicking outside of it', () => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);
      openDropdown();
      component.availableProductsSearchTerm = 'Available';

      htmlElem.ownerDocument.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(component.isAvailableProductsDropdownOpen).toBe(false);
      expect(component.availableProductsSearchTerm).toBe('');
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-list'
      );
    });

    it('should hide the drop-down when the available products section is collapsed', () => {
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);
      const toggle = htmlElem.querySelector(
        '.cx-header button'
      ) as HTMLButtonElement;
      toggle.click();
      fixture.detectChanges();

      expect(component.availableProductsExpanded).toBe(false);
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-drop-down'
      );
    });

    it('should add a product from a drop-down product card', () => {
      spyOn(configuratorCommonsService, 'addContainerRow');
      renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);
      openDropdown();

      clickProductCardAction(1, '.btn-primary');

      expect(configuratorCommonsService.addContainerRow).toHaveBeenCalledWith(
        component.ownerKey,
        1111,
        'SYS_0',
        undefined
      );
    });

    describe('filteredAvailableProducts', () => {
      beforeEach(() => {
        renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);
        component.isAvailableProductsDropdownOpen = true;
      });

      it('should return all available products when the search term is empty', () => {
        component.availableProductsSearchTerm = '';

        expect(component.filteredAvailableProducts.length).toBe(
          DEFAULT_THRESHOLD + 1
        );
      });

      it('should return all available products when the search term is whitespace', () => {
        component.availableProductsSearchTerm = '   ';

        expect(component.filteredAvailableProducts.length).toBe(
          DEFAULT_THRESHOLD + 1
        );
      });

      it('should match the product name case-insensitively', () => {
        component.availableProductsSearchTerm = 'available 0';

        expect(component.filteredAvailableProducts.length).toBe(1);
        expect(component.filteredAvailableProducts[0].id).toBe('available-0');
      });

      it('should match the row id', () => {
        component.availableProductsSearchTerm = `available-${DEFAULT_THRESHOLD}`;

        expect(component.filteredAvailableProducts.length).toBe(1);
        expect(component.filteredAvailableProducts[0].id).toBe(
          `available-${DEFAULT_THRESHOLD}`
        );
      });

      it('should match the product system id', () => {
        component.availableProductsSearchTerm = 'SYS_2';

        expect(component.filteredAvailableProducts.length).toBe(1);
        expect(component.filteredAvailableProducts[0].id).toBe('available-2');
      });

      it('should ignore undefined searchable fields', () => {
        component.attribute = createAttribute([
          { id: 'only-id', selected: false },
          {
            id: 'named',
            productName: 'Named product',
            selected: false,
          },
        ]);
        component.availableProductsSearchTerm = 'only-id';

        expect(component.filteredAvailableProducts.length).toBe(1);
        expect(component.filteredAvailableProducts[0].id).toBe('only-id');
      });
    });

    describe('Accessibility', () => {
      beforeEach(() => {
        renderWithAvailableProducts(DEFAULT_THRESHOLD + 1);
      });

      it('should set the search input aria-label to the available products listbox', () => {
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-search-input',
          'aria-label',
          `configurator.a11y.listbox count:${DEFAULT_THRESHOLD + 1}`
        );
      });

      it('should set the drop-down trigger aria-expanded to false when the panel is closed', () => {
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-trigger',
          'aria-expanded',
          'false'
        );
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-trigger button',
          'aria-expanded',
          'false'
        );
      });

      it('should set the drop-down trigger aria-expanded to true when the panel is open', () => {
        openDropdown();

        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-trigger',
          'aria-expanded',
          'true'
        );
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-trigger button',
          'aria-expanded',
          'true'
        );
      });

      it('should set the caret button aria-label', () => {
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-trigger button',
          'aria-label',
          'configurator.a11y.toggleAvailableProductsDropdown'
        );
      });

      it('should hide the drop-down caret icon from the accessibility tree', () => {
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-trigger button cx-icon',
          'aria-hidden',
          'true'
        );
      });
    });
  });
});
