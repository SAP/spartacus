import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CostCenterService, RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { OrganizationTestingModule } from '../../shared/testing/organization-testing.module';
import { CostCenterCreateComponent } from './cost-center-create.component';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-cost-center-form',
  template: '',
})
class MockCostCenterFormComponent {
  @Input() form;
  @Input() unitUid;
}

const costCenterCode = 'b1';

class MockCostCenterService implements Partial<CostCenterService> {
  create = createSpy('create');
  getBudgets = createSpy('getBudgets');
}

const mockRouterState = {
  state: {
    params: {
      costCenterCode,
    },
  },
};

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState = createSpy('getRouterState').and.returnValue(
    of(mockRouterState)
  );
}

describe('CostCenterCreateComponent', () => {
  let component: CostCenterCreateComponent;
  let fixture: ComponentFixture<CostCenterCreateComponent>;
  let costCenterService: CostCenterService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OrganizationTestingModule, ReactiveFormsModule],
      declarations: [CostCenterCreateComponent, MockCostCenterFormComponent],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CostCenterService, useClass: MockCostCenterService },
      ],
    }).compileComponents();

    costCenterService = TestBed.inject(CostCenterService);
    routingService = TestBed.inject(RoutingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterCreateComponent);
    component = fixture.componentInstance;
    component.form.setControl('code', new FormControl(costCenterCode));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('save valid form', () => {
    it('should disable form on save ', () => {
      component.save();
      expect(component.form.disabled).toBeTruthy();
    });

    it('should create cost center', () => {
      component.save();
      expect(costCenterService.create).toHaveBeenCalled();
    });

    it('should navigate to the detail page', () => {
      component.save();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'costCenterDetails',
        params: { code: costCenterCode },
      });
    });
  });

  describe('fail saving invalid form', () => {
    beforeEach(() => {
      component.form.setErrors({ incorrect: true });
    });

    it('should not disable form on save when it is invalid', () => {
      component.save();
      expect(component.form.disabled).toBeFalsy();
    });

    it('should create cost center', () => {
      component.save();
      expect(costCenterService.create).not.toHaveBeenCalled();
    });

    it('should not navigate away', () => {
      component.save();
      expect(routingService.go).not.toHaveBeenCalled();
    });
  });
});
