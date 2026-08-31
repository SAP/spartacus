import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionActionsModalComponent } from './subscription-actions-modal.component';
import { Observable, of, throwError } from 'rxjs';
import {
  SubscriptionActionsFacade,
  SubscriptionCancelData,
} from '@spartacus/subscription-billing/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  EventService,
  RoutingService,
  LanguageService,
  TranslationService,
} from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { signal } from '@angular/core';
import { vi } from 'vitest';

describe('SubscriptionActionsModalComponent', () => {
  let component: SubscriptionActionsModalComponent;
  let fixture: ComponentFixture<SubscriptionActionsModalComponent>;

  const mockCancelData: SubscriptionCancelData = {
    subscriptionEndAt: '2025-12-31',
  };

  class MockTranslationService {
    translate(): Observable<string> {
      return of('test');
    }
  }
  const mockRoutingService = {
    go: vi.fn(),
  };
  class MockLanguageService {
    getActive(): Observable<string> {
      return of('en');
    }
  }
  let mockCancelFacade: any;
  let mockGlobalMessageService: any;
  let mockLaunchDialogService: any;
  let mockEventService: any;

  beforeEach(async () => {
    mockCancelFacade = {
      getEffectiveCancellationDate: vi.fn(),
      cancelSubscription: vi.fn(),
      withdrawSubscription: vi.fn(),
      reverseCancellation: vi.fn(),
      extendSubscription: vi.fn(),
      getExtensionEffectiveDate: vi.fn(),
    };

    mockCancelFacade.getEffectiveCancellationDate.mockReturnValue(
      of({ subscriptionEndAt: '2025-12-31' })
    );
    mockCancelFacade.cancelSubscription.mockReturnValue(of({}));
    mockCancelFacade.withdrawSubscription.mockReturnValue(of({}));
    mockCancelFacade.reverseCancellation.mockReturnValue(of({}));
    mockCancelFacade.extendSubscription.mockReturnValue(of({}));
    mockCancelFacade.getExtensionEffectiveDate.mockReturnValue(
      of({ subscriptionEndAt: '2024-12-31' })
    );
    mockGlobalMessageService = { add: vi.fn() };

    mockLaunchDialogService = {
      closeDialog: vi.fn(),
      data$: of({
        code: 'ABC123',
        id: 'subId',
        mode: 'cancel',
      }),
    };

    mockEventService = { dispatch: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, SubscriptionActionsModalComponent],
      providers: [
        provideMockStore(),
        {
          provide: SubscriptionActionsFacade,
          useValue: mockCancelFacade,
        },
        { provide: GlobalMessageService, useValue: mockGlobalMessageService },
        { provide: LaunchDialogService, useValue: mockLaunchDialogService },
        { provide: EventService, useValue: mockEventService },
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: LanguageService, useClass: MockLanguageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionActionsModalComponent);
    component = fixture.componentInstance;

    (component as any).cancelData = signal(mockCancelData);
    (component as any).subscriptionDetailSignal = signal({
      id: 'subId',
      code: 'ABC123',
      mode: 'cancel',
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onConfirm', () => {
    it('should confirm cancel subscription successfully', () => {
      mockCancelFacade.cancelSubscription.mockReturnValue(of({}));

      component.onConfirm();

      expect(mockCancelFacade.cancelSubscription).toHaveBeenCalled();
      expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith(
        'Success'
      );
    });

    it('should confirm extend subscription successfully', () => {
      mockCancelFacade.extendSubscription.mockReturnValue(of({}));
      component.mode = signal('extend');
      component.onConfirm();

      expect(mockCancelFacade.extendSubscription).toHaveBeenCalled();
      expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith(
        'subscriptionActions.extendedSuccessfully'
      );
    });

    it('should handle cancel subscription API error', async () => {
      mockCancelFacade.cancelSubscription.mockReturnValue(
        throwError(() => new Error('Cancel Error'))
      );
      component.onConfirm();
      await Promise.resolve();
      expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
        { key: 'subscriptionActions.unknownError' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith('error');
    });

    it('should handle extend subscription API error', async () => {
      mockCancelFacade.extendSubscription.mockReturnValue(
        throwError(() => new Error('Extend Error'))
      );
      component.mode = signal('extend');
      component.onConfirm();
      await Promise.resolve();
      expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
        { key: 'subscriptionActions.unknownError' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith('error');
    });

    it('should confirm withdrawal successfully', () => {
      mockCancelFacade.withdrawSubscription.mockReturnValue(of({}));
      (component as any).subscriptionDetailSignal.set({
        id: 'subId',
        code: 'ABC123',
        mode: 'withdraw',
      });

      component.onConfirm();

      expect(mockCancelFacade.withdrawSubscription).toHaveBeenCalled();
      expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith(
        'Success'
      );
    });

    it('should handle withdraw API error', async () => {
      mockCancelFacade.withdrawSubscription.mockReturnValue(
        throwError(() => new Error('Error'))
      );

      (component as any).subscriptionDetailSignal.set({
        id: 'subId',
        code: 'ABC123',
        mode: 'withdraw',
      });

      component.onConfirm();
      await Promise.resolve();

      expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith('error');
      expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
        { key: 'subscriptionActions.unknownError' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should confirm resubscribe successfully', () => {
      mockCancelFacade.reverseCancellation.mockReturnValue(of({}));

      (component as any).subscriptionDetailSignal.set({
        id: 'subId',
        code: 'ABC123',
        mode: 'resubscribe',
      });

      component.onConfirm();

      expect(mockCancelFacade.reverseCancellation).toHaveBeenCalledWith(
        'ABC123'
      );
      expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith(
        'Success'
      );
    });

    it('should show error if cancelData is missing subscriptionEndAt', () => {
      (component as any).cancelData.set({} as SubscriptionCancelData);
      component.onConfirm();
      expect(mockGlobalMessageService.add).toHaveBeenCalled();
    });

    it('should show error when subscription detail is missing', () => {
      (component as any).subscriptionDetailSignal.set(undefined);

      component.onConfirm();

      expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
        { key: 'subscriptionActions.unknownError' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should handle error from getEffectiveCancellationDate in effect', async () => {
      mockCancelFacade.getEffectiveCancellationDate.mockReturnValue(
        throwError(() => new Error('Load Cancel Data Error'))
      );

      fixture = TestBed.createComponent(SubscriptionActionsModalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      await Promise.resolve();

      expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
        { key: 'subscriptionActions.unknownError' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should handle error from getExtendEffectiveDate in effect', async () => {
      mockCancelFacade.getExtensionEffectiveDate.mockReturnValue(
        throwError(() => new Error('Load Cancel Data Error'))
      );

      fixture = TestBed.createComponent(SubscriptionActionsModalComponent);
      component = fixture.componentInstance;
      component.getExtensionEffectiveDate();
      fixture.detectChanges();
      await Promise.resolve();

      expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
        { key: 'subscriptionActions.unknownError' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });
});
