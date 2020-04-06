import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  ConfiguratorTextfield,
  ConfiguratorTextfieldService,
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { PageLayoutModule } from '../../../../cms-structure/page/page-layout/page-layout.module';
import { ConfigTextfieldAddToCartButtonComponent } from '../config-textfield-add-to-cart-button/config-textfield-add-to-cart-button.component';
import { ConfigTextfieldInputFieldComponent } from '../config-textfield-input-field/config-textfield-input-field.component';
import { ConfigTextfieldFormComponent } from './config-textfield-form.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
const ATTRIBUTE_NAME = 'AttributeName';
const mockRouterState: any = {
  state: {
    params: {
      rootProduct: PRODUCT_CODE,
    },
  },
};
class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
  }
}

class MockConfiguratorTextfieldService {
  createConfiguration(): Observable<ConfiguratorTextfield.Configuration> {
    const productConfig: ConfiguratorTextfield.Configuration = {
      configurationInfos: [{ configurationLabel: ATTRIBUTE_NAME }],
    };
    return of(productConfig);
  }
}
describe('ConfigTextfieldFormComponent', () => {
  let component: ConfigTextfieldFormComponent;
  let fixture: ComponentFixture<ConfigTextfieldFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        ReactiveFormsModule,
        NgSelectModule,

        PageLayoutModule,
      ],
      declarations: [
        ConfigTextfieldFormComponent,
        ConfigTextfieldInputFieldComponent,
        ConfigTextfieldAddToCartButtonComponent,
      ],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },

        {
          provide: ConfiguratorTextfieldService,
          useClass: MockConfiguratorTextfieldService,
        },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTextfieldFormComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should know product configuration after init has been done', () => {
    component.ngOnInit();
    component.configuration$.subscribe((configuration) => {
      const attributes: ConfiguratorTextfield.ConfigurationInfo[] =
        configuration.configurationInfos;
      expect(attributes.length).toBe(1);
      expect(attributes[0].configurationLabel).toBe(ATTRIBUTE_NAME);
    });
  });
});
