import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubListTestingModule } from '../../../shared/sub-list/sub-list.testing.module';
import { UserGroupAssignedUserListComponent } from './user-group-assigned-user-list.component';
import { UserGroupAssignedUserListService } from './user-group-assigned-user-list.service';
import {
  TranslatePipe,
  CxDatePipe,
  UrlPipe,
  MockTranslatePipe,
  MockDatePipe,
  I18nTestingModule,
} from '@spartacus/core';
import { MockUrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { RouterModule } from '@angular/router';

class MockUserGroupAssignedUsersListService {}

describe('UserGroupAssignedUserListComponent', () => {
  let component: UserGroupAssignedUserListComponent;
  let fixture: ComponentFixture<UserGroupAssignedUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SubListTestingModule,
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
          imports: [TranslatePipe, CxDatePipe, UrlPipe],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockUrlPipe],
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
