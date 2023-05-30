import { TestBed } from '@angular/core/testing';

import {
  EMPTY,
  NEVER,
  Observable,
  PartialObserver,
  Subject,
  of,
  throwError,
} from 'rxjs';
import { Command, CommandService, CommandStrategy } from './command.service';

/** Utility function to create a full observer filled with spies */
function createObserverSpy<T>(
  name: string
): jasmine.SpyObj<PartialObserver<T>> {
  const mockObserver = jasmine.createSpyObj(name, {
    next: () => {},
    error: () => {},
    complete: () => {},
  });
  // use default method
  mockObserver.next.and.callThrough();
  mockObserver.error.and.callThrough();
  mockObserver.complete.and.callThrough();

  return mockObserver;
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

  describe('create()', () => {
    it('should return command', () => {
      const command = service.create(() => EMPTY);
      expect(command.execute).toBeDefined();
    });
  });

  describe('command()', () => {
    let mockRuntimeError: Error;
    let faultyCommandFactoryControl: { shouldThrowError: boolean };
    let faultyCommandFactory: jasmine.Spy<
      (cmd: Observable<string>) => Observable<string>
    >;
    let commandFactory: jasmine.Spy<
      (cmd: Observable<string>) => Observable<string>
    >;

    beforeEach(() => {
      commandFactory = jasmine.createSpy('commandFactory', (cmd) => cmd);
      commandFactory.and.callThrough();

      faultyCommandFactoryControl = { shouldThrowError: true };
      mockRuntimeError = new Error('mock runtime error');
      mockRuntimeError.stack = undefined; // stack trace not relevant on a static error value
      faultyCommandFactory = jasmine.createSpy(
        'faultyCommandFactory',
        (cmd) => {
          if (faultyCommandFactoryControl.shouldThrowError) {
            throw mockRuntimeError;
          } else {
            return cmd;
          }
        }
      );
      faultyCommandFactory.and.callThrough();
    });

    it('should execute command without subscription', () => {
      let command = service.create(commandFactory);

      expect(commandFactory).toHaveBeenCalledTimes(0);
      command.execute(of('test'));
      expect(commandFactory).toHaveBeenCalledTimes(1);
    });

    it('should execute command and return result', () => {
      let command = service.create(commandFactory);
      const expected = 'test';
      const input = of(expected);

      command.execute(input).subscribe((result) => {
        expect(result).toEqual(expected);
      });
    });

    describe('with CommandStrategy.Queue', () => {
      let queueCommand: Command<Observable<string>, string>;
      const strategy = CommandStrategy.Queue;
      let observer1: jasmine.SpyObj<PartialObserver<string>>;
      let observer2: jasmine.SpyObj<PartialObserver<string>>;

      beforeEach(() => {
        // use argument as command request
        queueCommand = service.create(commandFactory, {
          strategy: strategy,
        });

        spyOn(request1, 'subscribe').and.callThrough();
        spyOn(request2, 'subscribe').and.callThrough();

        observer1 = createObserverSpy('observer1');
        observer2 = createObserverSpy('observer2');
      });

      it('should catch commandFactory errors and pass them to the notifier', () => {
        queueCommand = service.create(faultyCommandFactory, {
          strategy: strategy,
        });

        queueCommand.execute(of('')).subscribe(observer1);

        expect(observer1.error).toHaveBeenCalledWith(mockRuntimeError);
      });

      it('should continue processing other commands after a commandFactory error', () => {
        const observer1 = createObserverSpy('observer1');
        const observer2 = createObserverSpy('observer2');
        queueCommand = service.create(faultyCommandFactory, {
          strategy: strategy,
        });
        const expected = '';
        faultyCommandFactoryControl.shouldThrowError = true;

        queueCommand.execute(NEVER).subscribe(observer1);
        faultyCommandFactoryControl.shouldThrowError = false;
        queueCommand.execute(of(expected)).subscribe(observer2);

        expect(observer2.next).toHaveBeenCalledWith(expected);
      });

      it('should queue subsequent requests when the preceding request is in-progress', () => {
        queueCommand.execute(request1);
        queueCommand.execute(request2);

        expect(request1.subscribe).toHaveBeenCalled();
        expect(request2.subscribe).not.toHaveBeenCalled();
      });

      it('should queue requests as the default strategy', () => {
        queueCommand = service.create(commandFactory);
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

    describe('with CommandStrategy.Parallel', () => {
      let parallelCommand: Command<Observable<string>, string>;
      const strategy = CommandStrategy.Parallel;

      beforeEach(() => {
        // use argument as command request
        parallelCommand = service.create(commandFactory, {
          strategy: strategy,
        });
        spyOn(request1, 'subscribe').and.callThrough();
        spyOn(request2, 'subscribe').and.callThrough();
      });

      it('should catch commandFactory errors and pass them to the notifier', () => {
        const observer = createObserverSpy('observer');
        parallelCommand = service.create(faultyCommandFactory, {
          strategy: strategy,
        });

        parallelCommand.execute(NEVER).subscribe(observer);

        expect(observer.error).toHaveBeenCalledWith(mockRuntimeError);
      });

      it('should continue processing other commands after a commandFactory error', () => {
        const observer1 = createObserverSpy('observer1');
        const observer2 = createObserverSpy('observer2');
        parallelCommand = service.create(faultyCommandFactory, {
          strategy: strategy,
        });
        const expected = 'expected value';
        faultyCommandFactoryControl.shouldThrowError = true;

        parallelCommand.execute(NEVER).subscribe(observer1);
        faultyCommandFactoryControl.shouldThrowError = false;
        parallelCommand.execute(of(expected)).subscribe(observer2);

        expect(observer2.next).toHaveBeenCalledWith(expected);
      });

      it('should initiate requests in parallel', () => {
        parallelCommand.execute(request1);
        parallelCommand.execute(request2);

        expect(request1.subscribe).toHaveBeenCalled();
        expect(request2.subscribe).toHaveBeenCalled();
      });

      it('should not allow an error in one request to interfere with other in-progress requests', () => {
        let expectedValue = 'result2';
        let expectedError = 'error1';
        const observer1 = createObserverSpy('observer1');
        const observer2 = createObserverSpy('observer2');
        parallelCommand.execute(request1).subscribe(observer1);
        parallelCommand.execute(request2).subscribe(observer2);

        request1.error(expectedError);
        request2.next(expectedValue);
        request2.complete();

        expect(observer1.next).not.toHaveBeenCalled();
        expect(observer1.error).toHaveBeenCalledWith(expectedError);
        expect(observer2.next).toHaveBeenCalledWith(expectedValue);
        expect(observer2.complete).toHaveBeenCalled();
      });
    });

    describe('with CommandStrategy.CancelPrevious', () => {
      let cancelPrevCommand: Command<Observable<string>, string>;
      const strategy = CommandStrategy.CancelPrevious;

      beforeEach(() => {
        // use argument as command request
        cancelPrevCommand = service.create(commandFactory, {
          strategy: strategy,
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

      it('should catch commandFactory errors and pass them to the notifier', () => {
        const observer = createObserverSpy('observer');
        cancelPrevCommand = service.create(faultyCommandFactory, {
          strategy: strategy,
        });

        cancelPrevCommand.execute(NEVER).subscribe(observer);

        expect(observer.error).toHaveBeenCalledWith(mockRuntimeError);
      });

      it('should continue processing other commands after a commandFactory error', () => {
        const observer1 = createObserverSpy('observer1');
        const observer2 = createObserverSpy('observer2');
        cancelPrevCommand = service.create(faultyCommandFactory, {
          strategy: strategy,
        });
        const expected = '';
        faultyCommandFactoryControl.shouldThrowError = true;

        cancelPrevCommand.execute(NEVER).subscribe(observer1);
        faultyCommandFactoryControl.shouldThrowError = false;
        cancelPrevCommand.execute(of(expected)).subscribe(observer2);

        expect(observer2.next).toHaveBeenCalledWith(expected);
      });
    });

    describe('with CommandStrategy.ErrorPrevious', () => {
      let errorPrevCommand: Command<Observable<string>, string>;
      const strategy = CommandStrategy.ErrorPrevious;

      beforeEach(() => {
        // use argument as command request
        errorPrevCommand = service.create((obs) => obs, {
          strategy: strategy,
        });
      });

      it('should mirror the command request notifications to the subscriber', () => {
        const observer = createObserverSpy('observer1');
        const expected = 'expected value';

        errorPrevCommand.execute(request1).subscribe(observer);
        request1.next(expected);
        request1.complete();

        expect(observer.next).toHaveBeenCalledWith(expected);
        expect(observer.error).not.toHaveBeenCalled();
        expect(observer.complete).toHaveBeenCalled();
      });

      it('should error in-progress requests when new request comes in', () => {
        let actual: Error | undefined;
        const observer1 = createObserverSpy('observer1');
        (observer1.error as jasmine.Spy).and.callFake(
          (result) => (actual = result)
        );
        const observer2 = createObserverSpy('observer2');

        errorPrevCommand.execute(request1).subscribe(observer1);
        errorPrevCommand.execute(request2).subscribe(observer2);

        request1.next('r1');
        request1.complete();

        expect(observer1.error).toHaveBeenCalledWith(jasmine.any(Error));
        expect(actual?.message).toEqual('Canceled by next command');
      });

      it('should not error completed requests', () => {
        const observer1 = createObserverSpy('observer1');
        const observer2 = createObserverSpy('observer2');

        errorPrevCommand.execute(request1).subscribe(observer1);
        request1.complete();

        errorPrevCommand.execute(request2).subscribe(observer2);

        expect(observer1.error).not.toHaveBeenCalled();
      });

      it("should mirror the commandFactory observable's error notifications to the subscriber", () => {
        const observer = createObserverSpy('observer');
        const mockRequestError = new Error('request error');

        errorPrevCommand
          .execute(throwError(mockRequestError))
          .subscribe(observer);

        expect(observer.error).toHaveBeenCalledWith(mockRequestError);
      });

      it('should catch errors thrown by commandFactory and pass them to the subscriber', () => {
        const observer = createObserverSpy('observer');
        errorPrevCommand = service.create(faultyCommandFactory, {
          strategy: strategy,
        });

        errorPrevCommand.execute(NEVER).subscribe(observer);

        expect(observer.error).toHaveBeenCalledWith(mockRuntimeError);
      });

      it('should continue processing other commands after a commandFactory error', () => {
        const observer1 = createObserverSpy('observer1');
        const observer2 = createObserverSpy('observer2');
        errorPrevCommand = service.create(faultyCommandFactory, {
          strategy: strategy,
        });
        const expected = '';
        faultyCommandFactoryControl.shouldThrowError = true;

        errorPrevCommand.execute(NEVER).subscribe(observer1);
        faultyCommandFactoryControl.shouldThrowError = false;
        errorPrevCommand.execute(of(expected)).subscribe(observer2);

        expect(observer2.next).toHaveBeenCalledWith(expected);
      });
    });
  });
});
