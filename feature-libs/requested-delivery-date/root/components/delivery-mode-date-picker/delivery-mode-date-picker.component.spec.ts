import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  CxDatePipe,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  LanguageService,
  MockTranslatePipe,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import {
  Card,
  CardModule,
  DatePickerModule,
  OutletContextData,
} from '@spartacus/storefront';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';
import { RequestedDeliveryDateFacade } from '../../facade/requested-delivery-date.facade';
import { DeliveryModeDatePickerComponent } from './delivery-mode-date-picker.component';

describe('DeliveryModeDatePickerComponent', () => {
  let component: DeliveryModeDatePickerComponent;
  let fixture: ComponentFixture<DeliveryModeDatePickerComponent>;

  const requestedDelDateFacadeMock = {
    setRequestedDeliveryDate: vi.fn().mockReturnValue(of({})),
  };

  const mockedGlobalMessageService = {
    add: () => {},
    remove: () => {},
  };

  const mockLanguageService = {
    getActive: () => of('en'),
  };

  const translationServiceMock = {
    translate: vi.fn().mockReturnValue(of('Delivery Date')),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DatePickerModule,
        CardModule,
        ReactiveFormsModule,
        DeliveryModeDatePickerComponent,
      ],
      providers: [
        CxDatePipe,
        EventService,
        {
          provide: RequestedDeliveryDateFacade,
          useValue: requestedDelDateFacadeMock,
        },
        { provide: GlobalMessageService, useValue: mockedGlobalMessageService },
        { provide: TranslationService, useValue: translationServiceMock },
        { provide: LanguageService, useValue: mockLanguageService },
        {
          provide: OutletContextData,
          useValue: {
            context: undefined,
          },
        },
      ],
    })
      .overrideComponent(DeliveryModeDatePickerComponent, {
        remove: { imports: [TranslatePipe] },
        add: {
          imports: [MockTranslatePipe],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryModeDatePickerComponent);
    component = fixture.componentInstance;
    // NOTE: no fixture.detectChanges() here — each test sets its own state first
    // to avoid NG0100 ExpressionChangedAfterItHasBeenCheckedError
  });

  afterEach(() => {
    vi.restoreAllMocks();
    fixture.destroy();
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Render the component based on the Outlet Context readonly attribute', () => {
    it('should display card with translated text when outlet context readonly attribute is true', () => {
      const data = TestBed.inject(OutletContextData);
      const isoDate = '2023-09-15';
      const formattedDate = 'Sep 15, 2023';
      data.context$ = of({
        item: {
          requestedRetrievalAt: isoDate,
          earliestRetrievalAt: isoDate,
        },
        readonly: true,
      });
      const textTitle = 'Delivery Date';

      fixture.detectChanges();

      let card: Card = {};
      component
        .getRequestedDeliveryDateCardContent(isoDate)
        .subscribe((result) => {
          card = result;
        });

      const expectedCard: Card = {
        text: [textTitle, isoDate],
      };

      expect(card).toBeTruthy();
      expect(card).toEqual(expectedCard);

      const cardElement = fixture.debugElement.query(
        By.css('.cx-card-label:first-child')
      )?.nativeElement;
      const cardText = fixture.debugElement.query(
        By.css('cx-card > div > div > div > div > div:nth-child(2) > div')
      )?.nativeElement;

      expect(cardElement.textContent).toContain(textTitle);
      expect(cardText.textContent).toContain(formattedDate);
    });

    it('should display date picker component when outlet context readonly attribute is false', () => {
      const data = TestBed.inject(OutletContextData);
      const earliestDate = '2023-03-05';
      const requestedDate = '2023-09-15';

      data.context$ = of({
        item: {
          requestedRetrievalAt: requestedDate,
          earliestRetrievalAt: earliestDate,
        },
        readonly: false,
      });
      const datePickerLab = 'requestedDeliveryDate.datePickerLabel';

      fixture.detectChanges();

      const datePickerLabelEl = fixture.debugElement.query(
        By.css('form > label > div')
      )?.nativeElement;
      const datePickerEl = fixture.debugElement.query(
        By.css('cx-date-picker')
      )?.nativeElement;

      expect(datePickerLabelEl.textContent).toContain(datePickerLab);
      expect(datePickerEl.innerHTML).toContain('min="2023-03-05"');
      expect(component['form'].get('requestDeliveryDate')?.value).toBeTruthy();
    });
  });

  it('should initialize form with requestedRetrievalAt value', () => {
    const requestedRetrievalAt = '2023-09-15';
    component['cartEntry'] = {
      requestedRetrievalAt,
    } as any;
    fixture.detectChanges();
    expect(component['form'].get('requestDeliveryDate')?.value).toEqual(
      requestedRetrievalAt
    );
  });

  it('should set requestedRetrievalAt with earliestRetrievalAt if requestedRetrievalAt is not present', () => {
    const earliestRetrievalAt = '2023-09-15';
    component['cartEntry'] = {
      earliestRetrievalAt,
      code: '123',
      user: {
        uid: 'current',
      },
    } as any;
    fixture.detectChanges();
    expect(component['requestedRetrievalAt']).toEqual(earliestRetrievalAt);
    expect(component['form'].get('requestDeliveryDate')?.value).toEqual(
      earliestRetrievalAt
    );
    expect(
      component['requestedDelDateFacade'].setRequestedDeliveryDate
    ).toHaveBeenCalled();
  });

  it('should call setRequestedDeliveryDate when form value changes and show info message on success', async () => {
    vi.spyOn(component['globalMessageService'], 'add');
    const requestedRetrievalAt = '2023-05-03';
    const earliestRetrievalAt = '2023-09-15';
    const data = TestBed.inject(OutletContextData);
    data.context$ = of({
      item: {
        requestedRetrievalAt,
        earliestRetrievalAt,
        code: '123',
        user: {
          uid: 'current',
        },
      },
      readonly: false,
    });

    fixture.detectChanges();
    const newRequestedRetrievalAt = '2023-09-15';
    component['form'].patchValue({
      requestDeliveryDate: newRequestedRetrievalAt,
    });

    //Manually trigger change event for date picker.
    const event = new Event('update');
    const datePickerEl: HTMLInputElement = fixture.debugElement.query(
      By.css('cx-date-picker')
    )?.nativeElement;
    datePickerEl.dispatchEvent(event);

    expect(
      component['requestedDelDateFacade'].setRequestedDeliveryDate
    ).toHaveBeenCalled();

    await new Promise<void>((resolve) => {
      component['requestedDelDateFacade']
        .setRequestedDeliveryDate('current', '123', newRequestedRetrievalAt)
        .subscribe(() => {
          expect(component['globalMessageService'].add).toHaveBeenCalledWith(
            { key: 'requestedDeliveryDate.successMessage' },
            GlobalMessageType.MSG_TYPE_INFO
          );
          resolve();
        });
    });
  });

  it('should NOT call setRequestedDeliveryDate when a date less than earliestRetrievalAt is provided', () => {
    vi.spyOn(component, 'setRequestedDeliveryDate');

    component['requestedDelDateFacade'].setRequestedDeliveryDate = vi
      .fn()
      .mockReturnValue(of({}));

    const requestedRetrievalAt = '2023-05-03';
    const earliestRetrievalAt = '2023-09-15';
    const data = TestBed.inject(OutletContextData);
    data.context$ = of({
      item: {
        requestedRetrievalAt,
        earliestRetrievalAt,
        code: '123',
        user: {
          uid: 'current',
        },
      },
      readonly: false,
    });

    fixture.detectChanges();
    const newRequestedRetrievalAt = '2023-01-01';
    component['form'].patchValue({
      requestDeliveryDate: newRequestedRetrievalAt,
    });

    //Manually trigger change event for date picker.
    const event = new Event('update');
    const datePickerEl: HTMLInputElement = fixture.debugElement.query(
      By.css('cx-date-picker')
    )?.nativeElement;
    datePickerEl.dispatchEvent(event);

    expect(component['setRequestedDeliveryDate']).toHaveBeenCalled();
    expect(
      component['requestedDelDateFacade'].setRequestedDeliveryDate
    ).not.toHaveBeenCalled();
  });

  it('should NOT show the date picker when the component outlet value is read only', () => {
    vi.spyOn(component, 'setRequestedDeliveryDate');
    const requestedRetrievalAt = '2023-05-03';
    const earliestRetrievalAt = '2023-09-15';
    const data = TestBed.inject(OutletContextData);
    data.context$ = of({
      item: {
        requestedRetrievalAt,
        earliestRetrievalAt,
        code: '123',
        user: {
          uid: 'current',
        },
      },
      readonly: true,
    });

    fixture.detectChanges();
    const datePickerEl: HTMLInputElement = fixture.debugElement.query(
      By.css('cx-date-picker')
    )?.nativeElement;
    expect(datePickerEl).toBeUndefined();
    const datePickerReadOnlyEl: HTMLInputElement = fixture.debugElement.query(
      By.css('cx-card')
    )?.nativeElement;
    expect(datePickerReadOnlyEl.innerHTML).not.toBeNull();
  });

  it('should show error message when backend OCC API returns UnknownResourceError', async () => {
    vi.spyOn(component['globalMessageService'], 'add');

    component['requestedDelDateFacade'].setRequestedDeliveryDate = vi
      .fn()
      .mockReturnValue(
        throwError({
          error: {
            errors: [
              {
                message:
                  'There is no resource for path /occ/v2/powertools-spa/users/user.lname%40sap-cx.com/carts/0000003004/requestedretrievaldate',
                type: 'UnknownResourceError',
              },
            ],
          },
        })
      );

    const earliestRetrievalAt = '2023-09-15';
    component['cartEntry'] = {
      earliestRetrievalAt,
      code: '123',
      user: {
        uid: 'current',
      },
    } as any;
    fixture.detectChanges();
    expect(component['requestedRetrievalAt']).toEqual(earliestRetrievalAt);
    expect(component['form'].get('requestDeliveryDate')?.value).toEqual(
      earliestRetrievalAt
    );
    expect(
      component['requestedDelDateFacade'].setRequestedDeliveryDate
    ).toHaveBeenCalled();

    await new Promise<void>((resolve) => {
      component['requestedDelDateFacade']
        .setRequestedDeliveryDate('current', '123', earliestRetrievalAt)
        .subscribe({
          error: () => {
            expect(component['globalMessageService'].add).toHaveBeenCalledWith(
              { key: 'requestedDeliveryDate.errorMessage' },
              GlobalMessageType.MSG_TYPE_ERROR
            );
            resolve();
          },
        });
    });
  });

  it('should unsubscribe from subscription on component destruction', () => {
    fixture.detectChanges();
    vi.spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['subscription'].unsubscribe).toHaveBeenCalled();
  });
});
