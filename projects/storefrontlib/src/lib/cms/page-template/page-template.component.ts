import { Component } from '@angular/core';
import { CmsService, Page, CmsConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'cx-page-template',
  templateUrl: './page-template.component.html'
})
export class PageTemplateComponent {
  constructor(private cms: CmsService, private config: CmsConfig) {}

  get slots$(): Observable<any[]> {
    return this.mainSlots$;
  }

  get templateName$(): Observable<string> {
    return this.page$.pipe(map((page: Page) => page.template));
  }

  protected get mainSlots$(): Observable<any[]> {
    return this.page$.pipe(
      map((page: Page) => {
        const pageSlots = this.getSlots(page.template);
        if (pageSlots) {
          return this.config.pageTemplates[page.template].slots;
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

  protected getSlots(templateUid: string): string[] {
    if (
      !!this.config.pageTemplates[templateUid] &&
      !!this.config.pageTemplates[templateUid].slots
    ) {
      return this.config.pageTemplates[templateUid].slots;
    } else {
      return null;
    }
  }
}
