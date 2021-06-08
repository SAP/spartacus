import { TestBed } from '@angular/core/testing';

import { Command, CommandService } from './command.service';
import { of } from 'rxjs';

describe('CommandService', () => {
  let service: CommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create should return command', () => {
    const command = service.create(() => of());
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
  });
});
