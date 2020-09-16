import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { OrganizationSubListTestingModule } from '../../../shared/organization-sub-list/organization-sub-list.testing.module';
import { UnitCostCenterListComponent } from './unit-cost-centers.component';
import { UnitCostCenterListService } from './unit-cost-centers.service';

class MockUnitCostCenterListService {}

describe('UnitCostCenterListComponent', () => {
  let component: UnitCostCenterListComponent;
  let fixture: ComponentFixture<UnitCostCenterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OrganizationSubListTestingModule,
        UrlTestingModule,
        I18nTestingModule,
      ],
      providers: [
        {
          provide: UnitCostCenterListService,
          useClass: MockUnitCostCenterListService,
        },
      ],
      declarations: [UnitCostCenterListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitCostCenterListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
