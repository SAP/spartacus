import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { UnitCreateComponent } from './unit-create.component';
import createSpy = jasmine.createSpy;
import { RouterTestingModule } from '@angular/router/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UnitFormService } from '../form/unit-form.service';
import { CurrentUnitService } from '../current-unit.service';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { Component, Input } from '@angular/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';

const orgUnitId = 'orgUnitId1';

const mockUnit = {
  uid: 'uid1',
  name: 'name1',
  parentOrgUnit: {
    uid: 'uid2',
  },
  approvalProcess: {
    code: 'code1',
  },
};

const mockUnitForm = new FormGroup({
  uid: new FormControl(mockUnit.uid, Validators.required),
  name: new FormControl(mockUnit.name, Validators.required),
  parentOrgUnit: new FormGroup({
    uid: new FormControl(mockUnit.parentOrgUnit.uid, Validators.required),
  }),
  approvalProcess: new FormGroup({
    code: new FormControl(mockUnit.approvalProcess.code),
  }),
});

class MockOrgUnitService implements Partial<OrgUnitService> {
  create = createSpy('create');
}

class MockRoutingService implements Partial<RoutingService> {
  go = createSpy('go').and.stub();
}

class MockUnitFormService implements Partial<UnitFormService> {
  getForm = createSpy('getForm').and.returnValue(new FormGroup({}));
}

class MockCurrentUnitService implements Partial<CurrentUnitService> {
  b2bUnit$ = of(orgUnitId);
}

@Component({
  selector: 'cx-unit-form',
  template: '',
})
class MockUnitFormComponent {
  @Input() form: FormGroup;
}

describe('UnitCreateComponent', () => {
  let component: UnitCreateComponent;
  let fixture: ComponentFixture<UnitCreateComponent>;
  let orgUnitsService: OrgUnitService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        IconTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [UnitCreateComponent, MockUnitFormComponent],
      providers: [
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UnitFormService, useClass: MockUnitFormService },
        { provide: CurrentUnitService, useClass: MockCurrentUnitService },
      ],
    })
      .overrideComponent(UnitCreateComponent, {
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

    orgUnitsService = TestBed.inject(OrgUnitService);
    routingService = TestBed.inject(RoutingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create unit', () => {
    const evt = new Event('submit');
    component.save(evt, mockUnitForm);
    expect(orgUnitsService.create).toHaveBeenCalledWith(mockUnit);
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orgUnitDetails',
      params: mockUnit,
    });
  });
});
