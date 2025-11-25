import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart, OrderEntry } from '@spartacus/cart/base/root';
import { AuthService } from '@spartacus/core';
import { PunchoutUiRestrictionService } from '@spartacus/punchout/root';
import { of } from 'rxjs';
import { PunchoutInspectCartComponent } from './punchout-inspect-cart.component';

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActive() {
    const mockCart: Cart = {
      code: 'testCart123',
      totalItems: 1,
      totalPrice: { formattedValue: '$100' },
    };
    return of(mockCart);
  }
  getEntries() {
    const mockEntries: OrderEntry[] = [
      {
        entryNumber: 1,
        quantity: 1,
        product: { code: 'testProduct', name: 'Test Product' },
      },
    ];
    return of(mockEntries);
  }
}

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn() {
    return of(true);
  }
}

class MockPunchoutUiRestrictionService
  implements Partial<PunchoutUiRestrictionService>
{
  isPunchoutSessionActive() {
    return of(true);
  }
}

describe('PunchoutInspectCartComponent', () => {
  let component: PunchoutInspectCartComponent;
  let fixture: ComponentFixture<PunchoutInspectCartComponent>;
  let mockActiveCartFacade: MockActiveCartFacade;
  let mockAuthService: MockAuthService;
  let mockPunchoutUiRestrictionService: MockPunchoutUiRestrictionService;

  beforeEach(async () => {
    mockActiveCartFacade = new MockActiveCartFacade();
    mockAuthService = new MockAuthService();
    mockPunchoutUiRestrictionService = new MockPunchoutUiRestrictionService();

    await TestBed.configureTestingModule({
      imports: [PunchoutInspectCartComponent],
      providers: [
        { provide: ActiveCartFacade, useValue: mockActiveCartFacade },
        { provide: AuthService, useValue: mockAuthService },
        {
          provide: PunchoutUiRestrictionService,
          useValue: mockPunchoutUiRestrictionService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PunchoutInspectCartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isPunchoutSessionActive$ observable initialized', (done) => {
    component.isPunchoutSessionActive$.subscribe((isActive) => {
      expect(isActive).toBe(true);
      done();
    });
  });

  it('should have cart$ observable initialized', (done) => {
    component.cart$.subscribe((cart) => {
      expect(cart).toBeTruthy();
      expect(cart.code).toBe('testCart123');
      done();
    });
  });

  it('should have entries$ observable initialized and filter empty entries', (done) => {
    const mockEntries: OrderEntry[] = [
      {
        entryNumber: 1,
        quantity: 1,
        product: { code: 'testProduct', name: 'Test Product' },
      },
    ];
    spyOn(mockActiveCartFacade, 'getEntries').and.returnValue(of(mockEntries));

    component.entries$.subscribe((entries) => {
      expect(entries).toBeTruthy();
      expect(entries.length).toBe(1);
      expect(entries[0].product?.code).toBe('testProduct');
      done();
    });
  });

  it('entries$ observable should not emit if entries are empty', (done) => {
    const mockEntries: OrderEntry[] = [];
    spyOn(mockActiveCartFacade, 'getEntries').and.returnValue(of(mockEntries));

    let emitted = false;
    component.entries$.subscribe({
      next: () => {
        emitted = true;
      },
      error: (err) => done.fail(err),
      complete: () => {
        expect(emitted).toBe(true);
        done();
      },
    });
  });
});
