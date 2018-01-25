import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductLoaderService } from 'app/data/product-loader.service';
import { of } from 'rxjs/observable/of';
import { StarRatingComponent } from 'app/ui/components/product/star-rating/star-rating.component';
import { MaterialModule } from 'app/material.module';

class MockProductLoaderService {
  loadProduct(productCode) {}
  getSubscription(productCode) {}
}

fdescribe('StarRatingComponent in ui', () => {
  let starRatingComponent: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;
  let productLoader: ProductLoaderService;

  const componentData = 'Mock data for product star rating component.';

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MaterialModule],
        declarations: [StarRatingComponent],
        providers: [
          { provide: ProductLoaderService, useClass: MockProductLoaderService }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StarRatingComponent);
    starRatingComponent = fixture.componentInstance;
    productLoader = TestBed.get(ProductLoaderService);

    spyOn(starRatingComponent, 'getStar').and.callThrough();
    spyOn(productLoader, 'getSubscription').and.returnValue(of(componentData));
  });

  it('should be created', () => {
    expect(starRatingComponent).toBeTruthy();
  });

  it('should call getStar()', () => {
    starRatingComponent.rating = 3;

    let icon = starRatingComponent.getStar(2);
    expect(icon).toEqual('star');

    icon = starRatingComponent.getStar(3);
    expect(icon).toEqual('star');

    icon = starRatingComponent.getStar(3.3);
    expect(icon).toEqual('star_half');

    icon = starRatingComponent.getStar(4);
    expect(icon).toEqual('star_outline');
  });

  it('should call ngOnChanges()', () => {
    starRatingComponent.productCode = '123456';
    starRatingComponent.ngOnChanges();
    expect(starRatingComponent.model).toEqual(componentData);
  });
});
