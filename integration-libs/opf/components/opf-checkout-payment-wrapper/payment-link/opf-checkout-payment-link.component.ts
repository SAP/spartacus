import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'cx-opf-checkout-payment-link',
  templateUrl: './opf-checkout-payment-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCheckoutPaymentLinkComponent implements OnInit {
  constructor(
    protected changeDetectionRef: ChangeDetectorRef,
    protected sanitizer: DomSanitizer
  ) {}

  @Input() link?: string;

  @Input() html?: string;

  renderHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit(): void {
    this.changeDetectionRef.detectChanges();
  }
}
