import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { SkipLinkService } from '../service/skip-link.service';

@Directive({
  selector: '[cxSkipLink]',
})
export class SkipLinkDirective implements OnInit, OnDestroy {
  @Input() cxSkipLink: string;

  // @HostBinding('tabindex') protected tabIndex: string = null;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private skipLinkService: SkipLinkService
  ) {}

  ngOnInit(): void {
    // when we merge the skipLink in the focus directives, we should care about
    // the mix of directives and the final tabindex
    // this.tabIndex = '-1';
    this.skipLinkService.add(this.cxSkipLink, this.elRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.skipLinkService.remove(this.cxSkipLink);
  }
}
