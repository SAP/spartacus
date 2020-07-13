import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import {
  I18nTestingModule,
  RoutingService,
  B2BUserService,
  CxDatePipe,
  RoutesConfig,
  RoutingConfig,
  B2BUser,
} from '@spartacus/core';

import { B2BUserDetailsComponent } from './user-details.component';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';

const code = 'u1';

const mockUser: B2BUser = {
  name: 'Akiro Nakamura',
  uid: 'akiro@naka.com',
  customerId: '08ecc0b1-16ef-4a74-a1dd-4a244300c974',
  orgUnit: {
    active: true,
    name: 'Rustic',
    uid: 'Rustic',
  },
  roles: ['b2bmanagergroup'],
};

const mockUserUI = {
  code: 'akiro@naka.com',
  name: 'Akiro Nakamura',
  roles: ['b2bmanagergroup'],
  orgUnit: {
    active: true,
    name: 'Rustic',
    uid: 'Rustic',
  },
  uid: 'akiro@naka.com',
  customerId: '08ecc0b1-16ef-4a74-a1dd-4a244300c974',
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockUserService implements Partial<B2BUserService> {
  loadB2BUser = createSpy('loadB2BUser');
  get = createSpy('get').and.returnValue(of(mockUser));
  update = createSpy('update');
}

const mockRouterState = {
  state: {
    params: {
      code,
    },
  },
};

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState = createSpy('getRouterState').and.returnValue(
    of(mockRouterState)
  );
}

const mockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;
class MockRoutingConfig {
  getRouteConfig(routeName: string) {
    return mockRoutesConfig[routeName];
  }
}

class MockCxDatePipe {
  transform(value: string) {
    return value.split('T')[0];
  }
}

describe('UserDetailsComponent', () => {
  let component: B2BUserDetailsComponent;
  let fixture: ComponentFixture<B2BUserDetailsComponent>;
  let userService: MockUserService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [B2BUserDetailsComponent, MockUrlPipe],
      providers: [
        { provide: CxDatePipe, useClass: MockCxDatePipe },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: B2BUserService, useClass: MockUserService },
      ],
    }).compileComponents();

    userService = TestBed.get(B2BUserService as Type<B2BUserService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2BUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load user', () => {
      component.ngOnInit();
      let user: any;
      component.b2bUser$
        .subscribe((value) => {
          user = value;
        })
        .unsubscribe();
      expect(routingService.getRouterState).toHaveBeenCalledWith();
      expect(userService.loadB2BUser).toHaveBeenCalledWith(code);
      expect(userService.get).toHaveBeenCalledWith(code);
      expect(user).toEqual(mockUserUI);
    });
  });

  describe('update', () => {
    it('should update user', () => {
      component.ngOnInit();

      component.update({ active: false });
      expect(userService.update).toHaveBeenCalledWith(code, {
        active: false,
      });

      component.update({ active: true });
      expect(userService.update).toHaveBeenCalledWith(code, {
        active: true,
      });
    });
  });
});
