import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CxDatePipe,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  LanguageService,
  TranslationService,
} from '@spartacus/core';
import {
  Card,
  CardModule,
  DatePickerModule,
  OutletContextData,
} from '@spartacus/storefront';
import { of, throwError } from 'rxjs';
import { RequestedDeliveryDateFacade } from '../../facade/requested-delivery-date.facade';
import { DeliveryModeDatePickerComponent } from './delivery-mode-date-picker.component';

describe('DeliveryModeDatePickerComponent', () => {
  let component: DeliveryModeDatePickerComponent;
  let fixture: ComponentFixture<DeliveryModeDatePickerComponent>;

  const requestedDelDateFacadeMock = {
    setRequestedDeliveryDate: jasmine
      .createSpy('setRequestedDeliveryDate')
      .and.returnValue(of({})),
  };

  const mockedGlobalMessageService = {
    add: () => {},
    remove: () => {},
  };

  const mockLanguageService = {
    getActive: () => of('en'),
  };

  const translationServiceMock = {
    translate: jasmine
      .createSpy('translate')
      .and.returnValue(of('Delivery Date')),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryModeDatePickerComponent],
      imports: [I18nTestingModule, DatePickerModule, CardModule],
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
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryModeDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
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

      component.ngOnInit();
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

      component.ngOnInit();
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
    component.ngOnInit();
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
    component.ngOnInit();
    expect(component['requestedRetrievalAt']).toEqual(earliestRetrievalAt);
    expect(component['form'].get('requestDeliveryDate')?.value).toEqual(
      earliestRetrievalAt
    );
    expect(
      component['requestedDelDateFacade'].setRequestedDeliveryDate
    ).toHaveBeenCalled();
  });

  it('should call setRequestedDeliveryDate when form value changes and show info message on success', (done) => {
    spyOn(component['globalMessageService'], 'add');
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

    component.ngOnInit();
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
    component['requestedDelDateFacade']
      .setRequestedDeliveryDate('current', '123', newRequestedRetrievalAt)
      .subscribe(() => {
        expect(component['globalMessageService'].add).toHaveBeenCalledWith(
          { key: 'requestedDeliveryDate.successMessage' },
          GlobalMessageType.MSG_TYPE_INFO
        );
        done();
      });
  });

  it('should show error message when backend OCC API returns UnknownResourceError', (done) => {
    spyOn(component['globalMessageService'], 'add');

    component['requestedDelDateFacade'].setRequestedDeliveryDate = jasmine
      .createSpy('setRequestedDeliveryDate')
      .and.returnValue(
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
    component.ngOnInit();
    expect(component['requestedRetrievalAt']).toEqual(earliestRetrievalAt);
    expect(component['form'].get('requestDeliveryDate')?.value).toEqual(
      earliestRetrievalAt
    );
    expect(
      component['requestedDelDateFacade'].setRequestedDeliveryDate
    ).toHaveBeenCalled();

    component['requestedDelDateFacade']
      .setRequestedDeliveryDate('current', '123', earliestRetrievalAt)
      .subscribe({
        error: () => {
          expect(component['globalMessageService'].add).toHaveBeenCalledWith(
            { key: 'requestedDeliveryDate.errorMessage' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          done();
        },
      });
  });

  it('should unsubscribe from subscription on component destruction', () => {
    spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['subscription'].unsubscribe).toHaveBeenCalled();
  });
});
