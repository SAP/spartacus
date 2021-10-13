import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  Cart,
  CmsComponent,
  CmsMiniCartComponent,
  I18nTestingModule,
  UrlCommandRoute,
} from '@spartacus/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/index';
import { MiniCartComponent } from './mini-cart.component';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(options: UrlCommandRoute): string | undefined {
    return options?.cxRoute;
  }
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: any;
}

const testCart: Cart = {
  code: 'xxx',
  guid: 'xxx',
  totalItems: 0,
  deliveryItemsQuantity: 1,
  totalPrice: {
    currencyIso: 'USD',
    value: 10.0,
    formattedValue: '$10.0',
  },
  totalPriceWithTax: {
    currencyIso: 'USD',
    value: 10.0,
  },
};

const mockComponentData: CmsMiniCartComponent = {
  uid: '001',
  typeCode: 'MiniCartComponent',
  modifiedTime: new Date('2017-12-21T18:15:15+0000'),
  shownProductCount: '3',
  lightboxBannerComponent: {
    uid: 'banner',
    typeCode: 'SimpleBannerComponent',
  },
};

const activeCart = new ReplaySubject<Cart>();

class MockActiveCartService {
  getActive(): Observable<Cart> {
    return activeCart.asObservable();
  }
}

const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
  data$: of(mockComponentData),
};

describe('MiniCartComponent', () => {
  let miniCartComponent: MiniCartComponent;
  let fixture: ComponentFixture<MiniCartComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule],
        declarations: [MiniCartComponent, MockUrlPipe, MockCxIconComponent],
        providers: [
          { provide: CmsComponentData, useValue: MockCmsComponentData },
          { provide: ActiveCartService, useClass: MockActiveCartService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCartComponent);
    miniCartComponent = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(miniCartComponent).toBeTruthy();
  });

  describe('UI tests', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should contain link to cart page', () => {
      const linkHref = fixture.debugElement.query(By.css('a')).nativeElement
        .attributes.href.value;
      expect(linkHref).toBe('/cart');
    });

    describe('when mini-cart is not loaded', () => {
      it('should show 0 items when mini-cart is not loaded', () => {
        const cartItemsNumber = fixture.debugElement
          .query(By.css('.count'))
          .nativeElement.innerText.trim();
        expect(cartItemsNumber).toEqual('miniCart.count count:0');
      });

      it('should show $0.00 total when mini-cart is not loaded', () => {
        const cartTotalPrice = fixture.debugElement
          .query(By.css('.total'))
          .nativeElement.innerText.trim();
        expect(cartTotalPrice).toEqual('miniCart.total total:0.00');
      });
    });

    describe('when mini-cart is loaded', () => {
      beforeEach(() => {
        activeCart.next(testCart);
        fixture.detectChanges();
      });

      it('should contain number of items in mini-cart', () => {
        const cartItemsNumber = fixture.debugElement
          .query(By.css('.count'))
          .nativeElement.innerText.trim();
        expect(cartItemsNumber).toEqual(
          `miniCart.count count:${testCart.deliveryItemsQuantity}`
        );
      });

      it('should contain total price in mini-cart', () => {
        const cartTotalPrice = fixture.debugElement
          .query(By.css('.total'))
          .nativeElement.innerText.trim();
        expect(cartTotalPrice).toEqual(
          `miniCart.total total:${testCart.totalPrice?.formattedValue}`
        );
      });
    });
  });
});
