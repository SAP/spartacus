import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { Observable, of } from 'rxjs';
import { SubListTestingModule } from '../../shared/sub-list/sub-list.testing.module';
import { CurrentUserGroupService } from '../services/current-user-group.service';
import { UserGroupUserListComponent } from './user-group-user-list.component';
import { UserGroupUserListService } from './user-group-user-list.service';
import { MessageService } from '@spartacus/organization/administration/components';
import {
  LoadStatus,
  OrganizationItemStatus,
  UserGroup,
} from '@spartacus/organization/administration/core';
const mockKey = 'mock';

class MockCurrentUserGroupService {
  key$ = of(mockKey);
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
  let messageService: MessageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SubListTestingModule,
        UrlTestingModule,
        I18nTestingModule,
      ],
      providers: [
        {
          provide: UserGroupUserListService,
          useClass: MockUserGroupUserListService,
        },
        {
          provide: CurrentUserGroupService,
          useClass: MockCurrentUserGroupService,
        },
        MessageService,
      ],
      declarations: [UserGroupUserListComponent],
    }).compileComponents();

    userGroupUserListService = TestBed.inject(UserGroupUserListService);
    messageService = TestBed.inject(MessageService);
    fixture = TestBed.createComponent(UserGroupUserListComponent);
    component = fixture.componentInstance;
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
    spyOn(messageService, 'add').and.callThrough();

    component.unassignAll();
    expect(messageService.add).toHaveBeenCalledWith({
      message: {
        key: `userGroupUsers.unassignAllConfirmation`,
        params: {
          item: {},
        },
      },
    });
  });
});
