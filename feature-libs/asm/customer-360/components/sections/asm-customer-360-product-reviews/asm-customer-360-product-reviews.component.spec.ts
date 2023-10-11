import {
  Component,
  DebugElement,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ArgsPipe } from '@spartacus/asm/core';
import {
  AsmCustomer360ReviewList,
  AsmCustomer360Type,
} from '@spartacus/asm/customer-360/root';
import {
  I18nTestingModule,
  LanguageService,
  TranslationService,
} from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { AsmCustomer360TableComponent } from '../../asm-customer-360-table/asm-customer-360-table.component';

import { AsmCustomer360SectionContextSource } from '../asm-customer-360-section-context-source.model';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';

import { AsmCustomer360ProductReviewsComponent } from './asm-customer-360-product-reviews.component';

describe('AsmCustomer360ProductReviewsComponent', () => {
  class MockLanguageService {
    getActive(): Observable<string> {
      return of('en-US');
    }
  }
  class MockTranslationService {
    translate(): Observable<string> {
      return of('test');
    }
  }
  @Pipe({
    name: 'cxTranslate',
  })
  class MockTranslatePipe implements PipeTransform {
    transform(): any {}
  }

  @Component({
    selector: 'cx-icon',
    template: '',
  })
  class MockCxIconComponent {
    @Input() type: ICON_TYPE;
  }

  @Component({
    selector: 'cx-star-rating',
    template: '',
  })
  class MockCxStarRatingnComponent {
    @Input() rating: number;
  }

  let component: AsmCustomer360ProductReviewsComponent;
  let fixture: ComponentFixture<AsmCustomer360ProductReviewsComponent>;
  let el: DebugElement;
  let contextSource: AsmCustomer360SectionContextSource<AsmCustomer360ReviewList>;

  const mockReviewList: AsmCustomer360ReviewList = {
    type: AsmCustomer360Type.REVIEW_LIST,
    reviews: [
      {
        productName: 'Shirt',
        productCode: 'shirt',
        createdAt: '2022-12-02T20:07:08+0000',
        updatedAt: '2022-12-02T20:07:08+0000',
        rating: '3.5',
        reviewStatus: 'Complete',
        reviewText: 'review text shirts',
        localizedReviewStatus: 'Complete',
      },
      {
        productName: 'Shoes',
        productCode: 'shoes',
        createdAt: '2022-12-02T20:07:08+0000',
        updatedAt: '2022-12-02T20:07:08+0000',
        rating: '4',
        reviewStatus: 'Complete',
        reviewText: 'review text shoes',
        localizedReviewStatus: 'Complete',
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AsmCustomer360ProductReviewsComponent,
        MockTranslatePipe,
        MockCxIconComponent,
        AsmCustomer360TableComponent,
        MockCxStarRatingnComponent,
        ArgsPipe,
      ],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        AsmCustomer360SectionContextSource,
        {
          provide: AsmCustomer360SectionContext,
          useExisting: AsmCustomer360SectionContextSource,
        },
        { provide: LanguageService, useClass: MockLanguageService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    contextSource = TestBed.inject(AsmCustomer360SectionContextSource);
    contextSource.data$.next(mockReviewList);
    contextSource.config$.next({
      pageSize: 5,
    });

    fixture = TestBed.createComponent(AsmCustomer360ProductReviewsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have entries', () => {
    expect(component.reviewColumns.length).toBe(4);
  });

  it('should display the column headers', () => {
    const headers = el.queryAll(By.css('.cx-asm-customer-360-table-header'));
    expect(headers.length).toBe(component.reviewColumns.length);
  });

  it('should display table', () => {
    const tableBody = el.query(By.css('.cx-asm-customer-360-table tbody'));
    const tableRows = tableBody?.queryAll(By.css('tr'));
    expect(tableRows.length).toBe(2);
  });

  it('should navigate product', () => {
    spyOn(contextSource.navigate$, 'next').and.stub();
    const tableBody = el.query(By.css('.cx-asm-customer-360-table tbody'));
    const tableRows = tableBody.queryAll(By.css('tr'));
    const linkCell = tableRows[0].query(
      By.css('.cx-asm-customer-360-table-link')
    );
    linkCell.nativeElement.click();
    expect(contextSource.navigate$.next).toHaveBeenCalledWith({
      cxRoute: 'product',
      params: { name: 'Shirt', code: 'shirt' },
    });
  });
});
