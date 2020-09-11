import { Component, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { CurrentUnitService } from '../current-unit.service';
import { UnitFormService } from '../form/unit-form.service';
import { UnitEditComponent } from './unit-edit.component';
import createSpy = jasmine.createSpy;

const code = 'b1';

class MockOrgUnitService implements Partial<OrgUnitService> {
  update = createSpy('update');
}

class MockRoutingService implements Partial<RoutingService> {
  go = createSpy('go').and.stub();
}

class MockUnitFormService implements Partial<UnitFormService> {
  getForm = createSpy('getForm').and.returnValue(new FormGroup({}));
}

class MockCurrentUnitService implements Partial<CurrentUnitService> {
  b2bUnit$ = of(code);
  item$ = of();
}

@Component({
  selector: 'cx-unit-form',
  template: '',
})
class MockUnitFormComponent {
  @Input() form: FormGroup;
}

describe('UnitEditComponent', () => {
  let component: UnitEditComponent;
  let fixture: ComponentFixture<UnitEditComponent>;
  let orgUnitsService: MockOrgUnitService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        UrlTestingModule,
        I18nTestingModule,
        SplitViewTestingModule,
        IconTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [UnitEditComponent, MockUnitFormComponent],
      providers: [
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UnitFormService, useClass: MockUnitFormService },
        { provide: CurrentUnitService, useClass: MockCurrentUnitService },
      ],
    })
      .overrideComponent(UnitEditComponent, {
        set: {
          providers: [
            {
              provide: CurrentUnitService,
              useClass: MockCurrentUnitService,
            },
          ],
        },
      })
      .compileComponents();

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

  describe('update', () => {
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
