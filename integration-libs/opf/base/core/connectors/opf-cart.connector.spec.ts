import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { OpfCartAdapter } from './opf-cart.adapter';
import { OpfCartConnector } from './opf-cart.connector';
import createSpy = jasmine.createSpy;

class MockOpfCartAdapter implements OpfCartAdapter {
  generateOtpKey = createSpy().and.returnValue(of({}));
}

describe('OpfCartConnector', () => {
  let service: OpfCartConnector;
  let adapter: OpfCartAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfCartConnector,
        {
          provide: OpfCartAdapter,
          useClass: MockOpfCartAdapter,
        },
      ],
    });

    service = TestBed.inject(OpfCartConnector);
    adapter = TestBed.inject(OpfCartAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call adapter', () => {
    service.generateOtpKey('user1', 'cart1').pipe(take(1)).subscribe();
    expect(adapter.generateOtpKey).toHaveBeenCalledWith('user1', 'cart1');
  });
});
