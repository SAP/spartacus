import { FormatTimerPipe } from './format-timer.pipe';

describe('FormatTimerPipe', () => {
  let pipe: FormatTimerPipe;

  beforeEach(() => {
    pipe = new FormatTimerPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('format zero seconds', () => {
    expect(pipe.transform(0)).toBe('00:00');
  });
  it('format one digit seconds', () => {
    expect(pipe.transform(7)).toBe('00:07');
  });
  it('format two digit seconds', () => {
    expect(pipe.transform(15)).toBe('00:15');
  });
  it('format one digit minutes', () => {
    expect(pipe.transform(77)).toBe('01:17');
  });
  it('format two digit minutes', () => {
    expect(pipe.transform(1267)).toBe('21:07');
  });
  it('format two digit minutes', () => {
    expect(pipe.transform(1267)).toBe('21:07');
  });
  it('handle negative number', () => {
    expect(pipe.transform(-7)).toBe('00:00');
  });
  it('handle negative number', () => {
    expect(pipe.transform(6663)).toBe('111:03');
  });
  it('handle negative number', () => {
    expect(pipe.transform(66664)).toBe('1111:04');
  });
});
