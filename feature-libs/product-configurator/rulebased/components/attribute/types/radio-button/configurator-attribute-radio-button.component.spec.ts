import { ChangeDetectionStrategy, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { ItemCounterComponent } from '@spartacus/storefront';
import { ConfiguratorGroupsService } from '../../../../core/facade/configurator-groups.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeRadioButtonComponent } from './configurator-attribute-radio-button.component';

class MockGroupService {}

@Directive({
  selector: '[cxFocus]',
})
export class MockFocusDirective {
  @Input('cxFocus') protected config: any;
}

describe('ConfigAttributeRadioButtonComponent', () => {
  let component: ConfiguratorAttributeRadioButtonComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeRadioButtonComponent>;
  const ownerKey = 'theOwnerKey';
  const name = 'theName';
  const groupId = 'theGroupId';
  const changedSelectedValue = 'changedSelectedValue';
  const initialSelectedValue = 'initialSelectedValue';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeRadioButtonComponent,
          ItemCounterComponent,
          MockFocusDirective,
        ],
        imports: [I18nTestingModule, ReactiveFormsModule],
        providers: [
          ConfiguratorStorefrontUtilsService,
          {
            provide: ConfiguratorGroupsService,
            useClass: MockGroupService,
          },
        ],
      })
        .overrideComponent(ConfiguratorAttributeRadioButtonComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorAttributeRadioButtonComponent
    );

    component = fixture.componentInstance;

    component.attribute = {
      name: name,
      attrCode: 444,
      uiType: Configurator.UiType.RADIOBUTTON,
      selectedSingleValue: initialSelectedValue,
      groupId: groupId,
      quantity: 1,
      dataType: Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL,
    };

    component.ownerKey = ownerKey;
    spyOn(component, 'onHandleQuantity').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedSingleValue on init', () => {
    expect(component.attributeRadioButtonForm.value).toEqual(
      initialSelectedValue
    );
  });

  describe('onSelect', () => {
    it('should call emit of selectionChange onSelect', () => {
      spyOn(component.selectionChange, 'emit').and.callThrough();
      component.onSelect(changedSelectedValue);
      expect(component.selectionChange.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          ownerKey: ownerKey,
          changedAttribute: jasmine.objectContaining({
            name: name,
            selectedSingleValue: changedSelectedValue,
            uiType: Configurator.UiType.RADIOBUTTON,
            groupId: groupId,
          }),
        })
      );
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
            name: name,
            selectedSingleValue: initialSelectedValue,
            uiType: Configurator.UiType.RADIOBUTTON,
            groupId: groupId,
            quantity,
          }),
          ownerKey: ownerKey,
          updateType: Configurator.UpdateType.ATTRIBUTE_QUANTITY,
        })
      );
    });
  });

  describe('onChangeQuantity', () => {
    it('should call onHandleQuantity of event onChangeQuantity', () => {
      component.onChangeQuantity(2);
      expect(component.onHandleQuantity).toHaveBeenCalled();
    });

    it('should call onDeselect of event onChangeQuantity', () => {
      spyOn(component, 'onSelect');
      component.onChangeQuantity(0);
      expect(component.onSelect).toHaveBeenCalled();
    });
  });

  it('should allow quantity', () => {
    expect(component.withQuantity).toBe(true);
  });

  // TODO(#11681):remove this test when the quantityService will be a required dependency
  it('should not allow quantity when service is missing ', () => {
    component['quantityService'] = undefined;
    expect(component.withQuantity).toBe(false);
  });

  it('should allow quantity actions', () => {
    expect(component.disableQuantityActions).toBe(false);
  });

  // TODO(#11681):remove this test when the quantityService will be a required dependency
  it('should not allow quantity actions when service is missing ', () => {
    component['quantityService'] = undefined;
    expect(component.disableQuantityActions).toBe(true);
  });
});
