import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Product, ProductService } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfiguratorCPQOverviewAttributeComponent } from './configurator-cpq-overview-attribute.component';

const mockProduct: Product = {
  code: 'testCode',
  name: 'testName',
};
const product$: BehaviorSubject<Product> = new BehaviorSubject(null);

class MockProductService {
  get = () => product$.asObservable();
}

describe('ConfiguratorCPQOverviewAttributeComponent', () => {
  let component: ConfiguratorCPQOverviewAttributeComponent;
  let fixture: ComponentFixture<ConfiguratorCPQOverviewAttributeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MediaModule],
        declarations: [ConfiguratorCPQOverviewAttributeComponent],
        providers: [{ provide: ProductService, useClass: MockProductService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorCPQOverviewAttributeComponent
    );
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    component.ngOnInit();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('product', () => {
    it('should not exist without product code', (done: DoneFn) => {
      product$.next(null);

      component.product$.pipe(take(1)).subscribe((product: Product) => {
        expect(product).toBeNull();

        done();
      });
    });

    it('should exist with product code', (done: DoneFn) => {
      product$.next(mockProduct);

      component.product$.pipe(take(1)).subscribe((product: Product) => {
        expect(product).toEqual(mockProduct);

        done();
      });
    });
  });
});
