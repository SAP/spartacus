import { ChangeDetectionStrategy, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CommonConfigurator } from '@spartacus/product/configurators/common';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import { ConfiguratorAttributeInputFieldComponent } from './configurator-attribute-input-field.component';

@Directive({
  selector: '[cxFocus]',
})
export class MockFocusDirective {
  @Input('cxFocus') protected config;
}

describe('ConfigAttributeInputFieldComponent', () => {
  let component: ConfiguratorAttributeInputFieldComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeInputFieldComponent>;
  const ownerKey = 'theOwnerKey';
  const name = 'theName';
  const groupId = 'theGroupId';
  const userInput = 'theUserInput';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeInputFieldComponent,
          MockFocusDirective,
        ],
        imports: [ReactiveFormsModule],
        providers: [ConfiguratorAttributeBaseComponent],
      })
        .overrideComponent(ConfiguratorAttributeInputFieldComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorAttributeInputFieldComponent);
    component = fixture.componentInstance;
    component.attribute = {
      name: name,
      uiType: Configurator.UiType.STRING,
      userInput: undefined,
      required: true,
      incomplete: true,
      groupId: groupId,
    };
    component.ownerType = CommonConfigurator.OwnerType.CART_ENTRY;
    component.ownerKey = ownerKey;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not add classes ng-touch and ng-invalid to the input field.', () => {
    component.attribute.required = false;
    fixture.detectChanges();
    const styleClasses = fixture.debugElement.query(
      By.css('input.form-control')
    ).nativeElement.classList;
    expect(styleClasses).toContain('ng-touched');
    expect(styleClasses).not.toContain('ng-invalid');
  });

  it('should add classes ng-touch and ng-invalid to the input field.', () => {
    const styleClasses = fixture.debugElement.query(
      By.css('input.form-control')
    ).nativeElement.classList;
    expect(styleClasses).toContain('ng-touched');
    expect(styleClasses).toContain('ng-invalid');
  });

  it('should set form as touched  on init', () => {
    expect(component.attributeInputForm.touched).toEqual(true);
  });

  it('should call emit of selectionChange onSelect', () => {
    component.attributeInputForm.setValue(userInput);
    spyOn(component.inputChange, 'emit').and.callThrough();
    component.onChange();
    expect(component.inputChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        ownerKey: ownerKey,
        changedAttribute: jasmine.objectContaining({
          name: name,
          uiType: Configurator.UiType.STRING,
          groupId: groupId,
          userInput: userInput,
        }),
      })
    );
  });

  it('should set userInput on init', () => {
    component.attribute.userInput = userInput;
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.attributeInputForm.value).toEqual(userInput);
  });
});
