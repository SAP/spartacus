import { Directive, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { FocusTrapService } from '../service/focus-trap.service';

@Directive({
  selector: '[cxFocusTrap]',
})
export class FocusTrapDirective implements OnInit, OnDestroy {
  constructor(
    private elRef: ElementRef<HTMLElement>,
    private focusTrapService: FocusTrapService
  ) {}

  ngOnInit(): void {
    this.focusTrapService.add(this.elRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.focusTrapService.remove(this.elRef.nativeElement);
  }
}
