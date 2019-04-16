import { TestBed } from '@angular/core/testing';

import { MyInterestsService } from './my-interests.service';

describe('MyInterestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyInterestsService = TestBed.get(MyInterestsService);
    expect(service).toBeTruthy();
  });
});
