import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OccConfig, VariantOption, VariantQualifier } from '@spartacus/core';
import { VariantStyleIconsComponent } from './variant-style-icons.component';

const mockOccBackendUrl = 'https://';
const mockVariants: VariantOption[] = [
  {
    code: 'code_1',
    url: 'http://test1.com',
    variantOptionQualifiers: [
      {
        name: 'test2',
        qualifier: VariantQualifier.ROLLUP_PROPERTY,
        image: {
          url: '/test1-rollup.jpg',
        },
      },
      {
        name: 'test1',
        qualifier: VariantQualifier.THUMBNAIL,
        image: {
          url: '/test1-thumbnail.jpg',
        },
      },
    ],
  },
  {
    code: 'code_2',
    url: 'http://test2.com',
    variantOptionQualifiers: [],
  },
  {
    code: 'code_3',
    url: 'http://test3.com',
    variantOptionQualifiers: [],
  },
];

describe('VariantStyleIconsComponent', () => {
  let component: VariantStyleIconsComponent;
  let fixture: ComponentFixture<VariantStyleIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VariantStyleIconsComponent],
      providers: [
        {
          provide: OccConfig,
          useValue: { backend: { occ: { baseUrl: mockOccBackendUrl } } },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantStyleIconsComponent);
    component = fixture.componentInstance;

    component.variants = mockVariants;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set variantNames array', () => {
    component.ngOnInit();

    expect(Object.keys(component.variantNames).length).toBeGreaterThan(0);
  });

  it('should get variant url for thumbnail type of qualifier', () => {
    const thumbnailUrl = component.getVariantThumbnailUrl(
      component.variants[0].variantOptionQualifiers
    );

    expect(thumbnailUrl).toEqual(
      mockOccBackendUrl + mockVariants[0].variantOptionQualifiers[1].image.url
    );
  });
});
