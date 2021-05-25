import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SubListTestingModule } from '../../../shared/sub-list/sub-list.testing.module';
import { UserAssignedUserGroupListComponent } from './user-assigned-user-group-list.component';
import { UserAssignedUserGroupListService } from './user-assigned-user-group-list.service';

class MockUserAssignedUserGroupListService {}

describe('UserAssignedUserGroupListComponent', () => {
  let component: UserAssignedUserGroupListComponent;
  let fixture: ComponentFixture<UserAssignedUserGroupListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubListTestingModule, UrlTestingModule, I18nTestingModule],
      providers: [
        {
          provide: UserAssignedUserGroupListService,
          useClass: MockUserAssignedUserGroupListService,
        },
      ],
      declarations: [UserAssignedUserGroupListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAssignedUserGroupListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
