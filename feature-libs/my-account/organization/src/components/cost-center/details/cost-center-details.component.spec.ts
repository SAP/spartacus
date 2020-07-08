import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CostCenter, CostCenterService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OrganizationTestingModule } from '../../shared/testing/organization-testing.module';
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

class MockCostCenterService implements Partial<CostCenterService> {
  load = createSpy('load');
  get = createSpy('get').and.returnValue(of(mockCostCenter));
  update = createSpy('update');
}

class MockActivatedRoute {
  params = of({ code: costCenterCode });

  snapshot = {};
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
      imports: [OrganizationTestingModule],
      declarations: [
        CostCenterDetailsComponent,
        MockCostCenterBudgetListComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: CostCenterService, useClass: MockCostCenterService },
        { provide: ModalService, useClass: MockModalService },
      ],
    }).compileComponents();

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
});
