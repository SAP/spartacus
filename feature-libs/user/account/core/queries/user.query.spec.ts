import { TestBed } from '@angular/core/testing';

import { UserQuery } from './user.query';

describe('UserLoaderService', () => {
  let service: UserQuery;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserQuery);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
