import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
import { TranslationService, WindowRef } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { FormConfig } from '../../../config/form-config';

/**
 * Directive to bind a password visibility toggle to a password input field. This
 * toggle while alternate the appearence of the input between dots and plain text.
 */
@Directive({
  selector: '[cxPasswordVisibility]',
})
export class PasswordVisibilityDirective implements AfterViewInit {
  icon: HTMLElement | null;
  button: HTMLElement | null;

  protected inputType: string = 'password';
  protected showPassword: string;
  protected hidePassword: string;
  protected enabled?: boolean;

  /**
   * Use input when the global config is set to a value but want to override it for
   * a specific input
   */
  @Input() set cxPasswordVisibility(value: boolean | string) {
    this.enabled =
      value === ''
        ? this.config.form?.passwordVisibility
        : value === 'false'
        ? false
        : !!value;
  }

  constructor(
    protected winRef: WindowRef,
    protected config: FormConfig,
    protected elementRef: ElementRef,
    protected translation: TranslationService
  ) {}

  ngAfterViewInit(): void {
    if (this.enabled) {
      this.wrapInput();
      this.createToggle();
      this.setAriaLabels();

      this.icon = this.winRef.document.createElement('cx-icon');
      this.icon?.setAttribute('class', 'fas fa-eye');
      this.icon?.setAttribute('aria-hidden', 'true');

      this.button?.appendChild(this.icon);
    }
  }

  protected wrapInput(): void {
    const input = this.elementRef.nativeElement;
    const wrapper = this.winRef.document.createElement('div');
    const parent = this.elementRef.nativeElement.parentNode;

    wrapper.setAttribute('class', 'cx-password');

    // set the wrapper as child (instead of the element)
    parent.replaceChild(wrapper, input);
    // set element as child of wrapper
    wrapper.appendChild(input);
  }

  protected createToggle(): void {
    const input = this.elementRef.nativeElement;
    this.button = this.winRef.document.createElement('button');
    this.button.setAttribute('class', 'cx-show-hide-btn');
    this.button.setAttribute('type', 'button');

    this.button?.addEventListener('click', () => {
      this.changePasswordVisibility();
    });

    input.after(this.button);
  }

  protected setAriaLabels(): void {
    combineLatest([
      this.translation.translate('passwordVisibility.showPassword'),
      this.translation.translate('passwordVisibility.hidePassword'),
    ])
      .pipe(take(1))
      .subscribe(([show, hide]) => {
        this.showPassword = show;
        this.hidePassword = hide;
        this.button?.setAttribute('aria-label', this.showPassword);
      });
  }

  protected changePasswordVisibility(): void {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
    this.elementRef?.nativeElement.setAttribute('type', this.inputType);
    if (this.inputType === 'password') {
      this.icon?.setAttribute('class', 'fas fa-eye');
      this.button?.setAttribute('aria-label', this.showPassword);
    } else {
      this.icon?.setAttribute('class', 'fas fa-eye-slash');
      this.button?.setAttribute('aria-label', this.hidePassword);
    }
  }
}
