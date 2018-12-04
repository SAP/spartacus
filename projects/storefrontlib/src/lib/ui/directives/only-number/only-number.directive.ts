import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[cxOnlyNumber]'
})
export class OnlyNumberDirective {
  previousValue = '';
  integerUnsigned = '^[0-9]*$';
  /**
   * Class constructor
   * @param hostElement
   */
  constructor(private hostElement: ElementRef) {}

  /**
   * Event handler for host's change event
   * @param e
   */
  @HostListener('change')
  onChange() {
    this.validateValue(this.hostElement.nativeElement.value);
  }

  /**
   * Event handler for host's change event
   * @param e
   */
  @HostListener('input')
  onInput() {
    this.validateValue(this.hostElement.nativeElement.value);
  }

  /**
   * Event handler for host's paste event
   * @param e
   */
  @HostListener('paste', ['$event'])
  onPaste(e) {
    const value = e.clipboardData.getData('text/plain');
    this.validateValue(value);
    e.preventDefault();
  }

  /**
   * Event handler for host's keyup event
   * @param e
   */
  @HostListener('keyup', ['$event'])
  onKeyUp(e: KeyboardEvent): void {
    const value = e.target['value'];
    this.validateValue(value);
  }

  /**
   * Event handler for host's keydown event
   * @param event
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    const originalValue: string = e.target['value'];
    const key: string = this.getName(e);
    const controlOrCommand = e.ctrlKey === true || e.metaKey === true;

    // allowed keys apart from numeric characters
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Escape',
      'Tab'
    ];
    // allow some non-numeric characters
    if (
      allowedKeys.indexOf(key) !== -1 ||
      // Allow: Ctrl+A and Command+A
      (key === 'a' && controlOrCommand) ||
      // Allow: Ctrl+C and Command+C
      (key === 'c' && controlOrCommand) ||
      // Allow: Ctrl+V and Command+V
      (key === 'v' && controlOrCommand) ||
      // Allow: Ctrl+X and Command+X
      (key === 'x' && controlOrCommand)
    ) {
      // let it happen, don't do anything
      return;
    }

    // save value before keydown event
    this.previousValue = originalValue;

    // allow number characters only
    const isNumber = new RegExp(this.integerUnsigned).test(key);
    if (isNumber) {
      return;
    } else {
      e.preventDefault();
    }
  }

  /**
   * Test whether value is a valid number or not
   * @param value
   */
  validateValue(value: string): void {
    value = value.replace(/[^0-9]+/g, '');
    value = value.replace(/^0+/, '');
    this.hostElement.nativeElement['value'] = value || 0;
  }

  /**
   * Get key's name
   * @param e
   */
  getName(e): string {
    if (e.key) {
      return e.key;
    } else {
      // for old browsers
      if (e.keyCode && String.fromCharCode) {
        switch (e.keyCode) {
          case 8:
            return 'Backspace';
          case 9:
            return 'Tab';
          case 27:
            return 'Escape';
          case 37:
            return 'ArrowLeft';
          case 39:
            return 'ArrowRight';
          default:
            return String.fromCharCode(e.keyCode);
        }
      }
    }
  }
}
