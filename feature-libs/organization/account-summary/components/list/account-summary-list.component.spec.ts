import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import {
  CxDatePipe,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { ListComponent } from '@spartacus/organization/administration/components';
import { MockUrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { AccountSummaryListComponent } from './account-summary-list.component';

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
      imports: [StoreModule.forRoot({}), AccountSummaryListComponent],
    })
      .overrideComponent(AccountSummaryListComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe, ListComponent],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            MockListComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AccountSummaryListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
