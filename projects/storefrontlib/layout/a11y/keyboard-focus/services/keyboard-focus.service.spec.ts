import { waitForAsync, TestBed } from '@angular/core/testing';
import { KeyboardFocusService } from './keyboard-focus.service';

describe('KeyboardFocusService', () => {
  let service: KeyboardFocusService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [KeyboardFocusService],
      }).compileComponents();

      service = TestBed.inject(KeyboardFocusService);
    })
  );

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });
});
