import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import {
  PUNCHOUT_REQUISITION_PAGE_URL,
  PunchOutLevel,
  PunchOutOperation,
  PunchoutSession,
  PunchoutState,
  PunchoutStoreService,
  PunchoutUiRestrictionService,
} from '@spartacus/punchout/root';
import { of } from 'rxjs';
import { PunchoutButtonsComponent } from './punchout-buttons.component';
import { By } from '@angular/platform-browser';
import { take } from 'rxjs/operators';

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

class MockPunchoutUiRestrictionService
  implements Partial<PunchoutUiRestrictionService>
{
  isPunchoutSessionActive = jasmine.createSpy().and.returnValue(of(true));
}

describe('PunchoutButtonsComponent', () => {
  let component: PunchoutButtonsComponent;
  let fixture: ComponentFixture<PunchoutButtonsComponent>;
  let punchoutStoreService: PunchoutStoreService;
  let routingService: RoutingService;
  let mockPunchoutUiRestrictionService: PunchoutUiRestrictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, CommonModule],
      declarations: [PunchoutButtonsComponent],
      providers: [
        { provide: PunchoutStoreService, useClass: MockPunchoutStoreService },
        {
          provide: PunchoutUiRestrictionService,
          useClass: MockPunchoutUiRestrictionService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });
    fixture = TestBed.createComponent(PunchoutButtonsComponent);
    component = fixture.componentInstance;

    punchoutStoreService = TestBed.inject(PunchoutStoreService);
    routingService = TestBed.inject(RoutingService);
    mockPunchoutUiRestrictionService = TestBed.inject(
      PunchoutUiRestrictionService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose isPunchoutSessionActive$ observable from service', () => {
    component.isPunchoutSessionActive$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(true);
    });

    expect(
      mockPunchoutUiRestrictionService.isPunchoutSessionActive
    ).toHaveBeenCalled();
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
    fixture.detectChanges();

    const cancelButton = fixture.debugElement.query(
      By.css('button:nth-child(2)')
    );
    expect(cancelButton).toBeNull();
  });
});
