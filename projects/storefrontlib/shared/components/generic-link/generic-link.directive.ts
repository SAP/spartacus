import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { GenericLinkComponentService } from './generic-link-component.service';

@Directive({
  selector: '[cxGenericLink]',
})
export class GenericLinkDirective implements OnInit {
  @Input() cxGenericLink: string | undefined;

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const url = target.getAttribute('href');
    if (url) {
      event.preventDefault();
      const linkTarget = target.getAttribute('target');
      if (this.isExternalUrl(url) || linkTarget === '_blank') {
        window.open(url, linkTarget ?? undefined);
      } else {
        this.router.navigateByUrl(url); // Navigate internally using Angular Router
      }
    }
  }

  constructor(
    protected el: ElementRef,
    protected router: Router,
    protected service: GenericLinkComponentService
  ) {}
  ngOnInit() {
    this.updateHref(this.el.nativeElement.getAttribute('href'));
  }

  protected isExternalUrl(url: string): boolean {
    return this.service.isExternalUrl(url);
  }
  protected updateHref(url: string): void {
    if (url) {
      if (!this.isExternalUrl(url)) {
        const homeUrlTree = this.router.createUrlTree(['']);
        const homeUrl = this.router.serializeUrl(homeUrlTree).slice(0, -1);
        this.el.nativeElement.setAttribute('href', `${homeUrl}${url}`);
      }
    }
  }
}
