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
import { UserAssignedUserGroupListComponent } from './user-assigned-user-group-list.component';
import { UserAssignedUserGroupListService } from './user-assigned-user-group-list.service';
import { MockUrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { RouterModule } from '@angular/router';

class MockUserAssignedUserGroupListService {}

describe('UserAssignedUserGroupListComponent', () => {
  let component: UserAssignedUserGroupListComponent;
  let fixture: ComponentFixture<UserAssignedUserGroupListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SubListTestingModule,
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
          imports: [TranslatePipe, CxDatePipe, UrlPipe],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockUrlPipe],
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
