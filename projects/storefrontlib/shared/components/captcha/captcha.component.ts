import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CaptchaService } from 'projects/storefrontlib/shared/components/captcha/captcha.service';
import { CaptchaApiConfig } from './config/captcha-api-config';

@Component({
  selector: 'cx-captcha',
  templateUrl: './captcha.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaptchaComponent implements AfterViewInit {
  @Output() confirmed = new EventEmitter<boolean>();
  @Output() enabled = new EventEmitter<boolean>();

  @ViewChild('captcha', { static: false }) captchaRef: ElementRef;

  constructor(
    protected config: CaptchaApiConfig,
    protected captchaService: CaptchaService,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    if (this.config?.fields) {
      Object.keys(this.config.fields).forEach((key) => {
        if (this.config.fields) {
          this.renderer.setAttribute(
            this.captchaRef.nativeElement,
            key,
            this.config.fields[key]
          );
        }
      });
    }

    this.captchaService.getCaptchaConfig().subscribe((captchaConfig) => {
      if (captchaConfig?.enabled && captchaConfig?.publicKey) {
        this.enabled.emit(true);
        this.captchaService.renderCaptcha(
          this.captchaRef.nativeElement,
          captchaConfig.publicKey,
          () => this.confirmed.emit()
        );
      } else {
        this.enabled.emit(false);
      }
    });
  }
}
