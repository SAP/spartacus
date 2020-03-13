import { Injectable } from '@angular/core';
import { StateEventService } from '../../state/event/state-event.service';
import { CmsActions } from '../store/actions';
import { CmsEvents } from './cms-event.model';

@Injectable()
export class CmsEventService {
  constructor(protected stateEventService: StateEventService) {
    this.register();
  }

  /**
   * Registers event sources
   */
  protected register() {
    this.stateEventService.register({
      action: CmsActions.LOAD_CMS_PAGE_DATA_SUCCESS,
      event: CmsEvents.LoadCmsPageDataSuccess,
      factory: (action: CmsActions.LoadCmsPageDataSuccess) =>
        new CmsEvents.LoadCmsPageDataSuccess({
          page: action.payload,
        }),
    });
  }
}
