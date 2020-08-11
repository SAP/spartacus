import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CostCenter,
  I18nTestingModule,
  UrlTestingModule,
} from '@spartacus/core';
import {
  ModalService,
  TableModule,
  IconTestingModule,
  SplitViewTestingModule,
} from '@spartacus/storefront';
import { of } from 'rxjs';
import { BudgetDetailsComponent } from './budget-details.component';
import { CostCenterService } from '../../..';

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
  selector: 'cx-budget-cost-center-list',
  template: '',
})
export class MockBudgetCostCenterListComponent {}

describe('BudgetDetailsComponent', () => {
  let component: BudgetDetailsComponent;
  let fixture: ComponentFixture<BudgetDetailsComponent>;
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
      declarations: [BudgetDetailsComponent, MockBudgetCostCenterListComponent],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: CostCenterService, useClass: MockCostCenterService },
        { provide: ModalService, useClass: MockModalService },
      ],
    }).compileComponents();

    costCentersService = TestBed.inject(CostCenterService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetDetailsComponent);
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
