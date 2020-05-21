import { TestBed, ComponentFixture } from '@angular/core/testing';

import { GigyaRaasComponent } from './gigya-raas.component';
import { GigyaConfig } from '../../config';
import { GigyaRaasComponentData } from '../cms.model';
import { CmsComponentData } from '@spartacus/storefront';
import {
  CmsComponent,
  User,
  UserService,
  AuthRedirectService,
  GlobalMessageService,
  GlobalMessageType,
  BaseSiteService,
  UserToken,
  OCC_USER_ID_CURRENT,
} from '@spartacus/core';
import { of, Observable } from 'rxjs';
import { GigyaAuthService } from '../../auth/facade/gigya-auth.service';

declare var window: Window;

interface Window {
  gigya?: any;
}

const mockToken = {
  userId: 'user@sap.com',
  refresh_token: 'foo',
  access_token: 'testToken-access-token',
} as UserToken;

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

class MockGigyaAuthService {
  authorizeWithCustomGigyaFlow(): void {}

  getUserToken(): Observable<UserToken> {
    return of();
  }
}

class MockUserService {
  updatePersonalDetails(_userDetails: User): void {}
}

class MockAuthRedirectService {
  redirect() {}
}

class MockGlobalMessageService {
  remove(_type: GlobalMessageType, _index?: number) {}
}

class BaseSiteServiceStub {
  getActive(): Observable<string> {
    return of();
  }
}

describe('GigyaRaasComponent', () => {
  let component: GigyaRaasComponent;
  let fixture: ComponentFixture<GigyaRaasComponent>;
  let authService: GigyaAuthService;
  let userService: UserService;
  let authRedirectService: AuthRedirectService;
  let globalMessageService: GlobalMessageService;
  let baseSiteService: BaseSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GigyaRaasComponent],

      providers: [
        { provide: GigyaConfig, useValue: sampleGigyaConfig },
        { provide: CmsComponentData, useValue: MockCmsComponentData },
        { provide: GigyaAuthService, useClass: MockGigyaAuthService },
        { provide: UserService, useClass: MockUserService },
        { provide: AuthRedirectService, useClass: MockAuthRedirectService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: BaseSiteService, useClass: BaseSiteServiceStub },
      ],
    });
    authService = TestBed.inject(GigyaAuthService);
    userService = TestBed.inject(UserService);
    authRedirectService = TestBed.inject(AuthRedirectService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    baseSiteService = TestBed.inject(BaseSiteService);
    fixture = TestBed.createComponent(GigyaRaasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update personal details', () => {
    spyOn(userService, 'updatePersonalDetails');
    const response: any = {
      profile: {
        firstName: 'firstName',
        lastName: 'lastName',
      },
    };

    component.onProfileUpdateEventHandler(response);

    expect(userService.updatePersonalDetails).toHaveBeenCalledTimes(1);
  });

  it('should not update personal details', () => {
    spyOn(userService, 'updatePersonalDetails');
    const response: any = undefined;

    component.onProfileUpdateEventHandler(response);

    expect(userService.updatePersonalDetails).toHaveBeenCalledTimes(0);
  });

  it('should login user when on login event is triggered', () => {
    spyOn(authService, 'authorizeWithCustomGigyaFlow');
    spyOn(authRedirectService, 'redirect');
    spyOn(globalMessageService, 'remove');

    const testToken = { ...mockToken, userId: OCC_USER_ID_CURRENT };
    spyOn(authService, 'getUserToken').and.returnValue(of(testToken));

    const response: any = {
      UID: 'UID',
      UIDSignature: 'UIDSignature',
      signatureTimestamp: 'signatureTimestamp',
      id_token: 'id_token',
    };

    component.onLoginEventHandler(response);

    expect(authService.authorizeWithCustomGigyaFlow).toHaveBeenCalledTimes(1);
    expect(globalMessageService.remove).toHaveBeenCalledTimes(1);
    expect(authRedirectService.redirect).toHaveBeenCalledTimes(1);
  });

  it('should not login user when on login event is triggered', () => {
    spyOn(authService, 'authorizeWithCustomGigyaFlow');
    spyOn(authRedirectService, 'redirect');
    spyOn(globalMessageService, 'remove');

    spyOn(authService, 'getUserToken').and.returnValue(of());

    const response: any = {
      UID: 'UID',
      UIDSignature: 'UIDSignature',
      signatureTimestamp: 'signatureTimestamp',
      id_token: 'id_token',
    };

    component.onLoginEventHandler(response);

    expect(authService.authorizeWithCustomGigyaFlow).toHaveBeenCalledTimes(1);
    expect(globalMessageService.remove).toHaveBeenCalledTimes(0);
    expect(authRedirectService.redirect).toHaveBeenCalledTimes(0);
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
