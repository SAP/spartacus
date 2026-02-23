/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
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
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  CxDatePipe,
  FeatureConfigService,
  FeatureDirective,
  isNotNullable,
  Product,
  ProductReviewService,
  Review,
  TranslatePipe,
  useFeatureStyles,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { FormErrorsComponent } from '../../../../shared/components/form/form-errors/form-errors.component';
import { FormRequiredAsterisksComponent } from '../../../../shared/components/form/form-required-asterisks/form-required-asterisks.component';
import { FormRequiredLegendComponent } from '../../../../shared/components/form/form-required-legend/form-required-legend.component';
import { ReadMoreComponent } from '../../../../shared/components/read-more/read-more.component';
import { StarRatingComponent } from '../../../../shared/components/star-rating/star-rating.component';
import { CurrentProductService } from '../../current-product.service';

@Component({
  selector: 'cx-product-reviews',
  templateUrl: './product-reviews.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    StarRatingComponent,
    NgFor,
    FeatureDirective,
    ReadMoreComponent,
    FormRequiredLegendComponent,
    FormsModule,
    ReactiveFormsModule,
    FormRequiredAsterisksComponent,
    FormErrorsComponent,
    AsyncPipe,
    SlicePipe,
    TranslatePipe,
    CxDatePipe,

    CxDatePipe,
  ],
})
export class ProductReviewsComponent {
  @ViewChild('titleInput', { static: false }) titleInput: ElementRef;
  @ViewChild('writeReviewButton', { static: false })
  writeReviewButton: ElementRef;

  @Input() maxLengthReviewTitle = 255;
  @Input() maxLengthReviewComment = 2200;
  @Input() maxLengthReviewerName = 64;
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
  ) {
    useFeatureStyles('a11yEnhancedTabsAndReviewsStyles');
  }

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
              Validators.maxLength(this.maxLengthReviewTitle),
            ],
      ],
      comment: [
        '',
        !isProductReviewCharactersLeftEnabled
          ? Validators.required
          : [
              Validators.required,
              Validators.maxLength(this.maxLengthReviewComment),
            ],
      ],
      rating: [null, Validators.required],
      reviewerName: !isProductReviewCharactersLeftEnabled
        ? ''
        : ['', Validators.maxLength(this.maxLengthReviewerName)],
    });
  }
}
