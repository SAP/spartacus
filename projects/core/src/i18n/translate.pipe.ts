import {
  ChangeDetectorRef,
  isDevMode,
  OnDestroy,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { shallowEqualObjects } from '../util/compare-equal-objects';
import { Translatable, TranslatableParams } from './translatable';
import { TranslationService } from './translation.service';

@Pipe({ name: 'cxTranslate', pure: false })
export class TranslatePipe implements PipeTransform, OnDestroy {
  private lastKey: string;
  private lastOptions: object;
  private translatedValue: string;
  private sub: Subscription;

  constructor(
    protected service: TranslationService,
    protected cd: ChangeDetectorRef
  ) {}

  transform(
    input: Translatable | string,
    options: TranslatableParams = {}
  ): string {
    if (!input) {
      if (isDevMode()) {
        console.error(
          `The given input for the cxTranslate pipe (${input}) is invalid and cannot be translated`
        );
      }
      return;
    }

    if ((input as Translatable).raw) {
      return (input as Translatable).raw;
    }

    const key = typeof input === 'string' ? input : input.key;
    if (typeof input !== 'string') {
      options = { ...options, ...input.params };
    }

    this.translate(key, options);
    return this.translatedValue;
  }

  private translate(key: any, options: object) {
    if (
      key !== this.lastKey ||
      !shallowEqualObjects(options, this.lastOptions)
    ) {
      this.lastKey = key;
      this.lastOptions = options;

      if (this.sub) {
        this.sub.unsubscribe();
      }
      this.sub = this.service
        .translate(key, options, true)
        .subscribe((val) => this.markForCheck(val));
    }
  }

  private markForCheck(value: string) {
    this.translatedValue = value;
    this.cd.markForCheck();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
