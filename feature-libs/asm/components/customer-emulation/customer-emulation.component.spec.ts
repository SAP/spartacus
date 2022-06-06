import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AsmFacadeService } from '@spartacus/asm/root';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  BaseSiteService,
  I18nTestingModule,
  User,
  UserService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AsmComponentService } from '../services/asm-component.service';
import { CustomerEmulationComponent } from './customer-emulation.component';
class MockUserService {
  get(): Observable<User> {
    return of({});
  }
}

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
class MockAsmComponentService {
  logoutCustomer(): void {}
  isCustomerEmulationSessionInProgress(): Observable<boolean> {
    return of(true);
  }
}

class MockMultiCartFacade {
  loadCart(cartId: string, userId: string): void {}
}

class MockAsmQueryService {
  bindCart(cartId: string, customerId: string): Observable<unknown> {
    return of(null);
  }
}

describe('CustomerEmulationComponent', () => {
  let component: CustomerEmulationComponent;
  let fixture: ComponentFixture<CustomerEmulationComponent>;
  let userService: UserService;
  let asmComponentService: AsmComponentService;
  let asmFacadeService: AsmFacadeService;
  let multiCartFacade: MultiCartFacade;
  let activeCartFacade: ActiveCartFacade;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [CustomerEmulationComponent],
        providers: [
          { provide: UserService, useClass: MockUserService },
          { provide: AsmComponentService, useClass: MockAsmComponentService },
          { provide: ActiveCartFacade, useClass: MockActiveCartService },
          { provide: AsmFacadeService, useClass: MockAsmQueryService },
          { provide: BaseSiteService, useClass: MockBaseSiteService },
          { provide: MultiCartFacade, useClass: MockMultiCartFacade },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEmulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    asmComponentService = TestBed.inject(AsmComponentService);
    asmFacadeService = TestBed.inject(AsmFacadeService);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user info during customer emulation.', () => {
    const testUser = { uid: 'user@test.com', name: 'Test User' } as User;
    spyOn(userService, 'get').and.returnValue(of(testUser));
    component.ngOnInit();
    fixture.detectChanges();

    expect(
      el.query(By.css('.customerInfo .name')).nativeElement.innerHTML
    ).toEqual(`${testUser.name}`);
    expect(
      el.query(By.css('.customerInfo .uid')).nativeElement.innerHTML
    ).toEqual(`${testUser.uid}`);
    expect(el.query(By.css('dev.fd-alert'))).toBeFalsy();
  });

  it("should call logoutCustomer() on 'End Session' button click", () => {
    //customer login
    const testUser = { uid: 'user@test.com', name: 'Test User' } as User;
    spyOn(userService, 'get').and.returnValue(of(testUser));

    component.ngOnInit();
    fixture.detectChanges();

    //Click button
    const endSessionButton = fixture.debugElement.query(
      By.css('button[formControlName="logoutCustomer"]')
    );
    spyOn(asmComponentService, 'logoutCustomer').and.stub();
    endSessionButton.nativeElement.click();

    //assert
    expect(asmComponentService.logoutCustomer).toHaveBeenCalled();
  });

  it('should assign cart to customer', () => {
    const testUser = { uid: 'user@test.com', name: 'Test User' } as User;
    const prevActiveCartId = '00001122';
    const testCartId = '00001234';
    const assignCartToCustomerButton = fixture.debugElement.query(
      By.css('button.assignCartToCustomer')
    );
    spyOn(userService, 'get').and.returnValue(of(testUser));

    spyOn(asmFacadeService, 'bindCart').and.returnValue(of());
    spyOn(activeCartFacade, 'getActiveCartId').and.returnValue(
      of(prevActiveCartId)
    );

    component.ngOnInit();
    fixture.detectChanges();

    // check that cart id entered matches
    expect(component.cartId.value).toEqual(prevActiveCartId);

    // check that cart id exists
    expect(component.cartIdExists).toBeTruthy();

    // check that assign to cart button is enabled
    expect(
      assignCartToCustomerButton.nativeElement.getAttribute('disabled')
    ).toBeFalsy();

    // clear entered cart id
    component.cartId.setValue('');

    // check that cart id DOES NOT exists
    expect(component.cartIdExists).toBeFalsy();

    // check that assign to cart button is disabled
    expect(
      assignCartToCustomerButton.nativeElement.getAttribute('disabled')
    ).toBeNull();

    // set cart number to assign
    component.cartId.setValue(testCartId);

    // check that cart id exists
    expect(component.cartIdExists).toBeTruthy();

    // check that cart id entered matches
    expect(component.cartId.value).toEqual(testCartId);

    // check that assign to cart button is enabled
    expect(
      assignCartToCustomerButton.nativeElement.getAttribute('disabled')
    ).toBeFalsy();
  });
});
