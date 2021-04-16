import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GigyaRaasComponentData } from '@spartacus/cdc/core';
import { CdcConfig, CdcJsService } from '@spartacus/cdc/root';
import {
  BaseSiteService,
  CmsComponent,
  LanguageService,
  MockTranslatePipe,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { GigyaRaasComponent } from './gigya-raas.component';

declare var window: Window;

interface Window {
  gigya?: any;
}

const sampleCdcConfig: CdcConfig = {
  cdc: [
    {
      baseSite: 'electronics-spa',
      javascriptUrl: 'sample-url',
      sessionExpiration: 120,
    },
  ],
};

const sampleComponentData: GigyaRaasComponentData = {
  uid: 'uid',
  name: 'name',
  screenSet: 'screenSet',
  profileEdit: 'profileEdit',
  embed: 'embed',
  startScreen: 'startScreen',
  containerID: 'containerID',
  linkText: 'linkText',
  advancedConfiguration: 'advancedConfiguration',
};

const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
  data$: of(sampleComponentData),
  uid: 'test',
};

const defaultLang = 'en';
const defaultSite = 'electronics-spa';

class BaseSiteServiceStub {
  getActive(): Observable<string> {
    return of(defaultSite);
  }
}

class CdcJsServiceStub {
  didLoad(): Observable<boolean> {
    return of(true);
  }
  didScriptFailToLoad(): Observable<boolean> {
    return of(false);
  }
}

class LanguageServiceStub {
  getActive(): Observable<string> {
    return of(defaultLang);
  }
}

describe('GigyaRaasComponent', () => {
  let component: GigyaRaasComponent;
  let fixture: ComponentFixture<GigyaRaasComponent>;
  let baseSiteService: BaseSiteService;
  let cdcJsService: CdcJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GigyaRaasComponent, MockTranslatePipe],
      providers: [
        { provide: CdcConfig, useValue: sampleCdcConfig },
        { provide: CmsComponentData, useValue: MockCmsComponentData },
        { provide: BaseSiteService, useClass: BaseSiteServiceStub },
        { provide: CdcJsService, useClass: CdcJsServiceStub },
        { provide: LanguageService, useClass: LanguageServiceStub },
      ],
    });
    baseSiteService = TestBed.inject(BaseSiteService);
    cdcJsService = TestBed.inject(CdcJsService);
    fixture = TestBed.createComponent(GigyaRaasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('displayInEmbedMode', () => {
    it('should return true when embed and containerId are set', () => {
      const sampleData: GigyaRaasComponentData = {
        embed: 'true',
        containerID: 'containerID',
      };

      expect(component.displayInEmbedMode(sampleData)).toBeTrue();
    });

    it('should return false when containerId is not set', () => {
      const sampleData: GigyaRaasComponentData = {
        embed: 'true',
        containerID: '',
      };

      expect(component.displayInEmbedMode(sampleData)).toBeFalse();
    });

    it('should return false when embed is false', () => {
      const sampleData: GigyaRaasComponentData = {
        embed: 'false',
        containerID: 'containerID',
      };

      expect(component.displayInEmbedMode(sampleData)).toBeFalse();
    });
  });

  describe('showScreenSet', () => {
    beforeEach(() => {
      window.gigya = {
        accounts: {
          showScreenSet: () => {},
        },
      };
      spyOn(window.gigya.accounts, 'showScreenSet');
    });

    it('should show login embed according to component data', () => {
      component.showScreenSet(
        {
          ...sampleComponentData,
          profileEdit: '',
          embed: 'true',
        },
        defaultLang
      );
      expect(window.gigya.accounts.showScreenSet).toHaveBeenCalledWith({
        screenSet: 'screenSet',
        startScreen: 'startScreen',
        lang: 'en',
        containerID: 'containerID',
        sessionExpiration: 120,
      });
    });

    it('should show profile update embed according to component data', () => {
      component.showScreenSet(
        {
          ...sampleComponentData,
          profileEdit: 'true',
          embed: 'true',
        },
        defaultLang
      );
      expect(window.gigya.accounts.showScreenSet).toHaveBeenCalledWith({
        screenSet: 'screenSet',
        startScreen: 'startScreen',
        lang: 'en',
        containerID: 'containerID',
        onAfterSubmit: jasmine.any(Function),
      });
    });

    it('should show login link according to component data', () => {
      spyOn(baseSiteService, 'getActive').and.callFake(() => of('electronics'));
      component.showScreenSet(
        {
          ...sampleComponentData,
          containerID: '',
          embed: 'false',
          profileEdit: '',
        },
        defaultLang
      );
      expect(window.gigya.accounts.showScreenSet).toHaveBeenCalledWith({
        screenSet: 'screenSet',
        startScreen: 'startScreen',
        lang: 'en',
        sessionExpiration: 3600,
      });
    });

    it('should show profile update link according to component data', () => {
      component.showScreenSet(
        {
          ...sampleComponentData,
          containerID: '',
          embed: 'false',
          profileEdit: 'true',
        },
        defaultLang
      );
      expect(window.gigya.accounts.showScreenSet).toHaveBeenCalledWith({
        screenSet: 'screenSet',
        startScreen: 'startScreen',
        lang: 'en',
        onAfterSubmit: jasmine.any(Function),
      });
    });
  });

  it('should not render anything if script is not loaded', () => {
    spyOn(cdcJsService, 'didLoad').and.callFake(() => of(false));
    component.ngOnInit();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.popup-link'))).toBeFalsy();
  });

  it('should render error message if script failed to load', () => {
    spyOn(cdcJsService, 'didLoad').and.callFake(() => of(false));
    spyOn(cdcJsService, 'didScriptFailToLoad').and.callFake(() => of(true));
    component.ngOnInit();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.js-error'))).toBeTruthy();
  });
});
