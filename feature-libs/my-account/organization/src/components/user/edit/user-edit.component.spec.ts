import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  B2BUser,
  B2BUserService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { Observable, of } from 'rxjs';
import { UserEditComponent } from './user-edit.component';
import { By } from '@angular/platform-browser';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-user-form',
  template: '',
})
class MockUserFormComponent {
  @Input() form;
}

const userCode = 'b1';

const mockUser: B2BUser = {
  uid: userCode,
  name: 'user1',
  orgUnit: { name: 'orgName', uid: 'orgCode' },
};

class MockB2BUserService implements Partial<B2BUserService> {
  get(_userCode: string): Observable<B2BUser> {
    return of(mockUser);
  }
  update(_userCode: string, _user: B2BUser) {}
  load(_userCode: string) {}
}

const mockRouterState = {
  state: {
    params: {
      code: userCode,
    },
  },
};

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState = createSpy('getRouterState').and.returnValue(
    of(mockRouterState)
  );
}

class MockActivatedRoute {
  parent = {
    params: of({ code: userCode }),
  };
  snapshot = {};
  go() {}
}

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let userService: MockB2BUserService;
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
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: B2BUserService, useClass: MockB2BUserService },
      ],
    }).compileComponents();

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

  // not sure why this is needed, but we're failing otherwise
  afterEach(() => {
    fixture.destroy();
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
      spyOn(userService, 'update');
      saveButton.nativeElement.click();
      expect(userService.update).toHaveBeenCalled();
    });

    it('should navigate to the detail page', () => {
      saveButton.nativeElement.click();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'userDetails',
        params: userFormComponent.form.value,
      });
    });
  });
});
