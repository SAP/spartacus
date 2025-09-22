import { TestBed } from '@angular/core/testing';
import { EventService } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { of, Subject } from 'rxjs';
import { CancelPopupEvent } from './cancel-event';
import { ElementRef } from '@angular/core';
import { CancelPopupEventListener } from './cancel-popup-event.listener';

describe('CancelPopupEventListener', () => {
  let service: CancelPopupEventListener;
  let eventService: jasmine.SpyObj<EventService>;
  let launchDialogService: jasmine.SpyObj<LaunchDialogService>;

  // Mock ElementRef and CancelPopupEvent
  const mockElementRef = new ElementRef(document.createElement('button'));

  const mockCancelPopupEvent: CancelPopupEvent = {
    ...new CancelPopupEvent(),
    triggerElementRef: mockElementRef,
    data: {
      code: '123',
      cancelData: {},
    },
  };

  beforeEach(() => {
    // Create spies for dependencies
    const eventServiceSpy = jasmine.createSpyObj('EventService', ['get']);
    const launchDialogServiceSpy = jasmine.createSpyObj('LaunchDialogService', [
      'openDialog',
    ]);

    // Fix: Make get() return a dummy observable so .subscribe() doesn't fail
    eventServiceSpy.get.and.returnValue(of());

    // Provide test dependencies
    TestBed.configureTestingModule({
      providers: [
        CancelPopupEventListener,
        { provide: EventService, useValue: eventServiceSpy },
        { provide: LaunchDialogService, useValue: launchDialogServiceSpy },
      ],
    });

    // Inject the service and dependencies
    service = TestBed.inject(CancelPopupEventListener);
    eventService = TestBed.inject(EventService) as jasmine.SpyObj<EventService>;
    launchDialogService = TestBed.inject(
      LaunchDialogService
    ) as jasmine.SpyObj<LaunchDialogService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open modal when CancelPopupEvent is received', () => {
    // Simulate the observable that emits events
    const eventSubject = new Subject<CancelPopupEvent>();
    eventService.get.and.returnValue(eventSubject.asObservable());

    // Provide a fake observable to be returned by openDialog
    const mockDialog$ = of(true);
    launchDialogService.openDialog.and.returnValue(mockDialog$);

    // Re-trigger the subscription since we changed the return value
    service['onViewCancelSubscription']();

    // Emit a fake CancelPopupEvent
    eventSubject.next(mockCancelPopupEvent);

    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.SUBSCRIPTION_CANCEL,
      mockCancelPopupEvent.triggerElementRef,
      undefined,
      mockCancelPopupEvent.data
    );
  });

  it('should unsubscribe on destroy', () => {
    spyOn(service['subscription'], 'unsubscribe');
    service.ngOnDestroy();
    expect(service['subscription'].unsubscribe).toHaveBeenCalled();
  });
});
