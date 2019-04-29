import {
  ChangeDetectorRef,
  OnDestroy,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from './translation.service';
import { shallowEqualObjects } from './utils/shallow-equal-objects';
import {
  TranslationCommand,
  TranslationCommandParams,
} from './translation-command';

@Pipe({ name: 'cxTranslate', pure: false })
export class TranslatePipe implements PipeTransform, OnDestroy {
  private lastKey: string;
  private lastOptions: object;
  private translatedValue: string;
  private sub: Subscription;

  constructor(
    private service: TranslationService,
    private cd: ChangeDetectorRef
  ) {}

  transform(
    input: TranslationCommand | string,
    options: TranslationCommandParams = {}
  ): string {
    if ((input as TranslationCommand).raw) {
      return (input as TranslationCommand).raw;
    }

    let key: string;
    if (typeof input === 'string') {
      key = input;
    } else {
      key = input.key;
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
        .subscribe(val => this.markForCheck(val));
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
