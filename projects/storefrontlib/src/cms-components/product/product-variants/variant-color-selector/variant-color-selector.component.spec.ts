/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  I18nTestingModule,
  BaseOption,
  VariantType,
  RoutingService,
  UrlCommands,
} from '@spartacus/core';
import { VariantColorSelectorComponent } from './variant-color-selector.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationExtras } from '@angular/router';

const mockVariant: BaseOption = {
  selected: {
    code: 'test',
    variantOptionQualifiers: [
      {
        value: '123',
        image: {
          url: 'http://test1-thumbnail.com',
        },
      },
    ],
  },
  options: [],
  variantType: VariantType.SIZE,
};

class MockRoutingService {
  go(
    _commands: any[] | UrlCommands,
    _query?: object,
    _extras?: NavigationExtras
  ): void {}
}

describe('VariantColorSelectorComponent', () => {
  let component: VariantColorSelectorComponent;
  let fixture: ComponentFixture<VariantColorSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VariantColorSelectorComponent],
      imports: [RouterTestingModule, I18nTestingModule],
      providers: [{ provide: RoutingService, useClass: MockRoutingService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantColorSelectorComponent);
    component = fixture.componentInstance;
    component.variants = mockVariant;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
