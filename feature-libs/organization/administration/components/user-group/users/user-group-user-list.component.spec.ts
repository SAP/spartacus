import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { Observable, of } from 'rxjs';
import { SubListTestingModule } from '../../shared/sub-list/sub-list.testing.module';
import { CurrentUserGroupService } from '../services/current-user-group.service';
import { UserGroupUserListComponent } from './user-group-user-list.component';
import { UserGroupUserListService } from './user-group-user-list.service';
import { SubListComponent } from '@spartacus/organization/administration/components';
import {
  LoadStatus,
  OrganizationItemStatus,
  UserGroup,
} from '@spartacus/organization/administration/core';
import { Component } from '@angular/core';
const mockKey = 'mock';

class MockCurrentUserGroupService {
  key$ = of(mockKey);
}

@Component({ selector: 'cx-org-sub-list', template: '' })
class MockSubListComponent {
  messageService = {
    add(_message) {},
  };
}

class MockUserGroupUserListService {
  unassignAllMembers(): Observable<OrganizationItemStatus<UserGroup>> {
    return of({ status: LoadStatus.SUCCESS, item: {} });
  }
}

describe('UserGroupUserListComponent', () => {
  let component: UserGroupUserListComponent;
  let fixture: ComponentFixture<UserGroupUserListComponent>;
  let userGroupUserListService: UserGroupUserListService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubListTestingModule, UrlTestingModule, I18nTestingModule],
      providers: [
        {
          provide: UserGroupUserListService,
          useClass: MockUserGroupUserListService,
        },
        {
          provide: CurrentUserGroupService,
          useClass: MockCurrentUserGroupService,
        },
      ],
      declarations: [UserGroupUserListComponent],
    }).compileComponents();

    userGroupUserListService = TestBed.inject(UserGroupUserListService);
    fixture = TestBed.createComponent(UserGroupUserListComponent);
    component = fixture.componentInstance;
    component.subList = new MockSubListComponent() as SubListComponent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unassign all members', () => {
    spyOn(userGroupUserListService, 'unassignAllMembers').and.callThrough();

    component.unassignAll();
    expect(userGroupUserListService.unassignAllMembers).toHaveBeenCalledWith(
      mockKey
    );
  });

  it('should notify after unassign all members', () => {
    spyOn(component.subList.messageService, 'add').and.callThrough();

    component.unassignAll();
    expect(component.subList.messageService.add).toHaveBeenCalledWith({
      message: {
        key: `orgUserGroupUsers.unassignAllConfirmation`,
        params: {
          item: {},
        },
      },
    });
  });
});
