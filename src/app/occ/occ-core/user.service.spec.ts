import { TestBed, inject } from '@angular/core/testing';
import { OccUserService } from './user.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccUserService]
    });
  });

  it('should ...', inject([OccUserService], (service: OccUserService) => {
    expect(service).toBeTruthy();
  }));
});
