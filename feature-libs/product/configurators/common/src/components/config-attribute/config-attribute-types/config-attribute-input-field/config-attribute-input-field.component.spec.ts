import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Configurator, GenericConfigurator } from '@spartacus/core';
import { ConfigUIKeyGenerator } from '../../../service/config-ui-key-generator';
import { ConfigAttributeInputFieldComponent } from './config-attribute-input-field.component';

describe('ConfigAttributeInputFieldComponent', () => {
  let component: ConfigAttributeInputFieldComponent;
  let fixture: ComponentFixture<ConfigAttributeInputFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigAttributeInputFieldComponent],
      imports: [ReactiveFormsModule],
      providers: [ConfigUIKeyGenerator],
    })
      .overrideComponent(ConfigAttributeInputFieldComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigAttributeInputFieldComponent);
    component = fixture.componentInstance;
    component.attribute = {
      name: 'attributeName',
      uiType: Configurator.UiType.STRING,
      userInput: undefined,
      required: true,
      incomplete: true,
    };
    component.ownerType = GenericConfigurator.OwnerType.CART_ENTRY;
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
});
