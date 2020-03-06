import { BaseEvent } from '../../event';
import { Page } from '../model/page.model';

export namespace CmsEvents {
  export class LoadCmsPageDataSuccess extends BaseEvent<
    LoadCmsPageDataSuccess
  > {
    page: Page;
  }
}
