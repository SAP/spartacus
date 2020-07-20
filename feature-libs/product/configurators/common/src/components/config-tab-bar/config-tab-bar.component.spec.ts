import { ChangeDetectionStrategy, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
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
    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('.nav-link').length).toEqual(2);
  });

  it('should render no links if router states displayOnly', () => {
    mockRouterState.state.params.displayOnly = true;

    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('.nav-link').length).toEqual(0);
  });

  it('should tell from URL that we are on OV page', () => {
    mockRouterState.state.url = CONFIG_OVERVIEW_URL;
    component.isOverviewPage$
      .subscribe((isOv) => expect(isOv).toBe(true))
      .unsubscribe();
  });

  it('should tell from URL that we are on config page', () => {
    mockRouterState.state.url = CONFIGURATOR_URL;
    component.isOverviewPage$
      .subscribe((isOv) => expect(isOv).toBe(false))
      .unsubscribe();
  });
});
