import { Component, Injectable } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUser, B2BUserService, I18nTestingModule } from '@spartacus/core';
import { ModalService, TableModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { CurrentUserService } from '../current-user.service';
import { UserDetailsComponent } from './user-details.component';
import createSpy = jasmine.createSpy;

const userCode = 'b1';

const mockUser: B2BUser = {
  uid: userCode,
  name: 'user1',
  orgUnit: { name: 'orgName', uid: 'orgCode' },
  customerId: 'customerId',
};

class MockB2BUserService implements Partial<B2BUserService> {
  load = createSpy('load');
  get = createSpy('get').and.returnValue(of(mockUser));
  update = createSpy('update');
}

class MockActivatedRoute {
  params = of({ code: userCode });

  snapshot = {};
}

class MockModalService {
  open() {}
}

@Component({
  selector: 'cx-user-user-list',
  template: '',
})
export class MockUserUserListComponent {}

@Injectable()
export class MockCurrentUserService {
  code$() {
    return of(userCode);
  }
}

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let usersService: B2BUserService;

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
      declarations: [UserDetailsComponent, MockUserUserListComponent],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: B2BUserService, useClass: MockB2BUserService },
        { provide: ModalService, useClass: MockModalService },
        { provide: CurrentUserService, useClass: MockCurrentUserService },
      ],
    }).compileComponents();

    usersService = TestBed.inject(B2BUserService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update user', () => {
    component.update(mockUser);
    expect(usersService.update).toHaveBeenCalledWith(
      mockUser.customerId,
      mockUser
    );
  });
});
