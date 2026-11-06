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
import { UnitApproverListComponent } from './unit-approver-list.component';
import { UnitApproverListService } from './unit-approver-list.service';

class MockUnitApproverListService {}

describe('UnitApproverListComponent', () => {
  let component: UnitApproverListComponent;
  let fixture: ComponentFixture<UnitApproverListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UnitApproverListComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: UnitApproverListService,
          useClass: MockUnitApproverListService,
        },
      ],
    })
      .overrideComponent(UnitApproverListComponent, {
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

    fixture = TestBed.createComponent(UnitApproverListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
