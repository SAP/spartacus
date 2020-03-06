import { NgModule } from '@angular/core';
import { StateEventModule } from '../../state/event/state-event.module';
import { CmsActions } from '../store/actions';
import { CmsEvents } from './cms-event.model';

/**
 * Premature event module for building cms related events.
 * There's currently only a very generic page load success event being added,
 * which doesn't add a lot of value. We'd rather have a product page, category
 * page, content page load event, all with a useful payload.
 */
@NgModule({
  imports: [
    StateEventModule.forChild([
      {
        action: CmsActions.LOAD_CMS_PAGE_DATA_SUCCESS,
        event: CmsEvents.LoadCmsPageDataSuccess,
        factory: (action: CmsActions.LoadCmsPageDataSuccess) =>
          new CmsEvents.LoadCmsPageDataSuccess({
            page: action.payload,
          }),
      },
    ]),
  ],
})
export class CmsEventModule {}
