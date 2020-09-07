import { TestBed } from '@angular/core/testing';
import { PaginationConfig } from './config/pagination.config';
import { PaginationBuilder } from './pagination.builder';
import {
  PaginationItem,
  PaginationItemType,
  PaginationNavigationPosition,
  PaginationOptions,
} from './pagination.model';

const PAGE_INDEX_THREE = 3;
const PAGE_INDEX_FOUR = 4;
const PAGE_INDEX_FIVE = 5;
const PAGE_INDEX_SIX = 6;
const PAGE_INDEX_SEVEN = 7;

const EXPECTED_PAGE_LENGTH_FOUR = 4;
const EXPECTED_PAGE_LENGTH_FIVE = 5;
const EXPECTED_PAGE_LENGTH_SIX = 6;
const EXPECTED_PAGE_LENGTH_SEVEN = 7;
const EXPECTED_PAGE_LENGTH_NINE = 9;
const EXPECTED_PAGE_LENGTH_ELEVEN = 11;

const PAGE_COUNT_TEN = 10;
const PAGE_COUNT_FIFTY = 50;
const PAGE_COUNT_HUNDRED = 100;

const DEFAULT_CONFIG: PaginationOptions = {
  rangeCount: 3,
  addStart: true,
  addEnd: true,

  addDots: false,
  substituteDotsForSingularPage: false,
  addPrevious: false,
  addNext: false,
  addFirst: false,
  addLast: false,
  dotsLabel: '...',
  startLabel: '«',
  previousLabel: '‹',
  nextLabel: '›',
  endLabel: '»',
  navigationPosition: PaginationNavigationPosition.ASIDE,
};

const FULL_CONFIG: PaginationOptions = {
  rangeCount: 3,
  addDots: true,
  substituteDotsForSingularPage: true,
  addStart: true,
  addEnd: true,
  addPrevious: true,
  addNext: true,
  addFirst: true,
  addLast: true,
};

describe('PaginationBuilder', () => {
  const setup = (options?: PaginationOptions): PaginationBuilder => {
    const config = options
      ? {
          pagination: Object.assign({}, DEFAULT_CONFIG, options),
        }
      : {};
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PaginationConfig,
          useValue: config,
        },
      ],
    });
    return TestBed.inject(PaginationBuilder);
  };

  describe('Default config', () => {
    let service: PaginationBuilder;
    beforeEach(() => {
      service = setup({});
    });

    it('should inject service', () => {
      expect(service).toBeTruthy();
    });

    describe('(no pages)', () => {
      let pages: PaginationItem[];
      beforeEach(() => {
        pages = service.paginate(0, 0);
      });

      it('should have 0 items', () => {
        expect(pages.length).toEqual(0);
      });
    });

    describe('item length', () => {
      describe('current = 0', () => {
        it('should return 0 items when pageCount = 0', () => {
          expect(service.paginate(0, 0).length).toEqual(0);
        });

        it('should return 0 items when pageCount = 1', () => {
          expect(service.paginate(1, 0).length).toEqual(0);
        });

        it('should return 4 items when pageCount = 2', () => {
          const PAGE_COUNT = 2;
          expect(service.paginate(PAGE_COUNT, 0).length).toEqual(
            EXPECTED_PAGE_LENGTH_FOUR
          );
        });

        it('should return 5 items when pageCount = 3', () => {
          const PAGE_COUNT = 3;
          expect(service.paginate(PAGE_COUNT, 0).length).toEqual(
            EXPECTED_PAGE_LENGTH_FIVE
          );
        });

        it('should return 5 items when pageCount = 4', () => {
          const PAGE_COUNT = 4;
          expect(service.paginate(PAGE_COUNT, 0).length).toEqual(
            EXPECTED_PAGE_LENGTH_FIVE
          );
        });

        it('should return 5 items when pageCount = 5', () => {
          const PAGE_COUNT = 5;
          expect(service.paginate(PAGE_COUNT, 0).length).toEqual(
            EXPECTED_PAGE_LENGTH_FIVE
          );
        });

        it('should return max 5 items when pageCount > 5', () => {
          expect(service.paginate(PAGE_COUNT_HUNDRED, 0).length).toEqual(
            EXPECTED_PAGE_LENGTH_FIVE
          );
        });
      });
    });
  });

  describe('Fullblown config', () => {
    let service: PaginationBuilder;
    beforeEach(() => {
      service = setup(FULL_CONFIG);
    });

    describe('item length', () => {
      describe('pageCount = 100', () => {
        it('should return max 9 items when pageCount = 100 and current = 0', () => {
          expect(service.paginate(PAGE_COUNT_HUNDRED, 0).length).toEqual(
            EXPECTED_PAGE_LENGTH_NINE
          );
        });

        it('should return max 10 items when pageCount = 100 and current = 2', () => {
          const EXPECTED_LENGTH = 10;
          const CURRENT_PAGE = 2;
          expect(
            service.paginate(PAGE_COUNT_HUNDRED, CURRENT_PAGE).length
          ).toEqual(EXPECTED_LENGTH);
        });

        it('should return max 11 items when pageCount = 100 and current = 3', () => {
          const CURRENT_PAGE = 3;
          expect(
            service.paginate(PAGE_COUNT_HUNDRED, CURRENT_PAGE).length
          ).toEqual(EXPECTED_PAGE_LENGTH_ELEVEN);
        });

        it('should return max 11 items when pageCount = 100 and current = 4', () => {
          const PAGE_COUNT = 4;
          expect(
            service.paginate(PAGE_COUNT_HUNDRED, PAGE_COUNT).length
          ).toEqual(EXPECTED_PAGE_LENGTH_ELEVEN);
        });

        it('should return max 11 items when pageCount = 100 and current > 4', () => {
          expect(
            service.paginate(PAGE_COUNT_HUNDRED, PAGE_COUNT_FIFTY).length
          ).toEqual(EXPECTED_PAGE_LENGTH_ELEVEN);
        });
      });
    });

    describe('(1st page)', () => {
      let pages: PaginationItem[];
      beforeEach(() => {
        pages = service.paginate(PAGE_COUNT_TEN, 0);
      });

      it('should have 9 items', () => {
        expect(pages.length).toEqual(EXPECTED_PAGE_LENGTH_NINE);
      });

      it('should return start for 1st item', () => {
        const page = pages[0];
        expect(page.type).toEqual(PaginationItemType.START);
        expect(page.label).toEqual('«');
        expect(page.hasOwnProperty('number')).toBeFalsy();
      });

      it('should return previous for 2nd item', () => {
        const page = pages[1];
        expect(page.type).toEqual(PaginationItemType.PREVIOUS);
        expect(page.label).toEqual('‹');
        expect(page.hasOwnProperty('number')).toBeFalsy();
      });

      it('should return 1st page for 3rd page item', () => {
        const PAGE_INDEX = 2;
        const page = pages[PAGE_INDEX];
        expect(page.type).toEqual(PaginationItemType.PAGE);
        expect(page.number).toEqual(0);
        expect(page.label).toEqual('1');
      });

      it('should return 2nd page for 4th item', () => {
        const page = pages[PAGE_INDEX_THREE];
        expect(page.type).toEqual(PaginationItemType.PAGE);
        expect(page.number).toEqual(1);
        expect(page.label).toEqual('2');
      });

      it('should return 3rd page for 5th item', () => {
        const EXPECTED_LENGTH = 2;
        const page = pages[PAGE_INDEX_FOUR];
        expect(page.type).toEqual(PaginationItemType.PAGE);
        expect(page.number).toEqual(EXPECTED_LENGTH);
        expect(page.label).toEqual('3');
      });

      it('should return dots for 6th item', () => {
        const page = pages[PAGE_INDEX_FIVE];
        expect(page.type).toEqual(PaginationItemType.GAP);
        expect(page.label).toEqual('...');
        expect(page.hasOwnProperty('number')).toBeFalsy();
      });

      it('should return last page for 7th item', () => {
        const page = pages[PAGE_INDEX_SIX];
        expect(page.type).toEqual(PaginationItemType.LAST);
        expect(page.number).toEqual(EXPECTED_PAGE_LENGTH_NINE);
        expect(page.label).toEqual('10');
      });

      it('should return next for 8th item', () => {
        const page = pages[PAGE_INDEX_SEVEN];
        expect(page.type).toEqual(PaginationItemType.NEXT);
        expect(page.number).toEqual(1);
        expect(page.label).toEqual('›');
      });

      it('should return last for 9th item', () => {
        const PAGE_INDEX = 8;
        const page = pages[PAGE_INDEX];
        expect(page.type).toEqual(PaginationItemType.END);
        expect(page.number).toEqual(EXPECTED_PAGE_LENGTH_NINE);
        expect(page.label).toEqual('»');
      });
    });

    describe('(2nd page)', () => {
      let pages: PaginationItem[];
      beforeEach(() => {
        pages = service.paginate(PAGE_COUNT_TEN, 1);
      });

      it('should have 9 items', () => {
        expect(pages.length).toEqual(EXPECTED_PAGE_LENGTH_NINE);
      });

      it('should return start for 1st item', () => {
        const page = pages[0];
        expect(page.type).toEqual(PaginationItemType.START);
        expect(page.label).toEqual('«');
        expect(page.number).toEqual(0);
      });

      it('should return previous for 2nd item', () => {
        const page = pages[1];
        expect(page.type).toEqual(PaginationItemType.PREVIOUS);
        expect(page.label).toEqual('‹');
        expect(page.number).toEqual(0);
      });

      it('should return 1st page for 3rd page item', () => {
        const PAGE_INDEX = 2;
        const page = pages[PAGE_INDEX];
        expect(page.type).toEqual(PaginationItemType.PAGE);
        expect(page.number).toEqual(0);
        expect(page.label).toEqual('1');
      });

      it('should return 2nd page for 4th item', () => {
        const page = pages[PAGE_INDEX_THREE];
        expect(page.type).toEqual(PaginationItemType.PAGE);
        expect(page.number).toEqual(1);
        expect(page.label).toEqual('2');
      });

      it('should return next for 8th item', () => {
        const EXPECTED_LENGTH = 2;
        const page = pages[PAGE_INDEX_SEVEN];
        expect(page.type).toEqual(PaginationItemType.NEXT);
        expect(page.number).toEqual(EXPECTED_LENGTH);
        expect(page.label).toEqual('›');
      });
    });

    describe('(4th page)', () => {
      let pages: PaginationItem[];
      beforeEach(() => {
        const CURRENT_PAGE = 3;
        pages = service.paginate(PAGE_COUNT_TEN, CURRENT_PAGE);
      });

      it('should return 2nd page for 4th page item', () => {
        const page = pages[PAGE_INDEX_THREE];
        expect(page.type).toEqual(PaginationItemType.PAGE);
        expect(page.number).toEqual(1);
        expect(page.label).toEqual('2');
      });
    });

    describe('(5th page)', () => {
      let pages: PaginationItem[];
      beforeEach(() => {
        const CURRENT_PAGE = 4;
        pages = service.paginate(PAGE_COUNT_TEN, CURRENT_PAGE);
      });

      it('should return dots for 4th page item', () => {
        const page = pages[PAGE_INDEX_THREE];
        expect(page.type).toEqual(PaginationItemType.GAP);
        expect(page.hasOwnProperty('number')).toBeFalsy();
        expect(page.label).toEqual('...');
      });

      it('should return dots for 8th page item', () => {
        const page = pages[PAGE_INDEX_SEVEN];
        expect(page.type).toEqual(PaginationItemType.GAP);
        expect(page.hasOwnProperty('number')).toBeFalsy();
        expect(page.label).toEqual('...');
      });
    });
  });

  describe('config with custom labels', () => {
    let pages: PaginationItem[];
    beforeEach(() => {
      const service = setup(
        Object.assign(FULL_CONFIG, {
          dotsLabel: 'd',
          startLabel: 's',
          endLabel: 'e',
          previousLabel: 'p',
          nextLabel: 'n',
        })
      );
      pages = service.paginate(PAGE_COUNT_HUNDRED, PAGE_COUNT_FIFTY);
    });
    it('should return start label with "s"', () => {
      expect(pages[0].label).toEqual('s');
    });
    it('should return previous label with "p"', () => {
      expect(pages[1].label).toEqual('p');
    });
    it('should return dots label with "d"', () => {
      expect(pages[PAGE_INDEX_THREE].label).toEqual('d');
      expect(pages[PAGE_INDEX_SEVEN].label).toEqual('d');
    });
    it('should return next label with "n"', () => {
      const PAGE_INDEX = 9;
      expect(pages[PAGE_INDEX].label).toEqual('n');
    });
    it('should return end label with "e"', () => {
      const PAGE_INDEX = 10;
      expect(pages[PAGE_INDEX].label).toEqual('e');
    });
  });

  describe('Config with rangeCount=1', () => {
    let pages: PaginationItem[];
    beforeEach(() => {
      const service = setup({
        rangeCount: 1,
        addDots: true,
        addFirst: true,
        addLast: true,
        substituteDotsForSingularPage: true,
      });
      const PAGE_COUNT = 3;
      pages = service.paginate(PAGE_COUNT, 0);
    });
    it('should substiture gap', () => {
      const all = pages.find((page) => page.type === PaginationItemType.GAP);
      expect(all).toBeFalsy();
    });
  });

  describe('Config with rangeCount=5', () => {
    let pages: PaginationItem[];
    beforeEach(() => {
      const service = setup({ rangeCount: 5 });
      pages = service.paginate(PAGE_COUNT_HUNDRED, PAGE_COUNT_FIFTY);
    });
    it('should have 5 pages', () => {
      const all = pages.filter((page) => page.type === PaginationItemType.PAGE);
      expect(all.length).toEqual(EXPECTED_PAGE_LENGTH_FIVE);
    });
  });

  describe('config without start and end links', () => {
    let pages: PaginationItem[];
    beforeEach(() => {
      const service = setup({ addStart: false, addEnd: false });
      pages = service.paginate(PAGE_COUNT_HUNDRED, PAGE_COUNT_FIFTY);
    });
    it('should return max 3 items', () => {
      const EXPECTED_LENGTH = 3;
      expect(pages.length).toEqual(EXPECTED_LENGTH);
    });
    it('should not have a start link', () => {
      const link = pages.find((page) => page.type === PaginationItemType.START);
      expect(link).toBeFalsy();
    });
    it('should not have an end link', () => {
      const link = pages.find((page) => page.type === PaginationItemType.END);
      expect(link).toBeFalsy();
    });
  });

  describe('config with previous and next links added', () => {
    let pages: PaginationItem[] = null;
    beforeEach(() => {
      const service = setup({
        addPrevious: true,
        addNext: true,
      });
      pages = service.paginate(PAGE_COUNT_HUNDRED, PAGE_COUNT_FIFTY);
    });
    it('should return max 7 items', () => {
      expect(pages.length).toEqual(EXPECTED_PAGE_LENGTH_SEVEN);
    });
    it('should have a previous page link', () => {
      const link = pages.find(
        (page) => page.type === PaginationItemType.PREVIOUS
      );
      expect(link).toBeTruthy();
    });
    it('should have a next page link', () => {
      const link = pages.find((page) => page.type === PaginationItemType.NEXT);
      expect(link).toBeTruthy();
    });
  });

  describe('config with first and last links added', () => {
    let pages: PaginationItem[];
    beforeEach(() => {
      const service = setup({ addFirst: true, addLast: true });
      pages = service.paginate(PAGE_COUNT_HUNDRED, PAGE_COUNT_FIFTY);
    });
    it('should return max 7 items', () => {
      expect(pages.length).toEqual(EXPECTED_PAGE_LENGTH_SEVEN);
    });
    it('should not have a first page link', () => {
      const link = pages.find((page) => page.type === PaginationItemType.FIRST);
      expect(link).toBeTruthy();
    });
    it('should not have a last page link', () => {
      const link = pages.find((page) => page.type === PaginationItemType.LAST);
      expect(link).toBeTruthy();
    });
  });

  describe('config with dots added', () => {
    describe('one gap at the start', () => {
      const CUR_PAGE = 2;
      let pages: PaginationItem[];
      beforeEach(() => {
        const service = setup({ addDots: true });
        const PAGE_COUNT = 4;
        pages = service.paginate(PAGE_COUNT, CUR_PAGE);
      });
      it('should return max 6 items', () => {
        expect(pages.length).toEqual(EXPECTED_PAGE_LENGTH_SIX);
      });
      it('should have gap a 2nd item', () => {
        expect(pages[1].type).toEqual(PaginationItemType.GAP);
      });
    });

    describe('one gap at the end', () => {
      let pages: PaginationItem[];
      beforeEach(() => {
        const service = setup({ addDots: true });
        const PAGE_COUNT = 4;
        pages = service.paginate(PAGE_COUNT, 0);
      });
      it('should return max 6 items', () => {
        expect(pages.length).toEqual(EXPECTED_PAGE_LENGTH_SIX);
      });
      it('should have gap a 5th item', () => {
        expect(pages[PAGE_INDEX_FOUR].type).toEqual(PaginationItemType.GAP);
      });
    });

    describe('gaps at both sides', () => {
      let pages: PaginationItem[];
      const EXPECTED_LENGTH = 2;
      beforeEach(() => {
        const service = setup({ addDots: true });
        pages = service.paginate(PAGE_COUNT_HUNDRED, PAGE_COUNT_FIFTY);
      });
      it('should return max 7 items', () => {
        expect(pages.length).toEqual(EXPECTED_PAGE_LENGTH_SEVEN);
      });
      it('should have 2 gaps', () => {
        const link = pages.filter(
          (page) => page.type === PaginationItemType.GAP
        );
        expect(link.length).toEqual(EXPECTED_LENGTH);
      });
    });

    describe('no gaps for small number of pages', () => {
      let pages: PaginationItem[];
      beforeEach(() => {
        const service = setup({ addDots: true });
        const PAGE_COUNT = 3;
        pages = service.paginate(PAGE_COUNT, 0);
      });
      it('should return max 5 items', () => {
        expect(pages.length).toEqual(EXPECTED_PAGE_LENGTH_FIVE);
      });
      it('should not have gaps', () => {
        const link = pages.find((page) => page.type === PaginationItemType.GAP);
        expect(link).toBeFalsy();
      });
    });

    describe('should substitute first dots for singular page', () => {
      let pages: PaginationItem[];
      const CUR_PAGE = 2;
      beforeEach(() => {
        const service = setup({
          addDots: true,
          substituteDotsForSingularPage: true,
        });
        pages = service.paginate(PAGE_COUNT_HUNDRED, CUR_PAGE);
      });

      it('should return max 7 items', () => {
        expect(pages.length).toEqual(EXPECTED_PAGE_LENGTH_SEVEN);
      });

      it('should have page 1 instead of gap', () => {
        expect(pages[1].type).toEqual(PaginationItemType.PAGE);
      });

      it('should have gap a 6th item', () => {
        expect(pages[PAGE_INDEX_FIVE].type).toEqual(PaginationItemType.GAP);
      });
    });

    describe('should substitute last dots for singular page', () => {
      let pages: PaginationItem[];
      const PAGE_COUNT = 18;
      const CURRENT_PAGE = 15;
      beforeEach(() => {
        const service = setup({
          addDots: true,
          substituteDotsForSingularPage: true,
        });
        pages = service.paginate(PAGE_COUNT, CURRENT_PAGE);
      });

      it('should return max 7 items', () => {
        expect(pages.length).toEqual(EXPECTED_PAGE_LENGTH_SEVEN);
      });

      it('should have gap a 1th item', () => {
        expect(pages[1].type).toEqual(PaginationItemType.GAP);
      });

      it('should have last page instead of gap', () => {
        expect(pages[PAGE_INDEX_FIVE].type).toEqual(PaginationItemType.PAGE);
      });
    });
  });

  describe('config with custom navigation position', () => {
    describe('navigation at the start', () => {
      let pages: PaginationItem[];
      beforeEach(() => {
        const service = setup({
          navigationPosition: PaginationNavigationPosition.BEFORE,
          addStart: true,
          addPrevious: true,
          addNext: true,
          addEnd: true,
        });
        pages = service.paginate(PAGE_COUNT_HUNDRED, PAGE_COUNT_FIFTY);
      });
      it('should have start link at position 0', () => {
        expect(pages[0].type).toEqual(PaginationItemType.START);
      });
      it('should have previous link at position 1', () => {
        expect(pages[1].type).toEqual(PaginationItemType.PREVIOUS);
      });
      it('should have next link at position 2', () => {
        const PAGE_INDEX = 2;
        expect(pages[PAGE_INDEX].type).toEqual(PaginationItemType.NEXT);
      });
      it('should have previous link at position 3', () => {
        expect(pages[PAGE_INDEX_THREE].type).toEqual(PaginationItemType.END);
      });
    });

    describe('navigation at the end', () => {
      let pages: PaginationItem[];
      beforeEach(() => {
        const service = setup({
          navigationPosition: PaginationNavigationPosition.AFTER,
          addStart: true,
          addPrevious: true,
          addNext: true,
          addEnd: true,
        });
        pages = service.paginate(PAGE_COUNT_HUNDRED, PAGE_COUNT_FIFTY);
      });
      it('should have start link at position 7', () => {
        expect(pages[PAGE_INDEX_THREE].type).toEqual(PaginationItemType.START);
      });
      it('should have previous link at position 8', () => {
        expect(pages[PAGE_INDEX_FOUR].type).toEqual(
          PaginationItemType.PREVIOUS
        );
      });
      it('should have next link at position 9', () => {
        expect(pages[PAGE_INDEX_FIVE].type).toEqual(PaginationItemType.NEXT);
      });
      it('should have previous link at position 10', () => {
        expect(pages[PAGE_INDEX_SIX].type).toEqual(PaginationItemType.END);
      });
    });
  });
});
