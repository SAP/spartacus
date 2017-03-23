import { TestBed, inject } from '@angular/core/testing';
import { UserLoaderService } from './user-loader.service';

describe('UserLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLoaderService]
    });
  });

  it('should ...', inject([UserLoaderService], (service: UserLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
