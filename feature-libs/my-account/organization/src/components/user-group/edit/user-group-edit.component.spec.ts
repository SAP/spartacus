import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { Observable, of } from 'rxjs';
import { UserGroupEditComponent } from './user-group-edit.component';
import { By } from '@angular/platform-browser';
import { UserGroup } from '../../../core/model/user-group.model';
import { UserGroupService } from '../../../core/services/user-group.service';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-user-group-form',
  template: '',
})
class MockUserGroupFormComponent {
  @Input() form;
}

const userGroupCode = 'b1';

const mockUserGroup: UserGroup = {
  uid: userGroupCode,
  name: 'userGroup1',
  orgUnit: { name: 'orgName', uid: 'orgCode' },
};

class MockUserGroupService implements Partial<UserGroupService> {
  get(_userGroupCode: string): Observable<UserGroup> {
    return of(mockUserGroup);
  }
  update(_userGroupCode: string, _userGroup: UserGroup) {}
  load(_userGroupCode: string) {}
}

const mockRouterState = {
  state: {
    params: {
      code: userGroupCode,
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
    params: of({ code: userGroupCode }),
  };
  snapshot = {};
  go() {}
}

describe('UserGroupEditComponent', () => {
  let component: UserGroupEditComponent;
  let fixture: ComponentFixture<UserGroupEditComponent>;
  let userGroupService: MockUserGroupService;
  let routingService: RoutingService;
  let saveButton;
  let userGroupFormComponent;

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
      declarations: [UserGroupEditComponent, MockUserGroupFormComponent],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UserGroupService, useClass: MockUserGroupService },
      ],
    }).compileComponents();

    userGroupService = TestBed.inject(UserGroupService);

    routingService = TestBed.inject(RoutingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    saveButton = fixture.debugElement.query(By.css('button[type=submit]'));
    userGroupFormComponent = fixture.debugElement.query(
      By.css('cx-user-group-form')
    ).componentInstance;
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
      expect(userGroupFormComponent.form.disabled).toBeTruthy();
    });

    it('should create cost center', () => {
      spyOn(userGroupService, 'update');
      saveButton.nativeElement.click();
      expect(userGroupService.update).toHaveBeenCalled();
    });

    it('should navigate to the detail page', () => {
      saveButton.nativeElement.click();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'userGroupDetails',
        params: userGroupFormComponent.form.value,
      });
    });
  });
});
