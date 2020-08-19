import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ModalService, TableModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { UserGroupDetailsComponent } from './user-group-details.component';
import { UserGroup } from '../../../core/model/user-group.model';
import { UserGroupService } from '../../../core/services/user-group.service';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { CurrentUserGroupService } from '../current-user-group.service';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';

import createSpy = jasmine.createSpy;

const userGroupCode = 'b1';

const mockUserGroup: UserGroup = {
  uid: userGroupCode,
  name: 'userGroup1',
  orgUnit: { name: 'orgName', uid: 'orgCode' },
};

class MockCurrentUserGroupService implements Partial<CurrentUserGroupService> {
  code$ = of(userGroupCode);
}

class MockUserGroupService implements Partial<UserGroupService> {
  load = createSpy('load');
  update = createSpy('update');
  get = createSpy('get').and.returnValue(of(mockUserGroup));
}

class MockModalService {
  open() {}
}

@Component({
  selector: 'cx-user-group-user-list',
  template: '',
})
export class MockUserGroupUserListComponent {}

describe('UserGroupDetailsComponent', () => {
  let component: UserGroupDetailsComponent;
  let fixture: ComponentFixture<UserGroupDetailsComponent>;
  let userGroupsService: UserGroupService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        TableModule,
        IconTestingModule,
      ],
      declarations: [UserGroupDetailsComponent, MockUserGroupUserListComponent],
      providers: [
        { provide: UserGroupService, useClass: MockUserGroupService },
        { provide: ModalService, useClass: MockModalService },
      ],
    })
      .overrideComponent(UserGroupDetailsComponent, {
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

    userGroupsService = TestBed.inject(UserGroupService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update userGroup', () => {
    component.update(mockUserGroup);
    expect(userGroupsService.update).toHaveBeenCalledWith(
      mockUserGroup.uid,
      mockUserGroup
    );
  });
  it('should trigger reload of cost center model on each code change', () => {
    expect(userGroupsService.load).toHaveBeenCalledWith(mockUserGroup.uid);
  });

  describe('costCenter$', () => {
    it('should emit current cost center model', () => {
      let result;
      component.userGroup$.subscribe((r) => (result = r)).unsubscribe();
      expect(result).toBe(mockUserGroup);
    });
  });
});
