import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Optional,
  TemplateRef,
} from '@angular/core';
import { GlobalMessageService } from '../../../../core/src/global-message/facade/global-message.service';
import { GlobalMessageType } from '../../../../core/src/global-message/models/global-message.model';

@Directive({
  selector: '[cxAtMessage]',
})
export class AtMessageDirective {
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

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent): void {
    event?.preventDefault();
    console.log('bob');
    console.log(this.cxAtMessage);

    if (event?.target === this.host) {
      this.globalMessageService.add(
        { key: this.cxAtMessage },
        GlobalMessageType.MSG_TYPE_ASSISTIVE
      );
    }
  }
}
