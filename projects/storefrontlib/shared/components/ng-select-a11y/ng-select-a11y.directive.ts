/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  inject,
  Input,
  Optional,
  PLATFORM_ID,
  Renderer2,
  SecurityContext,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FeatureConfigService, TranslationService } from '@spartacus/core';
import { filter, take } from 'rxjs';
import { BREAKPOINT, BreakpointService } from '../../../layout';

const ARIA_LABEL = 'aria-label';

@Directive({
  selector: '[cxNgSelectA11y]',
})
export class NgSelectA11yDirective implements AfterViewInit {
  /**
   * Use directive to bind aria attribute to inner element of ng-select
   * Angular component for accessibility compliance. If ng-select controls itself
   * ariaControls is not needed, instead bind a specific id to the <ng-select> element.
   */
  @Input() cxNgSelectA11y: { ariaLabel?: string; ariaControls?: string };

  protected translationService = inject(TranslationService);
  protected domSanitizer = inject(DomSanitizer);
  private featureConfigService = inject(FeatureConfigService);

  @HostListener('open')
  onOpen() {
    if (!this.featureConfigService?.isEnabled('a11yNgSelectOptionsCount')) {
      return;
    }
    const observer = new MutationObserver((changes, observerInstance) =>
      this.appendAriaLabelToOptions(changes, observerInstance)
    );
    observer.observe(this.elementRef.nativeElement, { childList: true });
  }

  @Optional() breakpointService = inject(BreakpointService, { optional: true });

  @Inject(PLATFORM_ID) protected platformId: Object;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit(): void {
    const divCombobox =
      this.elementRef.nativeElement.querySelector('[role="combobox"]');
    const inputElement = divCombobox.querySelector('input');

    const ariaLabel = this.cxNgSelectA11y.ariaLabel;
    const elementId = this.elementRef.nativeElement.id;
    const ariaControls = this.cxNgSelectA11y.ariaControls ?? elementId;

    if (ariaLabel) {
      this.renderer.setAttribute(divCombobox, ARIA_LABEL, ariaLabel);
    }

    if (ariaControls) {
      this.renderer.setAttribute(divCombobox, 'aria-controls', ariaControls);
    }

    if (
      this.featureConfigService.isEnabled('a11yNgSelectMobileReadout') &&
      inputElement.readOnly &&
      isPlatformBrowser(this.platformId)
    ) {
      this.breakpointService
        ?.isDown(BREAKPOINT.md)
        .pipe(filter(Boolean), take(1))
        .subscribe(() => {
          const selectObserver = new MutationObserver((changes, observer) => {
            this.appendValueToAriaLabel(changes, observer, divCombobox);
          });
          selectObserver.observe(this.elementRef.nativeElement, {
            subtree: true,
            characterData: true,
          });
        });
    }
  }

  appendAriaLabelToOptions(
    _changes: MutationRecord[],
    observerInstance: MutationObserver
  ) {
    const options: HTMLOptionElement[] =
      this.elementRef?.nativeElement.querySelectorAll('.ng-option');
    if (options?.length) {
      this.translationService
        .translate('common.of')
        .pipe(take(1))
        .subscribe((translation) => {
          options.forEach(
            (option: HTMLOptionElement, index: string | number) => {
              const sanitizedOptionText = this.domSanitizer.sanitize(
                SecurityContext.HTML,
                option.innerText
              );
              const ariaLabel = `${sanitizedOptionText}, ${+index + 1} ${translation} ${options.length}`;
              this.renderer.setAttribute(option, ARIA_LABEL, ariaLabel);
            }
          );
        });
    }
    observerInstance.disconnect();
  }

  /**
   * Hides the input value from the screen reader and provides it as part of the aria-label instead.
   * This improves the screen reader output on mobile devices.
   */
  appendValueToAriaLabel(
    _changes: any,
    observer: MutationObserver,
    divCombobox: HTMLElement
  ) {
    const sanitizedValueLabel = this.domSanitizer.sanitize(
      SecurityContext.HTML,
      this.elementRef.nativeElement.querySelector('.ng-value-label')?.innerText
    );
    if (sanitizedValueLabel) {
      const comboboxAriaLabel = divCombobox?.getAttribute(ARIA_LABEL) || '';
      const valueElement =
        this.elementRef.nativeElement.querySelector('.ng-value');
      this.renderer.setAttribute(valueElement, 'aria-hidden', 'true');
      this.renderer.setAttribute(
        divCombobox,
        ARIA_LABEL,
        comboboxAriaLabel + ', ' + sanitizedValueLabel
      );
    }
    observer.disconnect();
  }
}
