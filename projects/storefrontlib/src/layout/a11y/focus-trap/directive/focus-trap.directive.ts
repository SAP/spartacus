import {
  Directive,
  OnDestroy,
  ElementRef,
  AfterContentInit,
} from '@angular/core';
import { FocusTrapService } from '../service/focus-trap.service';

@Directive({
  selector: '[cxFocusTrap]',
})
export class FocusTrapDirective implements AfterContentInit, OnDestroy {
  trapHandler;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private focusTrapService: FocusTrapService
  ) {}

  ngAfterContentInit(): void {
    this.trapHandler = this.focusTrapService.getTrapHandler(
      this.elRef.nativeElement
    );
    this.elRef.nativeElement.addEventListener('keydown', this.trapHandler);
  }

  ngOnDestroy(): void {
    this.elRef.nativeElement.removeEventListener('keydown', this.trapHandler);
  }
}
