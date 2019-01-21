import { Component, Input } from '@angular/core';
import {
  CmsService,
  Page,
  CmsConfig,
  SlotGroup,
  SlotList
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'cx-page-template',
  templateUrl: './page-template.component.html'
})
export class PageTemplateComponent {
  @Input() section;

  constructor(private cms: CmsService, private config: CmsConfig) {}

  get slots$(): Observable<any[]> {
    return this.mainSlots$;
  }

  get templateName$(): Observable<string> {
    return this.page$.pipe(
      filter(Boolean),
      map((page: Page) => page.template)
    );
  }

  protected get mainSlots$(): Observable<any[]> {
    return this.page$.pipe(
      map((page: Page) => {
        const pageSlots = this.getSlots(page.template);
        console.log(pageSlots);
        if (pageSlots) {
          return pageSlots.slots;
        } else {
          console.warn('no template found for', page.template);
          console.log('The content provides the following slots', page.slots);
        }
      })
    );
  }

  get page$(): Observable<Page> {
    return this.cms.getCurrentPage().pipe(filter(Boolean));
  }

  protected getSlots(templateUid: string): SlotGroup {
    if (this.section) {
      return this.config.layoutSlots[templateUid] &&
        this.config.layoutSlots[templateUid][this.section] &&
        this.config.layoutSlots[templateUid][this.section].slots
        ? this.config.layoutSlots[templateUid][this.section]
        : this.config.layoutSlots[this.section];
    } else {
      if (
        this.config.layoutSlots[templateUid] &&
        this.config.layoutSlots[templateUid].slots
      ) {
        return this.config.layoutSlots[templateUid];
      }
    }
    return null;
  }
}
