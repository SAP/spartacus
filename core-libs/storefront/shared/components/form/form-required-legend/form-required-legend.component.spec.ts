import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { FormRequiredLegendComponent } from './form-required-legend.component';

describe('FormRequiredLegendComponent', () => {
  let component: FormRequiredLegendComponent;
  let fixture: ComponentFixture<FormRequiredLegendComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, FormRequiredLegendComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRequiredLegendComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render correctly', () => {
    fixture.detectChanges();
    expect(component.formLegendTranslation).toEqual('formLegend.required');
    expect(fixture.debugElement.nativeElement.textContent.trim()).toBe(
      'formLegend.required'
    );
  });

  it('should render correctly, when provided formLegendTranslation input value', () => {
    const translation = 'custom.formLegend.required';
    component.formLegendTranslation = translation;
    fixture.detectChanges();
    expect(component.formLegendTranslation).toEqual(translation);
    expect(fixture.debugElement.nativeElement.textContent.trim()).toBe(translation);
  });
});
