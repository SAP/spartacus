import { Component, OnInit } from '@angular/core';
import { CmsService, Page } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'cx-page-template',
  templateUrl: './page-template.component.html'
})
export class PageTemplateComponent implements OnInit {
  // config, to be defined in a config or value provider
  templates = {
    pageTemplateUid: {
      slots: [
        'Section1',
        'Section2A',
        'Section2B',
        'Section2C',
        'Section3',
        'Section4',
        'Section5'
      ]
    }
  };

  constructor(private cms: CmsService) {}

  ngOnInit() {}

  get slots$(): Observable<any[]> {
    return this.mainSlots$;
  }

  get templateName$(): Observable<string> {
    return this.page$.pipe(map((page: Page) => page.template));
  }

  protected get mainSlots$(): Observable<any[]> {
    return this.page$.pipe(
      map((page: Page) => {
        if (
          this.templates[page.template] &&
          this.templates[page.template].slots
        ) {
          return this.templates[page.template].slots;
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
}
