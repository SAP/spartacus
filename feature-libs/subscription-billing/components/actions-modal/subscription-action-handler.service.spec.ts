import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  EventService,
} from '@spartacus/core';
import { GetSubscriptionByCodeReloadEvent } from '@spartacus/subscription-billing/root';
import { throwError } from 'rxjs';
import { SubscriptionActionHandlerService } from './subscription-action-handler.service';

describe('SubscriptionActionHandlerService', () => {
  let service: SubscriptionActionHandlerService;
  let globalMessageService: jasmine.SpyObj<GlobalMessageService>;
  let eventService: jasmine.SpyObj<EventService>;

  beforeEach(() => {
    const globalMessageSpy = jasmine.createSpyObj('GlobalMessageService', [
      'add',
    ]);
    const eventServiceSpy = jasmine.createSpyObj('EventService', ['dispatch']);

    TestBed.configureTestingModule({
      providers: [
        SubscriptionActionHandlerService,
        { provide: GlobalMessageService, useValue: globalMessageSpy },
        { provide: EventService, useValue: eventServiceSpy },
      ],
    });

    service = TestBed.inject(SubscriptionActionHandlerService);
    globalMessageService = TestBed.inject(
      GlobalMessageService
    ) as jasmine.SpyObj<GlobalMessageService>;
    eventService = TestBed.inject(EventService) as jasmine.SpyObj<EventService>;
  });

  describe('handleError', () => {
    it('should call onDialogClose with "error" and show global error message', (done) => {
      const onDialogClose = jasmine.createSpy('onDialogClose');

      const errorHandler = service.handleError(onDialogClose, 'test.error');

      throwError(() => new Error('Test'))
        .pipe(errorHandler)
        .subscribe({
          complete: () => {
            expect(onDialogClose).toHaveBeenCalledWith('error');
            expect(globalMessageService.add).toHaveBeenCalledWith(
              { key: 'test.error' },
              GlobalMessageType.MSG_TYPE_ERROR
            );
            done();
          },
        });
    });

    it('should default to unknown error key if none provided', (done) => {
      const errorHandler = service.handleError();

      throwError(() => new Error('Test'))
        .pipe(errorHandler)
        .subscribe({
          complete: () => {
            expect(globalMessageService.add).toHaveBeenCalledWith(
              { key: 'subscriptionActions.unknownError' },
              GlobalMessageType.MSG_TYPE_ERROR
            );
            done();
          },
        });
    });
  });

  describe('handleSuccess', () => {
    it('should call onDialogClose with "Success", dispatch event, and show success message', () => {
      const onDialogClose = jasmine.createSpy('onDialogClose');
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
