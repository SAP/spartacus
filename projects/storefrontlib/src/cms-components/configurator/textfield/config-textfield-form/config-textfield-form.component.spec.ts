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

  it('should get product code from router state', () => {
    component.ngOnInit();
    expect(component.productCode).toBe(PRODUCT_CODE);
  });

  it('should know product configuration after init has been done', () => {
    component.ngOnInit();
    component.configuration$.subscribe(configuration =>
      expect(configuration.attributes.length).toBe(0)
    );
  });

  it('should release subscription on destroy ', () => {
    component.ngOnInit();
    expect(component.subscription.closed).toBe(false);
    component.ngOnDestroy();
    expect(component.subscription.closed).toBe(true);
  });
});
