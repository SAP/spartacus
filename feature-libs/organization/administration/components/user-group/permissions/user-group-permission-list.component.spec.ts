import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SubListTestingModule } from '../../shared/sub-list/sub-list.testing.module';
import { UserGroupPermissionListComponent } from './user-group-permission-list.component';
import { UserGroupPermissionListService } from './user-group-permission-list.service';

class MockUserGroupPermissionListService {}

describe('UserGroupPermissionListComponent', () => {
  let component: UserGroupPermissionListComponent;
  let fixture: ComponentFixture<UserGroupPermissionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubListTestingModule, UrlTestingModule, I18nTestingModule],
      providers: [
        {
          provide: UserGroupPermissionListService,
          useClass: MockUserGroupPermissionListService,
        },
      ],
      declarations: [UserGroupPermissionListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserGroupPermissionListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
