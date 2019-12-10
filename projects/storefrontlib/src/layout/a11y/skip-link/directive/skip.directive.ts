import { Directive, Input, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { SkipLinkService } from '../service/skip-link.service';

@Directive({
  selector: '[cxSkipLink]',
})
export class SkipDirective implements OnInit, OnDestroy {
  @Input()
  cxSkipLink: string;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private skipLinkService: SkipLinkService
  ) {}

  ngOnInit() {
    this.skipLinkService.add(this.cxSkipLink, this.elRef.nativeElement);
  }

  ngOnDestroy() {
    this.skipLinkService.remove(this.cxSkipLink);
  }
}
