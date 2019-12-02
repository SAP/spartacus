import {
  Directive,
  TemplateRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SkipLinkService } from '../skip-link.service';

@Directive({
  selector: '[cxSkip]',
})
export class SkipDirective implements OnInit, OnDestroy {
  @Input()
  cxSkip: string;

  constructor(
    private tpl: TemplateRef<any>,
    private skipLinkService: SkipLinkService
  ) {}

  ngOnInit() {
    this.skipLinkService.add(this.cxSkip, this.tpl.elementRef.nativeElement);
  }

  ngOnDestroy() {
    this.skipLinkService.remove(this.cxSkip);
  }
}
