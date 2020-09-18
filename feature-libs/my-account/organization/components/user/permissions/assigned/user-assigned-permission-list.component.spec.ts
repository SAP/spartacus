import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { OrganizationSubListTestingModule } from '../../../shared/organization-sub-list/organization-sub-list.testing.module';
import { UserAssignedPermissionListComponent } from './user-assigned-permission-list.component';
import { UserAssignedPermissionListService } from './user-assigned-permission-list.service';

class MockUserAssignedApproverListService {}

describe('UserAssignedApproverListComponent', () => {
  let component: UserAssignedPermissionListComponent;
  let fixture: ComponentFixture<UserAssignedPermissionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OrganizationSubListTestingModule,
        UrlTestingModule,
        I18nTestingModule,
      ],
      providers: [
        {
          provide: UserAssignedPermissionListService,
          useClass: MockUserAssignedApproverListService,
        },
      ],
      declarations: [UserAssignedPermissionListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssignedPermissionListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
