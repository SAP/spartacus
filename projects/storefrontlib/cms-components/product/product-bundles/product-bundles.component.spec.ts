import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, Input, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Product, EventService, I18nTestingModule } from '@spartacus/core';
import { EMPTY, Observable, of } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { OutletModule } from '../../../cms-structure/outlet/outlet.module';
import { ProductBundlesComponent } from './product-bundles.component';
import { ActiveCartFacade, CartUiEventAddToCart, OrderEntry } from '@spartacus/cart/base/root';

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return EMPTY;
  }
}

class MockActiveCartService {
    startBundle(
      _productCode: string,
      _quantity: number,
      _bundleTemplateId: string
    ): void {}
    getEntries(): Observable<OrderEntry[]> {
      return of([]);
    }
}

class MockEventService implements Partial<EventService> {
    dispatch(): void {};
}

@Component({
    selector: 'cx-carousel',
    template: `
      <ng-container *ngFor="let item$ of items">
        <ng-container
          *ngTemplateOutlet="template; context: { item: item$ | async }"
        ></ng-container>
      </ng-container>
    `,
})
class MockCarouselComponent {
    @Input() items;
    @Input() itemWidth;
    @Input() template;
}

describe('ProductBundlesComponent in product', () => {
  let productBundlesComponent: ProductBundlesComponent;
  let fixture: ComponentFixture<ProductBundlesComponent>;
  let activeCartService: ActiveCartFacade;
  let currentProductService: CurrentProductService;
  let eventService: EventService;
  let el: DebugElement;

  const mockBundleTemplate = {
    id: 'testBundleComponentId',
    name: 'testBundleComponentName',
    rootBundleTemplateName: 'testBundleTemplateId'
  }
  const mockProduct: Product = {
    name: 'mockProduct',
    code: 'code1',
    bundleTemplates: [mockBundleTemplate]
  }
  const mockProductWithEmptyBundle: Product = {
    name: 'mockProductWithEmptyBundle',
    code: 'code2',
    bundleTemplates: []
  }
  const mockCartEntry: OrderEntry = { entryNumber: 7 };
  const mockProductCode: string = "testProduct";

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CommonModule, OutletModule, I18nTestingModule],
        declarations: [ProductBundlesComponent, MockCarouselComponent],
        providers: [
            { provide: ActiveCartFacade, useClass: MockActiveCartService },
            {
            provide: CurrentProductService,
            useClass: MockCurrentProductService,
            },
            { provide: EventService, useClass: MockEventService },
        ],
      }).compileComponents();

      activeCartService = TestBed.inject(ActiveCartFacade);
      currentProductService = TestBed.inject(CurrentProductService);
      eventService = TestBed.inject(EventService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBundlesComponent);
    productBundlesComponent = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should be created', () => {
    expect(productBundlesComponent).toBeTruthy();
  });

  describe('UI test', () => {
    it('should have cx-carousel element', () => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockProduct)
      );
      fixture.detectChanges();
      waitForAsync(() => {
        const ele = el.query(By.css('cx-carousel'));
        expect(ele).toBeTruthy();
      });
    });

    it('should use the provided string for bundle component and template', () => {
        spyOn(currentProductService, 'getProduct').and.returnValue(
          of(mockProduct)
        );
        fixture.detectChanges();
        waitForAsync(() => {
            const title = el.query(By.css('title')).nativeElement.innerText;
            const content = el.query(By.css('content')).nativeElement.innerText;
            expect(title).toEqual(mockBundleTemplate.rootBundleTemplateName);
            expect(content).toEqual(mockBundleTemplate.name);
        });
    });

    it('should not have bundle element when current product is null', () => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(null)
      );
      fixture.detectChanges();
      waitForAsync(() => {
        const headerEl = el.query(By.css('.header'));
        const bundleEl = el.query(By.css('.bundle'));
        expect(headerEl).toBeNull();
        expect(bundleEl).toBeNull();
      });
    });

    it('should not have bundle element when bundleTemplate is empty', () => {
        spyOn(currentProductService, 'getProduct').and.returnValue(
          of(mockProductWithEmptyBundle)
        );
        fixture.detectChanges();
        waitForAsync(() => {
            const headerEl = el.query(By.css('.header'));
            const bundleEl = el.query(By.css('.bundle'));
            expect(headerEl).toBeNull();
            expect(bundleEl).toBeNull();
        });
      });
  });

  it('should call addBundleToCart() and dispatch the add to cart UI event', () => {
    spyOn(activeCartService, 'startBundle').and.callThrough();
    spyOn(activeCartService, 'getEntries').and.returnValue(
      of([mockCartEntry])
    );
    spyOn(eventService, 'dispatch').and.callThrough();

    const uiEvent: CartUiEventAddToCart = new CartUiEventAddToCart();
    uiEvent.productCode = mockProductCode;
    uiEvent.numberOfEntriesBeforeAdd = 7;
    uiEvent.quantity = 1;
    spyOn(
      productBundlesComponent as any,
      'createCartUiEventAddToCart'
    ).and.returnValue(uiEvent);

    fixture.detectChanges();
    productBundlesComponent.addBundleToCart(mockProductCode, mockBundleTemplate.rootBundleTemplateName);
    expect(activeCartService.startBundle).toHaveBeenCalledWith(
      mockProductCode,
      1,
      mockBundleTemplate.rootBundleTemplateName
    );
    expect(eventService.dispatch).toHaveBeenCalledWith(uiEvent);
  });

});
