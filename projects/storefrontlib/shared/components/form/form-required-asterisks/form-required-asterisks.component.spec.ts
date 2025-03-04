import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { FeatureConfigService, I18nTestingModule } from '@spartacus/core';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { FormRequiredAsterisksComponent } from './form-required-asterisks.component';

class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isEnabled(_feature: string) {
    return true;
  }
}

describe('FormRequiredAsterisksComponent', () => {
  let component: FormRequiredAsterisksComponent;
  let fixture: ComponentFixture<FormRequiredAsterisksComponent>;
  let control: UntypedFormControl;

  const getContent = () => fixture.debugElement.nativeElement.innerText;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        FeatureConfigService,
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
      ],
      declarations: [FormRequiredAsterisksComponent, MockFeatureDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRequiredAsterisksComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render correctly', () => {
    fixture.detectChanges();
    expect(component.titleTranslation).toEqual('common.required');
  });

  it('should render correctly, when provided titleTranslation input value', () => {
    const translation = 'common.required.changed';
    component.titleTranslation = translation;

    control.setErrors([]);
    expect(component.titleTranslation).toEqual(translation);
  });
});
