/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  RecentSearchesComponent,
  SearchBoxOutlet,
} from './recent-searches.component';
import { RecentSearchesService } from './recent-searches.service';
import {
  OutletContextData,
  SearchBoxComponentService,
} from '@spartacus/storefront';
import { BehaviorSubject, of } from 'rxjs';
import { I18nTestingModule } from '@spartacus/core';
import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

@Pipe({
  name: 'cxHighlight',
})
class MockHighlightPipe implements PipeTransform {
  transform(): any {}
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {
    return ['test', 'url'];
  }
}
describe('RecentSearchesComponent', () => {
  let component: RecentSearchesComponent;
  let fixture: ComponentFixture<RecentSearchesComponent>;
  const recentSearchesService = jasmine.createSpyObj('RecentSearchesService', [
    'recentSearches$',
  ]);
  let context$ = new BehaviorSubject<SearchBoxOutlet>({
    search: 'test',
    searchBoxActive: true,
    maxRecentSearches: 3,
  });
  let recentSearchesServiceMock = {
    recentSearches$: of(['test1', 'test2', 'test3', 'test4']),
  };

  const searchBoxComponentServiceMock = {
    changeSelectedWord: jasmine.createSpy('changeSelectedWord'),
    shareEvent: jasmine.createSpy('shareEvent'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [RecentSearchesComponent, MockHighlightPipe, MockUrlPipe],
      providers: [
        {
          provide: RecentSearchesService,
          useValue: recentSearchesServiceMock,
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
    fixture = TestBed.createComponent(RecentSearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch recent searches based on outlet context', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.result$).toBeDefined();
    component.result$.subscribe((result) => {
      expect(result).toEqual(['test1', 'test2', 'test3']);
    });
  });

  it('should update chosen word', () => {
    const chosenWord = 'selectedWord';
    component.updateChosenWord(chosenWord);
    expect(
      searchBoxComponentServiceMock.changeSelectedWord
    ).toHaveBeenCalledWith(chosenWord);
  });

  it('should emit expected values when outletContext emits a value with searchBoxActive set to true', function () {
    const expectedValues = ['test1', 'test2', 'test3'];
    recentSearchesService.recentSearches$.and.returnValue(of(expectedValues));

    component.ngOnInit();

    let result;
    component.result$.subscribe((value) => {
      result = value;
    });

    expect(result).toEqual(expectedValues);
  });

  it('should prevent the default event behavior when called', function () {
    const ev = jasmine.createSpyObj('UIEvent', ['preventDefault']);

    component.preventDefault(ev);

    expect(ev.preventDefault).toHaveBeenCalled();
  });

  it(`should call the 'shareEvent' method of 'searchBoxComponentService' with the provided 'KeyboardEvent' parameter`, () => {
    const ev = new KeyboardEvent('keydown');
    component.shareEvent(ev);
    expect(searchBoxComponentServiceMock.shareEvent).toHaveBeenCalledWith(ev);
  });

  it('should not throw any errors or exceptions', () => {
    const ev = new KeyboardEvent('keydown');

    expect(() => {
      component.shareEvent(ev);
    }).not.toThrow();
  });

  it(`should throw an error if the 'KeyboardEvent' parameter is null or undefined`, () => {
    const ev = null;

    expect(() => {
      component.shareEvent(ev);
    }).toThrowError();
  });
});
