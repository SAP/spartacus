import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2
} from '@angular/core';
import { CmsService, Page } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'cx-page-template',
  templateUrl: './page-template.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTemplateComponent implements OnInit {
  @Input() section;
  // config, to be defined in a config or value provider
  templates = {
    footer: {
      slots: ['Footer']
    },
    LandingPage2Template: {
      slots: [
        'Section1',
        'Section2A',
        'Section2B',
        'Section2C',
        'Section3',
        'Section4',
        'Section5'
      ]
    },
    ContentPage1Template: {
      slots: ['Section2A', 'Section2B']
    },
    ProductDetailsPageTemplate: {
      slots: ['TopHeaderSlot', 'BottomHeaderSlot', 'PlaceholderContentSlot']
    },
    CartPageTemplate: {
      slots: ['BottomContentSlot']
    },
    ProductListPageTemplate: {
      slots: []
    },
    CategoryPageTemplate: {
      slots: ['Section4', 'Section1', 'Section2', 'Section3']
    },
    LoginPageTemplate: {
      slots: ['LeftContentSlot', 'RightContentSlot']
    },
    AccountPageTemplate: {
      slots: ['BodyContent', 'SideContent']
    },
    StoreFinderPageTemplate: {
      slots: ['MiddleContent', 'SideContent']
    },
    MultiStepCheckoutSummaryPageTemplate: {
      slots: ['SideContent']
    },
    OrderConfirmationPageTemplate: {
      slots: ['SideContent', 'BodyContent']
    }
  };

  constructor(
    private cms: CmsService,
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
    if (this.section) {
      return this.sectionSlots$;
    } else {
      return this.mainSlots$;
    }
  }

  get templateName$(): Observable<string> {
    return this.page$.pipe(map((page: Page) => page.template));
  }

  get sectionSlots$(): Observable<any[]> {
    return this.page$.pipe(
      map((page: Page) => {
        if (
          this.templates[page.template] &&
          this.templates[page.template][this.section] &&
          this.templates[page.template][this.section].slots
        ) {
          return this.templates[page.template][this.section].slots;
        } else {
          return this.templates[this.section].slots;
        }
      })
    );
  }

  protected get mainSlots$(): Observable<any[]> {
    return this.page$.pipe(
      map((page: Page) => {
        console.log('set page template', page.template);
        // this.hostClass = page.template;
        this.cssClass = page.template;
        // this.cd.detectChanges();
        if (
          this.templates[page.template] &&
          this.templates[page.template].slots
        ) {
          // console.warn('Template found for', page.template);
          // console.log('The content provides the following slots', page.slots);
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
