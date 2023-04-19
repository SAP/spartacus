import { TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import {
  Budget,
  BudgetService,
  LoadStatus,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { EMPTY, Observable, of } from 'rxjs';
import { BudgetFormService } from '../form/budget-form.service';
import { BudgetItemService } from './budget-item.service';
import { CurrentBudgetService } from './current-budget.service';
import createSpy = jasmine.createSpy;

const mockCode = 'b1';

class MockRoutingService {
  go() {}
}

const mockItemStatus = of({ status: LoadStatus.SUCCESS, item: {} });

const form = new UntypedFormGroup({});
form.addControl('name', new UntypedFormControl('foo bar'));
form.addControl('code', new UntypedFormControl('new code'));

class MockBudgetService {
  get() {
    return EMPTY;
  }
  loadBudget() {}
  update() {}
  create() {}
  getLoadingStatus(): Observable<OrganizationItemStatus<Budget>> {
    return mockItemStatus;
  }
}

class MockBudgetFormService {}
class MockCurrentBudgetService {
  key$ = of(mockCode);
  load = createSpy('load').and.returnValue(EMPTY);
  error$ = of(false);
}

describe('BudgetItemService', () => {
  let service: BudgetItemService;
  let budgetService: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BudgetItemService,
        { provide: CurrentBudgetService, useClass: MockCurrentBudgetService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: BudgetFormService, useClass: MockBudgetFormService },
        { provide: BudgetService, useClass: MockBudgetService },
      ],
    });

    service = TestBed.inject(BudgetItemService);
    budgetService = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load budget', () => {
    spyOn(budgetService, 'get').and.callThrough();
    service.load('123').subscribe();
    expect(budgetService.get).toHaveBeenCalledWith('123');
  });

  it('should load budget on each request', () => {
    spyOn(budgetService, 'loadBudget').and.callThrough();
    service.load('123').subscribe();
    expect(budgetService.loadBudget).toHaveBeenCalledWith('123');
  });

  it('should update existing budget', () => {
    spyOn(budgetService, 'update').and.callThrough();
    spyOn(budgetService, 'getLoadingStatus').and.callThrough();

    expect(service.save(form, 'existingCode')).toEqual(mockItemStatus);
    expect(budgetService.update).toHaveBeenCalledWith('existingCode', {
      name: 'foo bar',
      code: 'new code',
    });
    expect(budgetService.getLoadingStatus).toHaveBeenCalledWith('new code');
  });

  it('should create new budget', () => {
    spyOn(budgetService, 'create').and.callThrough();
    spyOn(budgetService, 'getLoadingStatus').and.callThrough();

    expect(service.save(form)).toEqual(mockItemStatus);
    expect(budgetService.create).toHaveBeenCalledWith({
      name: 'foo bar',
      code: 'new code',
    });
    expect(budgetService.getLoadingStatus).toHaveBeenCalledWith('new code');
  });

  it('should launch budget detail route', () => {
    const routingService = TestBed.inject(RoutingService);
    spyOn(routingService, 'go').and.callThrough();
    service.launchDetails({ name: 'foo bar' });
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orgBudgetDetails',
      params: { name: 'foo bar' },
    });
  });
});
