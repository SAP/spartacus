import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SubListTestingModule } from '../../../shared/sub-list/sub-list.testing.module';
import { UnitApproverListComponent } from './unit-approver-list.component';
import { UnitApproverListService } from './unit-approver-list.service';

class MockUnitApproverListService {}

describe('UnitApproverListComponent', () => {
  let component: UnitApproverListComponent;
  let fixture: ComponentFixture<UnitApproverListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubListTestingModule, UrlTestingModule, I18nTestingModule],
      providers: [
        {
          provide: UnitApproverListService,
          useClass: MockUnitApproverListService,
        },
      ],
      declarations: [UnitApproverListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitApproverListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
