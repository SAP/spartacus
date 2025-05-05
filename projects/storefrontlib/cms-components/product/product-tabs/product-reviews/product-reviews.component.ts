/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  FeatureConfigService,
  isNotNullable,
  Product,
  ProductReviewService,
  Review,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { CurrentProductService } from '../../current-product.service';

@Component({
  selector: 'cx-product-reviews',
  templateUrl: './product-reviews.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ProductReviewsComponent {
  @ViewChild('titleInput', { static: false }) titleInput: ElementRef;
  @ViewChild('writeReviewButton', { static: false })
  writeReviewButton: ElementRef;

  @Input() inputCharactersForReviewTitle = 255;
  @Input() inputCharactersForReviewComment = 2200;
  @Input() inputCharactersForReviewerName = 64;
  isWritingReview = false;

  // TODO: configurable
  initialMaxListItems = 5;
  maxListItems: number;
  reviewForm: UntypedFormGroup;
  private featureConfigService = inject(FeatureConfigService);

  product$: Observable<Product | null> =
    this.currentProductService.getProduct();

  reviews$: Observable<Review[]> = this.product$.pipe(
    filter(isNotNullable),
    map((p) => p.code ?? ''),
    distinctUntilChanged(),
    switchMap((productCode) =>
      this.reviewService.getByProductCode(productCode)
    ),
    tap(() => {
      this.resetReviewForm();
      this.maxListItems = this.initialMaxListItems;
    })
  );

  constructor(
    protected reviewService: ProductReviewService,
    protected currentProductService: CurrentProductService,
    private fb: UntypedFormBuilder,
    protected cd: ChangeDetectorRef
  ) {}

  initiateWriteReview(): void {
    this.isWritingReview = true;

    this.cd.detectChanges();

    if (this.titleInput && this.titleInput.nativeElement) {
      this.titleInput.nativeElement.focus();
    }
  }

  cancelWriteReview(): void {
    this.isWritingReview = false;
    this.resetReviewForm();

    this.cd.detectChanges();

    if (this.writeReviewButton && this.writeReviewButton.nativeElement) {
      this.writeReviewButton.nativeElement.focus();
    }
  }

  setRating(rating: number): void {
    this.reviewForm.controls.rating.setValue(rating);
  }

  submitReview(product: Product) {
    if (this.reviewForm.valid) {
      this.addReview(product);
    } else {
      this.reviewForm.markAllAsTouched();
    }
  }

  addReview(product: Product): void {
    const reviewFormControls = this.reviewForm.controls;
    const review: Review = {
      headline: reviewFormControls.title.value,
      comment: reviewFormControls.comment.value,
      rating: reviewFormControls.rating.value,
      alias: reviewFormControls.reviewerName.value,
    };

    this.reviewService.add(product.code ?? '', review);

    this.isWritingReview = false;
    this.resetReviewForm();

    this.cd.detectChanges();

    if (this.writeReviewButton && this.writeReviewButton.nativeElement) {
      this.writeReviewButton.nativeElement.focus();
    }
  }

  get reviewTitleCharacterLeft(): number {
    return (
      this.inputCharactersForReviewTitle -
      (this.reviewForm.get('title')?.value?.length || 0)
    );
  }

  get reviewCommentCharacterLeft(): number {
    return (
      this.inputCharactersForReviewComment -
      (this.reviewForm.get('comment')?.value?.length || 0)
    );
  }

  get reviewerNameCharacterLeft(): number {
    return (
      this.inputCharactersForReviewerName -
      (this.reviewForm.get('reviewerName')?.value?.length || 0)
    );
  }

  private resetReviewForm(): void {
    const isProductReviewCharactersLeftEnabled =
      this.featureConfigService.isEnabled('productReviewCharactersLeft');
    this.reviewForm = this.fb.group({
      title: [
        '',
        !isProductReviewCharactersLeftEnabled
          ? Validators.required
          : [
              Validators.required,
              Validators.maxLength(this.inputCharactersForReviewTitle),
            ],
      ],
      comment: [
        '',
        !isProductReviewCharactersLeftEnabled
          ? Validators.required
          : [
              Validators.required,
              Validators.maxLength(this.inputCharactersForReviewComment),
            ],
      ],
      rating: [null, Validators.required],
      reviewerName: !isProductReviewCharactersLeftEnabled
        ? ''
        : ['', Validators.maxLength(this.inputCharactersForReviewerName)],
    });
  }
}
