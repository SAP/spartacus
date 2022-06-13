import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsmFacade } from '@spartacus/asm/root';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import { BaseSiteService, User } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AsmComponentService } from '../services';
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

class MockMultiCartFacade {
  loadCart(cartId: string, userId: string): void {}
}

class MockAsmQueryService {
  bindCart(cartId: string, customerId: string): Observable<unknown> {
    return of(null);
  }
}

describe('AsmBindCartComponent', () => {
  let component: AsmBindCartComponent;
  let fixture: ComponentFixture<AsmBindCartComponent>;
  let asmComponentService: AsmComponentService;
  let asmFacadeService: AsmFacade;
  let multiCartFacade: MultiCartFacade;
  let activeCartFacade: ActiveCartFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsmBindCartComponent],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: AsmFacade, useClass: MockAsmQueryService },
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: MultiCartFacade, useClass: MockMultiCartFacade },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmBindCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    asmComponentService = TestBed.inject(AsmComponentService);
    asmFacadeService = TestBed.inject(AsmFacade);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
  });

  it('should assign cart to customer', () => {
    const testUser = { uid: 'user@test.com', name: 'Test User' } as User;
    const prevActiveCartId = '00001122';
    const testCartId = '00001234';

    spyOn(asmFacadeService, 'bindCart').and.returnValue(of());
    spyOn(activeCartFacade, 'getActiveCartId').and.returnValue(
      of(prevActiveCartId)
    );

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

    component.assignCartToCustomer();
  });
});
