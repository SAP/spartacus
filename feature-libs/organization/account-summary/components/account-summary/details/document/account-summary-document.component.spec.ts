import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSummaryDocumentComponent } from './account-summary-document.component';

describe('AccountSummaryDocumentComponent', () => {
  let component: AccountSummaryDocumentComponent;
  let fixture: ComponentFixture<AccountSummaryDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountSummaryDocumentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSummaryDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
