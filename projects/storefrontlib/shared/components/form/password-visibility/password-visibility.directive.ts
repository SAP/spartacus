import { OnInit, Directive, ElementRef } from '@angular/core';
import { TranslationService, WindowRef } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { FormConfig } from '../../../config/form-config';

@Directive({
  selector: '[cxPasswordVisibility]',
})
export class PasswordVisibilityDirective implements OnInit {
  passwordType: string = 'password';
  icon: HTMLElement | null;
  button: HTMLElement | null;
  showPassword: string;
  hidePassword: string;
  enabled = this.config.form?.passwordVisibility;

  constructor(
    protected winRef: WindowRef,
    protected config: FormConfig,
    protected elementRef: ElementRef,
    protected translation: TranslationService
  ) {}

  ngOnInit(): void {
    if (this.enabled) {
      this.setAriaLabels();

      this.createToggle();

      this.icon = this.winRef.document.createElement('cx-icon');
      this.icon?.setAttribute('class', 'fas fa-eye');
      this.icon?.setAttribute('aria-hidden', 'true');

      this.button?.addEventListener('click', () => {
        this.changePasswordVisibility();
      });
      this.button?.appendChild(this.icon);
    }
  }

  protected createToggle(): void {
    const input = this.elementRef.nativeElement;
    this.button = this.winRef.document.createElement('button');
    this.button.setAttribute('class', 'cx-show-hide-btn');
    this.button.setAttribute('type', 'button');
    this.button.setAttribute('aria-label', this.showPassword);

    const inputPosition = input.getBoundingClientRect();
    const offset = (inputPosition.bottom - inputPosition.top) / 2;
    const top = offset + input.offsetTop;

    this.button.style.top = top + 'px';
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
      });
  }

  protected changePasswordVisibility(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.elementRef?.nativeElement.setAttribute('type', this.passwordType);
    if (this.passwordType === 'password') {
      this.icon?.setAttribute('class', 'fas fa-eye');
      this.button?.setAttribute('aria-label', this.showPassword);
    } else {
      this.icon?.setAttribute('class', 'fas fa-eye-slash');
      this.button?.setAttribute('aria-label', this.hidePassword);
    }
  }
}
