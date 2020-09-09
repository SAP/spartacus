import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UserGroupService } from 'feature-libs/my-account/organization/core/services/user-group.service';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of } from 'rxjs';
import { OrganizationSubListTestingModule } from '../../shared/organization-sub-list/organization-sub-list.testing.module';
import { CurrentUserGroupService } from '../services/current-user-group.service';
import { UserGroupUserListComponent } from './user-group-user-list.component';
import { UserGroupUserListService } from './user-group-user-list.service';
import createSpy = jasmine.createSpy;
const mockKey = 'mock';
class MockUserGroupUserListService {}
class MockCurrentUserGroupService {
  key$ = of(mockKey);
}
class MockUserGroupService {
  unassignAllMembers = createSpy('unassignAllMembers');
}

describe('UserGroupUserListComponent', () => {
  let component: UserGroupUserListComponent;
  let fixture: ComponentFixture<UserGroupUserListComponent>;
  let userGroupService: UserGroupService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OrganizationSubListTestingModule,
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
        { provide: UserGroupService, useClass: MockUserGroupService },
      ],
      declarations: [UserGroupUserListComponent],
    }).compileComponents();

    userGroupService = TestBed.inject(UserGroupService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupUserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unassign all members', () => {
    component.unassignAll();
    expect(userGroupService.unassignAllMembers).toHaveBeenCalledWith(mockKey);
  });
});
