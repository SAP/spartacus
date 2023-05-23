import { TestBed } from '@angular/core/testing';

import { EMPTY, Observable, PartialObserver, Subject, of } from 'rxjs';
import { Command, CommandService, CommandStrategy } from './command.service';

/** Utility function to create a full observer filled with spies and optional overrides */
function createObserverSpy<T>(
  name: string,
  observerOverrides?: PartialObserver<T>
): jasmine.SpyObj<PartialObserver<T>> {
  return jasmine.createSpyObj(name, {
    next: () => {},
    error: () => {},
    complete: () => {},
    ...observerOverrides,
  });
}

describe('CommandService', () => {
  let service: CommandService;

  let request1: Subject<string>;
  let request2: Subject<string>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandService);

    request1 = new Subject<string>();
    request2 = new Subject<string>();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create should return command', () => {
    const command = service.create(() => EMPTY);
    expect(command.execute).toBeDefined();
  });

  describe('command', () => {
    let command: Command<string, string>;
    let commandExecutedTimes: number;

    beforeEach(() => {
      commandExecutedTimes = 0;
      command = service.create((input) => {
        commandExecutedTimes++;
        return of(input + commandExecutedTimes);
      });
    });

    it('should execute command without subscription', () => {
      expect(commandExecutedTimes).toBe(0);
      command.execute('test');
      expect(commandExecutedTimes).toBe(1);
    });

    it('should execute command and return result', (done) => {
      command.execute('test').subscribe((result) => {
        expect(result).toEqual('test1');
        done();
      });
    });

    describe('CommandStrategy.Queue', () => {
      let queueCommand: Command<Observable<string>, string>;
      let observer1: jasmine.SpyObj<PartialObserver<string>>;
      let observer2: jasmine.SpyObj<PartialObserver<string>>;

      beforeEach(() => {
        // use argument as command request
        queueCommand = service.create((obs) => obs, {
          strategy: CommandStrategy.Queue,
        });

        spyOn(request1, 'subscribe').and.callThrough();
        spyOn(request2, 'subscribe').and.callThrough();

        observer1 = createObserverSpy('observer1');
        observer2 = createObserverSpy('observer2');
      });

      it('should queue subsequent requests when the preceding request is in-progress', () => {
        queueCommand.execute(request1);
        queueCommand.execute(request2);

        expect(request1.subscribe).toHaveBeenCalled();
        expect(request2.subscribe).not.toHaveBeenCalled();
      });

      it('should queue requests as the default method', () => {
        queueCommand = service.create((obs) => obs);
        queueCommand.execute(request1);
        queueCommand.execute(request2);

        expect(request1.subscribe).toHaveBeenCalled();
        expect(request2.subscribe).not.toHaveBeenCalled();
      });

      it('should initiate subsequent request when the preceding request completes', () => {
        const expected = 'value1';
        queueCommand.execute(request1).subscribe(observer1);
        queueCommand.execute(request2);

        request1.next(expected);
        request1.complete();

        expect(observer1.next).toHaveBeenCalledWith(expected);
        expect(observer1.complete).toHaveBeenCalled();
        expect(request2.subscribe).toHaveBeenCalled();
      });

      it('should initiate subsequent request when the preceding queued request errors', () => {
        const expectedError = 'error1';
        const expected = 'value2';
        queueCommand.execute(request1).subscribe(observer1);
        queueCommand.execute(request2).subscribe(observer2);

        request1.error(expectedError);
        request2.next(expected);
        request2.complete();

        expect(observer1.error).toHaveBeenCalledWith(expectedError);
        expect(observer2.next).toHaveBeenCalledWith(expected);
        expect(observer2.complete).toHaveBeenCalled();
      });
    });

    describe('CommandStrategy.Parallel', () => {
      let paralleCommand: Command<Observable<string>, string>;

      beforeEach(() => {
        // use argument as command request
        paralleCommand = service.create((obs) => obs, {
          strategy: CommandStrategy.Parallel,
        });
        spyOn(request1, 'subscribe').and.callThrough();
        spyOn(request2, 'subscribe').and.callThrough();
      });

      it('should initiate requests in parallel', () => {
        paralleCommand.execute(request1);
        paralleCommand.execute(request2);

        expect(request1.subscribe).toHaveBeenCalled();
        expect(request2.subscribe).toHaveBeenCalled();
      });

      it('should not allow errors in one request to interfere with other requests', () => {
        let expected = 'result2';
        let expectedError = 'error1';
        const observer1 = createObserverSpy('observer1');
        const observer2 = createObserverSpy('observer2');
        paralleCommand.execute(request1).subscribe(observer1);
        paralleCommand.execute(request2).subscribe(observer2);

        request1.error(expectedError);
        request2.next(expected);
        request2.complete();

        expect(observer1.next).not.toHaveBeenCalled();
        expect(observer1.error).toHaveBeenCalledWith(expectedError);
        expect(observer2.next).toHaveBeenCalledWith(expected);
        expect(observer2.complete).toHaveBeenCalled();
      });
    });

    describe('CommandStrategy.CancelPrevious', () => {
      let cancelPrevCommand: Command<Observable<string>, string>;

      beforeEach(() => {
        // use argument as command request
        cancelPrevCommand = service.create((obs) => obs, {
          strategy: CommandStrategy.CancelPrevious,
        });
        spyOn(request1, 'unsubscribe').and.callThrough();
      });

      it('should cancel in-progress requests', () => {
        const observer1 = createObserverSpy('observer1');
        cancelPrevCommand.execute(request1).subscribe(observer1);

        cancelPrevCommand.execute(request2).subscribe();
        request1.next('next');

        expect(observer1.next).not.toHaveBeenCalled();
        expect(observer1.error).not.toHaveBeenCalled();
        expect(observer1.complete).toHaveBeenCalled();
      });
    });

    describe('CommandStrategy.ErrorPrevious', () => {
      let errorPrevCommand: Command<Observable<string>, string>;

      beforeEach(() => {
        // use argument as command request
        errorPrevCommand = service.create((obs) => obs, {
          strategy: CommandStrategy.ErrorPrevious,
        });
      });

      it('should error in-progress requests', () => {
        const observer1 = createObserverSpy('observer1');
        const observer2 = createObserverSpy('observer2');
        errorPrevCommand.execute(request1).subscribe(observer1);

        errorPrevCommand.execute(request2).subscribe(observer2);

        expect(observer1.error).toHaveBeenCalledWith(jasmine.any(Error));
      });
    });
  });
});
