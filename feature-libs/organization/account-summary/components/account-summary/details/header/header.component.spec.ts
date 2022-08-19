import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TranslationService } from '@spartacus/core';
import { AccountSummaryDetails, AccountSummaryFacade } from '@spartacus/organization/account-summary/root';
import { MockTranslationService } from 'projects/core/src/i18n/testing/mock-translation.service';
import { Observable, of } from 'rxjs';
import { HeaderComponent } from './header.component';


class MockAccountSummaryFacade implements Partial<AccountSummaryFacade> {
  getAccountSummary(): Observable<AccountSummaryDetails> {
    return of({
      accountManagerEmail: "",
      accountManagerName: "",
      amountBalanceData: {},
      unit: {
        uid: "1234",
        name: "Custom Retail"
      },
      billingAddress: {
        id: "8796098986007"
      },
    });
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: AccountSummaryFacade, useClass: MockAccountSummaryFacade },
        { provide: TranslationService, useClass: MockTranslationService }],
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));
});
