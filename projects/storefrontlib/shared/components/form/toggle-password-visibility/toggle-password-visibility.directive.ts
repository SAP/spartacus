import {
  Directive,
  ElementRef,
  AfterViewInit,
  ViewContainerRef,
  ChangeDetectorRef,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { FormConfig } from '../../../config/form-config';
import { TogglePasswordVisibilityComponent } from './toggle-password-visibility.component';

/**
 * Directive to bind a PasswordVisibilityComponent to a password input field. This
 * toggle while alternate the appearence of the input between dots and plain text.
 */
@Directive({
  selector: '[cxPasswordVisibilitySwitcher]',
})
export class TogglePasswordVisibilityDirective implements AfterViewInit {
  inputWrapper: HTMLElement | null;

  constructor(
    protected winRef: WindowRef,
    protected config: FormConfig,
    protected elementRef: ElementRef,
    protected viewContainerRef: ViewContainerRef,
    protected changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (this.config.form?.passwordVisibility) {
      this.wrapInput();
      this.insertComponent();
      this.changeDetectorRef.detectChanges();
    }
  }

  protected insertComponent(): void {
    const component = this.viewContainerRef.createComponent(
      TogglePasswordVisibilityComponent
    );
    component.instance.inputElement = this.elementRef.nativeElement;
    this.inputWrapper?.appendChild(component.location.nativeElement);
  }

  /**
   * We need to wrap the input element in a div to be able to position the toggle button in the right place.
   */
  protected wrapInput(): void {
    const input = this.elementRef.nativeElement;
    const parent = this.elementRef.nativeElement.parentNode;

    this.inputWrapper = this.winRef.document.createElement('div');
    this.inputWrapper.setAttribute('class', 'cx-password-input-wrapper');

    // set the wrapper as child (instead of the element)
    parent.replaceChild(this.inputWrapper, input);
    this.inputWrapper.appendChild(input);
  }
}
