import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  B2BUnitNode,
  I18nTestingModule,
  UrlTestingModule,
} from '@spartacus/core';
import { FormErrorsComponent } from '@spartacus/storefront';
import { of } from 'rxjs';
import { UserFormComponent } from './user-form.component';
import createSpy = jasmine.createSpy;
import { OrgUnitService } from '../../../core/services/org-unit.service';

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

class MockOrgUnitService implements Partial<OrgUnitService> {
  load = createSpy('load');
  getActiveUnitList = createSpy('getActiveUnitList').and.returnValue(
    of(mockOrgUnits)
  );
  loadList = jasmine.createSpy('loadList');
  getList = jasmine.createSpy('getList');
}

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let orgUnitService: OrgUnitService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        UrlTestingModule,
        ReactiveFormsModule,
        NgSelectModule,
      ],
      declarations: [UserFormComponent, FormErrorsComponent],
      providers: [{ provide: OrgUnitService, useClass: MockOrgUnitService }],
    }).compileComponents();

    orgUnitService = TestBed.inject(OrgUnitService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form groups', () => {
    component.form = new FormGroup({ uid: new FormControl() });
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

  it('should load units', () => {
    component.form = new FormGroup({});
    fixture.detectChanges();
    expect(orgUnitService.getList).toHaveBeenCalled();
  });
});
