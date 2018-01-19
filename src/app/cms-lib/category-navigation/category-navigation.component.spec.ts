/*import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNavigationComponent } from './category-navigation.component';

describe('CategoryNavigationComponent', () => {
  let component: CategoryNavigationComponent;
  let fixture: ComponentFixture<CategoryNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});*/


import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';
import * as fromRoot from '../../routing/store';
import * as fromCmsReducer from '../../newcms/store/reducers';
import { CategoryNavigationComponent } from './category-navigation.component';
import { ConfigService } from '../../newcms/config.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'app/material.module';
import { MatMenuModule, MatIconModule } from '@angular/material';
import { CategoryNavigationModule } from 'app/cms-lib/category-navigation/category-navigation.module';

export class UseConfigService {
  cmsComponentMapping = {
    CMSNavigationComponent: 'CategoryNavigationComponent'
  };
}

fdescribe('CmsCategoryNavigationComponent in CmsLib', () => {
  let store: Store<fromCmsReducer.CmsState>;
  let categoryNavigationComponent: CategoryNavigationComponent;
  let fixture: ComponentFixture<CategoryNavigationComponent>;
  let el: DebugElement;

  const componentData = {
    uid: 'ElectronicsCategoryNavComponent',
    typeCode: 'CategoryNavigationComponent',
    modifiedTime: '2018-01-16T15:57:04+0000',
    name: 'Category Navigation Component',
    container: 'false',
    wrapAfter: '10',
    type: 'Category Navigation Component',
    navigationNode: {
      uid: 'ElectronicsCategoryNavNode',
      children: [
        {
          uid: 'BrandsNavNode',
          entries: [
            {
              item: {
                external: false,
                linkName: 'Brands',
                target: 'SAMEWINDOW',
                url: '/Brands/c/brands'
              },
              itemId: 'AllBrandsCategoryLink'
            }
          ],
          children: [
            {
              uid: 'BrandLinksNavNode',
              children: [
                {
                  uid: 'CanonBrandNavNode',
                  entries: [
                    {
                      item: {
                        external: false,
                        linkName: 'Canon',
                        target: 'SAMEWINDOW',
                        url: '/Brands/Canon/c/brand_10'
                      },
                      itemId: 'CanonBrandCategoryLink'
                    }
                  ]
                },
                {
                  uid: 'SonyBrandNavNode',
                  entries: [
                    {
                      item: {
                        external: false,
                        linkName: 'Sony',
                        target: 'SAMEWINDOW',
                        url: '/Brands/Sony/c/brand_5'
                      },
                      itemId: 'SonyBrandCategoryLink'
                    }
                  ]
                },
                {
                  uid: 'KodakBrandNavNode',
                  entries: [
                    {
                      item: {
                        external: false,
                        linkName: 'Kodak',
                        target: 'SAMEWINDOW',
                        url: '/Brands/Kodak/c/brand_88'
                      },
                      itemId: 'KodakBrandCategoryLink'
                    }
                  ]
                },
                {
                  uid: 'SamsungBrandNavNode',
                  entries: [
                    {
                      item: {
                        external: false,
                        linkName: 'Samsung',
                        target: 'SAMEWINDOW',
                        url: '/Brands/Samsung/c/brand_26'
                      },
                      itemId: 'SamsungBrandCategoryLink'
                    }
                  ]
                },
                {
                  uid: 'ToshibaBrandNavNode',
                  entries: [
                    {
                      item: {
                        external: false,
                        linkName: 'Toshiba',
                        target: 'SAMEWINDOW',
                        url: '/Brands/Toshiba/c/brand_2'
                      },
                      itemId: 'ToshibaBrandCategoryLink'
                    }
                  ]
                },
                {
                  uid: 'FujifilmBrandNavNode',
                  entries: [
                    {
                      item: {
                        external: false,
                        linkName: 'Fujifilm',
                        target: 'SAMEWINDOW',
                        url: '/Brands/Fujifilm/c/brand_75'
                      },
                      itemId: 'FujifilmBrandCategoryLink'
                    }
                  ]
                }
              ],
              title: 'Cameras'
            },
            {
              uid: 'AccessoryBrandLinksNavNode',
              children: [
                {
                  uid: 'KingstonBrandNavNode',
                  entries: [
                    {
                      item: {
                        external: false,
                        linkName: 'Kingston',
                        target: 'SAMEWINDOW',
                        url: '/Brands/Kingston/c/brand_18'
                      },
                      itemId: 'KingstonBrandCategoryLink'
                    }
                  ]
                },
                {
                  uid: 'IciduBrandNavNode',
                  entries: [
                    {
                      item: {
                        external: false,
                        linkName: 'Icidu',
                        target: 'SAMEWINDOW',
                        url: '/Brands/ICIDU/c/brand_2171'
                      },
                      itemId: 'IciduBrandCategoryLink'
                    }
                  ]
                },
                {
                  uid: 'TDKBrandNavNode',
                  entries: [
                    {
                      item: {
                        external: false,
                        linkName: 'TDK',
                        target: 'SAMEWINDOW',
                        url: '/Brands/TDK/c/brand_251'
                      },
                      itemId: 'TDKBrandCategoryLink'
                    }
                  ]
                },
                {
                  uid: 'SweexBrandNavNode',
                  entries: [
                    {
                      item: {
                        external: false,
                        linkName: 'Sweex',
                        target: 'SAMEWINDOW',
                        url: '/Brands/Sweex/c/brand_702'
                      },
                      itemId: 'SweexBrandCategoryLink'
                    }
                  ]
                }
              ],
              title: 'Accessories'
            }
          ],
          title: 'Brands'
        },
        {
          uid: 'DigitalCamerasNavNode',
          entries: [
            {
              item: {
                external: false,
                linkName: 'Digital Cameras',
                target: 'SAMEWINDOW',
                url: '/Open-Catalogue/Cameras/Digital-Cameras/c/575'
              },
              itemId: 'DigitalCamerasCategoryLink'
            }
          ],
          children: [
            {
              uid: 'DigitalCompactsNavNode',
              entries: [
                {
                  item: {
                    external: false,
                    linkName: 'Compact Cameras',
                    target: 'SAMEWINDOW',
                    url: '/Open-Catalogue/Cameras/Digital-Cameras/Digital-Compacts/c/576'
                  },
                  itemId: 'DigitalCompactsCategoryLink'
                }
              ]
            },
            {
              uid: 'DigitalSLRNavNode',
              entries: [
                {
                  item: {
                    external: false,
                    linkName: 'SLR Cameras',
                    target: 'SAMEWINDOW',
                    url: '/Open-Catalogue/Cameras/Digital-Cameras/Digital-SLR/c/578'
                  },
                  itemId: 'DigitalSLRCategoryLink'
                }
              ]
            }
          ],
          title: 'Digital Cameras'
        },
        {
          uid: 'FilmCamerasNavNode',
          entries: [
            {
              item: {
                external: false,
                linkName: 'Film Cameras',
                target: 'SAMEWINDOW',
                url: '/Open-Catalogue/Cameras/Film-Cameras/c/574'
              },
              itemId: 'FilmCamerasCategoryLink'
            }
          ],
          title: 'Film Cameras'
        },
        {
          uid: 'HandheldCamcordersNavNode',
          entries: [
            {
              item: {
                external: false,
                linkName: 'Hand Held Camcorders',
                target: 'SAMEWINDOW',
                url: '/Open-Catalogue/Cameras/Hand-held-Camcorders/c/584'
              },
              itemId: 'HandheldCamcordersCategoryLink'
            }
          ],
          title: 'Hand Held Camcorders'
        },
        {
          uid: 'WebcamsNavNode',
          entries: [
            {
              item: {
                external: false,
                linkName: 'Webcams',
                target: 'SAMEWINDOW',
                url: '/Open-Catalogue/Cameras/Webcams/c/577'
              },
              itemId: 'WebcamsCategoryLink'
            }
          ],
          title: 'Webcams'
        },
        {
          uid: 'PowerSuppliesNavNode',
          entries: [
            {
              item: {
                external: false,
                linkName: 'Power Supplies',
                target: 'SAMEWINDOW',
                url: '/Open-Catalogue/Components/Power-Supplies/c/816'
              },
              itemId: 'PowerSuppliesCategoryLink'
            }
          ],
          title: 'Power Supplies'
        },
        {
          uid: 'FlashMemoryNavNode',
          entries: [
            {
              item: {
                external: false,
                linkName: 'Flash Memory',
                target: 'SAMEWINDOW',
                url: '/Open-Catalogue/Data-storage/Flash-Memory/c/902'
              },
              itemId: 'FlashMemoryCategoryLink'
            }
          ],
          title: 'Flash Memory'
        },
        {
          uid: 'CameraAccessoriesNavNode',
          entries: [
            {
              item: {
                external: false,
                linkName: 'Camera Accessories & Supplies',
                target: 'SAMEWINDOW',
                url: '/Open-Catalogue/Cameras/Camera-Accessories-26-Supplies/c/585'
              },
              itemId: 'CameraAccessoriesCategoryLink'
            }
          ],
          children: [
            {
              uid: 'AccessoriesNavNode',
              children: [
                {
                  uid: 'CamerasFlashesNavNode',
                  entries: [
                    {
                      item: {
                        external: false,
                        linkName: 'Camera Flashes',
                        target: 'SAMEWINDOW',
                        url: '/Open-Catalogue/Cameras/Camera-Accessories-26-Supplies/Camera-Flashes/c/586'
                      },
                      itemId: 'CamerasFlashesCategoryLink'
                    }
                  ]
                },
                {
                  uid: 'TripodsNavNode',
                  entries: [
                    {
                      item: {
                        external: false,
                        linkName: 'Tripods',
                        target: 'SAMEWINDOW',
                        url: '/Open-Catalogue/Cameras/Camera-Accessories-26-Supplies/Tripods/c/587'
                      },
                      itemId: 'TripodsCategoryLink'
                    }
                  ]
                },
                {
                  uid: 'CameraLensesNavNode',
                  entries: [
                    {
                      item: {
                        external: false,
                        linkName: 'Camera Lenses',
                        target: 'SAMEWINDOW',
                        url: '/Open-Catalogue/Cameras/Camera-Accessories-26-Supplies/Camera-Lenses/c/588'
                      },
                      itemId: 'CameraLensesCategoryLink'
                    }
                  ]
                }
              ],
              title: 'Accessories'
            },
            {
              uid: 'SuppliesNavNode',
              children: [
                {
                  uid: 'ColourFilmsNavNode',
                  entries: [
                    {
                      item: {
                        external: false,
                        linkName: 'Color Films',
                        target: 'SAMEWINDOW',
                        url: '/Open-Catalogue/Cameras/Camera-Accessories-26-Supplies/Colour-Films/c/597'
                      },
                      itemId: 'ColourFilmsCategoryLink'
                    }
                  ]
                },
                {
                  uid: 'BlackAndWhiteFilmsNavNode',
                  entries: [
                    {
                      item: {
                        external: false,
                        linkName: 'Black & White Films',
                        target: 'SAMEWINDOW',
                        url: '/Open-Catalogue/Cameras/Camera-Accessories-26-Supplies/Black-26-White-Films/c/598'
                      },
                      itemId: 'BlackAndWhiteFilmsCategoryLink'
                    }
                  ]
                },
                {
                  uid: 'BlankVideotapesNavNode',
                  entries: [
                    {
                      item: {
                        external: false,
                        linkName: 'Blank Videotapes',
                        target: 'SAMEWINDOW',
                        url: '/Open-Catalogue/Cameras/Camera-Accessories-26-Supplies/Blank-Video-Tapes/c/604'
                      },
                      itemId: 'BlankVideotapesCategoryLink'
                    }
                  ]
                }
              ],
              title: 'Supplies'
            }
          ],
          title: 'Camera Accessories & Supplies'
        }
      ]
    }
  };

  /*const componentData = {
    uid: 'MockNavigationComponent',
    typeCode: 'NavigationComponent',
    name: 'TestNavigationComponent',
    type: 'Navigation Component',
    styleClass: 'nav-order-tools',
    navigationNode: {
      uid: 'MockNavigationNode001',
      children: [
        {
          uid: 'MockChildNode001',
          entries: [
            {
              linkItem: {
                external: false,
                linkName: 'MockLinkName001',
                target: 'SAMEWINDOW',
                url: '/mockLinkName001'
              },
              itemId: 'MockLink001'
            }
          ]
        },
        {
          uid: 'MockChildNode002',
          entries: [
            {
              linkItem: {
                external: false,
                linkName: 'MockLinkName002',
                target: 'SAMEWINDOW',
                url: '/mockLinkName002'
              },
              itemId: 'MockLink002'
            }
          ]
        }
      ]
    }
  };*/

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MatMenuModule,
          MatIconModule,
          CategoryNavigationModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            cms: combineReducers(fromCmsReducer.reducers)
          }),
          RouterTestingModule
        ],
        providers: [{ provide: ConfigService, useClass: UseConfigService }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryNavigationComponent);
    categoryNavigationComponent = fixture.componentInstance;

    el = fixture.debugElement;

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(of(componentData));
  });

  it('should be created', () => {
    expect(categoryNavigationComponent).toBeTruthy();
  });

  it('should contain cms content in the html rendering after bootstrap', () => {
    expect(categoryNavigationComponent.component).toBeNull();
    categoryNavigationComponent.bootstrap();
    expect(categoryNavigationComponent.component).toBe(componentData);

    // TODO: after replacing material with boothstrap4, need some ui test here
  });
});

