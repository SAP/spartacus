import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CostCenter,
  CostCenterService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { Observable, of } from 'rxjs';
import { CostCenterEditComponent } from './cost-center-edit.component';
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

describe('CostCenterEditComponent', () => {
  let component: CostCenterEditComponent;
  let fixture: ComponentFixture<CostCenterEditComponent>;
  let costCenterService: MockCostCenterService;
  let routingService: RoutingService;

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
      declarations: [CostCenterEditComponent, MockCostCenterFormComponent],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CostCenterService, useClass: MockCostCenterService },
      ],
    }).compileComponents();

    costCenterService = TestBed.inject(CostCenterService);

    routingService = TestBed.inject(RoutingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
      component.save(costCenterCode);
      expect(component.form.disabled).toBeTruthy();
    });

    it('should create cost center', () => {
      spyOn(costCenterService, 'update');
      component.save(costCenterCode);
      expect(costCenterService.update).toHaveBeenCalled();
    });

    it('should navigate to the detail page', () => {
      component.save(costCenterCode);
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'costCenterDetails',
        params: component.form.value,
      });
    });
  });
});
