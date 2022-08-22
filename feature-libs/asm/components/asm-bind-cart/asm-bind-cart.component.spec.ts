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
    fixture.detectChanges();
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

  describe('assign cart to customer', () => {
    it('should check that load cart Id matches previous assigned cart id', () => {
      component.customer = testUser;
      component.ngOnInit();
      fixture.detectChanges();

      // check that cart id entered matches
      expect(component.cartId.value).toEqual(prevActiveCartId);
    });

    it('should bind cart for assigned cart id', () => {
      component.customer = testUser;
      component.ngOnInit();
      fixture.detectChanges();
      component.cartId.setValue(testCartId);

      component.bindCartToCustomer();

      expect(asmBindCartFacade.bindCart).toHaveBeenCalledWith({
        cartId: testCartId,
        customerId: testUser.uid,
      });
    });

    it('should retrieve newly bound cart as "current"', () => {
      component.customer = testUser;
      component.cartId.setValue(testCartId);
      fixture.detectChanges();

      component.bindCartToCustomer();

      expect(multiCartFacade.loadCart).toHaveBeenCalledWith({
        cartId: OCC_CART_ID_CURRENT,
        userId: testUser.uid,
      });
    });

    it('should not bind cart for empty value', () => {
      component.customer = testUser;
      component.ngOnInit();
      fixture.detectChanges();
      // clear entered cart id
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
      component.customer = testUser;
      fixture.detectChanges();
      component.cartId.setValue('1234567890');

      component.bindCartToCustomer();

      expect(globalMessageService.add).toHaveBeenCalledWith(
        expectedErrorMessage,
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });
});
