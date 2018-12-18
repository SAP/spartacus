import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';

import { CartService, CmsService, TranslateUrlOptions } from '@spartacus/core';

import { MiniCartComponent } from './mini-cart.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Cart, OrderEntry, CmsComponent } from '@spartacus/core';
import { PipeTransform, Pipe } from '@angular/core';
import { By } from '@angular/platform-browser';

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(options: TranslateUrlOptions) {
    return '/translated-path/' + options.route[0];
  }
}

const testCart: Cart = {
  code: 'xxx',
  guid: 'xxx',
  totalItems: 0,
  deliveryItemsQuantity: 1,
  totalPrice: {
    currencyIso: 'USD',
    value: 10.0
  },
  totalPriceWithTax: {
    currencyIso: 'USD',
    value: 10.0
  }
};

const orderEntry: OrderEntry = {
  entryNumber: 0,
  product: { code: '1234' }
};

const testEntries: { [id: string]: OrderEntry }[] = [{ '1234': orderEntry }];

const mockComponentData: any = {
  uid: '001',
  typeCode: 'MiniCartComponent',
  modifiedTime: '2017-12-21T18:15:15+0000',
  shownProductCount: '3',
  lightboxBannerComponent: {
    uid: 'banner',
    typeCode: 'SimpleBannerComponent'
  }
};

class MockCmsService {
  getComponentData<T extends CmsComponent>(): Observable<T> {
    return of(mockComponentData);
  }
}

class MockCartService {
  cart$ = of(testCart);
  entries$ = of(testEntries);
}

describe('MiniCartComponent', () => {
  let miniCartComponent: MiniCartComponent;
  let fixture: ComponentFixture<MiniCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MiniCartComponent, MockTranslateUrlPipe],
      providers: [
        { provide: CmsService, useClass: MockCmsService },
        { provide: CartService, useClass: MockCartService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCartComponent);
    miniCartComponent = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(miniCartComponent).toBeTruthy();
  });

  it('should contain cms content in the html rendering after bootstrap', () => {
    expect(miniCartComponent.component).toBeNull();
    miniCartComponent.onCmsComponentInit(mockComponentData.uid);
    expect(miniCartComponent.component).toBe(mockComponentData);

    expect(miniCartComponent.banner).toBe(
      mockComponentData.lightboxBannerComponent
    );
    expect(miniCartComponent.showProductCount).toEqual(
      +mockComponentData.shownProductCount
    );
  });

  describe('template', () => {
    beforeEach(() => {
      miniCartComponent.cart$ = of(testCart);
      fixture.detectChanges();
    });

    it('should contain link to cart page', () => {
      const linkHref = fixture.debugElement.query(By.css('a')).nativeElement
        .attributes.href.value;
      expect(linkHref).toBe('/translated-path/cart');
    });

    it('should contain number of items in cart', () => {
      const cartItemsNumber = fixture.debugElement.query(
        By.css('.cx-mini-cart__count')
      ).nativeElement.innerText;
      expect(cartItemsNumber).toEqual('1');
    });
  });
});
