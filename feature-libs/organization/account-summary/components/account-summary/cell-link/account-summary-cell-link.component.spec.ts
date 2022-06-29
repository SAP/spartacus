import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSummaryCellLinkComponent } from './account-summary-cell-link.component';

describe('AccountSummaryCellLinkComponent', () => {
  let component: AccountSummaryCellLinkComponent;
  let fixture: ComponentFixture<AccountSummaryCellLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSummaryCellLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSummaryCellLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
