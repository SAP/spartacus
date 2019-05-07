import {
  ChangeDetectorRef,
  OnDestroy,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from './translation.service';
import { shallowEqualObjects } from './utils/shallow-equal-objects';

@Pipe({ name: 'cxTranslate', pure: false })
export class TranslatePipe implements PipeTransform, OnDestroy {
  private lastKey: string;
  private lastOptions: object;
  private value: string;
  private sub: Subscription;

  constructor(
    private service: TranslationService,
    private cd: ChangeDetectorRef
  ) {}

  transform(key: any, options: object = {}): string {
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
    return this.value;
  }

  private markForCheck(value: string) {
    this.value = value;
    this.cd.markForCheck();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
