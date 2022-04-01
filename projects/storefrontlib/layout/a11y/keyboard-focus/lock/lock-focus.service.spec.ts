import { waitForAsync, TestBed } from '@angular/core/testing';
import { SelectFocusUtility } from '../services';
import { LockFocusService } from './lock-focus.service';

class MockSelectFocusUtility {
  findFirstFocusable() {}
  findFocusable() {
    return [];
  }
}

describe('LockFocusService', () => {
  let service: LockFocusService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          LockFocusService,
          {
            provide: SelectFocusUtility,
            useClass: MockSelectFocusUtility,
          },
        ],
      }).compileComponents();

      service = TestBed.inject(LockFocusService);
    })
  );

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });
});
