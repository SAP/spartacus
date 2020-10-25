import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { CLIENT_AUTH_FEATURE } from '../../client-auth/store/client-auth-state';
import * as fromReducers from '../../client-auth/store/reducers/index';
import { UserIdService } from '../facade/user-id.service';
import { BasicAuthService } from './basic-auth.service';

class MockUserIdService {
  getUserId(): Observable<string> {
    return of('');
  }
  clearUserId() {}
}

// TODO(#8246): Fix unit tests after final implementation
describe('BasicAuthService', () => {
  let service: BasicAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(CLIENT_AUTH_FEATURE, fromReducers.getReducers()),
      ],
      providers: [
        BasicAuthService,
        {
          provide: UserIdService,
          useClass: MockUserIdService,
        },
      ],
    });

    service = TestBed.inject(BasicAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
