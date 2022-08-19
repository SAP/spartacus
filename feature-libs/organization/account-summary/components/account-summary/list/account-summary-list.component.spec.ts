import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { AccountSummaryItemService, AccountSummaryUnitListService } from '../../services';
import { AccountSummaryListComponent } from './account-summary-list.component';


class MockAccountSummaryUnitListService { }

class MockAccountSummaryItemService { }

describe('AccountSummaryListComponent', () => {
  let component: AccountSummaryListComponent;
  let fixture: ComponentFixture<AccountSummaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, UrlTestingModule],
      declarations: [AccountSummaryListComponent],
      providers: [
        {
          provide: AccountSummaryUnitListService,
          useExisting: MockAccountSummaryUnitListService,
        },
        {
          provide: AccountSummaryItemService,
          useExisting: MockAccountSummaryItemService,
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSummaryListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
