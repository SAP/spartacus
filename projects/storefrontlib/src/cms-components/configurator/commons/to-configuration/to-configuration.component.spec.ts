import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { ToConfigurationComponent } from './to-configuration.component';

let navigationHappened: boolean;
class MockRoutingService {
  go(): void {
    navigationHappened = true;
  }
}

describe('ToConfiguration', () => {
  let toConfigurationComponent: ToConfigurationComponent;
  let fixture: ComponentFixture<ToConfigurationComponent>;
  const configuratorType = 'myType';

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

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(toConfigurationComponent).toBeTruthy();
  });

  it('should compile the route based on the configurator type', () => {
    expect(toConfigurationComponent.compileRoute(configuratorType)).toBe(
      'configure' + configuratorType
    );
  });

  it('should trigger navigation', () => {
    toConfigurationComponent.toConfiguration();
    expect(navigationHappened).toBe(true);
  });
});
