/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  OutletContextData,
  SearchBoxComponentService,
} from '@spartacus/storefront';
import { BehaviorSubject, of } from 'rxjs';
import { I18nTestingModule } from '@spartacus/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TrendingSearchesComponent } from './trending-searches.component';
import { SearchBoxOutletTrendingSearches } from './model';
import { TrendingSearchesService } from './trending-searches.service';

describe('TrendingSearchesComponent', () => {
  let component: TrendingSearchesComponent;
  let fixture: ComponentFixture<TrendingSearchesComponent>;
  let context$ = new BehaviorSubject<SearchBoxOutletTrendingSearches>({
    maxTrendingSearches: 5,
  });
  let trendingSearchesServiceMock = {
    getTrendingSearches: () => of([]),
  };
  let searchBoxComponentServiceMock = {
    setTrendingSearches: (enabled: boolean = false) => of(enabled),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [TrendingSearchesComponent],
      providers: [
        {
          provide: TrendingSearchesService,
          useValue: trendingSearchesServiceMock,
        },
        {
          provide: SearchBoxComponentService,
          useValue: searchBoxComponentServiceMock,
        },
        { provide: OutletContextData, useValue: { context$ } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingSearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the correct $context value through contextObservable', () => {
    component.contextObservable.subscribe((value) => {
      expect(value).toEqual({ maxTrendingSearches: 5 });
    });
  });

  it('should not display any trending searches when none are available', () => {
    expect(fixture.nativeElement.querySelector('.message')).toBeNull();
  });
});
