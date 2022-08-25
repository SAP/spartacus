import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Address, TranslationService } from '@spartacus/core';
import {
  AccountSummaryDetails,
  AccountSummaryFacade,
} from '@spartacus/organization/account-summary/root';
import { MockTranslationService } from 'projects/core/src/i18n/testing/mock-translation.service';
import { Observable, of } from 'rxjs';
import { HeaderComponent } from './header.component';

class MockAccountSummaryFacade implements Partial<AccountSummaryFacade> {
  getAccountSummary(): Observable<AccountSummaryDetails> {
    return of({
      accountManagerEmail: '',
      accountManagerName: '',
      amountBalanceData: {},
      orgUnit: {
        uid: '1234',
        name: 'Custom Retail',
      },
      billingAddress: {
        id: '8796098986007',
      },
    });
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translationService: TranslationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: AccountSummaryFacade, useClass: MockAccountSummaryFacade },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    translationService = TestBed.inject(TranslationService);
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    component.ngOnInit();
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
});
