import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CostCenter, I18nTestingModule } from '@spartacus/core';
import { ModalService, TableModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { CostCenterService } from '../../../core/services/cost-center.service';
import { CurrentCostCenterService } from '../services/current-cost-center.service';
import { CostCenterDetailsComponent } from './cost-center-details.component';
import createSpy = jasmine.createSpy;

const costCenterCode = 'b1';

const mockCostCenter: CostCenter = {
  code: costCenterCode,
  name: 'costCenter1',
  currency: {
    symbol: '$',
    isocode: 'USD',
  },
  unit: { name: 'orgName', uid: 'orgCode' },
};

class MockCurrentCostCenterService
  implements Partial<CurrentCostCenterService> {
  key$ = of(costCenterCode);
}

class MockCostCenterService implements Partial<CostCenterService> {
  load = createSpy('load');
  update = createSpy('update');
  get = createSpy('get').and.returnValue(of(mockCostCenter));
}

class MockModalService {
  open() {}
}

@Component({
  selector: 'cx-cost-center-budget-list',
  template: '',
})
export class MockCostCenterBudgetListComponent {}

describe('CostCenterDetailsComponent', () => {
  let component: CostCenterDetailsComponent;
  let fixture: ComponentFixture<CostCenterDetailsComponent>;
  let costCentersService: CostCenterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        TableModule,
        IconTestingModule,
      ],
      declarations: [
        CostCenterDetailsComponent,
        MockCostCenterBudgetListComponent,
      ],
      providers: [
        { provide: CostCenterService, useClass: MockCostCenterService },
        { provide: ModalService, useClass: MockModalService },
      ],
    })
      .overrideComponent(CostCenterDetailsComponent, {
        set: {
          providers: [
            {
              provide: CurrentCostCenterService,
              useClass: MockCurrentCostCenterService,
            },
          ],
        },
      })
      .compileComponents();

    costCentersService = TestBed.inject(CostCenterService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update costCenter', () => {
    component.update(mockCostCenter);
    expect(costCentersService.update).toHaveBeenCalledWith(
      mockCostCenter.code,
      mockCostCenter
    );
  });

  it('should trigger reload of cost center model on each code change', () => {
    expect(costCentersService.load).toHaveBeenCalledWith(mockCostCenter.code);
  });

  describe('costCenter$', () => {
    it('should emit current cost center model', () => {
      let result;
      component.costCenter$.subscribe((r) => (result = r)).unsubscribe();
      expect(result).toBe(mockCostCenter);
    });
  });
});
