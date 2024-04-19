import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import {
  Configurator,
  ConfiguratorStorefrontUtilsService,
} from '@spartacus/product-configurator/rulebased';
import { Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { ConfiguratorTestUtils } from '../../../../testing/configurator-test-utils';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeDateInputFieldComponent } from './configurator-attribute-date-input-field.component';

const attributeName = 'attributeName';
const groupId = 'groupId';
class MockConfiguratorCommonsService {
  updateConfiguration(): void {}
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cx-date-picker',
  template: '',
})
class MockDatePickerComponent {
  @Input() control: FormControl;
  @Input() min: FormControl;
  @Input() max: FormControl;
  @Input() required: boolean;
}

class MockConfigUtilsService {
  isCartEntryOrGroupVisited(): Observable<boolean> {
    return of(true);
  }
}

describe('ConfiguratorAttributeDateInputFieldComponent', () => {
  let component: ConfiguratorAttributeDateInputFieldComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeDateInputFieldComponent>;
  let htmlElem: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeDateInputFieldComponent,
          MockDatePickerComponent,
        ],
        imports: [I18nTestingModule],
        providers: [
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
      name: attributeName,
      label: attributeName,
      uiType: Configurator.UiType.SAP_DATE,
      userInput: undefined,
      required: true,
      incomplete: true,
      groupId: groupId,
    };
    fixture.detectChanges();
    htmlElem = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render date picker', () => {
    expect(htmlElem.querySelector('cx-date-picker')).toBeTruthy();
  });

  describe('Accessibility support', () => {
    it('should render proper aria element if no attribute value present ', () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        undefined,
        0,
        'aria-label',
        'configurator.a11y.valueOfAttributeBlank attribute:' +
          component.attribute.label
      );
    });

    it('should render proper aria element including value if attribute value is present ', () => {
      component.attribute.userInput = '2025-02-01';
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        undefined,
        0,
        'aria-label',
        'configurator.a11y.valueOfAttributeFull attribute:' +
          component.attribute.label +
          ' value:' +
          component.attribute.userInput
      );
    });
  });
});
