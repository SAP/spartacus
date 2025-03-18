import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, FormRequiredAsterisksComponent],
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
    expect(fixture.debugElement.nativeElement.innerText).toBe('*');
  });

  it('should render correctly, when provided titleTranslation input value', () => {
    const translation = 'custom.common.required';
    component.titleTranslation = translation;
    fixture.detectChanges();
    expect(component.titleTranslation).toEqual(translation);
    expect(fixture.debugElement.nativeElement.innerText).toBe('*');
    expect(
      fixture.debugElement.nativeElement.querySelector('abbr.required-asterisk')
        .title
    ).toBe(translation);
  });
});
