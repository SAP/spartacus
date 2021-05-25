import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SubListTestingModule } from '../../../shared/sub-list/sub-list.testing.module';
import { UserGroupAssignedUserListComponent } from './user-group-assigned-user-list.component';
import { UserGroupAssignedUserListService } from './user-group-assigned-user-list.service';

class MockUserGroupAssignedUsersListService {}

describe('UserGroupAssignedUserListComponent', () => {
  let component: UserGroupAssignedUserListComponent;
  let fixture: ComponentFixture<UserGroupAssignedUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubListTestingModule, UrlTestingModule, I18nTestingModule],
      providers: [
        {
          provide: UserGroupAssignedUserListService,
          useClass: MockUserGroupAssignedUsersListService,
        },
      ],
      declarations: [UserGroupAssignedUserListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserGroupAssignedUserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
