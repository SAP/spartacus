import { PageType } from '../../occ-models';

export class PageContext {
  id: string;
  type?: PageType;

  constructor(id: string, type?: PageType) {
    this.id = id;
    this.type = type;

    if (this.type == null) {
      this.type = PageType.CONTENT_PAGE;
    }
  }
}
