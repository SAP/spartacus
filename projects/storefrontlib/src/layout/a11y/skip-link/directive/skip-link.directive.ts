import { Directive, Input, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { SkipLinkService } from '../service/skip-link.service';

@Directive({
  selector: '[cxSkipLink]',
})
export class SkipLinkDirective implements OnInit, OnDestroy {
  @Input()
  cxSkipLink: string;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private skipLinkService: SkipLinkService
  ) {}

  ngOnInit(): void {
    this.skipLinkService.add(this.cxSkipLink, this.elRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.skipLinkService.remove(this.cxSkipLink);
  }
}
