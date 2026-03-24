import { ChangeDetectorRef, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule, provideDefaultConfig } from '@spartacus/core';
import {
  OrderAttachments,
  OrderAttachmentsFacade,
  OrderConfig,
} from '@spartacus/order/root';
import {
  IconModule,
  KeyboardFocusModule,
  LaunchDialogService,
  MessageComponentModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { delay, Observable, of, switchMap, throwError, timer } from 'rxjs';
import { OrderAttachmentsDialogComponent } from './order-attachments-dialog.component';
import createSpy = jasmine.createSpy;

const orderCode = '00001004';

const attachmentId = 'a_123';
const attachmentId2 = 'b_123';
const attachmentId3 = 'c_123';
const attachmentsData: OrderAttachments = {
  sapAttachments: [
    {
      sapAttachmentId: attachmentId,
      sapFileName: 'a123',
    },
    {
      sapAttachmentId: attachmentId2,
      sapFileName: 'b123',
    },
    {
      sapAttachmentId: attachmentId3,
      sapFileName: 'c123',
    },
  ],
};
const pdfMimeType = 'application/pdf';
const pngMimeType = 'image/png';
const configuredMimeTypeBlob = new Blob(['mock data'], { type: pdfMimeType });
const notConfiguredMimeTypeBlob = new Blob(['mock data'], {
  type: pngMimeType,
});
const mockUrl = 'blob:http://localhost/mock-url';

const mockConfig: OrderConfig = {
  orderAttachments: {
    previewMimeTypes: ['application/pdf'],
  },
};

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> | undefined {
    return of({ orderCode });
  }

  closeDialog() {}
}

const countHiddenElementsFn = (debugElements: DebugElement[]) => {
  let result = 0;
  for (let i = 0; i < debugElements.length; i++) {
    if (debugElements[i].nativeElement.classList.contains('hidden')) {
      result++;
    }
  }

  return result;
};

describe('OrderAttachmentsDialogComponent', () => {
  let component: OrderAttachmentsDialogComponent;
  let fixture: ComponentFixture<OrderAttachmentsDialogComponent>;
  let orderAttachmentsFacade: jasmine.SpyObj<OrderAttachmentsFacade>;
  let launchDialogService: LaunchDialogService;

  beforeEach(waitForAsync(() => {
    const orderAttachmentsFacadeSpy = jasmine.createSpyObj(
      'OrderAttachmentsFacade',
      ['getOrderAttachments', 'downloadOrderAttachment']
    );

    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        IconModule,
        SpinnerModule,
        KeyboardFocusModule,
        MessageComponentModule,
        StoreModule.forRoot({}),
        OrderAttachmentsDialogComponent,
      ],
      providers: [
        provideDefaultConfig(mockConfig),
        {
          provide: OrderAttachmentsFacade,
          useValue: orderAttachmentsFacadeSpy,
        },
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
        {
          provide: ChangeDetectorRef,
          useValue: { markForCheck: createSpy('markForCheck') },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    orderAttachmentsFacade = TestBed.inject(
      OrderAttachmentsFacade
    ) as jasmine.SpyObj<OrderAttachmentsFacade>;
    launchDialogService = TestBed.inject(LaunchDialogService);
    orderAttachmentsFacade.getOrderAttachments.and.returnValue(
      of(attachmentsData)
    );
    fixture = TestBed.createComponent(OrderAttachmentsDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialogue when modal is dismissed', () => {
    spyOn(launchDialogService, 'closeDialog').and.callThrough();
    const closeReason = 'mock close';
    component.close(closeReason);

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(closeReason);
  });

  describe('Observables initialization', () => {
    it('should return correct order code', (done) => {
      expect(component.orderCode$).toBeDefined();
      component.orderCode$
        .subscribe((value) => {
          expect(value).toEqual(orderCode);
          done();
        })
        .unsubscribe();
    });

    it('should return attachments array', (done) => {
      orderAttachmentsFacade.getOrderAttachments.and.returnValue(
        of(attachmentsData)
      );
      component.orderCode$ = of(attachmentId);

      expect(component.attachments$).toBeDefined();
      component.attachments$
        .subscribe((attachments) => {
          expect(attachments).toEqual(attachmentsData.sapAttachments);
          done();
        })
        .unsubscribe();
      expect(orderAttachmentsFacade.getOrderAttachments).toHaveBeenCalled();
    });

    it('should return correct attachments count', () => {
      expect(component.attachmentsCount()).toBe(3);
    });

    it('should return empty attachment array on error', (done) => {
      orderAttachmentsFacade.getOrderAttachments.and.returnValue(
        throwError(() => 'mockError')
      );
      component.orderCode$ = of(attachmentId);

      component.attachments$
        .subscribe((attachments) => {
          expect(attachments).toEqual([]);
          done();
        })
        .unsubscribe();
      expect(orderAttachmentsFacade.getOrderAttachments).toHaveBeenCalled();
    });

    it('should error return true if attachment fetch fails', (done) => {
      orderAttachmentsFacade.getOrderAttachments.and.returnValue(
        throwError(() => 'mockError')
      );
      expect(component.loadError()).toBe(false);

      component.orderCode$ = of(attachmentId);
      component.attachments$.subscribe(() => done()).unsubscribe();

      expect(component.loadError()).toBe(true);
      expect(orderAttachmentsFacade.getOrderAttachments).toHaveBeenCalled();
    });
  });

  describe('Attachments handling', () => {
    it('should openOrderAttachment correctly update loadingAttachments array', fakeAsync(() => {
      orderAttachmentsFacade.downloadOrderAttachment.and.returnValue(
        of(configuredMimeTypeBlob).pipe(delay(1000))
      );
      spyOn(component, 'previewFile').and.stub();
      spyOn(component, 'downloadFile').and.stub();

      component.loadingAttachments = ['mock-id', 'mock-id2'];
      component.openOrderAttachment(attachmentId);

      expect(component.loadingAttachments).toEqual([
        'mock-id',
        'mock-id2',
        attachmentId,
      ]);
      tick(1000);
      expect(component.loadingAttachments).toEqual(['mock-id', 'mock-id2']);
    }));

    it('should openOrderAttachment correctly update loadingAttachments array on error', fakeAsync(() => {
      orderAttachmentsFacade.downloadOrderAttachment.and.returnValue(
        timer(1000).pipe(
          switchMap(() => throwError(() => new Error('mock error')))
        )
      );
      spyOn(component, 'previewFile').and.stub();
      spyOn(component, 'downloadFile').and.stub();
      spyOn(component, 'addErrorMessage').and.stub();

      component.loadingAttachments = [attachmentId, attachmentId2];
      component.openOrderAttachment(attachmentId3);

      expect(component.loadingAttachments).toEqual([
        attachmentId,
        attachmentId2,
        attachmentId3,
      ]);
      tick(1000);
      expect(component.loadingAttachments).toEqual([
        attachmentId,
        attachmentId2,
      ]);
    }));

    it('should preview attachments if mime type is configured', () => {
      orderAttachmentsFacade.downloadOrderAttachment.and.returnValue(
        of(configuredMimeTypeBlob)
      );
      spyOn(component, 'previewFile').and.stub();
      spyOn(component, 'downloadFile').and.stub();

      component.openOrderAttachment(attachmentId, 'mock file name');
      expect(component.previewFile).toHaveBeenCalled();
      expect(component.downloadFile).not.toHaveBeenCalled();
    });

    it('should download attachments if mime type is NOT configured', () => {
      spyOn(component, 'previewFile').and.stub();
      spyOn(component, 'downloadFile').and.stub();
      orderAttachmentsFacade.downloadOrderAttachment.and.returnValue(
        of(notConfiguredMimeTypeBlob)
      );

      component.openOrderAttachment(attachmentId, 'mock file name');
      expect(component.previewFile).not.toHaveBeenCalled();
      expect(component.downloadFile).toHaveBeenCalled();
    });

    it('should previewFile create object URL and open it', () => {
      spyOn(URL, 'createObjectURL').and.returnValue(mockUrl);
      spyOn(window, 'open').and.stub();

      component.previewFile(configuredMimeTypeBlob);

      expect(URL.createObjectURL).toHaveBeenCalled();
      expect(window.open).toHaveBeenCalled();
    });

    it("should downloadFile create and click on 'a' element", () => {
      spyOn(URL, 'createObjectURL').and.returnValue(mockUrl);
      spyOn(document['body'], 'appendChild').and.stub();
      spyOn(document['body'], 'removeChild').and.stub();

      const aElementSpyObj = jasmine.createSpyObj('a', ['click']);
      spyOn(document, 'createElement').and.returnValue(aElementSpyObj);

      const mockFileName = 'mockFileName';
      component.downloadFile(notConfiguredMimeTypeBlob, mockFileName);

      expect(document.createElement).toHaveBeenCalled();
      expect(document.createElement).toHaveBeenCalledWith('a');
      expect(aElementSpyObj.href).toBe(mockUrl);
      expect(aElementSpyObj.target).toBe('_blank');
      expect(aElementSpyObj.rel).toBe('noopener noreferrer');
      expect(aElementSpyObj.download).toBe(mockFileName);
      expect(aElementSpyObj.click).toHaveBeenCalled();
      expect(aElementSpyObj.click).toHaveBeenCalledWith();
    });

    it('should onMouseDown open attachment on left click', () => {
      spyOn(component, 'openOrderAttachment').and.stub();
      const leftClickEvent = new MouseEvent('click', { button: 0 });
      component.onMouseDown(leftClickEvent, attachmentId, 'mock name');

      expect(component.openOrderAttachment).toHaveBeenCalled();
    });

    it('should onMouseDown open attachment on scroll click', () => {
      spyOn(component, 'openOrderAttachment').and.stub();
      const scrollClickEvent = new MouseEvent('click', { button: 1 });
      component.onMouseDown(scrollClickEvent, attachmentId, 'mock name');

      expect(component.openOrderAttachment).toHaveBeenCalled();
    });

    it('should onMouseDown ignore not left/scroll click', () => {
      spyOn(component, 'openOrderAttachment').and.stub();
      const rightClickEvent = new MouseEvent('click', { button: 2 });
      component.onMouseDown(rightClickEvent, attachmentId, 'mock name');

      const backClickEvent = new MouseEvent('click', { button: 3 });
      component.onMouseDown(backClickEvent, attachmentId, 'mock name');

      const forwardClickEvent = new MouseEvent('click', { button: 4 });
      component.onMouseDown(forwardClickEvent, attachmentId, 'mock name');

      expect(component.openOrderAttachment).not.toHaveBeenCalled();
    });

    it('should add attachment id to loading array', () => {
      component.setAttachmentLoadingState(attachmentId, true);
      expect(component.loadingAttachments[0]).toBe(attachmentId);

      expect(component.loadingAttachments.length).toBe(1);
    });

    it('should remove attachment id from loading array', () => {
      component.loadingAttachments = [attachmentId];
      component.setAttachmentLoadingState(attachmentId, false);

      expect(component.loadingAttachments).toEqual([]);
    });

    it('should add attachment id to error array', () => {
      const errorCount = component.errorCounter;
      component.addErrorMessage(attachmentId);
      expect(component.erroredAttachments.length).toBe(1);
      expect(component.errorCounter).toBe(errorCount + 1);
    });

    it('should remove attachment id from error array', () => {
      const errorId = attachmentId + component.errorCounter;
      component.erroredAttachments = [errorId];
      component.errorCounter = 1;

      component.closeErrorMessage(errorId);
      expect(component.erroredAttachments).toEqual([]);
      expect(component.errorCounter).toBe(1);
    });
  });

  describe('template', () => {
    beforeEach(() => {
      spyOn(component, 'previewFile').and.stub();
      spyOn(component, 'downloadFile').and.stub();
    });

    it('should correctly display attachment counter', () => {
      fixture.detectChanges();
      let spinnerEl = fixture.debugElement.query(
        By.css('.attachments-counter')
      ).nativeElement;
      expect(spinnerEl.innerHTML.trim()).toBe('(3)');
    });

    it('should not display attachment counter if attachments empty', () => {
      orderAttachmentsFacade.getOrderAttachments.and.returnValue(
        of({ sapAttachments: [] })
      );
      fixture = TestBed.createComponent(OrderAttachmentsDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      let spinnerEls = fixture.debugElement.queryAll(
        By.css('.attachments-counter')
      );
      expect(spinnerEls.length).toBe(0);
    });

    it('should display only spinner on attachments load', fakeAsync(() => {
      orderAttachmentsFacade.getOrderAttachments.and.returnValue(
        of(attachmentsData).pipe(delay(100))
      );
      fixture.detectChanges();

      let spinnerEls = fixture.debugElement.queryAll(By.css('.cx-spinner'));
      let tableEls = fixture.debugElement.queryAll(By.css('.table'));
      expect(spinnerEls.length).toBe(1);
      expect(tableEls.length).toBe(0);

      tick(100);
      fixture.detectChanges();

      spinnerEls = fixture.debugElement.queryAll(By.css('.cx-spinner'));
      tableEls = fixture.debugElement.queryAll(By.css('.table'));
      expect(spinnerEls.length).toBe(0);
      expect(tableEls.length).toBe(1);
    }));

    it('should display message strip on attachments fetch error', () => {
      orderAttachmentsFacade.getOrderAttachments.and.returnValue(
        throwError(() => 'mockError')
      );
      fixture.detectChanges();

      let errorMessagesEls = fixture.debugElement.queryAll(
        By.css('.error-message')
      );
      let tableEls = fixture.debugElement.queryAll(By.css('.table'));
      expect(errorMessagesEls.length).toBe(1);
      expect(tableEls.length).toBe(0);
    });

    it('should display message strip when attachments array is empty', () => {
      orderAttachmentsFacade.getOrderAttachments.and.returnValue(
        of({ sapAttachments: [] })
      );
      fixture = TestBed.createComponent(OrderAttachmentsDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      let infoMessageEls = fixture.debugElement.queryAll(
        By.css('.info-message')
      );
      let attachmentRowEls = fixture.debugElement.queryAll(
        By.css('.order-attachment-row')
      );
      expect(infoMessageEls.length).toBe(1);
      expect(attachmentRowEls.length).toBe(0);
    });

    it('should correctly display duplicated errors on order attachment fetch error', () => {
      let attachmentErrorMessageEls;

      fixture.detectChanges();
      attachmentErrorMessageEls = fixture.debugElement.queryAll(
        By.css('.attachment-error')
      );
      expect(attachmentErrorMessageEls.length).toBe(0);

      component.addErrorMessage(attachmentId);
      fixture.detectChanges();
      attachmentErrorMessageEls = fixture.debugElement.queryAll(
        By.css('.attachment-error')
      );
      expect(attachmentErrorMessageEls.length).toBe(1);

      component.addErrorMessage(attachmentId);
      fixture.detectChanges();
      attachmentErrorMessageEls = fixture.debugElement.queryAll(
        By.css('.attachment-error')
      );
      expect(attachmentErrorMessageEls.length).toBe(2);

      component.errorCounter--; //adjust counter to make duplicated entry
      component.addErrorMessage(attachmentId);
      fixture.detectChanges();
      attachmentErrorMessageEls = fixture.debugElement.queryAll(
        By.css('.attachment-error')
      );
      expect(attachmentErrorMessageEls.length).toBe(3);
    });

    it('should correctly display inline spinners on order attachments fetch', fakeAsync(() => {
      orderAttachmentsFacade.getOrderAttachments.and.returnValue(
        of(attachmentsData)
      );
      orderAttachmentsFacade.downloadOrderAttachment.and.returnValue(
        of(configuredMimeTypeBlob).pipe(delay(1000))
      );

      fixture.detectChanges();
      let inlineSpinnerEls = fixture.debugElement.queryAll(
        By.css('.inline-spinner')
      );
      expect(countHiddenElementsFn(inlineSpinnerEls)).toBe(3);

      component.openOrderAttachment(attachmentId, 'mock name');
      fixture.detectChanges();
      inlineSpinnerEls = fixture.debugElement.queryAll(
        By.css('.inline-spinner')
      );
      expect(countHiddenElementsFn(inlineSpinnerEls)).toBe(2);

      // duplicated attachment id should not display duplicated spinners
      component.openOrderAttachment(attachmentId2, 'mock name');
      tick(50);
      component.openOrderAttachment(attachmentId2, 'mock name');
      fixture.detectChanges();
      inlineSpinnerEls = fixture.debugElement.queryAll(
        By.css('.inline-spinner')
      );
      expect(countHiddenElementsFn(inlineSpinnerEls)).toBe(1);

      tick(1000);
      fixture.detectChanges();
      inlineSpinnerEls = fixture.debugElement.queryAll(
        By.css('.inline-spinner')
      );
      expect(countHiddenElementsFn(inlineSpinnerEls)).toBe(3);
    }));

    it('should close modal when cancel is clicked', () => {
      spyOn(component, 'close').and.stub();

      fixture.detectChanges();
      const cancelButtonEl = fixture.debugElement.query(
        By.css('.cancel-button')
      ).nativeElement;
      cancelButtonEl.click();
      expect(component.close).toHaveBeenCalled();
    });

    it("should close modal when 'x' is clicked", () => {
      spyOn(component, 'close').and.stub();

      fixture.detectChanges();
      const cancelButtonEl = fixture.debugElement.query(
        By.css('div.cx-dialog-header button.close')
      ).nativeElement;
      cancelButtonEl.click();
      expect(component.close).toHaveBeenCalled();
    });
  });
});
