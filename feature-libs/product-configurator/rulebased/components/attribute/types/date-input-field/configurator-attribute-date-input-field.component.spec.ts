import { ChangeDetectionStrategy, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FeaturesConfig, I18nTestingModule } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { ConfiguratorStorefrontUtilsService } from '@spartacus/product-configurator/rulebased';
import { Observable, of } from 'rxjs';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../../../testing/configurator-test-utils';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';
import { defaultConfiguratorUISettingsConfig } from '../../../config/default-configurator-ui-settings.config';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeDateInputFieldComponent } from './configurator-attribute-date-input-field.component';

@Directive({
  selector: '[cxFocus]',
})
export class MockFocusDirective {
  @Input('cxFocus') protected config: any;
}
class MockConfiguratorCommonsService {
  updateConfiguration(): void {}
}

const isCartEntryOrGroupVisited = true;
class MockConfigUtilsService {
  isCartEntryOrGroupVisited(): Observable<boolean> {
    return of(isCartEntryOrGroupVisited);
  }
}

describe('ConfiguratorAttributeDateInputFieldComponent', () => {
  let component: ConfiguratorAttributeDateInputFieldComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeDateInputFieldComponent>;

  const ownerKey = 'theOwnerKey';
  const name = 'attributeName';
  const groupId = 'theGroupId';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeDateInputFieldComponent,
          MockFocusDirective,
        ],
        imports: [ReactiveFormsModule, I18nTestingModule],
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
            provide: ConfiguratorStorefrontUtilsService,
            useClass: MockConfigUtilsService,
          },
          {
            provide: FeaturesConfig,
            useValue: {
              features: { level: '*' },
            },
          },
        ],
      })
        .overrideComponent(ConfiguratorAttributeDateInputFieldComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorAttributeDateInputFieldComponent
    );
    component = fixture.componentInstance;

    component.attribute = {
      name: name,
      label: name,
      uiType: Configurator.UiType.STRING,
      userInput: undefined,
      required: true,
      incomplete: true,
      groupId: groupId,
    };
    component.ownerType = CommonConfigurator.OwnerType.CART_ENTRY;
    component.ownerKey = ownerKey;
    fixture.detectChanges();

    spyOn(
      component['configuratorCommonsService'],
      'updateConfiguration'
    ).and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
