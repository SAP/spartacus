import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { ConfiguratorStorefrontUtilsService } from '@spartacus/product-configurator/rulebased';
import { Observable, of } from 'rxjs';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { ConfiguratorTestUtils } from '../../../../testing/configurator-test-utils';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeDateInputFieldComponent } from './configurator-attribute-date-input-field.component';

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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeDateInputFieldComponent,
          MockDatePickerComponent,
        ],
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
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorAttributeDateInputFieldComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render date picker', () => {
    const htmlElem: HTMLElement = fixture.nativeElement;
    expect(htmlElem.querySelector('cx-date-picker')).toBeTruthy();
  });
});
