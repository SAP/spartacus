import {
  Directive,
  OnDestroy,
  ElementRef,
  AfterContentInit,
  Input,
} from '@angular/core';
import { FocusTrapService } from '../service/focus-trap.service';

export interface FocusTrapConfig {
  autoFocus?: boolean;
}

@Directive({
  selector: '[cxFocusTrap]',
})
export class FocusTrapDirective implements AfterContentInit, OnDestroy {
  @Input()
  cxFocusTrap: FocusTrapConfig;
  trapHandler: any;

  constructor(
    protected elRef: ElementRef<HTMLElement>,
    protected focusTrapService: FocusTrapService
  ) {}

  ngAfterContentInit(): void {
    this.autoFocus();
    this.trapHandler = this.focusTrapService.getTrapHandler(
      this.elRef.nativeElement
    );
    this.elRef.nativeElement.addEventListener('keydown', this.trapHandler);
  }

  ngOnDestroy(): void {
    this.elRef.nativeElement.removeEventListener('keydown', this.trapHandler);
  }

  autoFocus(): void {
    if (this.cxFocusTrap.autoFocus) {
      this.focusTrapService.focusFirstEl(this.elRef.nativeElement);
    }
  }
}
