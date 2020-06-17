import { ChangeDetectionStrategy, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Configurator,
  ConfiguratorCommonsService,
  GenericConfigurator,
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConfigTabBarComponent } from './config-tab-bar.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIG_OVERVIEW_URL =
  'host:port/electronics-spa/en/USD/configureOverviewCPQCONFIGURATOR';
const CONFIGURATOR_URL =
  'electronics-spa/en/USD/configureCPQCONFIGURATOR/product/entityKey/WCEM_DEPENDENCY_PC';

const mockRouterState: any = {
  state: {
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: GenericConfigurator.OwnerType.PRODUCT,
    },
    queryParams: {},
    url: CONFIG_OVERVIEW_URL,
  },
};

let routerStateObservable = null;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

class MockConfiguratorCommonsService {
  public config: Configurator.Configuration = {
    configId: '1234-56-7890',
    consistent: true,
    complete: true,
    productCode: PRODUCT_CODE,
    priceSummary: {
      basePrice: {
        formattedValue: '22.000 €',
      },
      selectedOptions: {
        formattedValue: '900 €',
      },
      currentTotal: {
        formattedValue: '22.900 €',
      },
    },
  };
  getConfiguration(): Observable<Configurator.Configuration> {
    return of(this.config);
  }
}

describe('ConfigTabBarComponent', () => {
  let component: ConfigTabBarComponent;
  let fixture: ComponentFixture<ConfigTabBarComponent>;
  let htmlElem: HTMLElement;

  beforeEach(async(() => {
    mockRouterState.state.params.displayOnly = false;

    routerStateObservable = of(mockRouterState);
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [ConfigTabBarComponent, MockUrlPipe],
      providers: [
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },

        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    })
      .overrideComponent(ConfigTabBarComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTabBarComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should render 2 navigation links per default', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('.nav-link').length).toEqual(2);
  });

  it('should render no links if router states displayOnly', () => {
    mockRouterState.state.params.displayOnly = true;
    component.ngOnInit();
    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('.nav-link').length).toEqual(0);
  });

  it('should return true for overview URL', () => {
    component
      .isOverviewPage()
      .subscribe((isOv) => expect(isOv).toBe(true))
      .unsubscribe();
  });

  it('should return false for configure URL', () => {
    mockRouterState.state.url = CONFIGURATOR_URL;
    component
      .isOverviewPage()
      .subscribe((isOv) => expect(isOv).toBe(false))
      .unsubscribe();
  });
});
