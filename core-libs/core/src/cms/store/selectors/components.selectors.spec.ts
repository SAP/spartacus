import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { CmsComponent, PageType } from '../../../model/cms.model';
import { PageContext } from '../../../routing/index';
import { StateUtils } from '../../../state/index';
import { serializePageContext } from '../../utils/cms-utils';
import { CmsActions } from '../actions/index';
import { ComponentsContext, StateWithCms } from '../cms-state';
import * as fromReducers from '../reducers/index';
import { CmsSelectors } from './index';

describe('Cms Component Selectors', () => {
  let store: Store<StateWithCms>;

  const component: CmsComponent = {
    uid: 'comp1',
    typeCode: 'SimpleBannerComponent',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cms', fromReducers.getReducers()),
      ],
    });
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('componentsContextSelectorFactory', () => {
    describe('when the component does not exist in the state', () => {
      it('should return undefined', () => {
        const componentUid = 'comp1';
        let result: ComponentsContext;

        store
          .pipe(
            select(CmsSelectors.componentsContextSelectorFactory(componentUid))
          )
          .subscribe((value) => (result = value));

        expect(result).toEqual(undefined);
      });
    });
    describe('when the component exists in the state', () => {
      it('should return ComponentsContext by the provided uid', () => {
        const componentUid = 'comp1';
        let result: ComponentsContext;

        store
          .pipe(
            select(CmsSelectors.componentsContextSelectorFactory(componentUid))
          )
          .subscribe((value) => (result = value));

        const pageContext: PageContext = {
          id: 'xxx',
          type: PageType.CONTENT_PAGE,
        };
        store.dispatch(
          new CmsActions.LoadCmsComponentSuccess({
            component,
            uid: componentUid,
            pageContext,
          })
        );

        const serializedPageContext = serializePageContext(pageContext, true);
        expect(result.component).toEqual({
          uid: componentUid,
          typeCode: component.typeCode,
        });
        expect(result.pageContext).toEqual({
          [serializedPageContext]: {
            loading: false,
            success: true,
            error: false,
            value: true,
          } as StateUtils.LoaderState<boolean>,
        });
      });
    });
  });

  describe('componentsLoaderStateSelectorFactory', () => {
    describe('when the context does not exist', () => {
      it('should return the default loader state', () => {
        const componentUid = 'comp1';

        let result: StateUtils.LoaderState<boolean>;

        store
          .pipe(
            select(
              CmsSelectors.componentsLoaderStateSelectorFactory(
                componentUid,
                'ContentPage-xxx'
              )
            )
          )
          .subscribe((value) => (result = value));

        expect(result).toEqual(StateUtils.initialLoaderState);
      });
    });
    describe('when the component context state slice exists', () => {
      describe('when the provided context does not exist', () => {
        it('should return the initialLoaderState', () => {
          const componentUid = 'comp1';

          const pageContext: PageContext = {
            id: 'xxx',
            type: PageType.CONTENT_PAGE,
          };
          store.dispatch(
            new CmsActions.LoadCmsComponentSuccess({
              component,
              uid: componentUid,
              pageContext,
            })
          );

          let result: StateUtils.LoaderState<boolean>;

          store
            .pipe(
              select(
                CmsSelectors.componentsLoaderStateSelectorFactory(
                  componentUid,
                  'does-not-exist'
                )
              )
            )
            .subscribe((value) => (result = value));

          expect(result).toEqual(StateUtils.initialLoaderState);
        });
      });
      describe('when the context exists', () => {
        it('should return the loader state for the provided context', () => {
          const componentUid = 'comp1';

          const pageContext: PageContext = {
            id: 'xxx',
            type: PageType.CONTENT_PAGE,
          };
          const serializedPageContext = serializePageContext(pageContext, true);
          store.dispatch(
            new CmsActions.LoadCmsComponentSuccess({
              component,
              uid: componentUid,
              pageContext,
            })
          );

          let result: StateUtils.LoaderState<boolean>;

          store
            .pipe(
              select(
                CmsSelectors.componentsLoaderStateSelectorFactory(
                  componentUid,
                  serializedPageContext
                )
              )
            )
            .subscribe((value) => (result = value));

          expect(result).toEqual({
            success: true,
            loading: false,
            error: false,
            value: true,
          });
        });
      });
    });
  });

  describe('componentsContextExistsSelectorFactory', () => {
    describe('when there is no context data', () => {
      it('should return undefined', () => {
        const componentUid = 'comp1';

        const pageContext: PageContext = {
          id: 'xxx',
          type: PageType.CONTENT_PAGE,
        };

        store.dispatch(
          new CmsActions.LoadCmsComponentSuccess({
            component,
            uid: componentUid,
            pageContext,
          })
        );

        let result: boolean;
        store
          .pipe(
            select(
              CmsSelectors.componentsContextExistsSelectorFactory(
                componentUid,
                'does-not-exist'
              )
            )
          )
          .subscribe((value) => (result = value));

        expect(result).toBe(undefined);
      });
    });
    describe('when the context does not exist', () => {
      it('should return false', () => {
        const componentUid = 'comp1';

        const pageContext: PageContext = {
          id: 'xxx',
          type: PageType.CONTENT_PAGE,
        };

        const serializedPageContext = serializePageContext(pageContext, true);

        store.dispatch(
          new CmsActions.LoadCmsComponentFail({
            uid: componentUid,
            error: undefined,
            pageContext,
          })
        );

        let result: boolean;
        store
          .pipe(
            select(
              CmsSelectors.componentsContextExistsSelectorFactory(
                componentUid,
                serializedPageContext
              )
            )
          )
          .subscribe((value) => (result = value));

        expect(result).toBe(false);
      });
    });
    describe('when the context exists', () => {
      it('should return true', () => {
        const componentUid = 'comp1';

        const pageContext: PageContext = {
          id: 'xxx',
          type: PageType.CONTENT_PAGE,
        };
        const serializedPageContext = serializePageContext(pageContext, true);

        store.dispatch(
          new CmsActions.LoadCmsComponentSuccess({
            component,
            uid: componentUid,
            pageContext,
          })
        );

        let result: boolean;
        store
          .pipe(
            select(
              CmsSelectors.componentsContextExistsSelectorFactory(
                componentUid,
                serializedPageContext
              )
            )
          )
          .subscribe((value) => (result = value));

        expect(result).toEqual(true);
      });
    });
  });

  describe('componentsDataSelectorFactory', () => {
    it('should return the component when the state exists', () => {
      const componentUid = 'comp1';
      const pageContext: PageContext = {
        id: 'xxx',
        type: PageType.CONTENT_PAGE,
      };

      store.dispatch(
        new CmsActions.LoadCmsComponentSuccess({
          component,
          uid: componentUid,
          pageContext,
        })
      );

      let result: CmsComponent;
      store
        .pipe(select(CmsSelectors.componentsDataSelectorFactory(componentUid)))
        .subscribe((value) => (result = value));

      expect(result).toEqual(component);
    });
    it('should return undefined when the state does not exist', () => {
      const componentUid = 'comp1';
      let result: CmsComponent;
      store
        .pipe(select(CmsSelectors.componentsDataSelectorFactory(componentUid)))
        .subscribe((value) => (result = value));

      expect(result).toEqual(undefined);
    });
  });

  describe('componentsSelectorFactory', () => {
    describe('when there is no component data', () => {
      it('should return undefined', () => {
        const componentUid = 'comp1';
        const pageContext: PageContext = {
          id: 'xxx',
          type: PageType.CONTENT_PAGE,
        };

        store.dispatch(
          new CmsActions.LoadCmsComponentSuccess({
            component,
            uid: componentUid,
            pageContext,
          })
        );

        let result: CmsComponent;
        store
          .pipe(
            select(
              CmsSelectors.componentsSelectorFactory(
                componentUid,
                'does-not-exist'
              )
            )
          )
          .subscribe((value) => (result = value));

        expect(result).toBe(undefined);
      });
    });
    describe('when the component does not exist', () => {
      it('should return null', () => {
        const componentUid = 'comp1';
        const pageContext: PageContext = {
          id: 'xxx',
          type: PageType.CONTENT_PAGE,
        };
        const serializedPageContext = serializePageContext(pageContext, true);

        store.dispatch(
          new CmsActions.LoadCmsComponentFail({
            uid: componentUid,
            error: undefined,
            pageContext,
          })
        );

        let result: CmsComponent;
        store
          .pipe(
            select(
              CmsSelectors.componentsSelectorFactory(
                componentUid,
                serializedPageContext
              )
            )
          )
          .subscribe((value) => (result = value));

        expect(result).toBe(null);
      });
    });
    describe('when the component exists', () => {
      it('should return the component', () => {
        const componentUid = 'comp1';

        const pageContext: PageContext = {
          id: 'xxx',
          type: PageType.CONTENT_PAGE,
        };
        const serializedPageContext = serializePageContext(pageContext, true);

        store.dispatch(
          new CmsActions.LoadCmsComponentSuccess({
            component,
            uid: componentUid,
            pageContext,
          })
        );

        let result: CmsComponent;
        store
          .pipe(
            select(
              CmsSelectors.componentsSelectorFactory(
                componentUid,
                serializedPageContext
              )
            )
          )
          .subscribe((value) => (result = value));

        expect(result).toEqual(component);
      });
    });
  });
});
