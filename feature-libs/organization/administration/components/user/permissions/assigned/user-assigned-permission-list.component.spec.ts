import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { MockTranslatePipe, TranslatePipe, UrlPipe } from '@spartacus/core';
import { MockUrlPipe } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { SubListComponent } from '../../../shared';
import { SubListTestingModule } from '../../../shared/sub-list/sub-list.testing.module';
import { UserAssignedPermissionListComponent } from './user-assigned-permission-list.component';
import { UserAssignedPermissionListService } from './user-assigned-permission-list.service';

class MockUserAssignedApproverListService {}

describe('UserAssignedPermissionListComponent', () => {
  let component: UserAssignedPermissionListComponent;
  let fixture: ComponentFixture<UserAssignedPermissionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserAssignedPermissionListComponent, RouterModule.forRoot([])],
      providers: [
        {
          provide: UserAssignedPermissionListService,
          useClass: MockUserAssignedApproverListService,
        },
      ],
    })
      .overrideComponent(UserAssignedPermissionListComponent, {
        remove: {
          imports: [SubListComponent, TranslatePipe, UrlPipe],
        },
        add: {
          imports: [SubListTestingModule, MockTranslatePipe, MockUrlPipe],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(UserAssignedPermissionListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
