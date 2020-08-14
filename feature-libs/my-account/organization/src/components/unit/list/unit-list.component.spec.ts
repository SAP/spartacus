import { BehaviorSubject } from 'rxjs';
import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  RoutesConfig,
  RoutingConfig,
  B2BUnitNode,
} from '@spartacus/core';
import { defaultStorefrontRoutesConfig } from '@spartacus/storefront';
import { UnitListComponent } from './unit-list.component';
import { OrgUnitService } from '../../../core/services/org-unit.service';
import createSpy = jasmine.createSpy;

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

xdescribe('UnitListComponent', () => {
  let component: UnitListComponent;
  let fixture: ComponentFixture<UnitListComponent>;
  let orgUnitsService: MockOrgUnitService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [UnitListComponent, MockUrlPipe],
      providers: [
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    }).compileComponents();

    orgUnitsService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitListComponent);
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
