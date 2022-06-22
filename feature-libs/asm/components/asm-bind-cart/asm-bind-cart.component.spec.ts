import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { StateWithAsm } from '@spartacus/asm/core';
import { AsmFacade } from '@spartacus/asm/root';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import { BaseSiteService, User, UserService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import * as fromReducers from '../../core/store/reducers/index';
import { AsmBindCartComponent } from './asm-bind-cart.component';

class MockActiveCartService {
  getActiveCartId(): Observable<string> {
    return of();
  }
}

const baseSite = 'test-site';
class MockBaseSiteService {
  getActive(): Observable<string> {
    return of(baseSite);
  }
}

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

class MockMultiCartFacade {
  loadCart(_cartId: string, _userId: string): void {}
}

class MockAsmService {
  bindCart(_cartId: string, _customerId: string): Observable<unknown> {
    return of(null);
  }
}

class MockUserService {
  get(): Observable<User> {
    return of({});
  }
}

describe('AsmBindCartComponent', () => {
  let component: AsmBindCartComponent;
  let fixture: ComponentFixture<AsmBindCartComponent>;
  let asmFacade: AsmFacade;
  let multiCartFacade: MultiCartFacade;
  let activeCartFacade: ActiveCartFacade;
  let store: Store<StateWithAsm>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('asm', fromReducers.getReducers()),
      ],
      declarations: [AsmBindCartComponent, MockTranslatePipe],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: AsmFacade, useClass: MockAsmService },
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: MultiCartFacade, useClass: MockMultiCartFacade },
        { provide: UserService, useClass: MockUserService },
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmBindCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    asmFacade = TestBed.inject(AsmFacade);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    userService = TestBed.inject(UserService);
  });

  it('should assign cart to customer', () => {
    const prevActiveCartId = '00001122';
    const testCartId = '00001234';

    const testUser = { uid: 'user@test.com', name: 'Test User' } as User;
    spyOn(userService, 'get').and.returnValue(of(testUser));

    spyOn(asmFacade, 'bindCart').and.returnValue(
      of(() => {
        expect(multiCartFacade.loadCart).toHaveBeenCalledWith({
          cartId: testCartId,
          userId: testUser.uid,
        });
      })
    );
    spyOn(multiCartFacade, 'loadCart').and.stub();
    spyOn(activeCartFacade, 'getActiveCartId').and.returnValue(
      of(prevActiveCartId)
    );

    component.customer = testUser;
    component.ngOnInit();
    fixture.detectChanges();

    // check that cart id entered matches
    expect(component.cartId.value).toEqual(prevActiveCartId);

    // clear entered cart id
    component.cartId.setValue('');

    // set cart number to assign
    component.cartId.setValue(testCartId);

    // check that cart id entered matches
    expect(component.cartId.value).toEqual(testCartId);

    component.bindCartToCustomer();

    expect(asmFacade.bindCart).toHaveBeenCalledWith({
      cartId: testCartId,
      customerId: testUser.uid,
    });

    // clear entered cart id
    component.cartId.setValue('');
    component.bindCartToCustomer();
    expect(asmFacade.bindCart).toHaveBeenCalledTimes(1);
  });
});
