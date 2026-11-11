import { TestBed } from '@angular/core/testing';
import {
  CmsService,
  CustomSection,
  FeatureToggles,
  Page,
  PageTemplateService,
} from '@spartacus/core';
import { PAGE_LAYOUT_HANDLER } from '@spartacus/storefront';
import {
  EMPTY,
  firstValueFrom,
  Observable,
  of,
  ReplaySubject,
  Subject,
  throwError,
} from 'rxjs';
import { BreakpointService } from '../../../layout/breakpoint/breakpoint.service';
import { BREAKPOINT, LayoutConfig } from '../../../layout/config/layout-config';
import { PageLayoutService } from './page-layout.service';

const PAGE_TITLE = 'The page title will be returned if `showTitle` enabled';

const DEFAULT_SLOT_CONFIG = ['slot1', 'slot2'];
const SLOT_CONFIG_FOR_MD = ['slot2', 'slot11'];

const DEFAULT_FOOTER_SLOT_CONFIG = ['footer'];
const FOOTER_SLOT_CONFIG_FOR_MD = ['footer-md'];
const FOOTER_SLOT_CONFIG_FOR_PAGE2 = ['footer-page2'];

const PAGE_DATA_SLOTS = {
  slot1: {},
  slot2: {},
  slot11: {},
  footer: {},
  'footer-md': {},
  'footer-page2': {},
};

const MockLayoutConfig: LayoutConfig = {
  layoutSlots: {
    footer: {
      slots: DEFAULT_FOOTER_SLOT_CONFIG,
    },
    page_template_1: {
      slots: DEFAULT_SLOT_CONFIG,
      md: {
        slots: SLOT_CONFIG_FOR_MD,
      },
      footer: {
        md: {
          slots: FOOTER_SLOT_CONFIG_FOR_MD,
        },
      },
    },
    page_template_2: {
      footer: {
        slots: FOOTER_SLOT_CONFIG_FOR_PAGE2,
      },
    },
    page_template_3: {
      slots: ['slot1', 'slot123'],
    },
    // shell template used by custom pages
    shell_template: {
      slots: ['slot1', 'slot2'],
      header: {
        slots: ['HeaderSlot'],
      },
      footer: {
        slots: ['FooterSlot'],
      },
    },
    // page fold specific pages
    template_with_global_page_fold: {
      pageFold: 'slot1',
      slots: ['slot1', 'slot2'],
    },
    template_with_2_specific_page_folds: {
      xs: {
        pageFold: 'slot-xs',
      },
      md: {
        pageFold: 'slot-md',
      },
      slots: ['slot-xs', 'slot-md'],
    },
    template_without_page_fold: {
      slots: ['slot-xs', 'slot-md'],
    },
  },
};

class MockBreakpointService {
  get breakpoint$(): Observable<BREAKPOINT> {
    return EMPTY;
  }
  get breakpoints(): BREAKPOINT[] {
    return [
      BREAKPOINT.xs,
      BREAKPOINT.sm,
      BREAKPOINT.md,
      BREAKPOINT.lg,
      BREAKPOINT.xl,
    ];
  }
}

const page_1 = {
  uid: 'page_1',
  template: 'page_template_1',
  title: PAGE_TITLE,
  slots: PAGE_DATA_SLOTS,
};
const page_2 = {
  uid: 'page_2',
  template: 'page_template_2',
  title: PAGE_TITLE,
  slots: PAGE_DATA_SLOTS,
};
const page_3 = {
  uid: 'page_3',
  template: 'page_template_3',
  title: PAGE_TITLE,
  slots: {
    slot1: {},
  },
};

const page_custom = {
  uid: 'page_custom',
  template: 'custom_page_template',
  templateOrigin: 'CUSTOM' as const,
  templateId: 'customTplId',
  title: PAGE_TITLE,
  slots: {
    slot1: {},
    slot2: {},
    HeaderSlot: {},
    FooterSlot: {},
  },
};

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return EMPTY;
  }
}

class MockPageTemplateService {
  getPageTemplateSections(_templateId: string): Observable<CustomSection[]> {
    return of([]);
  }

  getShellTemplate(_templateId: string): Observable<string> {
    return of('');
  }
}

class SimplePageLayoutHandler {
  handle(slots$) {
    return slots$;
  }
}

class OtherPageLayoutHandler {
  handle(slots$) {
    return slots$;
  }
}

describe('PageLayoutService', () => {
  let pageLayoutService: PageLayoutService;
  let cmsService: CmsService;
  let breakpointService: BreakpointService;
  let currentPage$: ReplaySubject<Page>;
  let featureToggles: FeatureToggles;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PageLayoutService,
        { provide: CmsService, useClass: MockCmsService },
        { provide: BreakpointService, useClass: MockBreakpointService },
        { provide: LayoutConfig, useValue: MockLayoutConfig },
        { provide: PageTemplateService, useClass: MockPageTemplateService },
        {
          provide: FeatureToggles,
          useValue: { enableCustomPageTemplate: false },
        },
        {
          provide: PAGE_LAYOUT_HANDLER,
          useClass: SimplePageLayoutHandler,
          multi: true,
        },
        {
          provide: PAGE_LAYOUT_HANDLER,
          useClass: OtherPageLayoutHandler,
          multi: true,
        },
      ],
    });

    currentPage$ = new ReplaySubject<Page>(1);
    cmsService = TestBed.inject(CmsService);
    vi.spyOn(cmsService, 'getCurrentPage').mockReturnValue(currentPage$);
    pageLayoutService = TestBed.inject(PageLayoutService);
    breakpointService = TestBed.inject(BreakpointService);
    featureToggles = TestBed.inject(FeatureToggles);
  });

  afterEach(() => {
    currentPage$.complete();
  });

  it('should inject service', () => {
    expect(pageLayoutService).toBeTruthy();
  });

  it('should have 2 page handlers', () => {
    expect(pageLayoutService['handlers'].length).toBe(2);
  });

  describe('Page template 1', () => {
    beforeEach(() => {
      vi.spyOn(cmsService, 'getCurrentPage').mockReturnValue(of(page_1));
    });

    describe('mobile (xs)', () => {
      beforeEach(() => {
        vi.spyOn(breakpointService, 'breakpoint$', 'get').mockReturnValue(
          of(BREAKPOINT.xs)
        );
      });

      it('should render default slots', () => {
        let results;
        pageLayoutService
          .getSlots()
          .subscribe((slots) => (results = slots))
          .unsubscribe();
        expect(results).toEqual(DEFAULT_SLOT_CONFIG);
      });

      it('should render global footer slots', () => {
        let results;
        pageLayoutService
          .getSlots('footer')
          .subscribe((slots) => (results = slots))
          .unsubscribe();
        expect(results).toEqual(DEFAULT_FOOTER_SLOT_CONFIG);
      });

      it('should use Page Layout Handlers', () => {
        const pageLayoutHandler = TestBed.inject(PAGE_LAYOUT_HANDLER)[0];
        vi.spyOn(pageLayoutHandler, 'handle');
        pageLayoutService.getSlots('footer').subscribe();
        expect(pageLayoutHandler.handle).toHaveBeenCalled();
      });
    });

    describe('tablet (md)', () => {
      beforeEach(() => {
        vi.spyOn(breakpointService, 'breakpoint$', 'get').mockReturnValue(
          of(BREAKPOINT.md)
        );
      });

      it('should render specific slots', () => {
        let results;
        pageLayoutService
          .getSlots()
          .subscribe((slots) => (results = slots))
          .unsubscribe();

        expect(results).toEqual(SLOT_CONFIG_FOR_MD);
      });

      it('should render alternative slots for footer', () => {
        let results;
        pageLayoutService
          .getSlots('footer')
          .subscribe((slots) => (results = slots))
          .unsubscribe();
        expect(results).toEqual(FOOTER_SLOT_CONFIG_FOR_MD);
      });
    });

    describe('desktop (lg)', () => {
      beforeEach(() => {
        vi.spyOn(breakpointService, 'breakpoint$', 'get').mockReturnValue(
          of(BREAKPOINT.lg)
        );
      });

      it('should also render specific slots', () => {
        let results;
        pageLayoutService
          .getSlots()
          .subscribe((slots) => (results = slots))
          .unsubscribe();

        expect(results).toEqual(SLOT_CONFIG_FOR_MD);
      });

      it('should render alternative footer section', () => {
        let results;
        pageLayoutService
          .getSlots('footer')
          .subscribe((slots) => (results = slots))
          .unsubscribe();
        expect(results).toEqual(FOOTER_SLOT_CONFIG_FOR_MD);
      });
    });
  });

  describe('Page template 2', () => {
    beforeEach(() => {
      vi.spyOn(cmsService, 'getCurrentPage').mockReturnValue(of(page_2));
    });

    describe('mobile (xs)', () => {
      beforeEach(() => {
        vi.spyOn(breakpointService, 'breakpoint$', 'get').mockReturnValue(
          of(BREAKPOINT.xs)
        );
      });
      it('should render global footer slots', () => {
        let results;
        pageLayoutService
          .getSlots('footer')
          .subscribe((slots) => (results = slots))
          .unsubscribe();
        expect(results).toEqual(FOOTER_SLOT_CONFIG_FOR_PAGE2);
      });
    });

    describe('mobile (md)', () => {
      beforeEach(() => {
        vi.spyOn(breakpointService, 'breakpoint$', 'get').mockReturnValue(
          of(BREAKPOINT.md)
        );
      });

      it('should render global footer slots', () => {
        let results;
        pageLayoutService
          .getSlots('footer')
          .subscribe((slots) => (results = slots))
          .unsubscribe();
        expect(results).toEqual(FOOTER_SLOT_CONFIG_FOR_PAGE2);
      });
    });

    describe('desktop (lg)', () => {
      beforeEach(() => {
        vi.spyOn(breakpointService, 'breakpoint$', 'get').mockReturnValue(
          of(BREAKPOINT.lg)
        );
      });
      it('should render specific footer slots', () => {
        let results;
        pageLayoutService
          .getSlots('footer')
          .subscribe((slots) => (results = slots))
          .unsubscribe();
        expect(results).toEqual(FOOTER_SLOT_CONFIG_FOR_PAGE2);
      });
    });
  });

  describe('Page template 3', () => {
    beforeEach(() => {
      vi.spyOn(cmsService, 'getCurrentPage').mockReturnValue(of(page_3));
      vi.spyOn(breakpointService, 'breakpoint$', 'get').mockReturnValue(
        of(BREAKPOINT.lg)
      );
    });

    it('should render only slots presents both in page data and layout configuration', () => {
      let results;
      pageLayoutService
        .getSlots()
        .subscribe((slots) => (results = slots))
        .unsubscribe();
      expect(results).toEqual(['slot1']);
    });
  });

  describe('isCustomTemplate$', () => {
    it('should emit false for a standard page', () => {
      vi.spyOn(cmsService, 'getCurrentPage').mockReturnValue(of(page_1));
      let result: boolean | undefined;
      pageLayoutService.isCustomTemplate$
        .subscribe((v) => (result = v))
        .unsubscribe();
      expect(result).toBe(false);
    });

    it('should emit true for a custom page', () => {
      currentPage$.next(page_custom);
      let result: boolean | undefined;
      pageLayoutService.isCustomTemplate$
        .subscribe((v) => (result = v))
        .unsubscribe();
      expect(result).toBe(true);
    });
  });

  describe('templateName$', () => {
    it('should emit the template name of the current page', () => {
      vi.spyOn(cmsService, 'getCurrentPage').mockReturnValue(of(page_1));
      let result: string | undefined;
      pageLayoutService.templateName$
        .subscribe((v) => (result = v))
        .unsubscribe();
      expect(result).toBe('page_template_1');
    });
  });

  describe('Custom template — shell section override', () => {
    let pageTemplateService: PageTemplateService;

    beforeEach(() => {
      pageTemplateService = TestBed.inject(PageTemplateService);
      featureToggles.enableCustomPageTemplate = true;
      currentPage$.next(page_custom);
      vi.spyOn(breakpointService, 'breakpoint$', 'get').mockReturnValue(
        of(BREAKPOINT.xs)
      );
      vi.spyOn(pageTemplateService, 'getShellTemplate').mockReturnValue(
        of('shell_template')
      );
    });

    it('should use shell template slots for header section', () => {
      let results: string[] | undefined;
      pageLayoutService
        .getSlots('header')
        .subscribe((slots) => (results = slots))
        .unsubscribe();
      expect(results).toEqual(['HeaderSlot']);
    });

    it('should use shell template slots for footer section', () => {
      let results: string[] | undefined;
      pageLayoutService
        .getSlots('footer')
        .subscribe((slots) => (results = slots))
        .unsubscribe();
      expect(results).toEqual(['FooterSlot']);
    });

    it('should return empty array for non-shell sections on custom page', () => {
      let results: string[] | undefined;
      pageLayoutService
        .getSlots('main')
        .subscribe((slots) => (results = slots))
        .unsubscribe();
      expect(results).toEqual([]);
    });

    it('should share the shell lookup between header and footer', () => {
      const headerSlots: string[][] = [];
      const footerSlots: string[][] = [];
      const headerSubscription = pageLayoutService
        .getSlots('header')
        .subscribe((slots) => headerSlots.push(slots));
      const footerSubscription = pageLayoutService
        .getSlots('footer')
        .subscribe((slots) => footerSlots.push(slots));

      expect(headerSlots).toEqual([['HeaderSlot']]);
      expect(footerSlots).toEqual([['FooterSlot']]);
      expect(
        pageTemplateService.getShellTemplate
      ).toHaveBeenCalledExactlyOnceWith('customTplId');

      headerSubscription.unsubscribe();
      footerSubscription.unsubscribe();
    });

    it('should keep configured slots and skip shell lookup when the feature is disabled', async () => {
      featureToggles.enableCustomPageTemplate = false;
      currentPage$.next({
        ...page_1,
        templateOrigin: 'CUSTOM',
        templateId: 'customTplId',
      });

      const result = await firstValueFrom(pageLayoutService.getSlots('footer'));

      expect(result).toEqual(DEFAULT_FOOTER_SLOT_CONFIG);
      expect(pageTemplateService.getShellTemplate).not.toHaveBeenCalled();
    });

    it('should skip shell lookup for a built-in page even when it has a template ID', async () => {
      currentPage$.next({
        ...page_1,
        templateOrigin: 'BUILT_IN',
        templateId: 'builtInTplId',
      });

      const result = await firstValueFrom(pageLayoutService.getSlots('footer'));

      expect(result).toEqual(DEFAULT_FOOTER_SLOT_CONFIG);
      expect(pageTemplateService.getShellTemplate).not.toHaveBeenCalled();
    });

    it('should skip shell lookup when the custom page has no template ID', async () => {
      currentPage$.next({ ...page_custom, templateId: undefined });

      const result = await firstValueFrom(pageLayoutService.getSlots('header'));

      expect(result).toEqual([]);
      expect(pageTemplateService.getShellTemplate).not.toHaveBeenCalled();
    });

    it('should continue rendering normal page slots after a shell request fails', () => {
      vi.mocked(pageTemplateService.getShellTemplate).mockReturnValueOnce(
        throwError(() => new Error('Failed to load shell template'))
      );
      const results: string[][] = [];
      const subscription = pageLayoutService
        .getSlots('footer')
        .subscribe((slots) => results.push(slots));

      currentPage$.next(page_1);

      expect(results).toEqual([[], DEFAULT_FOOTER_SLOT_CONFIG]);
      expect(subscription.closed).toBe(false);
      subscription.unsubscribe();
    });

    it('should render a subsequent custom page after a shell request fails', () => {
      vi.mocked(pageTemplateService.getShellTemplate).mockReturnValueOnce(
        throwError(() => new Error('Failed to load shell template'))
      );
      const results: string[][] = [];
      const subscription = pageLayoutService
        .getSlots('header')
        .subscribe((slots) => results.push(slots));

      currentPage$.next({ ...page_custom, templateId: 'nextCustomTplId' });

      expect(results).toEqual([[], ['HeaderSlot']]);
      expect(pageTemplateService.getShellTemplate).toHaveBeenLastCalledWith(
        'nextCustomTplId'
      );
      subscription.unsubscribe();
    });
  });

  describe('customSections$', () => {
    const sections: CustomSection[] = [{ name: 'main', sectionItems: [] }];
    let pageTemplateService: PageTemplateService;

    beforeEach(() => {
      featureToggles.enableCustomPageTemplate = true;
      pageTemplateService = TestBed.inject(PageTemplateService);
      vi.spyOn(pageTemplateService, 'getPageTemplateSections').mockReturnValue(
        of(sections)
      );
    });

    it('should load sections for a custom page when the feature is enabled', async () => {
      currentPage$.next(page_custom);

      const result = await firstValueFrom(pageLayoutService.customSections$);

      expect(result).toEqual(sections);
      expect(
        pageTemplateService.getPageTemplateSections
      ).toHaveBeenCalledExactlyOnceWith('customTplId');
    });

    it('should use normal layout without fetching sections when the feature is disabled', async () => {
      featureToggles.enableCustomPageTemplate = false;
      currentPage$.next(page_custom);

      const result = await firstValueFrom(pageLayoutService.customSections$);

      expect(result).toBeNull();
      expect(
        pageTemplateService.getPageTemplateSections
      ).not.toHaveBeenCalled();
    });

    it.each([
      { ...page_1, templateOrigin: 'BUILT_IN' as const, templateId: 'builtIn' },
      page_1,
      { ...page_custom, templateId: undefined },
      { ...page_custom, templateId: '' },
    ])(
      'should skip custom sections for an ineligible page ($template, $templateId)',
      async (page) => {
        currentPage$.next(page);

        const result = await firstValueFrom(pageLayoutService.customSections$);

        expect(result).toBeNull();
        expect(
          pageTemplateService.getPageTemplateSections
        ).not.toHaveBeenCalled();
      }
    );

    it('should fall back to normal layout and recover on the next custom page after a request fails', () => {
      vi.mocked(
        pageTemplateService.getPageTemplateSections
      ).mockReturnValueOnce(
        throwError(() => new Error('Failed to load custom sections'))
      );
      const results: (CustomSection[] | null)[] = [];
      const subscription = pageLayoutService.customSections$.subscribe(
        (value) => results.push(value)
      );

      currentPage$.next(page_custom);
      currentPage$.next({ ...page_custom, templateId: 'nextCustomTplId' });

      expect(results).toEqual([null, sections]);
      expect(subscription.closed).toBe(false);
      subscription.unsubscribe();
    });

    it('should switch to normal layout when navigating away from a custom page', () => {
      const results: (CustomSection[] | null)[] = [];
      const subscription = pageLayoutService.customSections$.subscribe(
        (value) => results.push(value)
      );

      currentPage$.next(page_custom);
      currentPage$.next(page_1);

      expect(results).toEqual([sections, null]);
      subscription.unsubscribe();
    });

    it('should ignore a previous template response after navigating to another custom page', () => {
      const firstResponse$ = new Subject<CustomSection[]>();
      const secondResponse$ = new Subject<CustomSection[]>();
      vi.mocked(pageTemplateService.getPageTemplateSections)
        .mockReturnValueOnce(firstResponse$)
        .mockReturnValueOnce(secondResponse$);
      const results: (CustomSection[] | null)[] = [];
      const subscription = pageLayoutService.customSections$.subscribe(
        (value) => results.push(value)
      );

      currentPage$.next(page_custom);
      currentPage$.next({ ...page_custom, templateId: 'nextCustomTplId' });
      firstResponse$.next([{ name: 'previous', sectionItems: [] }]);
      secondResponse$.next(sections);

      expect(results).toEqual([sections]);
      subscription.unsubscribe();
      firstResponse$.complete();
      secondResponse$.complete();
    });
  });

  describe('page fold', () => {
    describe('single page fold for all breakpoints', () => {
      Object.keys(BREAKPOINT).forEach((breakpoint) => {
        it('should return page-fold for large ' + breakpoint, () => {
          vi.spyOn(breakpointService, 'breakpoint$', 'get').mockReturnValue(
            of(breakpoint as BREAKPOINT)
          );
          let results;
          pageLayoutService
            .getPageFoldSlot('template_with_global_page_fold')
            .subscribe((pf) => (results = pf))
            .unsubscribe();
          expect(results).toEqual('slot1');
        });
      });
    });

    describe('specific page-fold for 2 breakpoints', () => {
      const pageTemplate = 'template_with_2_specific_page_folds';
      it('should return extra small page slot for XS', () => {
        vi.spyOn(breakpointService, 'breakpoint$', 'get').mockReturnValue(
          of(BREAKPOINT.xs)
        );
        let results;
        pageLayoutService
          .getPageFoldSlot(pageTemplate)
          .subscribe((pf) => (results = pf))
          .unsubscribe();
        expect(results).toEqual('slot-xs');
      });
      it('should also return extra small page slot for SM', () => {
        vi.spyOn(breakpointService, 'breakpoint$', 'get').mockReturnValue(
          of(BREAKPOINT.sm)
        );
        let results;
        pageLayoutService
          .getPageFoldSlot(pageTemplate)
          .subscribe((pf) => (results = pf))
          .unsubscribe();
        expect(results).toEqual('slot-xs');
      });
      it('should return medium page slot for MD', () => {
        vi.spyOn(breakpointService, 'breakpoint$', 'get').mockReturnValue(
          of(BREAKPOINT.md)
        );
        let results;
        pageLayoutService
          .getPageFoldSlot(pageTemplate)
          .subscribe((pf) => (results = pf))
          .unsubscribe();
        expect(results).toEqual('slot-md');
      });
      it('should also return medium page slot for LG', () => {
        vi.spyOn(breakpointService, 'breakpoint$', 'get').mockReturnValue(
          of(BREAKPOINT.lg)
        );
        let results;
        pageLayoutService
          .getPageFoldSlot(pageTemplate)
          .subscribe((pf) => (results = pf))
          .unsubscribe();
        expect(results).toEqual('slot-md');
      });
      it('should also return medium page slot for XL', () => {
        vi.spyOn(breakpointService, 'breakpoint$', 'get').mockReturnValue(
          of(BREAKPOINT.xl)
        );
        let results;
        pageLayoutService
          .getPageFoldSlot(pageTemplate)
          .subscribe((pf) => (results = pf))
          .unsubscribe();
        expect(results).toEqual('slot-md');
      });
    });

    describe('any breakpoint', () => {
      beforeEach(() => {
        vi.spyOn(breakpointService, 'breakpoint$', 'get').mockReturnValue(
          of(BREAKPOINT.md)
        );
      });
      it('should not return page slot when page slot is not defined', () => {
        let results;
        pageLayoutService
          .getPageFoldSlot('template_without_page_fold')
          .subscribe((pf) => (results = pf))
          .unsubscribe();
        expect(results).toBeFalsy();
      });

      it('should not return page slot for unknown page template ', () => {
        let results;
        pageLayoutService
          .getPageFoldSlot('unknown_template')
          .subscribe((pf) => (results = pf))
          .unsubscribe();
        expect(results).toBeFalsy();
      });
    });
  });
});

describe('PageLayoutService', () => {
  let pageLayoutService: PageLayoutService;
  let breakpointService: BreakpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PageLayoutService,
        { provide: CmsService, useClass: MockCmsService },
        { provide: BreakpointService, useClass: MockBreakpointService },
        { provide: LayoutConfig, useValue: {} },
        { provide: PageTemplateService, useClass: MockPageTemplateService },
        {
          provide: PAGE_LAYOUT_HANDLER,
          useClass: SimplePageLayoutHandler,
          multi: true,
        },
      ],
    });

    pageLayoutService = TestBed.inject(PageLayoutService);
    breakpointService = TestBed.inject(BreakpointService);
  });

  describe('no page layout confguration', () => {
    it('should not return page slot when there is no layout configuration', () => {
      vi.spyOn(breakpointService, 'breakpoint$', 'get').mockReturnValue(
        of(BREAKPOINT.md)
      );
      let results;
      pageLayoutService
        .getPageFoldSlot('template')
        .subscribe((pf) => (results = pf))
        .unsubscribe();
      expect(results).toBeFalsy();
    });
  });
});
