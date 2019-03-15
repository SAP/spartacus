import { Injectable } from '@angular/core';
import { Populator } from './populator';
import { CMSPage, ContentSlot } from '../../occ/occ-models/occ.models';
import { CmsContentConfig } from '../config/cms-content.config';

@Injectable()
export class MergePageDataPopulator extends Populator {
  constructor(protected config: CmsContentConfig) {
    super();
  }

  populate(page: CMSPage): void {
    this.mergeSlots(page);
  }

  private mergeSlots(target: CMSPage): void {
    console.log(this.config);
    if (!this.config.global || !this.config.global.slots) {
      return;
    }
    this.config.global.slots.forEach(slot => this.mergeSlot(target, slot));
  }

  private mergeSlot(target: CMSPage, slot: ContentSlot) {
    if (
      !target.contentSlots.contentSlot.find(s => s.position === slot.position)
    ) {
      target.contentSlots.contentSlot = target.contentSlots.contentSlot.concat(
        slot
      );
    }
  }
}
