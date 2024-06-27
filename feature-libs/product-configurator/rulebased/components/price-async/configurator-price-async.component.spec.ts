import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { ConfiguratorPriceAsyncComponent } from './configurator-price-async.component';
import { DirectionService } from '@spartacus/storefront';
import { ConfiguratorCommonsService } from '../../core';
import { Observable, of } from 'rxjs';
import { CommonConfigurator } from '@spartacus/product-configurator/common';

const mockRouterState: any = {
  state: {
    params: {
      entityKey: 'p123',
      ownerType: CommonConfigurator.OwnerType.PRODUCT,
    },
    queryParams: {},
    semanticRoute: 'configure/CPQCONFIGURATOR',
  },
};

class MockDirectionService {
  getDirection(): void {}
}

class MockConfiguratorCommonsService {
  getConfiguration(): void {}
}

const routerStateObservable: Observable<RouterState> = of(mockRouterState);
class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }
}

describe('ConfiguratorPriceAsyncComponent', () => {
  let component: ConfiguratorPriceAsyncComponent;
  let fixture: ComponentFixture<ConfiguratorPriceAsyncComponent>;
  let htmlElem: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguratorPriceAsyncComponent],
      imports: [I18nTestingModule],
      providers: [
        {
          provide: DirectionService,
          useClass: MockDirectionService,
        },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorPriceAsyncComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeDefined();
    expect(htmlElem).toBeDefined();
  });
});
