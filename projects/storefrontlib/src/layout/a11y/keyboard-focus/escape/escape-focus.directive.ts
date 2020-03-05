import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { EscapeFocusConfig } from '../keyboard-focus.model';
import { PersistFocusDirective } from '../persist/persist-focus.directive';
import { EscapeFocusService } from './escape-focus.service';

/**
 * Directive to focus the host element whenever the `escape` key is captured.
 * UiEvents bubble up by nature, which is why the `cxEscGroup` can be used
 * on a tree of elements. Each time the escape key is used, the focus will
 * move up in the DOM tree.
 *
 */
@Directive({
  selector: '[cxEscFocus]',
})
export class EscapeFocusDirective extends PersistFocusDirective
  implements OnInit {
  @Input('cxEscFocus') protected config: EscapeFocusConfig;

  @Output() esc = new EventEmitter<boolean>();

  /**
   * Handles the escape key event.
   * @param event the native keyboard event which contains the escape keydown event
   */
  @HostListener('keydown.escape', ['$event'])
  protected handleEscape(event: KeyboardEvent): void {
    this.escapeFocusService.handleEscape(this.host, this.config, event);
    this.esc.emit(true);
  }

  constructor(
    protected elementRef: ElementRef,
    protected escapeFocusService: EscapeFocusService
  ) {
    super(elementRef, escapeFocusService);
  }
}
