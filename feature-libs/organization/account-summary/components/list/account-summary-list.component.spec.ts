import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { AccountSummaryListComponent } from './account-summary-list.component';
import { Component, Input } from '@angular/core';

describe('AccountSummaryListComponent', () => {
  @Component({
    template: '<ng-content select="[actions]"></ng-content>',
    selector: 'cx-org-list',
  })
  class MockListComponent {
    @Input() key: any;
    @Input() hideAddButton = false;
  }

  let component: AccountSummaryListComponent;
  let fixture: ComponentFixture<AccountSummaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, UrlTestingModule, StoreModule.forRoot({})],
      declarations: [AccountSummaryListComponent, MockListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSummaryListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
