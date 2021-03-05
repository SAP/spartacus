import { TestBed } from '@angular/core/testing';

import { UpdateProfileCommand } from './update-profile.command';

describe('UpdateProfileProcessService', () => {
  let service: UpdateProfileCommand;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateProfileCommand);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
