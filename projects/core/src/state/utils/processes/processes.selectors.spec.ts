import { ProcessesState } from './processes-state';
import { processesCountSelector } from './processes.selectors';

describe('Processes selectors', () => {
  const TestState: ProcessesState<string> = {
    processesCount: 1,
  };

  it('processesCountSelector should return processesCount flag', () => {
    const value = processesCountSelector(TestState);
    expect(value).toBe(TestState.processesCount);
  });
});
