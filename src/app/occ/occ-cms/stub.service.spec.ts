import { TestBed, inject } from '@angular/core/testing';
import { StubService } from './stub.service';

describe('StubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StubService]
    });
  });

  it('should ...', inject([StubService], (service: StubService) => {
    expect(service).toBeTruthy();
  }));
});
