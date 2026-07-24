import { vi } from 'vitest';
import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Directive,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Cart, OrderEntry } from '@spartacus/cart/base/root';
import { WishListFacade } from '@spartacus/cart/wish-list/root';
import {
  AuthService,
  CxDatePipe,
  FeatureDirective,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  Product,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  AtMessageDirective,
  CurrentProductService,
  IconComponent,
} from '@spartacus/storefront';
import { MockFeatureDirective } from '../../../../../core-libs/storefront/shared/test/mock-feature-directive';
import { BehaviorSubject, Observable, of, firstValueFrom } from 'rxjs';
import { AddToWishListComponent } from './add-to-wish-list.component';
const mockProduct: Product = {
  code: 'xxx',
  name: 'product',
  summary: 'summary',
  stock: {
    stockLevel: 420,
    stockLevelStatus: 'Available',
  },
};

const mockOutOfStockProduct: Product = {
  code: 'xxx',
  name: 'product',
  stock: { stockLevelStatus: 'outOfStock', stockLevel: 0 },
};

const mockCartEntry: OrderEntry = {
  entryNumber: 0,
  product: { code: 'xxx' },
  quantity: 1,
};

const mockCartEntry1: OrderEntry = {
  product: { code: 'yyy' },
};

const mockCartEntry2: OrderEntry = {
  product: { code: 'zzz' },
};

const entries = [mockCartEntry, mockCartEntry1, mockCartEntry2];

const mockWishList: Cart = {
  code: '2',
  entries: entries,
};

class MockAuthService {
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
}

const productSubject = new BehaviorSubject(mockProduct);

class MockWishListService {
  addEntry = vi.fn();
  removeEntry = vi.fn();
  getWishList() {
    return of(mockWishList);
  }
  getWishListLoading() {
    return of(false);
  }
}

class MockCurrentProductService {
  getProduct = vi.fn().mockReturnValue(productSubject);
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockIconComponent {
  @Input() type;
}

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

@Directive({ selector: '[cxAtMessage]' })
class MockAtMessageDirective {
  @Input() cxAtMessage: string | string[] | undefined;
}

describe('AddToWishListComponent', () => {
  let component: AddToWishListComponent;
  let fixture: ComponentFixture<AddToWishListComponent>;
  let wishListFacade: WishListFacade;
  let el: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        AddToWishListComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: WishListFacade, useClass: MockWishListService },
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
      ],
    })
      .overrideComponent(AddToWishListComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            IconComponent,
            UrlPipe,
            AtMessageDirective,
            FeatureDirective,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockIconComponent,
            MockUrlPipe,
            MockAtMessageDirective,
            MockFeatureDirective,
          ],
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToWishListComponent);
    component = fixture.componentInstance;

    wishListFacade = TestBed.inject(WishListFacade);

    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('add', () => {
    beforeEach(() => {
      vi.spyOn(component as any, 'restoreFocus').mockImplementation(() => {});
    });

    it('should add product to wish list', () => {
      component.add(mockProduct);

      expect(wishListFacade.addEntry).toHaveBeenCalledWith(mockProduct.code);
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      vi.spyOn(component as any, 'restoreFocus').mockImplementation(() => {});
    });

    it('should remove product from wish list', () => {
      component.remove(mockCartEntry);

      expect(wishListFacade.removeEntry).toHaveBeenCalledWith(mockCartEntry);
    });
  });

  describe('getProductInWishList', () => {
    it('should return entry if product is in the wish list', () => {
      const result = component.getProductInWishList(mockProduct, entries);

      expect(result).toEqual(mockCartEntry);
    });
    it('should return "undefined" if product is NOT in the wish list', () => {
      const result = component.getProductInWishList(
        { code: 'not_in_wish_list' },
        entries
      );

      expect(result).toBe(undefined);
    });
  });

  describe('setStockInfo', () => {
    it('should set "hasStock" to true', () => {
      component['setStockInfo'](mockProduct);

      expect(component.hasStock).toBeTruthy();
    });
    it('should set "hasStock" to false', () => {
      component['setStockInfo']({ code: '123' });

      expect(component.hasStock).toBeFalsy();
    });
  });

  describe('UI', () => {
    describe('logged in user', () => {
      it('should show remove from wish list if product is the in wish list', () => {
        fixture.detectChanges();
        expect(el.query(By.css('.button-remove')).nativeElement).toBeDefined();
      });

      it('should show add to wish list if product is NOT the in wish list', () => {
        vi.spyOn(wishListFacade, 'getWishList').mockReturnValue(
          of({ ...mockWishList, entries: [] })
        );
        fixture.detectChanges();
        expect(el.query(By.css('.button-add')).nativeElement).toBeDefined();
      });
    });

    describe('anonymous', () => {
      it('should show "login to add to wish list link"', () => {
        component.userLoggedIn$ = of(false);
        fixture.detectChanges();
        expect(
          el.query(By.css('.button-add-link')).nativeElement
        ).toBeDefined();
      });

      it('should not show anything if there is no stock', () => {
        component.userLoggedIn$ = of(false);
        productSubject.next(mockOutOfStockProduct);
        fixture.detectChanges();
        expect(el.query(By.css('.button-add-link'))).toBeNull();
      });
    });
  });

  describe('getWishListEntries', () => {
    it('should return the wishlist entries from the facade', async () => {
      const wishList = await firstValueFrom(component['getWishListEntries']());
      expect(wishList).toEqual(mockWishList.entries);
    });
    it('should return an empty list if entries are falsy', async () => {
      vi.spyOn(wishListFacade, 'getWishList').mockReturnValue(
        of({ ...mockWishList, entries: undefined })
      );
      const wishList = await firstValueFrom(component['getWishListEntries']());
      expect(wishList).toEqual([]);
    });
  });

  describe('restoreFocus', () => {
    it('should refocus on removeFromWishlistButton', () => {
      component.removeFromWishlistButton = {
        nativeElement: {
          focus: vi.fn(),
        },
      };
      component.loading$ = of(false);

      component['restoreFocus']();

      expect(
        component.removeFromWishlistButton.nativeElement.focus
      ).toHaveBeenCalled();
    });

    it('should refocus on addToWishlistButton', () => {
      component.addToWishlistButton = {
        nativeElement: {
          focus: vi.fn(),
        },
      } as any;

      component.loading$ = of(false);
      component['restoreFocus']();

      expect(
        component.addToWishlistButton.nativeElement.focus
      ).toHaveBeenCalled();
    });
  });
});
