import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { ToConfigurationComponent } from './to-configuration.component';

const productCode = 'CONF_LAPTOP';
const configuratorType = 'myType';
const expectedRoute = 'configure' + configuratorType;
let navigationHappened: boolean;
let routeParameters: any;
let route: string;

class MockRoutingService {
  go(commands: any): void {
    navigationHappened = true;
    routeParameters = commands.params;
    route = commands.cxRoute;
  }
}

describe('ToConfigurationComponent', () => {
  let toConfigurationComponent: ToConfigurationComponent;
  let fixture: ComponentFixture<ToConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ToConfigurationComponent],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    navigationHappened = false;
    fixture = TestBed.createComponent(ToConfigurationComponent);
    toConfigurationComponent = fixture.componentInstance;
    toConfigurationComponent.productCode = productCode;
    toConfigurationComponent.configuratorType = configuratorType;
  });

  it('should be created', () => {
    expect(toConfigurationComponent).toBeTruthy();
  });

  it('should compile the route based on the configurator type', () => {
    expect(toConfigurationComponent.compileRoute(configuratorType)).toBe(
      expectedRoute
    );
  });

  it('should trigger navigation', () => {
    toConfigurationComponent.toConfiguration();
    expect(navigationHappened).toBe(true);
    expect(route).toBe(expectedRoute);
    expect(routeParameters.rootProduct).toBe(productCode);
  });
});
