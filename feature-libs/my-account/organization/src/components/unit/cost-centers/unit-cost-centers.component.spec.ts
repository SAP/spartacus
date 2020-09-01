import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { I18nTestingModule, CostCenter, EntitiesModel } from '@spartacus/core';
import { UnitCostCentersComponent } from './unit-cost-centers.component';
import { TableModule } from '@spartacus/storefront';
import { CurrentUnitService } from '../current-unit.service';
import { UnitCostCentersService } from './unit-cost-centers.service';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';

const code = 'b1';

const mockedCostCenters: EntitiesModel<CostCenter> = {
  values: [
    {
      code: 'c1',
      name: 'n1',
      currency: {
        symbol: '$',
        isocode: 'USD',
      },
      unit: { name: 'orgName', uid: 'orgUid' },
    },
    {
      code: 'c2',
      name: 'n2',
      currency: {
        symbol: '$',
        isocode: 'USD',
      },
      unit: { name: 'orgName2', uid: 'orgUid2' },
    },
  ],
};

class MockUnitCostCentersService {
  getTable = function () {
    return of(mockedCostCenters);
  };
}

class MockCurrentUnitService {
  key$ = of(code);
}

describe('UnitCostCentersComponent', () => {
  let component: UnitCostCentersComponent;
  let fixture: ComponentFixture<UnitCostCentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        IconTestingModule,
        TableModule,
      ],
      declarations: [UnitCostCentersComponent],
      providers: [
        {
          provide: UnitCostCentersService,
          useClass: MockUnitCostCentersService,
        },
        {
          provide: CurrentUnitService,
          useClass: MockCurrentUnitService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitCostCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
