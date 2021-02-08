import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SubListTestingModule } from '../../../shared/sub-list/sub-list.testing.module';
import { UserAssignedApproverListComponent } from './user-assigned-approver-list.component';
import { UserAssignedApproverListService } from './user-assigned-approver-list.service';

class MockUserAssignedApproverListService {}

describe('UserAssignedApproverListComponent', () => {
  let component: UserAssignedApproverListComponent;
  let fixture: ComponentFixture<UserAssignedApproverListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubListTestingModule, UrlTestingModule, I18nTestingModule],
      providers: [
        {
          provide: UserAssignedApproverListService,
          useClass: MockUserAssignedApproverListService,
        },
      ],
      declarations: [UserAssignedApproverListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAssignedApproverListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
