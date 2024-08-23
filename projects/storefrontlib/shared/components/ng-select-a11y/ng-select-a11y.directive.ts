/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  Optional,
  Renderer2,
} from '@angular/core';
import { FeatureConfigService, TranslationService } from '@spartacus/core';
import { filter, take } from 'rxjs';
import { BREAKPOINT, BreakpointService } from '../../../layout';

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
      this.renderer.setAttribute(divCombobox, 'aria-label', ariaLabel);
    }

    if (ariaControls) {
      this.renderer.setAttribute(divCombobox, 'aria-controls', ariaControls);
    }

    if (
      this.featureConfigService.isEnabled('a11yNgSelectMobileReadout') &&
      inputElement.readOnly
    ) {
      const observer = new MutationObserver((_changes, observer) => {
        const comboboxAriaLabel = divCombobox.getAttribute('aria-label');
        const valueLabel =
          this.elementRef.nativeElement.querySelector(
            '.ng-value-label'
          ).innerText;
        const valueElement =
          this.elementRef.nativeElement.querySelector('.ng-value');
        this.renderer.setAttribute(valueElement, 'aria-hidden', 'true');
        this.renderer.setAttribute(
          divCombobox,
          'aria-label',
          comboboxAriaLabel + ', ' + valueLabel
        );
        observer.disconnect();
      });

      this.breakpointService
        ?.isDown(BREAKPOINT.md)
        .pipe(filter(Boolean), take(1))
        .subscribe(() => {
          observer.observe(this.elementRef.nativeElement, {
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
              const ariaLabel = `${option.innerText}, ${+index + 1} ${translation} ${options.length}`;
              this.renderer.setAttribute(option, 'aria-label', ariaLabel);
            }
          );
        });
    }
    observerInstance.disconnect();
  }
}
