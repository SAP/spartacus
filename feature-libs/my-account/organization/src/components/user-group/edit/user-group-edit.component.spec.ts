import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { UserGroup } from '../../../core/model/user-group.model';
import { UserGroupService } from '../../../core/services/user-group.service';
import { CurrentUserGroupService } from '../current-user-group.service';
import { UserGroupEditComponent } from './user-group-edit.component';

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

class MockCurrentUserGroupService implements Partial<CurrentUserGroupService> {
  key$ = of(userGroupCode);
}

class MockUserGroupService implements Partial<UserGroupService> {
  update = createSpy('update');
  load = createSpy('load');
  get = createSpy('get').and.returnValue(of(mockUserGroup));
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

describe('UserGroupEditComponent', () => {
  let component: UserGroupEditComponent;
  let fixture: ComponentFixture<UserGroupEditComponent>;
  let userGroupService: UserGroupService;
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
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UserGroupService, useClass: MockUserGroupService },
      ],
    })
      .overrideComponent(UserGroupEditComponent, {
        set: {
          providers: [
            {
              provide: CurrentUserGroupService,
              useClass: MockCurrentUserGroupService,
            },
          ],
        },
      })
      .compileComponents();

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
      expect(userGroupService.update).toHaveBeenCalled();
    });

    it('should navigate to the detail page', () => {
      saveButton.nativeElement.click();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'userGroupDetails',
        params: userGroupFormComponent.form.value,
      });
    });

    it('should trigger reload of cost center model on each code change', () => {
      expect(userGroupService.load).toHaveBeenCalledWith(mockUserGroup.uid);
    });
  });
});
