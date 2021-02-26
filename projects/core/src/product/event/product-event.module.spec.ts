import { TestBed } from '@angular/core/testing';
import { ProductEventBuilder } from './product-event.builder';
import { ProductEventModule } from './product-event.module';

describe('ProductEventModule', () => {
  let productEventBuilderFactory;

  beforeEach(() => {
    productEventBuilderFactory = jasmine.createSpy(
      'productEventBuilderFactory'
    );
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProductEventBuilder,
          useFactory: productEventBuilderFactory,
        },
      ],
      imports: [ProductEventModule],
    });

    TestBed.inject(ProductEventModule);
  });

  it('should initialize ProductEventBuilder', () => {
    expect(productEventBuilderFactory).toHaveBeenCalled();
  });
});
