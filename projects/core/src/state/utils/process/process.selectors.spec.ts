import { ProcessState } from './process-state';
import { processesCountSelector } from './process.selectors';

describe('Process selectors', () => {
  const TestState: ProcessState<string> = {
    processesCount: 1,
  };

  it('processesCountSelector should return processesCount flag', () => {
    const value = processesCountSelector(TestState);
    expect(value).toBe(TestState.processesCount);
  });
});
