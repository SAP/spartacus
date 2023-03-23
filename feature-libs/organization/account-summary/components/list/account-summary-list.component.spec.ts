import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { AccountSummaryListComponent } from './account-summary-list.component';

describe('AccountSummaryListComponent', () => {
  let component: AccountSummaryListComponent;
  let fixture: ComponentFixture<AccountSummaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, UrlTestingModule, StoreModule.forRoot({})],
      declarations: [AccountSummaryListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSummaryListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
