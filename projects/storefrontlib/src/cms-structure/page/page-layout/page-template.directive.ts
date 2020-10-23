import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PageLayoutService } from './page-layout.service';

/**
 * Directive that Adds a style class to the host element based on the cms page
 * template. The CMS page template is driven by the CMS structure, which is configurable
 * in the backend.
 *
 * The style class is added to the host element of the directive. The host element is resolved
 * from the `elementRef`, or, in case the directive is used in an `ng-template`, by the
 * `TemplateRef`.
 *
 * An example of the usage is given below:
 *
 * ```html
 * <cx-storefront class="LandingPageTemplate">
 *   <ng-template cxPageTemplateStyle>...</ng-template>
 * <cx-storefront>
 * ```
 *
 * The style class can also be provided by an input:
 *
 * ```html
 * <ng-template [cxPageTemplateStyle]="pageTemplateName">
 * ```
 *
 */
@Directive({
  selector: '[cxPageTemplateStyle]',
})
export class PageTemplateDirective implements OnInit, OnDestroy {
  /**
   * Adds a style class to the host element based on the cms page template, unless
   * the class is given as an input.
   *
   * The host element is either the actual host, or the parent element in case this
   * is used inside an `ng-template`.
   */
  @Input('cxPageTemplateStyle') set setTemplate(template: string) {
    if (template !== '') {
      this.addStyleClass(this.host, template);
    }
  }

  // Maintains the page template subscription
  protected subscription: Subscription = new Subscription();

  /**
   * Holds the current page template, so we can remove previous page templates
   * from the element classList.
   */
  protected currentTemplate: string;

  constructor(
    protected pageLayoutService: PageLayoutService,
    protected elementRef: ElementRef,
    @Optional() protected templateRef: TemplateRef<HTMLElement>,
    protected cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // If there hasn't been a current template so far, we'll observe
    // the page layout for the latest template
    if (!this.currentTemplate) {
      this.subscription.add(
        this.pageLayoutService.templateName$.subscribe((template) =>
          this.addStyleClass(this.host, template)
        )
      );
    }
  }

  /**
   * Adds the page template as a style class to the given element. If any
   * page template was added before, we clean it up.
   *
   * We'll not use hostBinding for the style class, as it will potential drop
   * an existing class name on the host. This is why we need to work with
   * the lower level change detection api.
   */
  protected addStyleClass(el: HTMLElement, template: string): void {
    if (this.currentTemplate) {
      el.classList?.remove(this.currentTemplate);
      this.cd.markForCheck();
    }
    if (template) {
      this.currentTemplate = template;
      el.classList.add(this.currentTemplate);
      this.cd.markForCheck();
    }
  }

  /**
   * Returns the host element (`HTMLElement`).
   *
   * If the directive is used on an `ng-template`, we take the parent element,
   * to ensure that we're not ending up with a comment.
   */
  protected get host(): HTMLElement {
    return !!this.templateRef
      ? this.templateRef.elementRef.nativeElement.parentElement
      : this.elementRef.nativeElement;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
