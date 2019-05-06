import { PageType } from '../../occ/occ-models';

export class PageContext {
  id: string;
  type?: PageType;

  constructor(id: string, type?: PageType) {
    this.id = id;
    this.type = type;
  }
}
