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
import { VariantConfiguratorModule } from '../../variant/variant-configurator.module';
import { ConfigTextfieldFormComponent } from './config-textfield-form.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
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
      attributes: [],
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
        VariantConfiguratorModule,
        PageLayoutModule,
      ],
      declarations: [ConfigTextfieldFormComponent],
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
});
