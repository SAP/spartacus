import { Component, DebugElement, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AnonymousConsentsConfig,
  AuthService,
  CmsNavigationComponent,
  I18nTestingModule,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { AnonymousConsentsDialogComponent } from '../../../shared/components/anonymous-consents/dialog/anonymous-consents-dialog.component';
import { ModalOptions, ModalRef, ModalService } from '../../../shared/index';
import { NavigationNode } from '../navigation/navigation-node.model';
import { NavigationComponent } from '../navigation/navigation.component';
import { NavigationService } from '../navigation/navigation.service';
import { FooterNavigationComponent } from './footer-navigation.component';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-navigation-ui',
  template: '',
})
class MockNavigationUIComponent {
  @Input() flyout = true;
  @Input() node: NavigationNode;
}

class MockAuthService {
  isUserLoggedIn(): Observable<boolean> {
    return of(false);
  }
}

class MockModalService {
  open(_content: any, _options?: ModalOptions): ModalRef {
    return undefined;
  }
}

const mockAnonymousConsentsConfig: AnonymousConsentsConfig = {
  anonymousConsents: {
    footerLink: true,
  },
};

@Component({
  selector: 'cx-generic-link',
  template: '<ng-content></ng-content>',
})
class MockGenericLinkComponent {
  @Input() url: string | any[];
  @Input() target: string;
}

describe('FooterNavigationComponent', () => {
  let component: FooterNavigationComponent;
  let fixture: ComponentFixture<FooterNavigationComponent>;
  let element: DebugElement;
  let config: AnonymousConsentsConfig;
  let modalService: ModalService;

  const mockLinks: NavigationNode[] = [
    {
      title: 'Test child 1',
      url: '/test1',
      target: true,
    },
    {
      title: 'Test child 2',
      url: '/',
      target: false,
    },
  ];

  const mockCmsComponentData = <CmsNavigationComponent>{
    styleClass: 'footer-styling',
  };

  const MockCmsNavigationComponent = <CmsComponentData<any>>{
    data$: of(mockCmsComponentData),
  };

  const mockNavigationService = {
    getNavigationNode: createSpy().and.returnValue(of(null)),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [
        FooterNavigationComponent,
        NavigationComponent,
        MockNavigationUIComponent,
        MockGenericLinkComponent,
      ],
      providers: [
        {
          provide: NavigationService,
          useValue: mockNavigationService,
        },
        {
          provide: CmsComponentData,
          useValue: MockCmsNavigationComponent,
        },
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        {
          provide: ModalService,
          useClass: MockModalService,
        },
        {
          provide: AnonymousConsentsConfig,
          useValue: mockAnonymousConsentsConfig,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterNavigationComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    config = TestBed.get(AnonymousConsentsConfig);
    modalService = TestBed.get(ModalService as Type<ModalService>);

    component.node$ = of({
      children: [
        {
          title: 'Test 1',
          url: '/',
          children: mockLinks,
        },
      ],
    });

    fixture.detectChanges();
  });

  it('should create FooterNavigationComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should add the component styleClass', () => {
    const navigationUI = element.query(By.css('cx-navigation-ui'));
    expect(navigationUI.nativeElement.classList).toContain('footer-styling');
  });

  describe('showConsentPreferences', () => {
    it('should return true if the authService.isUserLoggedIn() returns false', () => {
      let result = false;
      component.showConsentPreferences
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result).toEqual(true);
    });
    it('should return false if the config is false', () => {
      config.anonymousConsents.footerLink = false;
      let result = true;
      component.showConsentPreferences
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result).toEqual(false);
    });
  });

  describe('consent preferences link', () => {
    it('should be visible when the user is NOT logged in', () => {
      spyOnProperty(component, 'showConsentPreferences').and.returnValue(
        of(true)
      );
      const consentPreferences = element.query(By.css('.anonymous-consents'));
      expect(consentPreferences).toBeTruthy();
    });
  });

  describe('openDialog', () => {
    it('should call modalService.open', () => {
      spyOn(modalService, 'open').and.stub();
      component.openDialog();
      expect(modalService.open).toHaveBeenCalledWith(
        AnonymousConsentsDialogComponent,
        {
          centered: true,
          size: 'lg',
          scrollable: true,
        }
      );
    });
  });
});
