import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { UrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/url.pipe';
import { MockUrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { SubListTestingModule } from '../../../shared/sub-list/sub-list.testing.module';
import { UserAssignedApproverListComponent } from './user-assigned-approver-list.component';
import { UserAssignedApproverListService } from './user-assigned-approver-list.service';
import { RouterModule } from '@angular/router';
import { SubListComponent } from '../../../shared';

class MockUserAssignedApproverListService {}

describe('UserAssignedApproverListComponent', () => {
  let component: UserAssignedApproverListComponent;
  let fixture: ComponentFixture<UserAssignedApproverListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UserAssignedApproverListComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: UserAssignedApproverListService,
          useClass: MockUserAssignedApproverListService,
        },
      ],
    })
      .overrideComponent(UserAssignedApproverListComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe, SubListComponent],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            SubListTestingModule,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(UserAssignedApproverListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
