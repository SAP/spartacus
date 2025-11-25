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
import { MockUrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { SubListComponent } from '../../shared';
import { SubListTestingModule } from '../../shared/sub-list/sub-list.testing.module';
import { UserGroupPermissionListComponent } from './user-group-permission-list.component';
import { UserGroupPermissionListService } from './user-group-permission-list.service';

class MockUserGroupPermissionListService {}

describe('UserGroupPermissionListComponent', () => {
  let component: UserGroupPermissionListComponent;
  let fixture: ComponentFixture<UserGroupPermissionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UserGroupPermissionListComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: UserGroupPermissionListService,
          useClass: MockUserGroupPermissionListService,
        },
      ],
    })
      .overrideComponent(UserGroupPermissionListComponent, {
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

    fixture = TestBed.createComponent(UserGroupPermissionListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
