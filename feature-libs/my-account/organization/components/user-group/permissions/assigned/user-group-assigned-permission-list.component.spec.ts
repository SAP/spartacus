import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { OrganizationSubListTestingModule } from '../../../shared/organization-sub-list/organization-sub-list.testing.module';
import { UserGroupAssignedPermissionListComponent } from './user-group-assigned-permission-list.component';
import { UserGroupAssignedPermissionsListService } from './user-group-assigned-permission-list.service';

class MockUserGroupAssignedPermissionsListService {}

describe('UserGroupAssignedPermissionListComponent', () => {
  let component: UserGroupAssignedPermissionListComponent;
  let fixture: ComponentFixture<UserGroupAssignedPermissionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OrganizationSubListTestingModule,
        UrlTestingModule,
        I18nTestingModule,
      ],
      providers: [
        {
          provide: UserGroupAssignedPermissionsListService,
          useClass: MockUserGroupAssignedPermissionsListService,
        },
      ],
      declarations: [UserGroupAssignedPermissionListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupAssignedPermissionListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
