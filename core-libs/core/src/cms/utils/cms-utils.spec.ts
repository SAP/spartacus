import { PageType } from '../../model/cms.model';
import { PageContext } from '../../routing/models/page-context.model';
import { CURRENT_CONTEXT_KEY, serializePageContext } from './cms-utils';

describe('cms utils', () => {
  describe('serializePageContext', () => {
    describe('when undefined is provided', () => {
      it(`should return ${CURRENT_CONTEXT_KEY}`, () => {
        expect(serializePageContext(undefined)).toEqual(CURRENT_CONTEXT_KEY);
      });
    });
    it(`should return serialize the given page context`, () => {
      const pageContext: PageContext = {
        id: 'homepage',
        type: PageType.CONTENT_PAGE,
      };
      expect(serializePageContext(pageContext)).toEqual(
        `${pageContext.type}-${pageContext.id}`
      );
    });
    describe('when the ignoreContentPageId param is set to true and the provided page context is of CONTENT_PAGE type', () => {
      it('should serialize just the type, and not the ID', () => {
        const pageContext: PageContext = {
          id: 'homepage',
          type: PageType.CONTENT_PAGE,
        };
        expect(serializePageContext(pageContext, true)).toEqual('ContentPage');
      });
    });
    describe('when the ignoreContentPageId param is set to true and the provided page context is NOT of CONTENT_PAGE type', () => {
      it('should fully serialize the provided page context', () => {
        const pageContext: PageContext = {
          id: '12345',
          type: PageType.PRODUCT_PAGE,
        };
        expect(serializePageContext(pageContext, true)).toEqual(
          serializePageContext(pageContext)
        );
      });
    });
  });
});
