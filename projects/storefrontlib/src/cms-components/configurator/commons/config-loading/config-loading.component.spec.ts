import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigLoadingComponent } from './config-loading.component';
import {
  Configurator,
  ConfiguratorCommonsService,
  GenericConfigurator,
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { BREAKPOINT, BreakpointService } from '@spartacus/storefront';
import { ConfigComponentTestUtilsService } from '../../generic/service/config-component-test-utils.service';

const PRODUCT_CODE = 'CONF_LAPTOP';
const URL_CONFIGURATION =
  'host:port/electronics-spa/en/USD/configureCPQCONFIGURATOR';

const mockRouterState: any = {
  state: {
    url: URL_CONFIGURATION,
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: GenericConfigurator.OwnerType.PRODUCT,
    },
    queryParams: {},
  },
};

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
  }
}

const createdConfiguration: Configurator.Configuration = {
  configId: '1234-56-7890',
  consistent: true,
  complete: true,
  productCode: PRODUCT_CODE,
  owner: {
    type: GenericConfigurator.OwnerType.PRODUCT,
    id: PRODUCT_CODE,
  },
  groups: [],
};

let configuration: Configurator.Configuration = null;
class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return of(configuration);
  }
}

let breakpoint: BREAKPOINT = BREAKPOINT.xs;
class MockBreakpointService {
  get breakpoint$(): Observable<BREAKPOINT> {
    return of(breakpoint);
  }
}

describe('ConfigLoadingComponent', () => {
  let classUnderTest: ConfigLoadingComponent;
  let fixture: ComponentFixture<ConfigLoadingComponent>;
  let htmlElem: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigLoadingComponent],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ConfigLoadingComponent],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
        {
          provide: BreakpointService,
          useClass: MockBreakpointService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigLoadingComponent);
    classUnderTest = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
    ConfigComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-loading-container'
    );
    ConfigComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '#cx-config-loading-svg-mobile'
    );
  });

  it('should display a loading SVG for mobile widget', () => {
    ConfigComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '#cx-config-loading-svg-mobile'
    );
  });

  it('should display a loading SVG for tablet widget', () => {
    breakpoint = BREAKPOINT.sm;
    classUnderTest.ngOnInit();
    fixture.detectChanges();
    ConfigComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '#cx-config-loading-svg-tablet'
    );
  });

  describe('should display a loading SVG for laptop widgets', () => {
    it('for md size', () => {
      breakpoint = BREAKPOINT.md;
      classUnderTest.ngOnInit();
      fixture.detectChanges();
      ConfigComponentTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '#cx-config-loading-svg-laptop'
      );
    });

    it('for lg size', () => {
      breakpoint = BREAKPOINT.lg;
      classUnderTest.ngOnInit();
      fixture.detectChanges();
      ConfigComponentTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '#cx-config-loading-svg-laptop'
      );
    });

    it('for xl size', () => {
      breakpoint = BREAKPOINT.xl;
      classUnderTest.ngOnInit();
      fixture.detectChanges();
      ConfigComponentTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '#cx-config-loading-svg-laptop'
      );
    });
  });

  describe('should not display any loading animation', () => {
    it('for any widgets', () => {
      configuration = createdConfiguration;
      breakpoint = BREAKPOINT.sm;
      classUnderTest.ngOnInit();
      fixture.detectChanges();
      ConfigComponentTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-config-loading-container'
      );
    });
  });
});
