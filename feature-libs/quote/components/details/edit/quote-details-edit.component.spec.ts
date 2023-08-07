import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  QuoteFacade,
  Quote,
  QuoteActionType,
  QuoteState,
} from '@spartacus/quote/root';
import { I18nTestingModule, TranslationService } from '@spartacus/core';
import { CardModule, ICON_TYPE } from '@spartacus/storefront';

import { Observable, of } from 'rxjs';
import { QuoteDetailsEditComponent } from './quote-details-overview.component';
import createSpy = jasmine.createSpy;

const totalPriceFormattedValue = '$20';

const mockCartId = '1234';
const mockAction = { type: QuoteActionType.CREATE, isPrimary: true };
const mockQuote: Quote = {
  allowedActions: [mockAction],
  isEditable: true,
  comments: [],
  cartId: mockCartId,
  code: '00001233',
  creationTime: new Date('2022-06-07T11:45:42+0000'),
  description: 'Quote Description',
  expirationTime: new Date('2022-07-07T23:59:59+0000'),
  updatedTime: new Date('2022-06-09T13:31:36+0000'),
  previousEstimatedTotal: {
    currencyIso: 'USD',
    formattedValue: '$1.00',
    value: 1,
  },
  state: QuoteState.BUYER_ORDERED,
  name: 'Name',
  totalPrice: { value: 20, formattedValue: totalPriceFormattedValue },
};

export class MockQuoteFacade implements Partial<QuoteFacade> {
  getQuoteDetails(): Observable<Quote> {
    return of(mockQuote);
  }
  setSort = createSpy();
  setCurrentPage = createSpy();
}

class MockTranslationService implements Partial<TranslationService> {
  translate(key: string): Observable<string> {
    return of(key);
  }
}

@Component({
  selector: 'cx-quote-action-links',
  template: '',
})
export class MockQuoteActionLinksComponent {}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

xdescribe('QuoteDetailsEditComponent', () => {
  let fixture: ComponentFixture<QuoteDetailsEditComponent>;
  let component: QuoteDetailsEditComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, CardModule, RouterTestingModule],
      declarations: [
        QuoteDetailsEditComponent,
        MockCxIconComponent,
        MockQuoteActionLinksComponent,
      ],
      providers: [
        {
          provide: QuoteFacade,
          useClass: MockQuoteFacade,
        },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteDetailsEditComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display titles and content in card if details are available', () => {
    //when
    fixture.detectChanges();

    //then
    const cards = fixture.debugElement.queryAll(By.css('cx-card'));
    const cardTitles = fixture.debugElement.queryAll(By.css('.cx-card-title'));
    const cardContainers = fixture.debugElement.queryAll(
      By.css('.cx-card-container')
    );
    expect(cards.length).toEqual(3);
    expect(cardTitles.length).toEqual(3);
    expect(cardContainers.length).toEqual(3);
  });
});
