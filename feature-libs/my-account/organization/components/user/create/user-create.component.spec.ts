import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { UserCreateComponent } from './user-create.component';
import { By } from '@angular/platform-browser';
import { UserFormService } from '../form/user-form.service';
import { B2BUserService } from '@spartacus/my-account/organization/core';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';

import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-user-form',
  template: '',
})
class MockUserFormComponent {
  @Input() form;
  @Input() unitUid;
}

const userCode = 'b1';

class MockB2BUserService implements Partial<B2BUserService> {
  create = createSpy('create');
}

class MockUserFormService implements Partial<UserFormService> {
  getForm(): FormGroup {
    return new FormGroup({
      uid: new FormControl(userCode),
    });
  }
}

const mockRouterState = {
  state: {
    params: {
      userCode,
    },
  },
};

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState = createSpy('getRouterState').and.returnValue(
    of(mockRouterState)
  );
}

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;
  let userService: B2BUserService;
  let routingService: RoutingService;
  let saveButton;
  let userFormComponent;

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
      declarations: [UserCreateComponent, MockUserFormComponent],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: B2BUserService, useClass: MockB2BUserService },
        { provide: UserFormService, useClass: MockUserFormService },
      ],
    }).compileComponents();

    userService = TestBed.inject(B2BUserService);
    routingService = TestBed.inject(RoutingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    saveButton = fixture.debugElement.query(By.css('button[type=submit]'));
    userFormComponent = fixture.debugElement.query(By.css('cx-user-form'))
      .componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('save valid form', () => {
    it('should disable form on save ', () => {
      saveButton.nativeElement.click();
      expect(userFormComponent.form.disabled).toBeTruthy();
    });

    it('should create cost center', () => {
      saveButton.nativeElement.click();
      expect(userService.create).toHaveBeenCalled();
    });

    it('should navigate to the detail page', () => {
      saveButton.nativeElement.click();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'userDetails',
        params: { uid: userCode },
      });
    });
  });

  describe('fail saving invalid form', () => {
    beforeEach(() => {
      userFormComponent.form.setErrors({ incorrect: true });
    });

    it('should not disable form on save when it is invalid', () => {
      saveButton.nativeElement.click();
      expect(userFormComponent.form.disabled).toBeFalsy();
    });

    it('should create cost center', () => {
      saveButton.nativeElement.click();
      expect(userService.create).not.toHaveBeenCalled();
    });

    it('should not navigate away', () => {
      saveButton.nativeElement.click();
      expect(routingService.go).not.toHaveBeenCalled();
    });
  });
});
