import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  Period,
  Permission,
  RoutingService,
} from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { PermissionService } from '@spartacus/my-account/organization/core';
import { CurrentPermissionService } from '../current-permission.service';
import {
  PermissionFormService,
  PermissionType,
} from '../form/permission-form.service';
import { PermissionEditComponent } from './permission-edit.component';

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

class MockCurrentPermissionService
  implements Partial<CurrentPermissionService> {
  key$ = of(permissionCode);
}

const mockPermission: Permission = {
  code: permissionCode,
  orderApprovalPermissionType: {
    code: PermissionType.TIMESPAN,
    name: 'Type',
  },
  threshold: 10000,
  currency: {
    symbol: '$',
    isocode: 'USD',
  },
  periodRange: Period.WEEK,
  orgUnit: { name: 'orgName', uid: 'orgCode' },
};

class MockPermissionService implements Partial<PermissionService> {
  update = createSpy('update');
  load = createSpy('load');
  get = createSpy('get').and.returnValue(of(mockPermission));
  loadPermission = createSpy('loadPermission');
}

const mockRouterState = {
  state: {
    params: {
      code: permissionCode,
    },
  },
};

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState = createSpy('getRouterState').and.returnValue(
    of(mockRouterState)
  );
}

class MockPermissionFormService implements Partial<PermissionFormService> {
  getForm(): FormGroup {
    return new FormGroup({
      code: new FormControl(permissionCode),
    });
  }
}

describe('PermissionEditComponent', () => {
  let component: PermissionEditComponent;
  let fixture: ComponentFixture<PermissionEditComponent>;
  let permissionService: PermissionService;
  let routingService: RoutingService;
  let saveButton;
  let permissionFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        IconTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [PermissionEditComponent, MockPermissionFormComponent],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: PermissionService, useClass: MockPermissionService },

        {
          provide: PermissionFormService,
          useClass: MockPermissionFormService,
        },
      ],
    })
      .overrideComponent(PermissionEditComponent, {
        set: {
          providers: [
            {
              provide: CurrentPermissionService,
              useClass: MockCurrentPermissionService,
            },
          ],
        },
      })
      .compileComponents();

    permissionService = TestBed.inject(PermissionService);

    routingService = TestBed.inject(RoutingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    saveButton = fixture.debugElement.query(By.css('button[type=submit]'))
      .nativeElement;
    permissionFormComponent = fixture.debugElement.query(
      By.css('cx-permission-form')
    ).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('save valid form', () => {
    it('should disable form on save ', () => {
      saveButton.click();
      expect(permissionFormComponent.form.disabled).toBeTruthy();
    });

    it('should create permission', () => {
      saveButton.click();
      expect(permissionService.update).toHaveBeenCalled();
    });

    it('should navigate to the detail page', () => {
      saveButton.click();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'permissionDetails',
        params: permissionFormComponent.form.value,
      });
    });

    it('should trigger reload of permission model on each code change', () => {
      expect(permissionService.loadPermission).toHaveBeenCalledWith(
        mockPermission.code
      );
    });
  });
});
