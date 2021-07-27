import { Component } from '@angular/core';
import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { ConfiguratorAttributeBaseComponent } from './configurator-attribute-base.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorUiKeyGeneratorService } from './configurator-ui-key-generator.service';

@Component({
  selector: 'cx-configurator-attribute-base',
  template: 'test-configurator-attribute-base',
})
class ExampleConfiguratorAttributeBaseComponent extends ConfiguratorAttributeBaseComponent {
  constructor(
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected uiKeyGeneratorService: ConfiguratorUiKeyGeneratorService
  ) {
    super(quantityService, uiKeyGeneratorService);
  }
}

describe('ConfiguratorAttributeBaseComponent', () => {
  let component: ConfiguratorAttributeBaseComponent;
  let fixture: ComponentFixture<ExampleConfiguratorAttributeBaseComponent>;
  let configuratorAttributeQuantityService: ConfiguratorAttributeQuantityService;
  let configUiKeyGeneratorService: ConfiguratorUiKeyGeneratorService;

  const selectedValue = 'a';
  const ownerKey = 'theOwnerKey';
  const groupId = 'theGroupId';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ExampleConfiguratorAttributeBaseComponent],
        providers: [
          ConfiguratorAttributeQuantityService,
          ConfiguratorUiKeyGeneratorService,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ExampleConfiguratorAttributeBaseComponent
    );
    configuratorAttributeQuantityService = TestBed.inject(
      ConfiguratorAttributeQuantityService
    );
    spyOn(
      configuratorAttributeQuantityService,
      'withQuantity'
    ).and.callThrough();

    configUiKeyGeneratorService = TestBed.inject(
      ConfiguratorUiKeyGeneratorService
    );
    spyOn(configUiKeyGeneratorService, 'createValueUiKey').and.callThrough();
    spyOn(
      configUiKeyGeneratorService,
      'createAttributeValueIdForConfigurator'
    ).and.callThrough();
    spyOn(
      configUiKeyGeneratorService,
      'createAttributeIdForConfigurator'
    ).and.callThrough();
    spyOn(
      configUiKeyGeneratorService,
      'createAriaLabelledBy'
    ).and.callThrough();
    spyOn(configUiKeyGeneratorService, 'createFocusId').and.callThrough();
    spyOn(configUiKeyGeneratorService, 'getAttributeCode').and.callThrough();

    component = fixture.componentInstance;

    component.attribute = {
      name: 'attrName',
      attrCode: 444,
      dataType: Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL,
      selectedSingleValue: selectedValue,
      groupId: groupId,
    };
    component.ownerKey = ownerKey;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('withQuantity', () => {
    it('should not allow quantity', () => {
      component.attribute.uiType = Configurator.UiType.NOT_IMPLEMENTED;
      component.attribute.dataType = Configurator.DataType.NOT_IMPLEMENTED;
      fixture.detectChanges();
      expect(component.withQuantity).toBe(false);
    });

    it('should allow quantity', () => {
      component.attribute.uiType = Configurator.UiType.RADIOBUTTON_PRODUCT;
      fixture.detectChanges();
      expect(component.withQuantity).toBe(true);
    });
  });

  describe('onHandleQuantity', () => {
    it('should call emit of selectionChange onHandleQuantity', () => {
      const quantity = 2;
      spyOn(component.selectionChange, 'emit').and.callThrough();
      component.onHandleQuantity(quantity);

      expect(component.selectionChange.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          changedAttribute: jasmine.objectContaining({
            selectedSingleValue: selectedValue,
            groupId: groupId,
            quantity,
          }),
          ownerKey: ownerKey,
          updateType: Configurator.UpdateType.ATTRIBUTE_QUANTITY,
        })
      );
    });
  });
});
