import { TestBed, ComponentFixture } from '@angular/core/testing';

import { GigyaRaasComponent } from './gigya-raas.component';
import { GigyaConfig } from '../../config';
import { GigyaRaasComponentData } from '../cms.model';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsComponent, BaseSiteService } from '@spartacus/core';
import { of, Observable } from 'rxjs';

declare var window: Window;

interface Window {
  gigya?: any;
}

const sampleGigyaConfig: GigyaConfig = {
  gigya: [
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
  container: 'container',
  screenSet: 'screenSet',
  profileEdit: 'profileEdit',
  showAnonymous: true,
  embed: 'embed',
  startScreen: 'startScreen',
  showLoggedIn: false,
  containerID: 'containerID',
  linkText: 'linkText',
  advancedConfiguration: 'advancedConfiguration',
};

const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
  data$: of(sampleComponentData),
  uid: 'test',
};

class BaseSiteServiceStub {
  getActive(): Observable<string> {
    return of();
  }
}

describe('GigyaRaasComponent', () => {
  let component: GigyaRaasComponent;
  let fixture: ComponentFixture<GigyaRaasComponent>;
  let baseSiteService: BaseSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GigyaRaasComponent],

      providers: [
        { provide: GigyaConfig, useValue: sampleGigyaConfig },
        { provide: CmsComponentData, useValue: MockCmsComponentData },
        { provide: BaseSiteService, useClass: BaseSiteServiceStub },
      ],
    });
    baseSiteService = TestBed.inject(BaseSiteService);
    fixture = TestBed.createComponent(GigyaRaasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display screen set in embed mode', () => {
    const sampleData: GigyaRaasComponentData = {
      embed: 'true',
      containerID: 'containerID',
    };

    expect(component.displayInEmbedMode(sampleData)).toBeTrue();
  });

  it('should display not screen set in embed mode', () => {
    const sampleData: GigyaRaasComponentData = {
      embed: 'false',
      containerID: 'containerID',
    };

    expect(component.displayInEmbedMode(sampleData)).toBeFalse();
  });

  it('should display not screen set in embed mode when container id is missing', () => {
    const sampleData: GigyaRaasComponentData = {
      embed: 'true',
      containerID: '',
    };

    expect(component.displayInEmbedMode(sampleData)).toBeFalse();
  });

  it('should display login screen set in embed mode', () => {
    window.gigya = {};
    window.gigya.accounts = {
      showScreenSet: function () {},
    };
    component.renderScreenSet = true;
    const sampleData: GigyaRaasComponentData = {
      profileEdit: 'false',
      containerID: '',
      screenSet: '',
      startScreen: '',
    };
    const site = 'electronics-spa';
    spyOn(baseSiteService, 'getActive').and.returnValue(of(site));

    component.displayScreenSetInEmbedMode(sampleData);

    expect(component.renderScreenSet).toBeFalse();
  });

  it('should display profile update screen set in embed mode', () => {
    window.gigya = {};
    window.gigya.accounts = {
      showScreenSet: function () {},
    };
    component.renderScreenSet = true;
    const sampleData: GigyaRaasComponentData = {
      profileEdit: 'true',
      containerID: '',
      screenSet: '',
      startScreen: '',
    };
    const site = 'electronics-spa';
    spyOn(baseSiteService, 'getActive').and.returnValue(of(site));

    component.displayScreenSetInEmbedMode(sampleData);

    expect(component.renderScreenSet).toBeFalse();
  });

  it('should display login screen set in popup mode', () => {
    window.gigya = {};
    window.gigya.accounts = {
      showScreenSet: function () {},
    };
    component.renderScreenSet = true;
    const sampleData: GigyaRaasComponentData = {
      profileEdit: 'false',
      containerID: '',
      screenSet: '',
      startScreen: '',
    };
    const site = 'electronics-spa';
    spyOn(baseSiteService, 'getActive').and.returnValue(of(site));

    component.displayScreenSetInPopupMode(sampleData);

    expect(component.renderScreenSet).toBeTrue();
  });

  it('should display profile update screen set in popup mode', () => {
    window.gigya = {};
    window.gigya.accounts = {
      showScreenSet: function () {},
    };
    component.renderScreenSet = true;
    const sampleData: GigyaRaasComponentData = {
      profileEdit: 'true',
      containerID: '',
      screenSet: '',
      startScreen: '',
    };
    const site = 'electronics-spa';
    spyOn(baseSiteService, 'getActive').and.returnValue(of(site));

    component.displayScreenSetInPopupMode(sampleData);

    expect(component.renderScreenSet).toBeTrue();
  });
});
