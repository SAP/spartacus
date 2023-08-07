import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I18nTestingModule } from '@spartacus/core';

import { QuoteSellerEditComponentService } from './quote-seller-edit.component.service';

describe('QuoteSellerEditComponentService', () => {
  let fixture: ComponentFixture<QuoteSellerEditComponentService>;
  let service: QuoteSellerEditComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [QuoteSellerEditComponentService],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteSellerEditComponentService);
    service = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(service).toBeDefined();
  });
});
