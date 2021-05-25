import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { SubListTestingModule } from 'feature-libs/organization/administration/components/shared/sub-list/sub-list.testing.module';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { UnitAssignedApproverListComponent } from './unit-assigned-approver-list.component';
import { UnitAssignedApproverListService } from './unit-assigned-approver-list.service';

class MockUnitAssignedApproverListService {}

describe('UnitAssignedApproverListComponent', () => {
  let component: UnitAssignedApproverListComponent;
  let fixture: ComponentFixture<UnitAssignedApproverListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubListTestingModule, UrlTestingModule, I18nTestingModule],
      providers: [
        {
          provide: UnitAssignedApproverListService,
          useClass: MockUnitAssignedApproverListService,
        },
      ],
      declarations: [UnitAssignedApproverListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitAssignedApproverListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
