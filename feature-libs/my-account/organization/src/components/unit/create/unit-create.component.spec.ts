import { Observable, of } from 'rxjs';
import { Type } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {
  B2BUnit,
  B2BUnitNode,
  I18nTestingModule,
  LanguageService,
  RoutesConfig,
  RoutingConfig,
  RoutingService,
} from '@spartacus/core';
import { defaultStorefrontRoutesConfig } from 'projects/storefrontlib/src/cms-structure/routing/default-routing-config';
import { OrgUnitService } from '../../../core/services/org-unit.service';
import { UnitFormModule } from '../form/unit-form.module';
import { UnitCreateComponent } from './unit-create.component';

import createSpy = jasmine.createSpy;

const orgUnitCode = 'b1';

const mockOrgUnit: B2BUnit = {
  uid: orgUnitCode,
  name: 'orgUnit1',
};

const mockUnitForm: FormGroup = new FormGroup({
  uid: new FormControl(mockOrgUnit.uid),
  name: new FormControl(mockOrgUnit.name),
});

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
  loadList = createSpy('loadList');
  getActiveUnitList = createSpy('getActiveUnitList').and.returnValue(
    of(mockOrgUnits)
  );
  create = createSpy('create');
  getApprovalProcesses = createSpy('getApprovalProcesses');
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

xdescribe('UnitCreateComponent', () => {
  let component: UnitCreateComponent;
  let fixture: ComponentFixture<UnitCreateComponent>;
  let orgUnitsService: MockOrgUnitService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, UnitFormModule, RouterTestingModule],
      declarations: [UnitCreateComponent],
      providers: [
        {
          provide: LanguageService,
          useClass: LanguageServiceStub,
        },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    }).compileComponents();

    orgUnitsService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('createOrgUnit', () => {
    it('should create orgUnit', () => {
      component.save(null, mockUnitForm);
      expect(orgUnitsService.create).toHaveBeenCalledWith(mockOrgUnit);
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'orgUnitDetails',
        params: mockOrgUnit,
      });
    });
  });
});
