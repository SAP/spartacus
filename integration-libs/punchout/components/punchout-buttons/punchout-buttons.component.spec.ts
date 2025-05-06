import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
} from '@spartacus/core';
import {
  PunchOutLevel,
  PunchOutOperation,
  PunchoutSession,
  PunchoutState,
  PunchoutStoreService,
} from '@spartacus/punchout/root';
import { Observable, of, take } from 'rxjs';
import { PunchoutButtonsComponent } from './punchout-buttons.component';
import createSpy = jasmine.createSpy;

const mockSessionId = '123abc';
const mockPunchoutSession: PunchoutSession = {
  customerId: 'test@test.com',
  cartId: 'mockCart',
  punchOutLevel: PunchOutLevel.PRODUCT,
  punchOutOperation: PunchOutOperation.EDIT,
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

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
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
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, CommonModule],
      declarations: [PunchoutButtonsComponent],
      providers: [
        { provide: PunchoutStoreService, useClass: MockPunchoutStoreService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    });
    fixture = TestBed.createComponent(PunchoutButtonsComponent);
    component = fixture.componentInstance;

    punchoutStoreService = TestBed.inject(PunchoutStoreService);
    globalMessageService = TestBed.inject(GlobalMessageService);
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
    spyOn(punchoutStoreService, 'updatePunchoutState').and.returnValue();

    component.submitRequisition(false);
    expect(globalMessageService.add).toHaveBeenCalledWith(
      'keyToDo',
      GlobalMessageType.MSG_TYPE_INFO
    );
    expect(punchoutStoreService.updatePunchoutState).toHaveBeenCalledWith({
      cancelRequisition: false,
    });
  });

  it('should submitRequisition redirect user to Requisition page and update state with cancelRequisition true ', () => {
    spyOn(punchoutStoreService, 'updatePunchoutState').and.returnValue();

    component.submitRequisition(true);
    expect(globalMessageService.add).toHaveBeenCalledWith(
      'keyToDo',
      GlobalMessageType.MSG_TYPE_INFO
    );
    expect(punchoutStoreService.updatePunchoutState).toHaveBeenCalledWith({
      cancelRequisition: true,
    });
  });
});
