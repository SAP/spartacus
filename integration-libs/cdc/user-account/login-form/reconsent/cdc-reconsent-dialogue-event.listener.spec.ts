import { ElementRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CdcReConsentEvent } from '@spartacus/cdc/root';
import { CxEvent, EventService } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { CdcReconsentDialogEventListener } from './cdc-reconsent-dialogue-event.listener';
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
const mockEvent = new CdcReConsentEvent();
mockEvent.user = 'sampleuser@company.com';
mockEvent.password = 'password';
mockEvent.consentIds = ['consent.survey', 'terms.of.use'];
mockEvent.errorMessage = 'Account Registration Pending';
mockEvent.regToken = 'xcEfsd123';
describe(`CdcReconsentDialogEventListener`, () => {
  let listener: CdcReconsentDialogEventListener;
  let launchDialogService: LaunchDialogService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CdcReconsentDialogEventListener,
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
    listener = TestBed.inject(CdcReconsentDialogEventListener);
    launchDialogService = TestBed.inject(LaunchDialogService);
  });
  describe('onReconsent', () => {
    it('should open dialogue on event', () => {
      spyOn(listener as any, 'openDialogue').and.stub();
      mockEventStream$.next(mockEvent);
      expect(listener['openDialogue']).toHaveBeenCalledWith(mockEvent);
    });
  });
  describe('openDialogue', () => {
    it('should open the reconsent dialog', () => {
      spyOn(launchDialogService, 'openDialog').and.callThrough();
      listener['openDialogue'](mockEvent);
      expect(launchDialogService.openDialog).toHaveBeenCalled();
    });
  });
});
