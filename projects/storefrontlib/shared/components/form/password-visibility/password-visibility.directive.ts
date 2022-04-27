import {
  Directive,
  ElementRef,
  AfterViewInit,
  ViewContainerRef,
  ChangeDetectorRef,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { FormConfig } from '../../../config/form-config';
import { PasswordVisibilityComponent } from './password-visibility.component';

/**
 * Directive to bind a PasswordVisibilityComponent to a password input field. This
 * toggle while alternate the appearence of the input between dots and plain text.
 */
@Directive({
  selector: '[cxPasswordVisibility]',
})
export class PasswordVisibilityDirective implements AfterViewInit {
  inputWrapper: HTMLElement | null;

  protected inputType: string = 'password';
  protected enabled = true;

  constructor(
    protected winRef: WindowRef,
    protected config: FormConfig,
    protected elementRef: ElementRef,
    protected viewContainerRef: ViewContainerRef,
    protected changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (this.enabled) {
      this.wrapInput();
      this.insertComponent();
      this.changeDetectorRef.detectChanges();
    }
  }

  protected insertComponent(): void {
    const component = this.viewContainerRef.createComponent(
      PasswordVisibilityComponent
    );
    component.instance.inputElement = this.elementRef.nativeElement;
    this.inputWrapper?.appendChild(component.location.nativeElement);
  }

  protected wrapInput(): void {
    const input = this.elementRef.nativeElement;
    this.inputWrapper = this.winRef.document.createElement('div');
    const parent = this.elementRef.nativeElement.parentNode;

    this.inputWrapper.setAttribute('class', 'cx-password');

    // set the wrapper as child (instead of the element)
    parent.replaceChild(this.inputWrapper, input);
    this.inputWrapper.appendChild(input);
  }
}
