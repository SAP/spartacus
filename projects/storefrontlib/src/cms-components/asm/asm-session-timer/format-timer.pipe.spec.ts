import { FormatTimerPipe } from './format-timer.pipe';

const NUM_MINUS_7 = -7;
const NUM_7 = 7;
const NUM_15 = 15;
const NUM_77 = 77;
const NUM_1267 = 1267;
const NUM_6663 = 6663;
const NUM_66664 = 66664;

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
    expect(pipe.transform(NUM_7)).toBe('00:07');
  });
  it('format two digit seconds', () => {
    expect(pipe.transform(NUM_15)).toBe('00:15');
  });
  it('format one digit minutes', () => {
    expect(pipe.transform(NUM_77)).toBe('01:17');
  });
  it('format two digit minutes', () => {
    expect(pipe.transform(NUM_1267)).toBe('21:07');
  });
  it('format two digit minutes', () => {
    expect(pipe.transform(NUM_1267)).toBe('21:07');
  });
  it('handle negative number', () => {
    expect(pipe.transform(NUM_MINUS_7)).toBe('00:00');
  });
  it('handle negative number', () => {
    expect(pipe.transform(NUM_6663)).toBe('111:03');
  });
  it('handle negative number', () => {
    expect(pipe.transform(NUM_66664)).toBe('1111:04');
  });
});
