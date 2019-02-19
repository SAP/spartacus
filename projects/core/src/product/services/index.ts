import { ProductPageTitleResolver } from './product-page-title.resolver';
import { CategoryPageTitleResolver } from './category-page-title.resolver';
import { SearchPageTitleResolver } from './search-page-title.resolver';
import { PageTitleResolver } from '../../cms';

export const pageTitleResolvers = [
  {
    provide: PageTitleResolver,
    useExisting: ProductPageTitleResolver,
    multi: true
  },
  {
    provide: PageTitleResolver,
    useExisting: CategoryPageTitleResolver,
    multi: true
  },
  {
    provide: PageTitleResolver,
    useExisting: SearchPageTitleResolver,
    multi: true
  }
];
