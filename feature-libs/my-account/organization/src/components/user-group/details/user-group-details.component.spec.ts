import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
} from '@spartacus/core';
import { ModalService, TableModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { UserGroupDetailsComponent } from './user-group-details.component';
import { UserGroup } from '../../../core/model/user-group.model';
import { UserGroupService } from '../../../core/services/user-group.service';

import createSpy = jasmine.createSpy;

const userGroupCode = 'b1';

const mockUserGroup: UserGroup = {
  uid: userGroupCode,
  name: 'userGroup1',
  orgUnit: { name: 'orgName', uid: 'orgCode' },
};

class MockUserGroupService implements Partial<UserGroupService> {
  load = createSpy('load');
  get = createSpy('get').and.returnValue(of(mockUserGroup));
  update = createSpy('update');
}

class MockActivatedRoute {
  params = of({ code: userGroupCode });

  snapshot = {};
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
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: UserGroupService, useClass: MockUserGroupService },
        { provide: ModalService, useClass: MockModalService },
      ],
    }).compileComponents();

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
});
