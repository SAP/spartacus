import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SubListTestingModule } from '../../../shared/sub-list/sub-list.testing.module';
import { CurrentUnitService } from '../../services/current-unit.service';
import { UnitCostCenterListComponent } from './unit-cost-centers.component';
import { UnitCostCenterListService } from './unit-cost-centers.service';

class MockUnitCostCenterListService {}

class MockCurrentUnitService implements Partial<CurrentUnitService> {}

describe('UnitCostCenterListComponent', () => {
  let component: UnitCostCenterListComponent;
  let fixture: ComponentFixture<UnitCostCenterListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubListTestingModule, UrlTestingModule, I18nTestingModule],
      providers: [
        {
          provide: UnitCostCenterListService,
          useClass: MockUnitCostCenterListService,
        },
        {
          provide: CurrentUnitService,
          useClass: MockCurrentUnitService,
        },
      ],
      declarations: [UnitCostCenterListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitCostCenterListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
