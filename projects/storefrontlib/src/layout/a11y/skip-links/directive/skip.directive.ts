import { Directive, Input, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { SkipLinkService } from '../skip-link.service';

@Directive({
  selector: '[cxSkip]',
})
export class SkipDirective implements OnInit, OnDestroy {
  @Input()
  cxSkip: string;

  constructor(
    private elRef: ElementRef<any>,
    private skipLinkService: SkipLinkService
  ) {}

  ngOnInit() {
    this.skipLinkService.add(this.cxSkip, this.elRef.nativeElement);
  }

  ngOnDestroy() {
    this.skipLinkService.remove(this.cxSkip);
  }
}
