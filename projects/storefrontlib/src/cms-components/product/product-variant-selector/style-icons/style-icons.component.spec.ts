import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StyleIconsComponent } from './style-icons.component';
import { OccConfig, VariantOption } from '@spartacus/core';

const mockOccBackendUrl = 'abc';
const mockVariants: VariantOption[] = [
  {
    code: 'code_1',
    url: 'http://test1.com',
    variantOptionQualifiers: [
      {
        name: 'test2',
        qualifier: 'rollupProperty',
        image: {
          url: 'http://test1-rollup.com',
        },
      },
      {
        name: 'test1',
        qualifier: 'thumbnail',
        image: {
          url: 'http://test1-thumbnail.com',
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

describe('StyleIconsComponent', () => {
  let component: StyleIconsComponent;
  let fixture: ComponentFixture<StyleIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StyleIconsComponent],
      providers: [
        {
          provide: OccConfig,
          useValue: { backend: { occ: { baseUrl: mockOccBackendUrl } } },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleIconsComponent);
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
    const thumbnailUrl = component.getVariantThumbnailUrl(component.variants[0].variantOptionQualifiers);

    expect(thumbnailUrl).toEqual(mockOccBackendUrl+mockVariants[0].variantOptionQualifiers[1].image.url);
  });
});
