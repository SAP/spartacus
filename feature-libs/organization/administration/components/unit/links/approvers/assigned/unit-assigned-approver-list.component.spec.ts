import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SubListTestingModule } from '../../../../shared/sub-list/sub-list.testing.module';
import { UnitAssignedApproverListComponent } from './unit-assigned-approver-list.component';
import { UnitAssignedApproverListService } from './unit-assigned-approver-list.service';
import { MockUrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { RouterModule } from '@angular/router';

class MockUnitAssignedApproverListService {}

describe('UnitAssignedApproverListComponent', () => {
  let component: UnitAssignedApproverListComponent;
  let fixture: ComponentFixture<UnitAssignedApproverListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SubListTestingModule,
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
          imports: [TranslatePipe, CxDatePipe, UrlPipe],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockUrlPipe],
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
