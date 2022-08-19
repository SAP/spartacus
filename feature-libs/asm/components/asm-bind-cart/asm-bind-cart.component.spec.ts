import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsmService } from '@spartacus/asm/root';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  BaseSiteService,
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  Translatable,
  User,
} from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { EMPTY, Observable, of } from 'rxjs';
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

class MockAsmService {
  bindCart(_cartId: string, _customerId: string): Observable<unknown> {
    return of(null);
  }
}

describe('AsmBindCartComponent', () => {
  let component: AsmBindCartComponent;
  let fixture: ComponentFixture<AsmBindCartComponent>;
  let asmService: AsmService;
  let multiCartFacade: MultiCartFacade;
  let activeCartFacade: ActiveCartFacade;
  let userService: UserAccountFacade;

  const prevActiveCartId = '00001122';
  const testCartId = '00001234';

  const testUser = { uid: 'user@test.com', name: 'Test User' } as User;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsmBindCartComponent, MockTranslatePipe],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: AsmService, useClass: MockAsmService },
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
    asmService = TestBed.inject(AsmService);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    userService = TestBed.inject(UserAccountFacade);

    spyOn(userService, 'get').and.returnValue(of(testUser));

    spyOn(asmService, 'bindCart').and.returnValue(
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

  describe('should assign cart to customer', () => {
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
      // clear entered cart id
      component.cartId.setValue('');

      // set cart number to assign
      component.cartId.setValue(testCartId);

      // check that cart id entered matches
      expect(component.cartId.value).toEqual(testCartId);

      component.bindCartToCustomer();

      expect(asmService.bindCart).toHaveBeenCalledWith({
        cartId: testCartId,
        customerId: testUser.uid,
      });
    });

    it('should not bind cart for empty value', () => {
      component.customer = testUser;
      component.ngOnInit();
      fixture.detectChanges();
      // clear entered cart id
      component.cartId.setValue('');
      component.bindCartToCustomer();
      expect(asmService.bindCart).toHaveBeenCalledTimes(0);
    });
  });
});
