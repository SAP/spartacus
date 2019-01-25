import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import {
  CartService,
  TranslateUrlOptions,
  Component,
  Cart
} from '@spartacus/core';

import { MiniCartComponent } from './mini-cart.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PipeTransform, Pipe } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CmsComponentData } from '../../cms';

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

class MockCartService {
  getActive() {
    return of(testCart);
  }
}

const MockCmsComponentData = <CmsComponentData<Component>>{
  data$: of(mockComponentData)
};

describe('MiniCartComponent', () => {
  let miniCartComponent: MiniCartComponent;
  let fixture: ComponentFixture<MiniCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MiniCartComponent, MockTranslateUrlPipe],
      providers: [
        { provide: CmsComponentData, useValue: MockCmsComponentData },
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
