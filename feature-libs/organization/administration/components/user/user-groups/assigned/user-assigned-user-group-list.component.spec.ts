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
import { MockUrlPipe } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { SubListComponent } from '../../../shared';
import { SubListTestingModule } from '../../../shared/sub-list/sub-list.testing.module';
import { UserAssignedUserGroupListComponent } from './user-assigned-user-group-list.component';
import { UserAssignedUserGroupListService } from './user-assigned-user-group-list.service';

class MockUserAssignedUserGroupListService {}

describe('UserAssignedUserGroupListComponent', () => {
  let component: UserAssignedUserGroupListComponent;
  let fixture: ComponentFixture<UserAssignedUserGroupListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UserAssignedUserGroupListComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: UserAssignedUserGroupListService,
          useClass: MockUserAssignedUserGroupListService,
        },
      ],
    })
      .overrideComponent(UserAssignedUserGroupListComponent, {
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

    fixture = TestBed.createComponent(UserAssignedUserGroupListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
