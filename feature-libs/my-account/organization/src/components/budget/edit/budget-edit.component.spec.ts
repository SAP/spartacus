import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CostCenter,
  I18nTestingModule,
  RoutingService,
  UrlTestingModule,
} from '@spartacus/core';
import { SplitViewTestingModule } from '@spartacus/storefront';
import { BudgetEditComponent } from './budget-edit.component';
import { Budget } from '../../../core/model';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import createSpy = jasmine.createSpy;
import { BudgetService } from '../../../core/services/budget.service';

@Component({
  selector: 'cx-budget-form',
  template: '',
})
class MockCostCenterFormComponent {
  @Input() form;
}

const costCenterCode = 'b1';

const mockCostCenter: Budget = {
  code: costCenterCode,
  name: 'costCenter1',
  currency: {
    symbol: '$',
    isocode: 'USD',
  },
};

class MockBudgetService implements Partial<BudgetService> {
  get(_costCenterCode: string): Observable<CostCenter> {
    return of(mockCostCenter);
  }
  update(_costCenterCode: string, _costCenter: CostCenter) {}
  load(_costCenterCode: string) {}
}

const mockRouterState = {
  state: {
    params: {
      code: costCenterCode,
    },
  },
};

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState = createSpy('getRouterState').and.returnValue(
    of(mockRouterState)
  );
}

class MockActivatedRoute {
  parent = {
    params: of({ code: costCenterCode }),
  };
  snapshot = {};
  go() {}
}

describe('BudgetEditComponent', () => {
  let component: BudgetEditComponent;
  let fixture: ComponentFixture<BudgetEditComponent>;
  let costCenterService: BudgetService;
  let routingService: RoutingService;
  let saveButton;
  let costCenterFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        IconTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [BudgetEditComponent, MockCostCenterFormComponent],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: BudgetService, useClass: MockBudgetService },
      ],
    }).compileComponents();

    costCenterService = TestBed.inject(BudgetService);

    routingService = TestBed.inject(RoutingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    saveButton = fixture.debugElement.query(By.css('button[type=submit]'));
    costCenterFormComponent = fixture.debugElement.query(
      By.css('cx-budget-form')
    ).componentInstance;
  });

  // not sure why this is needed, but we're failing otherwise
  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('save valid form', () => {
    it('should disable form on save ', () => {
      saveButton.nativeElement.click();
      expect(costCenterFormComponent.form.disabled).toBeTruthy();
    });

    it('should create cost center', () => {
      spyOn(costCenterService, 'update');
      saveButton.nativeElement.click();
      expect(costCenterService.update).toHaveBeenCalled();
    });

    it('should navigate to the detail page', () => {
      saveButton.nativeElement.click();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'costCenterDetails',
        params: costCenterFormComponent.form.value,
      });
    });
  });
});
