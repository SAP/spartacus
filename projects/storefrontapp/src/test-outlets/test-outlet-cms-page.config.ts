import { CmsStructureConfig, ContentSlotComponentData } from '@spartacus/core';

export const paragraphComponents: {
  [key: string]: ContentSlotComponentData | any;
} = {
  Paragraph1: {
    uid: 'Paragraph1Component',
    typeCode: 'CMSParagraphComponent',
    flexType: 'CMSParagraphComponent',
    content: 'Paragraph1',
  },
};

export const linkComponents: {
  [key: string]: ContentSlotComponentData | any;
} = {
  Link1: {
    uid: 'Link1',
    typeCode: 'CMSLinkComponent',
    flexType: 'CMSLinkComponent',
    name: 'Link',
    linkName: 'Link',
    url: '/test/outlet/template',
  },
};

export function testOutletPagesCmsContentConfig(): CmsStructureConfig {
  return {
    cmsStructure: {
      components: {
        ...paragraphComponents,
        ...linkComponents,
      },
      pages: [
        {
          slots: {
            Section2A: {
              componentIds: ['Paragraph1'],
            },
            Section2B: {},
          },
          ignoreBackend: true,
          pageId: '/test/outlet/slot',
          template: 'ContentPage1Template',
        },
        {
          slots: {
            Section2A: {
              componentIds: ['Paragraph1'],
            },
            Section2B: {},
          },
          ignoreBackend: true,
          pageId: '/test/outlet/template',
          template: 'ContentPage1Template',
        },
        {
          slots: {
            Section2A: {
              componentIds: ['Paragraph1'],
            },
          },
          ignoreBackend: true,
          pageId: '/test/outlet/component',
          template: 'ContentPage1Template',
        },
      ],
    },
  };
}
