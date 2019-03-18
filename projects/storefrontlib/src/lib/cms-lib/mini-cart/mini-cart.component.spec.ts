import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';

import {
  CartService,
  TranslateUrlOptions,
  Component as SpaComponent,
  Cart,
  CmsMiniCartComponent
} from '@spartacus/core';

import { MiniCartComponent } from './mini-cart.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PipeTransform, Pipe } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(options: TranslateUrlOptions): string | string[] {
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

const mockComponentData: CmsMiniCartComponent = {
  uid: '001',
  typeCode: 'MiniCartComponent',
  modifiedtime: new Date('2017-12-21T18:15:15+0000'),
  shownProductCount: '3',
  lightboxBannerComponent: {
    uid: 'banner',
    typeCode: 'SimpleBannerComponent'
  }
};

class MockCartService {
  getActive(): Observable<Cart> {
    return of(testCart);
  }
}

const MockCmsComponentData = <CmsComponentData<SpaComponent>>{
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
      const cartItemsNumber = fixture.debugElement.query(By.css('.count'))
        .nativeElement.innerText;
      expect(cartItemsNumber).toEqual('1');
    });
  });
});
