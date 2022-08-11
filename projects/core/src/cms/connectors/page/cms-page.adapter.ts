import { Observable } from 'rxjs';
import { PageContext } from '../../../routing/models/page-context.model';
import { CmsStructureModel } from '../../model/page.model';

/**
 * Abstract class that can be used to implement custom loader logic
 * in order to load CMS structure from third-party CMS system.
 */
export abstract class CmsPageAdapter {
  /**
   * Abstract method must be used to load the page structure for a given `PageContext`.
   * The page can be loaded from alternative sources, as long as the structure
   * converts to the `CmsStructureModel`.
   *
   * @param pageContext The `PageContext` holding the page Id.
   */
  abstract load(pageContext: PageContext): Observable<CmsStructureModel>;
}
