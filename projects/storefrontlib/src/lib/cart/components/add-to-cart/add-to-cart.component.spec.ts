import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import * as NgrxStore from '@ngrx/store';

import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { of } from 'rxjs';

import * as fromCart from '../../../cart/store';
import * as fromUser from '../../../user/store';
import { CartDataService } from '../../../cart/services/cart-data.service';
import { CartService } from '../../../cart/services/cart.service';
import { SpinnerModule } from './../../../ui/components/spinner/spinner.module';

import { AddToCartComponent } from './add-to-cart.component';
import { AddToCartModule } from './add-to-cart.module';

const productCode = '1234';
const mockCartEntry: any = [];
class MockCartService {
  addCartEntry(_productCode: string, _quantity: number): void {
    mockCartEntry.push({
      '1234': { entryNumber: 0, product: { code: productCode } }
    });
  }
}

describe('AddToCartComponent', () => {
  let addToCartComponent: AddToCartComponent;
  let fixture: ComponentFixture<AddToCartComponent>;
  let service;
  let modalInstance;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AddToCartModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        SpinnerModule,
        NgbModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('cart', fromCart.getReducers),
        StoreModule.forFeature('user', fromUser.getReducers)
      ],
      providers: [
        CartDataService,
        { provide: CartService, useClass: MockCartService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartComponent);
    addToCartComponent = fixture.componentInstance;
    service = TestBed.get(CartService);
    addToCartComponent.productCode = productCode;
    modalInstance = fixture.debugElement.injector.get<NgbModal>(NgbModal);
    spyOn(service, 'addCartEntry').and.callThrough();
    spyOn(modalInstance, 'open').and.callThrough();

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(addToCartComponent).toBeTruthy();
  });

  it('should call ngOnInit()', () => {
    spyOnProperty(NgrxStore, 'select').and.returnValue(() => () =>
      of(mockCartEntry)
    );
    addToCartComponent.ngOnInit();
    addToCartComponent.cartEntry$.subscribe(entry =>
      expect(entry).toEqual(mockCartEntry)
    );
  });

  it('should call addToCart()', () => {
    addToCartComponent.addToCart();
    addToCartComponent.cartEntry$.subscribe();

    expect(modalInstance.open).toHaveBeenCalled();
    expect(service.addCartEntry).toHaveBeenCalledWith(productCode, 1);
  });

  // UI test will be added after replacing Material
});
