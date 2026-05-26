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
import { SubListComponent } from '@spartacus/organization/administration/components';
import { MockUrlPipe } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { UrlTestingModule } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SubListTestingModule } from '../../../../shared/sub-list/sub-list.testing.module';
import { UnitAssignedApproverListComponent } from './unit-assigned-approver-list.component';
import { UnitAssignedApproverListService } from './unit-assigned-approver-list.service';

class MockUnitAssignedApproverListService {}

describe('UnitAssignedApproverListComponent', () => {
  let component: UnitAssignedApproverListComponent;
  let fixture: ComponentFixture<UnitAssignedApproverListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UrlTestingModule,
        I18nTestingModule,
        UnitAssignedApproverListComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: UnitAssignedApproverListService,
          useClass: MockUnitAssignedApproverListService,
        },
      ],
    })
      .overrideComponent(UnitAssignedApproverListComponent, {
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

    fixture = TestBed.createComponent(UnitAssignedApproverListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
