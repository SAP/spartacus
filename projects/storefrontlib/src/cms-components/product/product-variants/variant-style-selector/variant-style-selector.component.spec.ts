import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  OccConfig,
  UrlCommandRoute,
  BaseOption,
  VariantType,
} from '@spartacus/core';
import { VariantStyleSelectorComponent } from './variant-style-selector.component';
import { Pipe, PipeTransform } from '@angular/core';

const mockOccBackendUrl = 'abc';
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

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(options: UrlCommandRoute): string {
    return options.cxRoute;
  }
}

describe('VariantStyleSelectorComponent', () => {
  let component: VariantStyleSelectorComponent;
  let fixture: ComponentFixture<VariantStyleSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VariantStyleSelectorComponent, MockUrlPipe],
      imports: [RouterTestingModule, I18nTestingModule],
      providers: [
        {
          provide: OccConfig,
          useValue: { backend: { occ: { baseUrl: 'abc' } } },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantStyleSelectorComponent);
    component = fixture.componentInstance;
    component.variants = mockVariant;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get variant url for thumbnail type of qualifier', () => {
    const thumbnailUrl = component.getVariantThumbnailUrl(
      component.variants.selected.variantOptionQualifiers
    );
    expect(thumbnailUrl).toEqual(
      mockOccBackendUrl +
        mockVariant.selected.variantOptionQualifiers[0].image.url
    );
  });
});
