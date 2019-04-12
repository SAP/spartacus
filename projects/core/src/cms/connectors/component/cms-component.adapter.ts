import { Observable } from 'rxjs';
import { PageContext } from '../../../routing/models/page-context.model';
import { CmsComponent } from '../../../occ/occ-models/index';

export abstract class CmsComponentAdapter {
  /**
   * Abstract method must be used to load the component for a given `id` and `PageContext`.
   * The component can be loaded from alternative backend, as long as the structure
   * converts to the `CmsStructureModel`.
   *
   * @param pageContext The `PageContext` holding the page Id.
   */
  abstract load<T extends CmsComponent>(
    id: string,
    pageContext: PageContext,
    fields?: string
  ): Observable<T>;

  abstract loadList(
    ids: string[],
    pageContext: PageContext
  ): Observable<CmsComponent[]>;
}
