import { TestBed } from '@angular/core/testing';
import { ActiveCartEventBuilder } from './active-cart/active-cart-event.builder';
import { CartEventModule } from './cart-event.module';
import { MultiCartEventBuilder } from './multi-cart/multi-cart-event.builder';

describe('CartEventModule', () => {
  let activeCartEventBuilderFactory;
  let multiCartEventBuilderFactory;

  beforeEach(() => {
    activeCartEventBuilderFactory = jasmine.createSpy(
      'activeCartEventBuilderFactory'
    );
    multiCartEventBuilderFactory = jasmine.createSpy(
      'multiCartEventBuilderFactory'
    );
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActiveCartEventBuilder,
          useFactory: activeCartEventBuilderFactory,
        },
        {
          provide: MultiCartEventBuilder,
          useFactory: multiCartEventBuilderFactory,
        },
      ],
      imports: [CartEventModule],
    });

    TestBed.inject(CartEventModule);
  });

  it('should initialize ActiveCartEventBuilder', () => {
    expect(activeCartEventBuilderFactory).toHaveBeenCalled();
  });

  it('should initialize MultiCartEventBuilder', () => {
    expect(multiCartEventBuilderFactory).toHaveBeenCalled();
  });
});
