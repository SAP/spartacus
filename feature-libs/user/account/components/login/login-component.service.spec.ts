import { TestBed } from '@angular/core/testing';

import { LoginComponentService } from './login-component.service';

describe('LoginComponentService', () => {
  let service: LoginComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
