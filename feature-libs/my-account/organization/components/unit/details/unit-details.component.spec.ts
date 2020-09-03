import { TemplateRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { I18nTestingModule } from '@spartacus/core';
import { UnitDetailsComponent } from './unit-details.component';
import createSpy = jasmine.createSpy;
import { ModalService } from '@spartacus/storefront';
import { CurrentUnitService } from '../current-unit.service';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { OrgUnitService } from '@spartacus/my-account/organization/core';

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

class MockOrgUnitService implements Partial<OrgUnitService> {
  update = createSpy('update');
}

class MockModalService implements Partial<ModalService> {
  open = createSpy('open');
}

class MockCurrentUnitService implements Partial<CurrentUnitService> {
  item$ = of(mockUnit);
}

describe('UnitDetailsComponent', () => {
  let component: UnitDetailsComponent;
  let fixture: ComponentFixture<UnitDetailsComponent>;
  let orgUnitsService: OrgUnitService;
  let modalService: ModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        IconTestingModule,
      ],
      declarations: [UnitDetailsComponent],
      providers: [
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: ModalService, useClass: MockModalService },
        { provide: CurrentUnitService, useClass: MockCurrentUnitService },
      ],
    })
      .overrideComponent(UnitDetailsComponent, {
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
    modalService = TestBed.inject(ModalService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal for confirmation', () => {
    component.openModal({} as TemplateRef<any>);
    expect(modalService.open).toHaveBeenCalledWith({}, { centered: true });
  });

  it('should update orgUnit', () => {
    component.update(mockUnit);
    expect(orgUnitsService.update).toHaveBeenCalledWith(mockUnit.uid, mockUnit);
  });
});
