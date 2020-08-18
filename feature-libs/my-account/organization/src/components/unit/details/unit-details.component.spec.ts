import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUnit, I18nTestingModule, OrgUnitService } from '@spartacus/core';
import { Table2Module } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CurrentUnitService } from '../current-unit.service';
import { UnitDetailsComponent } from './unit-details.component';

import createSpy = jasmine.createSpy;

const code = 'b1';

const mockOrgUnit: B2BUnit = {
  uid: code,
  name: 'orgUnit1',
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockOrgUnitService implements Partial<OrgUnitService> {
  load = createSpy('load');
  get = createSpy('get').and.returnValue(of(mockOrgUnit));
  update = createSpy('update');
}

class MockCurrentUnitService implements Partial<CurrentUnitService> {
  code$ = of('u1');
  model$ = of({
    uid: 'u1',
  } as B2BUnit);
  launch = createSpy();
}

describe('UnitDetailsComponent', () => {
  let component: UnitDetailsComponent;
  let fixture: ComponentFixture<UnitDetailsComponent>;
  let orgUnitsService: OrgUnitService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, Table2Module, I18nTestingModule],
      declarations: [UnitDetailsComponent, MockUrlPipe],
      providers: [
        { provide: CurrentUnitService, useClass: MockCurrentUnitService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    }).compileComponents();

    orgUnitsService = TestBed.inject(OrgUnitService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('update', () => {
    it('should update orgUnit', () => {
      component.update({ active: false });
      expect(orgUnitsService.update).toHaveBeenCalledWith(code, {
        active: false,
      });

      component.update({ active: true });
      expect(orgUnitsService.update).toHaveBeenCalledWith(code, {
        active: true,
      });
    });
  });
});
