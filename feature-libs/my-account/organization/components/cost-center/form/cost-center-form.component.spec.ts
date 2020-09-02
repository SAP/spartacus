import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  B2BUnitNode,
  Currency,
  CurrencyService,
  I18nTestingModule,
} from '@spartacus/core';
import { FormErrorsComponent } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { BehaviorSubject, NEVER, Observable, of } from 'rxjs';
import { OrgUnitService } from '../../../core/services/org-unit.service';
import { CurrentCostCenterService } from '../current-cost-center.service';
import { CostCenterFormComponent } from './cost-center-form.component';
import createSpy = jasmine.createSpy;

const mockOrgUnits: B2BUnitNode[] = [
  {
    active: true,
    children: [],
    id: 'unitNode1',
    name: 'Org Unit 1',
    parent: 'parentUnit',
  },
  {
    active: true,
    children: [],
    id: 'unitNode2',
    name: 'Org Unit 2',
    parent: 'parentUnit',
  },
];

class MockCurrentCostCenterService
  implements Partial<CurrentCostCenterService> {
  b2bUnit$ = NEVER;
}

class MockOrgUnitService implements Partial<OrgUnitService> {
  loadList = createSpy('loadList');
  getActiveUnitList = createSpy('getActiveUnitList').and.returnValue(
    of(mockOrgUnits)
  );
}

const mockCurrencies: Currency[] = [
  { active: true, isocode: 'USD', name: 'US Dollar', symbol: '$' },
  { active: true, isocode: 'EUR', name: 'Euro', symbol: '€' },
];
const mockActiveCurr = new BehaviorSubject('USD');

class MockCurrencyService implements Partial<CurrencyService> {
  getAll = jasmine.createSpy('getAll').and.returnValue(of(mockCurrencies));
  loadList = jasmine.createSpy('loadList');
  getActive(): Observable<string> {
    return mockActiveCurr;
  }
  setActive(isocode: string) {
    mockActiveCurr.next(isocode);
    return mockActiveCurr.subscribe();
  }
}

describe('CostCenterFormComponent', () => {
  let component: CostCenterFormComponent;
  let fixture: ComponentFixture<CostCenterFormComponent>;
  let orgUnitService: OrgUnitService;
  let currencyService: CurrencyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        UrlTestingModule,
        ReactiveFormsModule,
        NgSelectModule,
      ],
      declarations: [CostCenterFormComponent, FormErrorsComponent],
      providers: [
        { provide: CurrencyService, useClass: MockCurrencyService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    })
      .overrideComponent(CostCenterFormComponent, {
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

    orgUnitService = TestBed.inject(OrgUnitService);
    currencyService = TestBed.inject(CurrencyService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form groups', () => {
    component.form = new FormGroup({ code: new FormControl() });
    fixture.detectChanges();
    const formGroups = fixture.debugElement.queryAll(By.css('.form-group'));
    expect(formGroups.length).toBeGreaterThan(0);
  });

  it('should not render any form groups if the form is falsy', () => {
    component.form = undefined;
    fixture.detectChanges();
    const formGroups = fixture.debugElement.queryAll(By.css('.form-group'));
    expect(formGroups.length).toBe(0);
  });

  it('should load all currencies', () => {
    component.form = new FormGroup({});
    fixture.detectChanges();
    expect(currencyService.getAll).toHaveBeenCalled();
  });

  it('should load active units', () => {
    component.form = new FormGroup({});
    fixture.detectChanges();
    expect(orgUnitService.getActiveUnitList).toHaveBeenCalled();
  });
});
