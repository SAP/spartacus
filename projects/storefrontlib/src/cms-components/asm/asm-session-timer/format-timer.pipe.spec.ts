import { FormatTimerPipe } from './format-timer.pipe';

const TWO_DIGIT_MINUTES = 1267;

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
    const ONE_DIGIT_SECOND = 7;
    expect(pipe.transform(ONE_DIGIT_SECOND)).toBe('00:07');
  });
  it('format two digit seconds', () => {
    const TWO_DIGIT_SECONDS = 15;
    expect(pipe.transform(TWO_DIGIT_SECONDS)).toBe('00:15');
  });
  it('format one digit minutes', () => {
    const ONE_DIGIT_MINUTE = 77;
    expect(pipe.transform(ONE_DIGIT_MINUTE)).toBe('01:17');
  });
  it('format two digit minutes', () => {
    expect(pipe.transform(TWO_DIGIT_MINUTES)).toBe('21:07');
  });
  it('format two digit minutes', () => {
    expect(pipe.transform(TWO_DIGIT_MINUTES)).toBe('21:07');
  });
  it('handle negative number', () => {
    const NEGATIVE_SECONDS = -7;
    expect(pipe.transform(NEGATIVE_SECONDS)).toBe('00:00');
  });
  it('handle negative number', () => {
    const TOTAL_SECONDS = 6663;
    expect(pipe.transform(TOTAL_SECONDS)).toBe('111:03');
  });
  it('handle negative number', () => {
    const TOTAL_SECONDS = 66664;
    expect(pipe.transform(TOTAL_SECONDS)).toBe('1111:04');
  });
});
