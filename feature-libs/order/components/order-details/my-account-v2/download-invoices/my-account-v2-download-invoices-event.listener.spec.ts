import { ElementRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CxEvent, EventService } from '@spartacus/core';
import { DownloadOrderInvoicesEvent } from '@spartacus/order/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { MyAccountV2DownloadInvoicesEventListener } from './my-account-v2-download-invoices-event.listener';
const mockEventStream$ = new BehaviorSubject<CxEvent>({});

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return mockEventStream$.asObservable();
  }
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef
  ) {
    return EMPTY;
  }
  closeDialog(_reason: string): void {}
}
const mockEvent = new DownloadOrderInvoicesEvent();
mockEvent.order = { code: 'order1' };

describe('MyAccountV2DownloadInvoicesEventListener', () => {
  let listener: MyAccountV2DownloadInvoicesEventListener;
  let launchDialogService: LaunchDialogService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: EventService,
          useClass: MockEventService,
        },
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
      ],
    });
    listener = TestBed.inject(MyAccountV2DownloadInvoicesEventListener);
    launchDialogService = TestBed.inject(LaunchDialogService);
  });
  it('should create listener', () => {
    expect(listener).toBeTruthy();
  });
  describe('onDownloadInvoices', () => {
    it('should receive event and trigger dialog opening', () => {
      spyOn(listener as any, 'openDialog').and.stub();
      mockEventStream$.next(mockEvent);
      expect(listener['openDialog']).toHaveBeenCalledWith(mockEvent);
    });
  });
  describe('openDialog', () => {
    it('should open download invoices dialog', () => {
      spyOn(launchDialogService, 'openDialog').and.stub();
      listener['openDialog'](mockEvent);
      expect(launchDialogService.openDialog).toHaveBeenCalledWith(
        LAUNCH_CALLER.DOWNLOAD_ORDER_INVOICES,
        undefined,
        undefined,
        mockEvent.order
      );
    });
  });
});
