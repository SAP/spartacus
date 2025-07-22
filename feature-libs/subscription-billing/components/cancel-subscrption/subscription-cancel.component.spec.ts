import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionCancelComponent } from './subscription-cancel.component';
import {
  GlobalMessageService,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import {
  CancelSubscriptionFacade,
} from '@spartacus/subscription-billing/root';
import {
  LaunchDialogService,
} from '@spartacus/storefront';
import { Observable, of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SubscriptionCancelComponent', () => {
  let component: SubscriptionCancelComponent;
  let fixture: ComponentFixture<SubscriptionCancelComponent>;

  const mockDialogData = {
    id: 'sub123',
    version: 1,
    ratePlanId: 'plan456',
    cancelData: {
      validTillDate: '10-07-2025',
      endDate: '15-07-2025',
    },
    code: 'SUB-001',
  };

  const mockLaunchDialogService = {
    data$: of(mockDialogData),
    closeDialog: jasmine.createSpy('closeDialog'),
  };

  const mockGlobalMessageService = {
    add: jasmine.createSpy('add'),
  };

  const mockRoutingService = {
    go: jasmine.createSpy('go'),
  };

  class MockTranslationService {
    translate(): Observable<string> {
      return of('test');
    }
  }

  const mockCancelFacade = {
    cancel: jasmine.createSpy('cancel').and.returnValue(of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionCancelComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: LaunchDialogService, useValue: mockLaunchDialogService },
        { provide: CancelSubscriptionFacade, useValue: mockCancelFacade },
        { provide: GlobalMessageService, useValue: mockGlobalMessageService },
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionCancelComponent);
    component = fixture.componentInstance;

    // simulate ngOnInit & data$ subscription
    fixture.detectChanges();
  });

  it('should initialize cancelData from launchDialogService data', () => {
    expect(component.cancelData()).toEqual({
      validTillDate: '10-07-2025',
      endDate: '15-07-2025',
    });
  });

  it('should format date correctly', () => {
    const result = component.getFormattedCancelValidTillDate({
      validTillDate: '10-07-2025',
    });
    expect(result).toEqual('2025-07-10');
  });

  it('should call cancel and show success message via onConfirm', () => {
    component.onConfirm();

    expect(mockCancelFacade.cancel).toHaveBeenCalledWith({
      subscriptionId: 'sub123',
      version: 1,
      ratePlanId: 'plan456',
      validTillDate: '10-07-2025',
      subscriptionEndDate: '15-07-2025',
    });

    expect(mockGlobalMessageService.add).toHaveBeenCalledWith('Success');
    expect(mockRoutingService.go).toHaveBeenCalledWith({ cxRoute: 'subscriptions' });
  });
it('should handle cancelSubscription error', () => {
  mockCancelFacade.cancel.and.returnValue(
    throwError(() => new Error('Error'))
  );

  // Set data before running onConfirm
  component.data = {
    id: 'sub123',
    version: 1,
    ratePlanId: 'plan456',
    cancelData: {
      subscriptionEndAt: '10-07-2025',
    },
    code: 'SUB-001',
  };

  component.onConfirm();

  expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith('error');
  expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
    { key: 'cancelSubscription.unknownError' },
    jasmine.anything()
  );
});

  it('should handle cancelSubscription error', () => {
    // override with error response
    mockCancelFacade.cancel.and.returnValue(
      throwError(() => new Error('Error'))
    );

    component.onConfirm();

    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith('error');
    expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
      { key: 'cancelSubscription.unknownError' },
      jasmine.anything()
    );
  });

  it('should call closeDialog with reason', () => {
    component.onDialogClose('test-reason');
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith('test-reason');
  });
});
