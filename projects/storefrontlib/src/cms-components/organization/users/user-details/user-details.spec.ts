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
    active: true,
    approvers: [],
    currency: {
      active: true,
      isocode: 'USD',
      name: 'US Dollar',
      symbol: '$'
    },
    customerId: '08ecc0b1-16ef-4a74-a1dd-4a244300c974',
    displayUid: 'akiro@naka.com',
    firstName: 'Akiro',
    lastName: 'Nakamura',
    orgUnit: {
      active: true,
      name: 'Rustic',
      uid: 'Rustic'
    },
    roles: [
      'b2bmanagergroup'
    ],
    selected: false,
    title: 'Mr.',
    titleCode: 'mr',
    email: 'akiro@naka.com'
};

const mockUserUI = {
  code: 'akiro@naka.com',
  name: 'Akiro Nakamura',
  roles: ['b2bmanagergroup'],
  parentUnit: 'Rustic',
  uid: 'Rustic',
  customerId: '08ecc0b1-16ef-4a74-a1dd-4a244300c974'
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

