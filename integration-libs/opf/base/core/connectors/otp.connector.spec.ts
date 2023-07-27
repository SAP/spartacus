import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import createSpy = jasmine.createSpy;
import { OtpConnector } from './otp.connector';
import { OtpAdapter } from './otp.adapter';

class MockOtpAdapter implements OtpAdapter {
  generateOtpKey = createSpy().and.returnValue(of({}));
}

describe('OtpConnector', () => {
  let service: OtpConnector;
  let adapter: OtpAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OtpConnector,
        {
          provide: OtpAdapter,
          useClass: MockOtpAdapter,
        },
      ],
    });

    service = TestBed.inject(OtpConnector);
    adapter = TestBed.inject(OtpAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call adapter', () => {
    service.generateOtpKey('user1', 'cart1').pipe(take(1)).subscribe();
    expect(adapter.generateOtpKey).toHaveBeenCalledWith('user1', 'cart1');
  });
});