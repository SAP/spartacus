import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
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
  transform(options: UrlCommandRoute): string {
    return options.cxRoute;
  }
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type;
}

const testCart: Cart = {
  code: 'xxx',
  guid: 'xxx',
  totalItems: 0,
  deliveryItemsQuantity: 1,
  totalPrice: {
    currencyIso: 'USD',
    value: 10.0,
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

  describe('template', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should contain link to cart page', () => {
      const linkHref = fixture.debugElement.query(By.css('a')).nativeElement
        .attributes.href.value;
      expect(linkHref).toBe('/cart');
    });

    it('should show 0 items when cart is not loaded', () => {
      const cartItemsNumber = fixture.debugElement.query(By.css('.count'))
        .nativeElement.innerText;
      expect(cartItemsNumber).toEqual('miniCart.count count:0');
    });

    it('should contain number of items in cart', () => {
      activeCart.next(testCart);
      fixture.detectChanges();
      const cartItemsNumber = fixture.debugElement.query(By.css('.count'))
        .nativeElement.innerText;
      expect(cartItemsNumber).toEqual('miniCart.count count:1');
    });
  });
});
