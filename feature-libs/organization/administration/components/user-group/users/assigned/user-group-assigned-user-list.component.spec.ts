import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { MockUrlPipe } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { SubListComponent } from '../../../shared';
import { SubListTestingModule } from '../../../shared/sub-list/sub-list.testing.module';
import { UserGroupAssignedUserListComponent } from './user-group-assigned-user-list.component';
import { UserGroupAssignedUserListService } from './user-group-assigned-user-list.service';

class MockUserGroupAssignedUsersListService {}

describe('UserGroupAssignedUserListComponent', () => {
  let component: UserGroupAssignedUserListComponent;
  let fixture: ComponentFixture<UserGroupAssignedUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UserGroupAssignedUserListComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: UserGroupAssignedUserListService,
          useClass: MockUserGroupAssignedUsersListService,
        },
      ],
    })
      .overrideComponent(UserGroupAssignedUserListComponent, {
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

    fixture = TestBed.createComponent(UserGroupAssignedUserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
