import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  EventService,
} from '@spartacus/core';
import { GetSubscriptionByCodeReloadEvent } from '@spartacus/subscription-billing/root';
import { firstValueFrom, throwError } from 'rxjs';
import { vi } from 'vitest';
import { SubscriptionActionsModalComponentService } from './subscription-actions-modal-component.service';

describe('SubscriptionActionsModalComponentService', () => {
  let service: SubscriptionActionsModalComponentService;
  let globalMessageService: any;
  let eventService: any;

  beforeEach(() => {
    const globalMessageSpy = { add: vi.fn() };
    const eventServiceSpy = { dispatch: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        SubscriptionActionsModalComponentService,
        { provide: GlobalMessageService, useValue: globalMessageSpy },
        { provide: EventService, useValue: eventServiceSpy },
      ],
    });

    service = TestBed.inject(SubscriptionActionsModalComponentService);
    globalMessageService = TestBed.inject(GlobalMessageService) as any;
    eventService = TestBed.inject(EventService) as any;
  });

  describe('handleError', () => {
    it('should call onDialogClose with "error" and show global error message', async () => {
      const onDialogClose = vi.fn();

      const errorHandler = service.handleError(onDialogClose, 'test.error');

      await firstValueFrom(
        throwError(() => new Error('Test')).pipe(errorHandler)
      ).catch(() => {});

      expect(onDialogClose).toHaveBeenCalledWith('error');
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'test.error' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should default to unknown error key if none provided', async () => {
      const errorHandler = service.handleError();

      await firstValueFrom(
        throwError(() => new Error('Test')).pipe(errorHandler)
      ).catch(() => {});

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'subscriptionActions.unknownError' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });

  describe('handleSuccess', () => {
    it('should call onDialogClose with "Success", dispatch event, and show success message', () => {
      const onDialogClose = vi.fn();
      const observer = service.handleSuccess(
        'test.success',
        onDialogClose,
        true
      );

      observer.next();

      expect(onDialogClose).toHaveBeenCalledWith('Success');
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        GetSubscriptionByCodeReloadEvent
      );
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'test.success' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });

    it('should not dispatch event if dispatchReloadEvent is false', () => {
      const observer = service.handleSuccess('test.success', undefined, false);

      observer.next();

      expect(eventService.dispatch).not.toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'test.success' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });
  });

  describe('onError', () => {
    it('should show default unknown error message', () => {
      service.onError();

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'subscriptionActions.unknownError' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });
});
