import { TestBed, inject } from '@angular/core/testing';
import { UserModelService } from './user-model.service';

describe('UserModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserModelService]
    });
  });

  it('should ...', inject([UserModelService], (service: UserModelService) => {
    expect(service).toBeTruthy();
  }));
});
