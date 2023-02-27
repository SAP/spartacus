import { Component, DebugElement, Input } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Observable, of } from 'rxjs';

import {
  Address,
  I18nTestingModule,
  LanguageService,
  TranslationService,
} from '@spartacus/core';
import {
  AccountSummaryDetails,
  AccountSummaryFacade,
} from '@spartacus/organization/account-summary/root';

import { MockTranslationService } from 'projects/core/src/i18n/testing/mock-translation.service';

import { AccountSummaryHeaderComponent } from './account-summary-header.component';
import { mockAccountSummaryDetails } from '../account-summary-mock-data';

@Component({
  selector: 'cx-card',
  template: '',
})
class MockCardComponent {
  @Input() content: any;
}

class MockAccountSummaryFacade implements Partial<AccountSummaryFacade> {
  getAccountSummary(): Observable<AccountSummaryDetails> {
    return of(mockAccountSummaryDetails);
  }
}

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}

describe('AccountSummaryHeaderComponent', () => {
  let component: AccountSummaryHeaderComponent;
  let fixture: ComponentFixture<AccountSummaryHeaderComponent>;
  let translationService: TranslationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [AccountSummaryHeaderComponent, MockCardComponent],
      providers: [
        { provide: AccountSummaryFacade, useClass: MockAccountSummaryFacade },
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSummaryHeaderComponent);
    component = fixture.componentInstance;
    translationService = TestBed.inject(TranslationService);
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    tick();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('should get id card', () => {
    const title = 'mock_id';
    const text = 'mock_text';
    spyOn(translationService, 'translate').and.returnValue(of(title));
    // Call function and expect that it calls translation and return correct card
    component.getIdCardContent(text).subscribe((result) => {
      expect(translationService.translate).toHaveBeenCalledWith(
        'orgAccountSummary.details.uid'
      );
      expect(result.title).toEqual(title);
      expect(result.text).toEqual([text]);
    });
  });

  it('should get name card', () => {
    const title = 'mock_name';
    const text = 'mock_text';
    spyOn(translationService, 'translate').and.returnValue(of(title));
    // Call function and expect that it calls translation and return correct card
    component.getNameCardContent(text).subscribe((result) => {
      expect(translationService.translate).toHaveBeenCalledWith(
        'orgAccountSummary.details.name'
      );
      expect(result.title).toEqual(title);
      expect(result.text).toEqual([text]);
    });
  });

  it('should get address card', () => {
    const address: Address = {
      title: 'Mr.',
      firstName: 'John',
      lastName: 'Doe',
      formattedAddress: '1700-5 PVM, Montreal (Quebec) H3B 0B3',
      country: { name: 'Canada' },
    };
    const text = [
      `${address.title}, ${address.firstName} ${address.lastName}`,
      address.formattedAddress,
      address.country?.name,
    ];
    spyOn(translationService, 'translate').and.returnValue(of('title'));
    // Call function and expect that it calls translation and return correct card
    component.getAddressCardContent(address).subscribe((result) => {
      expect(translationService.translate).toHaveBeenCalledWith(
        'orgAccountSummary.details.address'
      );
      expect(result.title).toEqual('title');
      expect(result.text).toEqual(text);
    });
  });

  it('should get creditRep card', () => {
    const title = 'mock_rep';
    const text = 'mock_text';
    spyOn(translationService, 'translate').and.returnValue(of(title));
    // Call function and expect that it calls translation and return correct card
    component.getCreditRepCardContent(text).subscribe((result) => {
      expect(translationService.translate).toHaveBeenCalledWith(
        'orgAccountSummary.details.creditRep'
      );
      expect(result.title).toEqual(title);
      expect(result.text).toEqual([text]);
    });
  });

  it('should get creditLine card', () => {
    const title = 'mock_credit';
    const text = 'mock_text';
    spyOn(translationService, 'translate').and.returnValue(of(title));
    // Call function and expect that it calls translation and return correct card
    component.getCreditLineCardContent(text).subscribe((result) => {
      expect(translationService.translate).toHaveBeenCalledWith(
        'orgAccountSummary.details.creditLine'
      );
      expect(result.title).toEqual(title);
      expect(result.text).toEqual([text]);
    });
  });

  it('should get currentBalance card', () => {
    const title = 'mock_balance';
    const text = 'mock_text';
    spyOn(translationService, 'translate').and.returnValue(of(title));
    // Call function and expect that it calls translation and return correct card
    component.getCurrentBalanceCardContent(text).subscribe((result) => {
      expect(translationService.translate).toHaveBeenCalledWith(
        'orgAccountSummary.details.currentBalance'
      );
      expect(result.title).toEqual(title);
      expect(result.text).toEqual([text]);
    });
  });

  it('should get openBalance card', () => {
    const title = 'mock_balance';
    const text = 'mock_text';
    spyOn(translationService, 'translate').and.returnValue(of(title));
    // Call function and expect that it calls translation and return correct card
    component.getOpenBalanceCardContent(text).subscribe((result) => {
      expect(translationService.translate).toHaveBeenCalledWith(
        'orgAccountSummary.details.openBalance'
      );
      expect(result.title).toEqual(title);
      expect(result.text).toEqual([text]);
    });
  });

  it('should get pastDueBalance card', () => {
    const title = 'mock_balance';
    const text = 'mock_text';
    spyOn(translationService, 'translate').and.returnValue(of(title));
    // Call function and expect that it calls translation and return correct card
    component.getPastDueBalanceCardContent(text).subscribe((result) => {
      expect(translationService.translate).toHaveBeenCalledWith(
        'orgAccountSummary.details.pastDueBalance'
      );
      expect(result.title).toEqual(title);
      expect(result.text).toEqual([text]);
    });
  });

  it('Should have populated header data', () => {
    const validateContent = (
      card: any,
      title: string,
      text: string[]
    ): void => {
      const content = card?.componentInstance?.content;
      expect(content.title).toEqual(title);
      expect(content.text).toEqual(text);
    };

    const validateRange = (
      container: DebugElement,
      label: string,
      value: string
    ) => {
      expect(container?.nativeElement?.firstChild?.innerText).toEqual(label);
      expect(container?.nativeElement?.lastChild?.innerText).toEqual(value);
    };

    const cards = fixture.debugElement.queryAll(By.css('cx-card'));
    expect(cards?.length).toEqual(7);
    validateContent(cards[0], 'orgAccountSummary.details.uid', [
      'Custom Retail',
    ]);
    validateContent(cards[1], 'orgAccountSummary.details.name', [
      'Custom Retail',
    ]);
    validateContent(cards[2], 'orgAccountSummary.details.address', [
      'Ms., Carla Torres',
      '1000 Bagby Street, Houston, Texas',
      'United States',
    ]);
    validateContent(cards[3], 'orgAccountSummary.details.creditRep', [
      'Brandon Leclair',
    ]);
    validateContent(cards[4], 'orgAccountSummary.details.creditLine', [
      '$15,000.00',
    ]);
    validateContent(cards[5], 'orgAccountSummary.details.currentBalance', [
      '$102,145,214.00',
    ]);
    validateContent(cards[6], 'orgAccountSummary.details.openBalance', [
      '$135,737,232.00',
    ]);

    const pastDueRanges = fixture.debugElement.queryAll(
      By.css('.cx-account-summary-header-past-due-range-collection')
    );

    expect(pastDueRanges?.length).toEqual(4);
    validateRange(
      pastDueRanges[0],
      'orgAccountSummary.details.dayRange maxBoundary:30 minBoundary:1',
      '$0.00'
    );
    validateRange(
      pastDueRanges[1],
      'orgAccountSummary.details.dayRange maxBoundary:60 minBoundary:31',

      '$212,947.00'
    );
    validateRange(
      pastDueRanges[2],
      'orgAccountSummary.details.dayRange maxBoundary:90 minBoundary:61',
      '$0.00'
    );
    validateRange(
      pastDueRanges[3],
      'orgAccountSummary.details.dayPlus minBoundary:91',
      '$33,379,071.00'
    );

    validateRange(
      fixture.debugElement.query(
        By.css('.cx-account-summary-header-past-due-balance-total')
      ),
      'orgAccountSummary.details.pastDueBalance',
      '$33,592,018.00'
    );
  });
});
