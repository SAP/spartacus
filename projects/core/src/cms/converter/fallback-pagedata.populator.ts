import { Injectable } from '@angular/core';
import { Populator } from './populator';
import { CMSPage, ContentSlot } from '../../occ/occ-models/occ.models';
import { CmsContentConfig } from '../config/cms-content.config';

@Injectable()
export class PageDataFallbackPopulator extends Populator {
  constructor(protected cmsData: CmsContentConfig) {
    super();
  }

  /**
   * Adds any missing slot to the page data if available
   * in the configuration set.
   */
  populate(page: CMSPage): void {
    this.addMissingSlots(page);
  }

  private addMissingSlots(pageData: CMSPage): void {
    this.getPreConfiguredSlots().forEach(slot => {
      if (!this.hasSlot(pageData, slot.position)) {
        pageData.contentSlots.contentSlot = pageData.contentSlots.contentSlot.concat(
          slot
        );
      }
    });
  }

  /**
   * TODO: we currrently only evaluate the global slot configuration
   * which is usefule to get pre-configured header slots. But for page
   * specific slots, we should come up with an approach to load page and/or
   * gobal slots.
   */
  private getPreConfiguredSlots(): ContentSlot[] {
    return !this.cmsData.cmsData || !this.cmsData.cmsData.slots
      ? []
      : this.cmsData.cmsData.slots;
  }

  private hasSlot(target: CMSPage, position: string): boolean {
    return !!target.contentSlots.contentSlot.find(s => s.position === position);
  }
}
