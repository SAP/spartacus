import { Component, Input, Renderer2, ElementRef, OnInit } from '@angular/core';
import { CmsService, Page, CmsConfig, SlotGroup } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'cx-page-layout',
  templateUrl: './page-layout.component.html'
})
export class PageLayoutComponent implements OnInit {
  @Input() section;

  constructor(
    private cms: CmsService,
    private config: CmsConfig,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    if (this.section) {
      this.cssClass = this.section;
    }
  }

  set cssClass(cl) {
    this.renderer.addClass(this.el.nativeElement, cl);
  }

  get slots$(): Observable<any[]> {
    return this.mainSlots$;
  }

  get page$(): Observable<Page> {
    return this.cms.getCurrentPage().pipe(filter(Boolean));
  }

  get templateName$(): Observable<string> {
    return this.page$.pipe(map((page: Page) => page.template));
  }

  protected get mainSlots$(): Observable<any[]> {
    return this.page$.pipe(
      map((page: Page) => {
        if (!this.section) {
          this.cssClass = page.template;
        }
        const pageSlots = this.getSlots(page.template);
        if (pageSlots) {
          return pageSlots.slots;
        } else {
          console.warn('no template found for', page.template);
          console.log('The content provides the following slots', page.slots);
        }
      })
    );
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
