import { processGlobPatterns } from './glob-utils';

describe('processGlobPatterns', () => {
  it('should convert glob-like patterns into regex strings with info whether it is positive pattern', () => {
    expect(
      processGlobPatterns([
        '/included/absolute/**',
        '!/excluded/absolute/**',
        '/included/some/url/with+escaped+chars',
        '!/excluded/relative/*.txt',
        '!/api/?*',
      ])
    ).toEqual([
      { positive: true, regex: '^\\/included\\/absolute\\/.*$' },
      { positive: false, regex: '^\\/excluded\\/absolute\\/.*$' },
      {
        positive: true,
        regex: '^\\/included\\/some\\/url\\/with\\+escaped\\+chars$',
      },
      {
        positive: false,
        regex: '^\\/excluded\\/relative\\/[^/]*\\.txt$',
      },
      { positive: false, regex: '^\\/api\\/[^/][^/]*$' },
    ]);
  });
});
