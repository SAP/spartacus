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
  Renderer2,
} from '@angular/core';
import { FeatureConfigService, TranslationService } from '@spartacus/core';
import { take } from 'rxjs';

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

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit(): void {
    const divCombobox =
      this.elementRef.nativeElement.querySelector('[role="combobox"]');

    const ariaLabel = this.cxNgSelectA11y.ariaLabel;
    const elementId = this.elementRef.nativeElement.id;
    const ariaControls = this.cxNgSelectA11y.ariaControls ?? elementId;

    if (ariaLabel) {
      this.renderer.setAttribute(divCombobox, 'aria-label', ariaLabel);
    }

    if (ariaControls) {
      this.renderer.setAttribute(divCombobox, 'aria-controls', ariaControls);
    }
  }

  appendAriaLabelToOptions(
    _changes: MutationRecord[],
    observerInstance: MutationObserver
  ) {
    const options =
      this.elementRef?.nativeElement.querySelectorAll('.ng-option');
    if (options?.length) {
      this.translationService
        .translate('common.of')
        .pipe(take(1))
        .subscribe((translation) => {
          options.forEach((option: any, index: string | number) => {
            const ariaLabel = `${option.innerText}, ${+index + 1} ${translation} ${options.length}`;
            this.renderer.setAttribute(option, 'aria-label', ariaLabel);
          });
        });
    }
    observerInstance.disconnect();
  }
}
