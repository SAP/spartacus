import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Optional,
  TemplateRef,
} from '@angular/core';
import {
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[cxAtMessage]',
})
export class AtMessageDirective {
  /**
   * Usage [cxAtMessage]="'translatableKey' | cxTranslate"
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

    if (event?.target === this.host && this.cxAtMessage) {
      this.host.focus();

      this.globalMessageService
        .get()
        .pipe(take(1))
        .subscribe((globalMessageEntities: GlobalMessageEntities) => {
          const current =
            globalMessageEntities &&
            globalMessageEntities[GlobalMessageType.MSG_TYPE_ASSISTIVE];

          // Override current assitive message.
          if (current) {
            this.globalMessageService.remove(
              GlobalMessageType.MSG_TYPE_ASSISTIVE
            );
          }
          this.globalMessageService.add(
            this.cxAtMessage,
            GlobalMessageType.MSG_TYPE_ASSISTIVE
          );
        });
    }
  }
}
