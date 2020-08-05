import { Directive, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PageLayoutService } from './page-layout.service';

/**
 * The `cxPageTemplate` attribute directive binds the CMS page template name as a
 * CSS class to the host element.
 *
 * ```html
 * <div class="LandingPageTemplate">
 *  [...]
 * <div>
 * ```
 *
 * The directive is designed to be used on standard html elements as well as on Angular's
 * `ng-template` or `ng-container` element.
 */
@Directive({
  selector: '[cxPageTemplate]',
})
export class PageTemplateDirective implements OnInit, OnDestroy {
  /**
   * Keeps the subscriptions for this service so that we can unsubscribe on destroy.
   */
  protected subscription = new Subscription();

  /**
   * Holds the current page template, so that we can clean up the binding on navigating to a
   * page with another page template
   */
  protected currentTemplate: string;

  constructor(
    protected vcr: ViewContainerRef,
    protected pageLayoutService: PageLayoutService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.pageLayoutService.templateName$
        .pipe(filter((template) => Boolean(template)))
        .subscribe((template) => {
          // clean up previous template class binding
          this.host.classList.remove(this.currentTemplate);
          this.currentTemplate = template;
          this.host.classList.add(this.currentTemplate);
        })
    );
  }

  /**
   * Returns the host element.
   */
  protected get host(): HTMLElement {
    return this.findHostElement(this.vcr.element.nativeElement);
  }

  /**
   * Finds the host html element, which is either the direct element or a parentNode.
   */
  protected findHostElement(element: Node): HTMLElement {
    if (element instanceof HTMLElement) {
      return element;
    }
    return this.findHostElement(element.parentNode);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
