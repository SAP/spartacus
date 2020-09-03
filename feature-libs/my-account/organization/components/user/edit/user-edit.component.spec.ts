import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUser, I18nTestingModule, RoutingService } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { B2BUserService } from '@spartacus/my-account/organization/core';
import { CurrentUserService } from '../current-user.service';
import { UserFormService } from '../form/user-form.service';
import { UserEditComponent } from './user-edit.component';

import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-user-form',
  template: '',
})
class MockUserFormComponent {
  @Input() form;
}

const customerId = 'b1';

const mockUser: B2BUser = {
  customerId,
  uid: 'userCode',
  name: 'user1',
  orgUnit: { name: 'orgName', uid: 'orgCode' },
};

class MockCurrentUserService implements Partial<CurrentUserService> {
  key$ = of(customerId);
  item$ = of(mockUser);
}

class MockB2BUserService implements Partial<B2BUserService> {
  update = createSpy('update');
  load = createSpy('load');
  get = createSpy('get').and.returnValue(of(mockUser));
}

const mockRouterState = {
  state: {
    params: {
      code: customerId,
    },
  },
};

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState = createSpy('getRouterState').and.returnValue(
    of(mockRouterState)
  );
}

class MockUserFormService implements Partial<UserFormService> {
  getForm(): FormGroup {
    return new FormGroup({
      customerId: new FormControl(customerId),
    });
  }
}

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let userService: B2BUserService;
  let routingService: RoutingService;
  let saveButton;
  let userFormComponent;

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
      declarations: [UserEditComponent, MockUserFormComponent],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: B2BUserService, useClass: MockB2BUserService },
        { provide: UserFormService, useClass: MockUserFormService },
      ],
    })
      .overrideComponent(UserEditComponent, {
        set: {
          providers: [
            {
              provide: CurrentUserService,
              useClass: MockCurrentUserService,
            },
          ],
        },
      })
      .compileComponents();

    userService = TestBed.inject(B2BUserService);

    routingService = TestBed.inject(RoutingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
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

    it('should update user', () => {
      saveButton.nativeElement.click();
      expect(userService.update).toHaveBeenCalledWith(customerId, {
        customerId,
      });
    });

    it('should navigate to the detail page', () => {
      saveButton.nativeElement.click();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'userDetails',
        params: { customerId },
      });
    });
  });
});
