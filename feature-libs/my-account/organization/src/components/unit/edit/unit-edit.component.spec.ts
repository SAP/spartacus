import { Observable, of } from 'rxjs';
import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormControl, FormGroup } from '@angular/forms';

import {
  B2BUnit,
  B2BUnitNode,
  I18nTestingModule,
  RoutingService,
  LanguageService,
  RoutesConfig,
  RoutingConfig,
} from '@spartacus/core';
import { defaultStorefrontRoutesConfig } from 'projects/storefrontlib/src/cms-structure/routing/default-routing-config';
import { OrgUnitService } from '../../../core/services/org-unit.service';
import { UnitFormModule } from '../form/unit-form.module';
import { UnitEditComponent } from './unit-edit.component';

import createSpy = jasmine.createSpy;

const code = 'b1';

const mockOrgUnit: B2BUnit = {
  uid: code,
  name: 'orgUnit1',
};

const mockOrgUnits: B2BUnitNode[] = [
  {
    active: true,
    children: [],
    id: 'unitNode1',
    name: 'Org Unit 1',
    parent: 'parentUnit',
  },
];

class MockOrgUnitService implements Partial<OrgUnitService> {
  loadList = createSpy('loadList').and.returnValue(of(mockOrgUnits));
  getActiveUnitList = createSpy('getActiveUnitList').and.returnValue(
    of(mockOrgUnits)
  );
  load = createSpy('load');
  get = createSpy('get').and.returnValue(of(mockOrgUnit));
  getApprovalProcesses = createSpy('getApprovalProcesses');
  update = createSpy('update');
}

class MockRoutingService {
  go = createSpy('go').and.stub();
}

const mockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;
class MockRoutingConfig {
  getRouteConfig(routeName: string) {
    return mockRoutesConfig[routeName];
  }
}

class LanguageServiceStub {
  getActive(): Observable<string> {
    return of();
  }
}

xdescribe('UnitEditComponent', () => {
  let component: UnitEditComponent;
  let fixture: ComponentFixture<UnitEditComponent>;
  let orgUnitsService: MockOrgUnitService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, UnitFormModule, RouterTestingModule],
      declarations: [UnitEditComponent],
      providers: [
        {
          provide: LanguageService,
          useClass: LanguageServiceStub,
        },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    }).compileComponents();

    orgUnitsService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('update', () => {
    it('should update orgUnit', () => {
      const updateOrgUnit = {
        code,
        name: 'newName',
      };
      const updateForm = new FormGroup({
        code: new FormControl(updateOrgUnit.code),
        name: new FormControl(updateOrgUnit.name),
      });

      component.save(code, updateForm);
      expect(orgUnitsService.update).toHaveBeenCalledWith(code, updateOrgUnit);
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'orgUnitDetails',
        params: updateOrgUnit,
      });
    });
  });
});
