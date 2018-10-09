import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';

const mockStore = {
  dispatch: () => {},
  pipe: () => EMPTY
};

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService,
        {provide: Store, useValue: mockStore }]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
