import { addCmsRoute } from './add-cms-route';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';

describe('addCmsRoute', () => {
  let mockRouter;

  beforeAll(() => {
    mockRouter = {
      config: [],
    };
  });

  it('should return factory function that adds cms route config', () => {
    const mockInjector = {
      get() {
        return mockRouter;
      },
    };

    const result = addCmsRoute(mockInjector);
    expect(mockRouter.config.length).toBe(0);
    result();
    expect(mockRouter.config.length).toBe(1);
    expect(mockRouter.config[0]).toEqual({
      path: '**',
      canActivate: [CmsPageGuard],
      component: PageLayoutComponent,
    });
  });
});
