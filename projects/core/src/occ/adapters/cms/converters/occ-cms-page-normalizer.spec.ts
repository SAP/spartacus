import { TestBed } from '@angular/core/testing';
import {
  ContentSlotComponentData,
  PageRobotsMeta,
} from 'projects/core/src/cms';
import { CmsComponent } from 'projects/core/src/model';
import { ConverterService } from '../../../../util/converter.service';
import { Occ } from '../../../occ-models';
import { OccCmsPageNormalizer } from './occ-cms-page-normalizer';

class MockConverterService {
  convert() {}
}

describe('OccCmsPageNormalizer', () => {
  let occCmsPageNormalizer: OccCmsPageNormalizer;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccCmsPageNormalizer,
        { provide: ConverterService, useClass: MockConverterService },
      ],
    });

    occCmsPageNormalizer = TestBed.inject(OccCmsPageNormalizer);
    converter = TestBed.inject(ConverterService);
    spyOn(converter, 'convert').and.callFake(((page: Occ.CMSPage) => ({
      ...page,
    })) as any);
  });

  it('should be created', () => {
    expect(occCmsPageNormalizer).toBeTruthy();
  });

  it('should not convert null', () => {
    const result = occCmsPageNormalizer.convert(null as any);
    expect(result).toEqual({});
  });

  it('should convert empty object', () => {
    const result = occCmsPageNormalizer.convert({});
    expect(result.page).toBeDefined();
  });

  describe('page', () => {
    it('should not have pageId', () => {
      const result = occCmsPageNormalizer.convert({});
      expect(result?.page?.pageId).toBeUndefined();
      expect(result?.page?.label).toBeUndefined();
      expect(result?.page?.title).toBeUndefined();
      expect(result?.page?.description).toBeUndefined();
      expect(result?.page?.template).toBeUndefined();
    });

    it('should have label', () => {
      const result = occCmsPageNormalizer.convert({ label: '/home' });
      expect(result?.page?.label).toEqual('/home');
    });

    it('should have title', () => {
      const result = occCmsPageNormalizer.convert({ title: 'page title' });
      expect(result?.page?.title).toEqual('page title');
    });

    it('should have description', () => {
      const result = occCmsPageNormalizer.convert({
        description: 'page description',
      });
      expect(result?.page?.description).toEqual('page description');
    });

    it('should have pageId', () => {
      const result = occCmsPageNormalizer.convert({ uid: '1234' });
      expect(result?.page?.pageId).toEqual('1234');
    });

    it('should have type', () => {
      const result = occCmsPageNormalizer.convert({ typeCode: 'ContentPage' });
      expect(result?.page?.type).toEqual('ContentPage');
    });

    it('should have template', () => {
      const result = occCmsPageNormalizer.convert({ template: 'pt' });
      expect(result?.page?.template).toEqual('pt');
    });

    describe('robots', () => {
      function createPageWithRobot(robotTag: string) {
        return occCmsPageNormalizer.convert({ robotTag: robotTag as any });
      }
      it('should normalize INDEX_FOLLOW', () => {
        const result = createPageWithRobot('INDEX_FOLLOW');
        expect(result?.page?.robots).toContain(PageRobotsMeta.INDEX);
        expect(result?.page?.robots).toContain(PageRobotsMeta.FOLLOW);
      });

      it('should normalize INDEX_NOFOLLOW', () => {
        const result = createPageWithRobot('INDEX_NOFOLLOW');
        expect(result?.page?.robots).toContain(PageRobotsMeta.INDEX);
        expect(result?.page?.robots).toContain(PageRobotsMeta.NOFOLLOW);
      });

      it('should normalize NOINDEX_FOLLOW', () => {
        const result = createPageWithRobot('NOINDEX_FOLLOW');
        expect(result?.page?.robots).toContain(PageRobotsMeta.NOINDEX);
        expect(result?.page?.robots).toContain(PageRobotsMeta.FOLLOW);
      });

      it('should normalize NOINDEX_NOFOLLOW', () => {
        const result = createPageWithRobot('NOINDEX_NOFOLLOW');
        expect(result?.page?.robots).toContain(PageRobotsMeta.NOINDEX);
        expect(result?.page?.robots).toContain(PageRobotsMeta.NOFOLLOW);
      });
    });
  });

  describe('page slots', () => {
    it('should not convert page slots', () => {
      const result = occCmsPageNormalizer.convert({ uid: '1234' });
      expect(result?.page?.slots).toBeUndefined();
    });

    it('should convert page slots', () => {
      const data = {
        contentSlots: {
          contentSlot: [{ position: 'Section1' }, { position: 'Section2' }],
        },
      };
      const result = occCmsPageNormalizer.convert(data);
      expect(result?.page?.slots?.Section1).toBeDefined();
      expect(result?.page?.slots?.Section2).toBeDefined();
    });
  });

  describe('component structure', () => {
    it('should not have components', () => {
      const data = mockPageData({}, 'Section1');
      const result = occCmsPageNormalizer.convert(data);
      expect(result?.page?.slots?.Section1.components).toBeUndefined();
    });

    it('should convert components', () => {
      const data = mockComponent({ uid: '123', typeCode: 'banner' });
      const result = occCmsPageNormalizer.convert(data);
      const comp = result?.page?.slots?.['pos']?.components?.[0] ?? {};
      expect(comp.uid).toEqual('123');
      expect(comp.typeCode).toEqual('banner');
      expect(comp.flexType).toEqual('banner');
    });

    it('should convert JspIncludeComponent', () => {
      const data = mockComponent({
        uid: '123',
        typeCode: 'JspIncludeComponent',
      });
      const result = occCmsPageNormalizer.convert(data);
      const comp = result?.page?.slots?.['pos']?.components?.[0] ?? {};
      expect(comp.uid).toEqual('123');
      expect(comp.typeCode).toEqual('JspIncludeComponent');
      expect(comp.flexType).toEqual('123');
    });

    it('should convert CMSFlexComponent', () => {
      const data = mockComponent({
        uid: '123',
        typeCode: 'CMSFlexComponent',
        flexType: 'Flexible',
      });
      const result = occCmsPageNormalizer.convert(data);
      const comp = result?.page?.slots?.['pos']?.components?.[0] ?? {};
      expect(comp.uid).toEqual('123');
      expect(comp.typeCode).toEqual('CMSFlexComponent');
      expect(comp.flexType).toEqual('Flexible');
    });
  });

  describe('component data', () => {
    it('should not have components', () => {
      const data = mockPageData({}, 'Section1');
      const result = occCmsPageNormalizer.convert(data);
      expect(result.components).toBeUndefined();
    });

    it('should add components', () => {
      const data = mockComponent({ uid: '123', typeCode: 'banner' });
      const result = occCmsPageNormalizer.convert(data);
      expect(result.components).toBeDefined();
    });

    it('should add component', () => {
      const data = mockComponent({ uid: '123', typeCode: 'banner' });
      const result = occCmsPageNormalizer.convert(data);
      expect(result.components?.[0]?.uid).toEqual('123');
      expect(result.components?.[0]?.typeCode).toEqual('banner');
    });

    it('should convert modifiedtime to modifiedTime', () => {
      const date = new Date();
      const data = mockComponent({
        uid: '123',
        typeCode: 'banner',
        modifiedtime: date,
      } as ContentSlotComponentData);
      const result = occCmsPageNormalizer.convert(data);
      expect(result.components?.[0]['modifiedtime']).toBeUndefined();
      expect(result.components?.[0].modifiedTime).toEqual(date);
    });

    it('should not introduce empty modifiedTime', () => {
      const data = mockComponent({
        uid: '123',
        typeCode: 'banner',
      });
      const result = occCmsPageNormalizer.convert(data);
      expect(result.components?.[0].modifiedTime).toBeUndefined();
    });
  });

  function mockPageData(
    page: Occ.CMSPage,
    position: string,
    comp?: CmsComponent
  ): Occ.CMSPage {
    const data: Occ.CMSPage = {
      ...page,
    };
    if (position) {
      data.contentSlots = {
        contentSlot: [
          {
            position: position,
          },
        ],
      };
      if (data?.contentSlots?.contentSlot?.[0] && comp) {
        data.contentSlots.contentSlot[0].components = {
          component: [comp],
        };
      }
    }
    return data;
  }

  function mockComponent(comp: ContentSlotComponentData): Occ.CMSPage {
    return mockPageData({}, 'pos', comp);
  }
});
