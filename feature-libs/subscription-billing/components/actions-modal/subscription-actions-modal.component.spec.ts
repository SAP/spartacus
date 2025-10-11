import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SubscriptionActionsModalComponent } from './subscription-actions-modal.component';
import { Observable, of, throwError } from 'rxjs';
import {
  SubscriptionBillingActionsFacade,
  SubscriptionCancelData,
} from '@spartacus/subscription-billing/root';
import {
  TranslationService,
  GlobalMessageService,
  GlobalMessageType,
  EventService,
  RoutingService,
  LanguageService,
} from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { signal } from '@angular/core';

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
    go: jasmine.createSpy('go'),
  };
  class MockLanguageService {
    getActive(): Observable<string> {
      return of('en');
    }
  }
  let mockCancelFacade: jasmine.SpyObj<SubscriptionBillingActionsFacade>;
  let mockGlobalMessageService: jasmine.SpyObj<GlobalMessageService>;
  let mockLaunchDialogService: jasmine.SpyObj<LaunchDialogService>;
  let mockEventService: jasmine.SpyObj<EventService>;

  beforeEach(async () => {
    mockCancelFacade = jasmine.createSpyObj(
      'SubscriptionBillingActionsFacade',
      [
        'getEffectiveCancellationDate',
        'cancelSubscription',
        'withdrawal',
        'reverseCancellation',
      ]
    );

    mockCancelFacade.getEffectiveCancellationDate.and.returnValue(
      of({ subscriptionEndAt: '2025-12-31' })
    );
    mockCancelFacade.cancelSubscription.and.returnValue(of({}));
    mockCancelFacade.withdrawal.and.returnValue(of({}));
    mockCancelFacade.reverseCancellation.and.returnValue(of({}));
    mockGlobalMessageService = jasmine.createSpyObj('GlobalMessageService', [
      'add',
    ]);

    mockLaunchDialogService = jasmine.createSpyObj(
      'LaunchDialogService',
      ['closeDialog'],
      {
        data$: of({ id: 'subId', code: 'ABC123', mode: 'cancel' }),
      }
    );

    mockLaunchDialogService = jasmine.createSpyObj(
      'LaunchDialogService',
      ['closeDialog'],
      {
        data$: of({
          code: 'ABC123',
          id: 'subId',
          mode: 'cancel',
        }),
      }
    );

    mockEventService = jasmine.createSpyObj('EventService', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, SubscriptionActionsModalComponent],
      providers: [
        provideMockStore(),
        {
          provide: SubscriptionBillingActionsFacade,
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
      mockCancelFacade.cancelSubscription.and.returnValue(of({}));

      component.onConfirm();

      expect(mockCancelFacade.cancelSubscription).toHaveBeenCalled();
      expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith(
        'Success'
      );
    });

    it('should handle cancel subscription API error', fakeAsync(() => {
      mockCancelFacade.cancelSubscription.and.returnValue(
        throwError(() => new Error('Cancel Error'))
      );
      component.onConfirm();
      tick();
      expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
        { key: 'subscriptionActions.unknownError' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith('error');
    }));

    it('should confirm withdrawal successfully', () => {
      mockCancelFacade.withdrawal.and.returnValue(of({}));
      (component as any).subscriptionDetailSignal.set({
        id: 'subId',
        code: 'ABC123',
        mode: 'withdraw',
      });

      component.onConfirm();

      expect(mockCancelFacade.withdrawal).toHaveBeenCalled();
      expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith(
        'Success'
      );
    });

    it('should handle withdraw API error', fakeAsync(() => {
      mockCancelFacade.withdrawal.and.returnValue(
        throwError(() => new Error('Error'))
      );

      (component as any).subscriptionDetailSignal.set({
        id: 'subId',
        code: 'ABC123',
        mode: 'withdraw',
      });

      component.onConfirm();
      tick();

      expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith('error');
      expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
        { key: 'subscriptionActions.unknownError' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }));

    it('should confirm resubscribe successfully', () => {
      mockCancelFacade.reverseCancellation.and.returnValue(of({}));

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

    it('should handle error from getEffectiveCancellationDate in effect', fakeAsync(() => {
      mockCancelFacade.getEffectiveCancellationDate.and.returnValue(
        throwError(() => new Error('Load Cancel Data Error'))
      );

      fixture = TestBed.createComponent(SubscriptionActionsModalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      tick();

      expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
        { key: 'subscriptionActions.unknownError' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }));
  });
});
