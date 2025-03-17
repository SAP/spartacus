import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FeatureConfigService, I18nTestingModule } from '@spartacus/core';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { FormRequiredLegendComponent } from './form-required-legend.component';

class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isEnabled(_feature: string) {
    return true;
  }
}

describe('FormRequiredLegendComponent', () => {
  let component: FormRequiredLegendComponent;
  let fixture: ComponentFixture<FormRequiredLegendComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, FormRequiredLegendComponent],
      providers: [
        FeatureConfigService,
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
      ],
      declarations: [MockFeatureDirective],
    }).compileComponents();
  }));

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
    expect(fixture.debugElement.nativeElement.innerText).toBe(
      'formLegend.required'
    );
  });

  it('should render correctly, when provided formLegendTranslation input value', () => {
    const translation = 'custom.formLegend.required';
    component.formLegendTranslation = translation;
    fixture.detectChanges();
    expect(component.formLegendTranslation).toEqual(translation);
    expect(fixture.debugElement.nativeElement.innerText).toBe(translation);
  });
});
