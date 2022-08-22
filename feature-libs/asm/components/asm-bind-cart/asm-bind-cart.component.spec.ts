import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsmBindCartFacade } from '@spartacus/asm/root';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  BaseSiteService,
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  OCC_CART_ID_CURRENT,
  Translatable,
  User,
} from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { AsmBindCartComponent } from './asm-bind-cart.component';

class MockActiveCartService {
  getActiveCartId(): Observable<string> {
    return EMPTY;
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

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  get(): Observable<GlobalMessageEntities> {
    return of({});
  }
  add(_: string | Translatable, __: GlobalMessageType, ___?: number): void {}
  remove(_: GlobalMessageType, __?: number): void {}
}

class MockUserAccountFacade implements Partial<UserAccountFacade> {
  get(): Observable<User> {
    return of({});
  }
}

class MockMultiCartFacade {
  loadCart(_cartId: string, _userId: string): void {}
}

class MockAsmBindCartFacade {
  bindCart(_cartId: string, _customerId: string): Observable<unknown> {
    return of(null);
  }
}

describe('AsmBindCartComponent', () => {
  let component: AsmBindCartComponent;
  let fixture: ComponentFixture<AsmBindCartComponent>;
  let asmBindCartFacade: AsmBindCartFacade;
  let multiCartFacade: MultiCartFacade;
  let activeCartFacade: ActiveCartFacade;
  let userService: UserAccountFacade;
  let globalMessageService: GlobalMessageService;

  const prevActiveCartId = '00001122';
  const testCartId = '00001234';

  const testUser = { uid: 'user@test.com', name: 'Test User' } as User;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsmBindCartComponent, MockTranslatePipe],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: AsmBindCartFacade, useClass: MockAsmBindCartFacade },
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: MultiCartFacade, useClass: MockMultiCartFacade },
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmBindCartComponent);
    component = fixture.componentInstance;

    asmBindCartFacade = TestBed.inject(AsmBindCartFacade);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    userService = TestBed.inject(UserAccountFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);

    spyOn(userService, 'get').and.returnValue(of(testUser));

    spyOn(asmBindCartFacade, 'bindCart').and.returnValue(
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
  });

  it('should fill the cart field with the current active cart for the customer', () => {
    fixture.detectChanges();

    expect(component.cartId.value).toEqual(prevActiveCartId);
  });

  it('should leave the cart field blank when there is no current active cart for the customer', () => {
    (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(of(''));

    fixture.detectChanges();

    expect(component.cartId.value).toEqual('');
  });

  describe('assign cart to customer', () => {
    beforeEach(() => {
      fixture.detectChanges();

      component.cartId.setValue(testCartId);
    });

    it('should bind cart for assigned cart id', () => {
      component.bindCartToCustomer();

      expect(asmBindCartFacade.bindCart).toHaveBeenCalledWith({
        cartId: testCartId,
        customerId: testUser.uid,
      });
    });

    it('should retrieve newly bound cart as "current"', () => {
      component.bindCartToCustomer();

      expect(multiCartFacade.loadCart).toHaveBeenCalledWith({
        cartId: OCC_CART_ID_CURRENT,
        userId: testUser.uid,
      });
    });

    it('should not bind cart for empty value', () => {
      component.cartId.setValue('');

      component.bindCartToCustomer();

      expect(asmBindCartFacade.bindCart).toHaveBeenCalledTimes(0);
    });

    it('should alert through global messsages when the bind cart fails', () => {
      const expectedErrorMessage = 'mock-error-message';
      (asmBindCartFacade.bindCart as jasmine.Spy).and.returnValue(
        throwError({ details: [{ message: expectedErrorMessage }] })
      );
      spyOn(globalMessageService, 'add').and.stub();

      component.bindCartToCustomer();

      expect(globalMessageService.add).toHaveBeenCalledWith(
        expectedErrorMessage,
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });
});
