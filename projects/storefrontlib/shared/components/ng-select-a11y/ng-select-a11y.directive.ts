/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  Input,
  PLATFORM_ID,
  Renderer2,
  SecurityContext,
} from '@angular/core';
import {
  outputToObservable,
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { NgSelectComponent } from '@ng-select/ng-select';
import {
  FeatureConfigService,
  TranslationService,
  useFeatureStyles,
} from '@spartacus/core';
import { filter, merge, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { BREAKPOINT, BreakpointService } from '../../../layout';

const ARIA_LABEL = 'aria-label';

@Directive({ selector: '[cxNgSelectA11y]' })
export class NgSelectA11yDirective implements AfterViewInit {
  /**
   * Use directive to bind aria attribute to inner element of ng-select
   * Angular component for accessibility compliance. If ng-select controls itself
   * ariaControls is not needed, instead bind a specific id to the <ng-select> element.
   */
  @Input() cxNgSelectA11y: { ariaLabel?: string; ariaControls?: string };

  protected translationService = inject(TranslationService);
  protected domSanitizer = inject(DomSanitizer);
  protected selectComponent = inject(NgSelectComponent);
  protected destroyRef = inject(DestroyRef);
  private featureConfigService = inject(FeatureConfigService);
  protected platformId = inject(PLATFORM_ID);
  protected selectObserver: MutationObserver | null = null;
  protected breakpointService = inject(BreakpointService, { optional: true });

  /**
   * When we inside a combo box using JAWS screen reader and press escape key
   * an escape keyboard event doesn't get fired, instead an AltLeft is fired.
   */
  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    const jawsEscapeCode = 'AltLeft';
    if (event.code === jawsEscapeCode) {
      this.selectComponent.close();
    }
  }

  @HostListener('keydown.escape')
  onEscape() {
    setTimeout(() => {
      this.elementRef.nativeElement.querySelector('input').focus();
    });
  }

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    useFeatureStyles('a11yNgSelectUnicodeCarets');
    if (this.featureConfigService.isEnabled('a11yVocalizeDropdownItemCount')) {
      effect(() => {
        this.translationService
          .translate('assistiveMessage.ngSelectDropdownCount', {
            count: this.selectComponent.items()?.length ?? 0,
          })
          .pipe(take(1), takeUntilDestroyed(this.destroyRef))
          .subscribe((countText) => {
            let itemCountSpan = this.elementRef.nativeElement.querySelector(
              '.cx-ng-select-count'
            );
            if (!itemCountSpan) {
              itemCountSpan = this.renderer.createElement('span');
              this.renderer.addClass(itemCountSpan, 'cx-ng-select-count');
              this.renderer.addClass(itemCountSpan, 'cx-visually-hidden');
              this.renderer.setAttribute(itemCountSpan, 'aria-hidden', 'true');
              this.renderer.appendChild(
                this.elementRef.nativeElement,
                itemCountSpan
              );
              const countId =
                (this.elementRef.nativeElement.id || 'ng-select') + '-count';
              this.renderer.setAttribute(itemCountSpan, 'id', countId);
              const inputCombobox =
                this.elementRef.nativeElement.querySelector(
                  '[role="combobox"]'
                );
              if (!!inputCombobox) {
                this.renderer.setAttribute(
                  inputCombobox,
                  'aria-describedby',
                  countId
                );
              }
              this.destroyRef.onDestroy(() => itemCountSpan.remove());
            }
            this.renderer.setProperty(itemCountSpan, 'textContent', countText);
          });
      });
    }
  }

  ngAfterViewInit(): void {
    const inputCombobox =
      this.elementRef.nativeElement.querySelector('[role="combobox"]');

    this.renderer.setAttribute(inputCombobox, 'role', 'combobox');
    this.renderer.setAttribute(inputCombobox, 'aria-expanded', 'false');

    const isOpened$ = outputToObservable(this.selectComponent.openEvent).pipe(
      map(() => 'true')
    );
    const isClosed$ = outputToObservable(this.selectComponent.closeEvent).pipe(
      map(() => 'false')
    );
    merge(isOpened$, isClosed$)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        this.renderer.setAttribute(inputCombobox, 'aria-expanded', state);
        if (
          ariaControls &&
          this.featureConfigService.isEnabled('a11yNgSelectAriaControls')
        ) {
          // Delay execution to come after the ng-select's own 'aria-controls' logic
          setTimeout(() => {
            this.renderer.setAttribute(
              inputCombobox,
              'aria-controls',
              ariaControls
            );
          });
        }
      });

    const ariaLabel = this.cxNgSelectA11y.ariaLabel;
    const elementId = this.elementRef.nativeElement.id;
    const ariaControls = this.cxNgSelectA11y.ariaControls ?? elementId;

    if (ariaLabel) {
      this.renderer.setAttribute(inputCombobox, ARIA_LABEL, ariaLabel);
    }

    if (ariaControls) {
      this.renderer.setAttribute(inputCombobox, 'aria-controls', ariaControls);
    }

    if (inputCombobox.readOnly && isPlatformBrowser(this.platformId)) {
      if (
        this.featureConfigService.isEnabled('a11yNgSelectReadonlyInputValue')
      ) {
        this.setInputValue(inputCombobox);
        this.selectObserver = new MutationObserver(() => {
          this.setInputValue(inputCombobox);
        });
        this.selectObserver.observe(this.elementRef.nativeElement, {
          subtree: true,
          characterData: true,
          childList: true,
        });
        this.destroyRef.onDestroy(() => this.selectObserver?.disconnect());
      } else {
        this.breakpointService
          ?.isDown(BREAKPOINT.md)
          .pipe(filter(Boolean), take(1))
          .subscribe(() => {
            const selectObserver = new MutationObserver((changes, observer) => {
              this.appendValueToAriaLabel(changes, observer, inputCombobox);
            });
            selectObserver.observe(this.elementRef.nativeElement, {
              subtree: true,
              characterData: true,
              childList: true,
            });
          });
      }
    }
  }

  setInputValue(inputCombobox: HTMLElement) {
    const sanitizedValueLabel = this.domSanitizer.sanitize(
      SecurityContext.HTML,
      this.elementRef.nativeElement.querySelector('.ng-value-label')?.innerText
    );
    if (sanitizedValueLabel) {
      // We set the input's value so JAWS reads it instead of announcing "blank"
      this.renderer.setProperty(inputCombobox, 'value', sanitizedValueLabel);
      const valueElement =
        this.elementRef.nativeElement.querySelector('.ng-value');
      if (valueElement) {
        // hide this value to avoid double readout
        this.renderer.setAttribute(valueElement, 'aria-hidden', 'true');
      }
    }
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
