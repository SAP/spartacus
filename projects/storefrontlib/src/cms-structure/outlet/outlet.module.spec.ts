import {
  APP_INITIALIZER,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  Type,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OutletPosition } from './outlet.model';
import { OutletModule } from './outlet.module';
import { provideOutlet } from './outlet.providers';
import { OutletService } from './outlet.service';

function mockResolveComponentFactory<T>(
  component: Type<T>
): ComponentFactory<T> {
  return { componentType: component } as ComponentFactory<T>;
}

class MockComponentFactoryResolver extends ComponentFactoryResolver {
  resolveComponentFactory = jasmine
    .createSpy()
    .and.callFake(mockResolveComponentFactory);
}

class MockOutletService implements Partial<OutletService> {
  add = jasmine.createSpy('add');
}

@Component({})
class AlphaComponent {}

@Component({})
class BetaComponent {}

describe('OutletModule.forRoot()', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ComponentFactoryResolver,
          useClass: MockComponentFactoryResolver,
        },
        {
          provide: OutletService,
          useClass: MockOutletService,
        },
        provideOutlet({
          id: 'outlet1',
          component: AlphaComponent,
        }),
        provideOutlet({
          id: 'outlet2',
          component: BetaComponent,
          position: OutletPosition.REPLACE,
        }),
      ],
      imports: [OutletModule.forRoot()],
    });
  });

  it('should provide APP_INITIALIZER', () => {
    const appInitializers = TestBed.inject(APP_INITIALIZER);
    expect(appInitializers.length).toBe(1);
  });

  it('should create the component instance', () => {
    const cfr = TestBed.inject(ComponentFactoryResolver);

    expect(cfr.resolveComponentFactory).toHaveBeenCalledWith(AlphaComponent);
    expect(cfr.resolveComponentFactory).toHaveBeenCalledWith(BetaComponent);
  });

  it('should register component for the outlet at position AFTER (by default)', () => {
    const outletService = TestBed.inject(OutletService);

    expect(outletService.add).toHaveBeenCalledWith(
      'outlet1',
      jasmine.objectContaining({
        componentType: AlphaComponent,
      } as ComponentFactory<AlphaComponent>),
      OutletPosition.AFTER
    );
  });

  it('should register component for the outlet at the given position', () => {
    const outletService = TestBed.inject(OutletService);

    expect(outletService.add).toHaveBeenCalledWith(
      'outlet2',
      jasmine.objectContaining({
        componentType: BetaComponent,
      } as ComponentFactory<BetaComponent>),
      OutletPosition.REPLACE
    );
  });
});
