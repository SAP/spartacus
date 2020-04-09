import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {
  I18nTestingModule,
  OrgUnitService,
  CxDatePipe,
  RoutesConfig,
  RoutingConfig,
  B2BUnitNode,
} from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';

import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';

import { ManageUnitsListComponent } from './unit-list.component';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';

const mockOrgUnitTree: B2BUnitNode = {
  active: true,
  children: [],
  id: 'id',
  name: 'name',
  parent: 'parent',
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

const orgUnitTree = new BehaviorSubject(mockOrgUnitTree);

class MockOrgUnitService implements Partial<OrgUnitService> {
  loadTree = createSpy('loadTree');
  getTree = createSpy('getTree').and.returnValue(orgUnitTree);
}

const mockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;
class MockRoutingConfig {
  getRouteConfig(routeName: string) {
    return mockRoutesConfig[routeName];
  }
}

class MockCxDatePipe {
  transform(value: string) {
    return value.split('T')[0];
  }
}

xdescribe('OrgUnitListComponent', () => {
  let component: ManageUnitsListComponent;
  let fixture: ComponentFixture<ManageUnitsListComponent>;
  let orgUnitsService: MockOrgUnitService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, InteractiveTableModule, I18nTestingModule],
      declarations: [ManageUnitsListComponent, MockUrlPipe],
      providers: [
        { provide: CxDatePipe, useClass: MockCxDatePipe },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    }).compileComponents();

    orgUnitsService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUnitsListComponent);
    component = fixture.componentInstance;
    orgUnitTree.next(mockOrgUnitTree);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('ngOnInit', () => {
    it('should read orgUnit list', () => {
      component.ngOnInit();
      let orgUnitsList: any;
      component.data$
        .subscribe((value) => {
          orgUnitsList = value;
        })
        .unsubscribe();
      expect(orgUnitsService.loadTree).toHaveBeenCalledWith();
      expect(orgUnitsService.getTree).toHaveBeenCalledWith();
      expect(orgUnitsList).toEqual(mockOrgUnitTree);
    });
  });
});
