import { ChangeDetectionStrategy, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorGroupsService } from '../../../../core/facade/configurator-groups.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import { ConfiguratorAttributeRadioButtonComponent } from './configurator-attribute-radio-button.component';

class MockGroupService {}

@Directive({
  selector: '[cxFocus]',
})
export class MockFocusDirective {
  @Input('cxFocus') protected config;
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
          MockFocusDirective,
        ],
        imports: [ReactiveFormsModule],
        providers: [
          ConfiguratorAttributeBaseComponent,
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
    };
    component.ownerKey = ownerKey;
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
