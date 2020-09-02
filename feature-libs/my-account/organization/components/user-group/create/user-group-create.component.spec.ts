import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { UserGroupService } from '../../../core/services/user-group.service';
import { UserGroupFormService } from '../form/user-group-form.service';
import { UserGroupCreateComponent } from './user-group-create.component';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-user-group-form',
  template: '',
})
class MockUserGroupFormComponent {
  @Input() form;
  @Input() unitUid;
}

const userGroupCode = 'b1';

class MockUserGroupService implements Partial<UserGroupService> {
  create = createSpy('create');
}

class MockUserGroupFormService implements Partial<UserGroupFormService> {
  getForm(): FormGroup {
    return new FormGroup({
      uid: new FormControl(userGroupCode),
    });
  }
}

const mockRouterState = {
  state: {
    params: {
      userGroupCode,
    },
  },
};

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState = createSpy('getRouterState').and.returnValue(
    of(mockRouterState)
  );
}

describe('UserGroupCreateComponent', () => {
  let component: UserGroupCreateComponent;
  let fixture: ComponentFixture<UserGroupCreateComponent>;
  let userGroupService: UserGroupService;
  let routingService: RoutingService;
  let saveButton;
  let userGroupFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,

        ReactiveFormsModule,
        SplitViewTestingModule,
        IconTestingModule,
      ],
      declarations: [UserGroupCreateComponent, MockUserGroupFormComponent],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UserGroupService, useClass: MockUserGroupService },
        { provide: UserGroupFormService, useClass: MockUserGroupFormService },
      ],
    }).compileComponents();

    userGroupService = TestBed.inject(UserGroupService);
    routingService = TestBed.inject(RoutingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    saveButton = fixture.debugElement.query(By.css('button[type=submit]'));
    userGroupFormComponent = fixture.debugElement.query(
      By.css('cx-user-group-form')
    ).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('save valid form', () => {
    it('should disable form on save ', () => {
      saveButton.nativeElement.click();
      expect(userGroupFormComponent.form.disabled).toBeTruthy();
    });

    it('should create cost center', () => {
      saveButton.nativeElement.click();
      expect(userGroupService.create).toHaveBeenCalled();
    });

    it('should navigate to the detail page', () => {
      saveButton.nativeElement.click();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'userGroupDetails',
        params: { uid: userGroupCode },
      });
    });
  });

  describe('fail saving invalid form', () => {
    beforeEach(() => {
      userGroupFormComponent.form.setErrors({ incorrect: true });
    });

    it('should not disable form on save when it is invalid', () => {
      saveButton.nativeElement.click();
      expect(userGroupFormComponent.form.disabled).toBeFalsy();
    });

    it('should create cost center', () => {
      saveButton.nativeElement.click();
      expect(userGroupService.create).not.toHaveBeenCalled();
    });

    it('should not navigate away', () => {
      saveButton.nativeElement.click();
      expect(routingService.go).not.toHaveBeenCalled();
    });
  });
});
