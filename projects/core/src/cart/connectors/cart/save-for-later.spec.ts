import { TestBed } from '@angular/core/testing';
import { SaveForLaterConnector } from './save-for-later.connector';
import createSpy = jasmine.createSpy;
import { SaveForLaterAdapter } from './save-for-later.adapter';
import { of } from 'rxjs';

class MockCartAdapter implements SaveForLaterAdapter {
  create = createSpy().and.callFake(id => of('create' + id));
  load = createSpy().and.callFake((user, cart) => of('load' + user + cart));
}

describe('SaveForLaterConnector', () => {
  let service: SaveForLaterConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SaveForLaterAdapter, useClass: MockCartAdapter }],
    });

    service = TestBed.get(SaveForLaterConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create should call adapter', () => {
    const adapter = TestBed.get(SaveForLaterAdapter);

    let result;
    service.create('1').subscribe(res => (result = res));
    expect(result).toBe('create1');
    expect(adapter.create).toHaveBeenCalledWith('1', undefined);
  });

  fit('load should call adapter', () => {
    const adapter = TestBed.get(SaveForLaterAdapter);

    let result;
    service.load('1', '4').subscribe(res => (result = res));
    expect(result).toBe('load14');
    expect(adapter.load).toHaveBeenCalledWith('1', '4');
  });
});
