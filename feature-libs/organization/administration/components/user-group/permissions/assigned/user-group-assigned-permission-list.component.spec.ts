import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { SubListTestingModule } from '../../../shared/sub-list/sub-list.testing.module';
import { UserGroupAssignedPermissionListComponent } from './user-group-assigned-permission-list.component';
import { UserGroupAssignedPermissionsListService } from './user-group-assigned-permission-list.service';
import { MockUrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { RouterModule } from '@angular/router';
import { SubListComponent } from '../../../shared';

class MockUserGroupAssignedPermissionsListService {}

describe('UserGroupAssignedPermissionListComponent', () => {
  let component: UserGroupAssignedPermissionListComponent;
  let fixture: ComponentFixture<UserGroupAssignedPermissionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UserGroupAssignedPermissionListComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: UserGroupAssignedPermissionsListService,
          useClass: MockUserGroupAssignedPermissionsListService,
        },
      ],
    })
      .overrideComponent(UserGroupAssignedPermissionListComponent, {
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

    fixture = TestBed.createComponent(UserGroupAssignedPermissionListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
