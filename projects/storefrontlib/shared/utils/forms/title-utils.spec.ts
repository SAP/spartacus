import { Title } from '@spartacus/core';
import { sortTitles } from './title-utils';

describe('TitleUtils', () => {
  describe('when unsorted titles are provided', () => {
    it('they should be sorted in the specific order', () => {
      const mockTitles: Title[] = [
        {
          code: 'dr',
          name: 'Dr.',
        },
        {
          code: 'mrs',
          name: 'Mrs.',
        },
        {
          code: 'rev',
          name: 'Rev.',
        },
        {
          code: 'mr',
          name: 'Mr.',
        },
      ];
      const expectedTitles: Title[] = [
        {
          code: 'mr',
          name: 'Mr.',
        },
        {
          code: 'mrs',
          name: 'Mrs.',
        },
        {
          code: 'dr',
          name: 'Dr.',
        },
        {
          code: 'rev',
          name: 'Rev.',
        },
      ];

      const sortedTitles = mockTitles.sort(sortTitles);

      expect(sortedTitles).toEqual(expectedTitles);
    });
  });

  describe('when unknown titles are added', () => {
    it('they should be put at the end', () => {
      const mockTitles: Title[] = [
        {
          code: 'dr',
          name: 'Dr.',
        },
        {
          code: 'mrs',
          name: 'Mrs.',
        },
        {
          code: 'rev',
          name: 'Rev.',
        },
        {
          code: 'unknown',
          name: 'Unknown',
        },
        {
          code: 'mr',
          name: 'Mr.',
        },
      ];
      const expectedTitles: Title[] = [
        {
          code: 'mr',
          name: 'Mr.',
        },
        {
          code: 'mrs',
          name: 'Mrs.',
        },
        {
          code: 'dr',
          name: 'Dr.',
        },
        {
          code: 'rev',
          name: 'Rev.',
        },
        {
          code: 'unknown',
          name: 'Unknown',
        },
      ];

      const sortedTitles = mockTitles.sort(sortTitles);

      expect(sortedTitles).toEqual(expectedTitles);
    });
  });
});
