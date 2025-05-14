import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AuthService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import {
  PUNCHOUT_REQUISITION_PAGE_URL,
  PunchoutLevel,
  PunchoutOperation,
  PunchoutSession,
  PunchoutState,
  PunchoutStoreService,
} from '@spartacus/punchout/root';
import { Observable, of, take } from 'rxjs';
import { PunchoutButtonsComponent } from './punchout-buttons.component';
import { By } from '@angular/platform-browser';

const mockSessionId = '123abc';
const mockPunchoutSession: PunchoutSession = {
  customerId: 'test@test.com',
  cartId: 'mockCart',
  punchoutLevel: PunchoutLevel.PRODUCT,
  punchoutOperation: PunchoutOperation.EDIT,
  selectedItem: 'mockItemId',
  token: {
    accessToken: 'mockToken',
    tokenType: 'Bearer',
  },
};
const mockPunchoutState: PunchoutState = {
  punchoutSessionId: mockSessionId,
  punchoutSession: mockPunchoutSession,
  cancelRequisition: false,
};

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
  goByUrl = () => Promise.resolve(true);
}

class MockPunchoutStoreService implements Partial<PunchoutStoreService> {
  setPunchoutState = () => {};
  getPunchoutState = () => of(mockPunchoutState);
  clearState = () => {};
  getPunchoutSessionId = () => mockPunchoutState.punchoutSessionId;
  updatePunchoutState = () => {};
}

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
  coreLogout(): Promise<void> {
    return Promise.resolve();
  }
}

describe('PunchoutButtonsComponent', () => {
  let component: PunchoutButtonsComponent;
  let fixture: ComponentFixture<PunchoutButtonsComponent>;
  let punchoutStoreService: PunchoutStoreService;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, CommonModule],
      declarations: [PunchoutButtonsComponent],
      providers: [
        { provide: PunchoutStoreService, useClass: MockPunchoutStoreService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: AuthService, useClass: MockAuthService },
      ],
    });
    fixture = TestBed.createComponent(PunchoutButtonsComponent);
    component = fixture.componentInstance;

    punchoutStoreService = TestBed.inject(PunchoutStoreService);
    routingService = TestBed.inject(RoutingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getPunchoutState ', (done) => {
    spyOn(punchoutStoreService, 'getPunchoutState').and.returnValue(
      of(mockPunchoutState)
    );

    component.hasSessionId$.pipe(take(1)).subscribe({
      next: (result) => {
        expect(result).toEqual(true);
        expect(punchoutStoreService.getPunchoutState).toHaveBeenCalled();

        done();
      },
    });
  });

  it('should return false when no sessionId', (done) => {
    spyOn(punchoutStoreService, 'getPunchoutState').and.returnValue(
      of({ ...mockPunchoutState, punchoutSessionId: undefined })
    );

    component.hasSessionId$.pipe(take(1)).subscribe({
      next: (result) => {
        expect(result).toEqual(false);
        expect(punchoutStoreService.getPunchoutState).toHaveBeenCalled();
        done();
      },
    });
  });

  it('should submitRequisition redirect user to Requisition page and update state with cancelRequisition false ', () => {
    spyOn(routingService, 'go');
    spyOn(punchoutStoreService, 'updatePunchoutState').and.returnValue();

    component.submitRequisition(false);
    expect(routingService.go).toHaveBeenCalledWith(
      PUNCHOUT_REQUISITION_PAGE_URL
    );
    expect(punchoutStoreService.updatePunchoutState).toHaveBeenCalledWith({
      cancelRequisition: false,
    });
  });

  it('should submitRequisition redirect user to Requisition page and update state with cancelRequisition true ', () => {
    spyOn(routingService, 'go');
    spyOn(punchoutStoreService, 'updatePunchoutState').and.returnValue();

    component.submitRequisition(true);
    expect(routingService.go).toHaveBeenCalledWith(
      PUNCHOUT_REQUISITION_PAGE_URL
    );
    expect(punchoutStoreService.updatePunchoutState).toHaveBeenCalledWith({
      cancelRequisition: true,
    });
  });

  it('should display the "Cancel" button when removeCancelButton is false', () => {
    component.removeCancelButton = false;
    component.hasSessionId$ = of(true);
    fixture.detectChanges();

    const cancelButton = fixture.debugElement.query(
      By.css('button:nth-child(2)')
    );
    expect(cancelButton).toBeTruthy();
    expect(cancelButton.nativeElement.textContent.trim()).toContain(
      'punchout.cancel'
    );
  });

  it('should not display the "Cancel" button when removeCancelButton is true', () => {
    component.removeCancelButton = true;
    component.hasSessionId$ = of(true);
    fixture.detectChanges();

    const cancelButton = fixture.debugElement.query(
      By.css('button:nth-child(2)')
    );
    expect(cancelButton).toBeNull();
  });
});
