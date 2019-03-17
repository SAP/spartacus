import { Injectable } from '@angular/core';
import { Populator } from './populator';
import { CMSPage, ContentSlot } from '../../occ/occ-models/occ.models';
import { CmsContentConfig } from '../config/cms-content.config';

@Injectable()
export class MergePageDataPopulator extends Populator {
  constructor(protected cmsData: CmsContentConfig) {
    super();
  }

  populate(page: CMSPage): void {
    this.mergeSlots(page);
  }

  private mergeSlots(target: CMSPage): void {
    if (!this.cmsData.cmsData || !this.cmsData.cmsData.slots) {
      return;
    }
    this.cmsData.cmsData.slots.forEach(slot => this.mergeSlot(target, slot));
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
