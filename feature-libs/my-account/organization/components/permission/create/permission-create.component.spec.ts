import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { I18nTestingModule, RoutingService } from '@spartacus/core';

import { PermissionFormService } from '../form/permission-form.service';
import { PermissionCreateComponent } from './permission-create.component';
import { PermissionService } from '@spartacus/my-account/organization/core';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-permission-form',
  template: '',
})
class MockPermissionFormComponent {
  @Input() form;
  @Input() editMode;
}

const permissionCode = 'b1';

class MockPermissionService implements Partial<PermissionService> {
  create = createSpy('create');
  getBudgets = createSpy('getBudgets');
}

class MockPermissionFormService implements Partial<PermissionFormService> {
  getForm(): FormGroup {
    return new FormGroup({
      code: new FormControl(permissionCode),
    });
  }
}

const mockRouterState = {
  state: {
    params: {
      permissionCode,
    },
  },
};

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState = createSpy('getRouterState').and.returnValue(
    of(mockRouterState)
  );
}

describe('PermissionCreateComponent', () => {
  let component: PermissionCreateComponent;
  let fixture: ComponentFixture<PermissionCreateComponent>;
  let permissionService: PermissionService;
  let routingService: RoutingService;
  let saveButton;
  let permissionFormComponent;

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
      declarations: [PermissionCreateComponent, MockPermissionFormComponent],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: PermissionService, useClass: MockPermissionService },
        { provide: PermissionFormService, useClass: MockPermissionFormService },
      ],
    }).compileComponents();

    permissionService = TestBed.inject(PermissionService);
    routingService = TestBed.inject(RoutingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    saveButton = fixture.debugElement.query(By.css('button[type=submit]'));
    permissionFormComponent = fixture.debugElement.query(
      By.css('cx-permission-form')
    ).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('save valid form', () => {
    it('should disable form on save ', () => {
      saveButton.nativeElement.click();
      expect(permissionFormComponent.form.disabled).toBeTruthy();
    });

    it('should create permission', () => {
      saveButton.nativeElement.click();
      expect(permissionService.create).toHaveBeenCalled();
    });

    it('should navigate to the detail page', () => {
      saveButton.nativeElement.click();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'permission',
        params: { code: permissionCode },
      });
    });
  });

  describe('fail saving invalid form', () => {
    beforeEach(() => {
      permissionFormComponent.form.setErrors({ incorrect: true });
    });

    it('should not disable form on save when it is invalid', () => {
      saveButton.nativeElement.click();
      expect(permissionFormComponent.form.disabled).toBeFalsy();
    });

    it('should createpermission', () => {
      saveButton.nativeElement.click();
      expect(permissionService.create).not.toHaveBeenCalled();
    });

    it('should not navigate away', () => {
      saveButton.nativeElement.click();
      expect(routingService.go).not.toHaveBeenCalled();
    });
  });
});
