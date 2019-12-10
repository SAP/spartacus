import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EventEmitter } from './event.emitter';
import { EventService } from './event.service';

class MockEventEmitter {
  observe() {
    return;
  }
}
class MockEventOne {}
class MockEventTwo {}

describe('EventService', () => {
  let service: EventService;
  let eventEmitter: EventEmitter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventService,
        {
          provide: EventEmitter,
          useClass: MockEventEmitter,
        },
      ],
    });

    service = TestBed.get(EventService);
    eventEmitter = TestBed.get(EventEmitter);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should observe event', () => {
    spyOn(eventEmitter, 'observe').and.callThrough();
    service.observe(MockEventOne);
    expect(eventEmitter.observe).toHaveBeenCalledWith(MockEventOne);
  });

  it('should observe event value', () => {
    spyOn(eventEmitter, 'observe').and.returnValue(of({ one: 'one' }));
    let result;
    service
      .observe(MockEventOne)
      .subscribe(ev => (result = ev))
      .unsubscribe();
    expect(result.one).toEqual('one');
  });

  it('should resolve events separately', () => {
    spyOn(eventEmitter, 'observe').and.returnValue(of({ value: 'value' }));

    const results = [];

    service
      .observe(MockEventOne, MockEventTwo)
      .subscribe(value => {
        results.push(value);
      })
      .unsubscribe();

    expect(eventEmitter.observe).toHaveBeenCalledWith(MockEventOne);
    expect(eventEmitter.observe).toHaveBeenCalledWith(MockEventTwo);
    expect(eventEmitter.observe).toHaveBeenCalledTimes(2);

    expect(results[0].value).toEqual('value');
    expect(results[1].value).toEqual('value');
    expect(results.length).toEqual(2);
  });

  it('should resolve multiple event values', () => {
    spyOn(eventEmitter, 'observe').and.returnValue(
      of({ one: 'one', two: 'two' })
    );
    let result;
    service
      .observeWith(MockEventOne, MockEventTwo)
      .subscribe(ev => (result = ev))
      .unsubscribe();

    expect(eventEmitter.observe).toHaveBeenCalledWith(MockEventOne);
    expect(eventEmitter.observe).toHaveBeenCalledWith(MockEventTwo);
    expect(eventEmitter.observe).toHaveBeenCalledTimes(2);

    expect(result.one).toEqual('one');
    expect(result.two).toEqual('two');
  });
});
