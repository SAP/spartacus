import { TestBed } from '@angular/core/testing';
import { GlobService } from './glob.service';

describe('GlobService', () => {
  let service: GlobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobService);
  });

  describe('getValidator', () => {
    function test_matcher(
      patterns: string[],
      testCase: { input: string; expected: boolean }
    ) {
      it(`test case "${testCase.input}"`, () => {
        const matcher = service.getValidator(patterns);
        expect(matcher(testCase.input)).toBe(testCase.expected);
      });
    }

    describe('should return matcher for wildcard positive pattern with negative exceptions', () => {
      const patterns = [
        '/**',
        '!/cart',
        '!/???',
        '!/product/*',
        '!/Open-Catalogue/**/p/**',
      ];

      const testCases = [
        { input: '/', expected: true },
        { input: 'no-leading-slash', expected: false },
        { input: '/sale', expected: true },
        { input: '/cart', expected: false },
        { input: '/faq', expected: false },
        { input: '/product/123/camera', expected: true },
        { input: '/product/123', expected: false },
        {
          input:
            '/Open-Catalogue/Cameras/DigitalCameras/Digital-Compacts/NV10/p/553637',
          expected: false,
        },
      ];

      testCases.forEach((testCase) => test_matcher(patterns, testCase));
    });

    describe('should return matcher for wildcard negative pattern with positive exceptions', () => {
      const patterns = [
        '/cart',
        '/???',
        '/product/*',
        '/Open-Catalogue/**/p/**',
      ];

      const testCases = [
        { input: '/', expected: false },
        { input: '/sale', expected: false },
        { input: '/cart', expected: true },
        { input: '/faq', expected: true },
        { input: '/product/123/camera', expected: false },
        { input: '/product/123', expected: true },
        {
          input:
            '/Open-Catalogue/Cameras/DigitalCameras/Digital-Compacts/NV10/p/553637',
          expected: true,
        },
      ];

      testCases.forEach((testCase) => test_matcher(patterns, testCase));
    });
  });
});
