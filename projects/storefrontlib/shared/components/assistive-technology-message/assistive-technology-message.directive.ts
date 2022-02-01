import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Optional,
  TemplateRef,
} from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';

@Directive({
  selector: '[cxAtMessage]',
})
export class AtMessageDirective {
  /**
   * Usage [cxAtMEssage]="'translatableKey' | cxTranslate"
   */
  @Input() cxAtMessage: string;

  constructor(
    protected elementRef: ElementRef<HTMLElement>,
    @Optional() protected templateRef: TemplateRef<HTMLElement>,
    protected globalMessageService: GlobalMessageService
  ) {}

  protected get host(): HTMLElement {
    return !!this.templateRef
      ? this.templateRef.elementRef.nativeElement.parentElement
      : this.elementRef.nativeElement;
  }

  /**
   * Emit assistive global meesage to improve screen reader vocalization.
   * @param event
   */
  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent): void {
    event?.preventDefault();

    if (event?.target === this.host) {
      this.globalMessageService.add(
        this.cxAtMessage,
        GlobalMessageType.MSG_TYPE_ASSISTIVE
      );
    }
  }
}
