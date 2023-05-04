import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConsentTemplate } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CdcSiteConsentComponent } from './cdc-site-consent.component';

const mockConsentTemplate: ConsentTemplate = {
  id: 'terms.of.use',
  name: '',
  description: 'Accept the terms of use to proceed further',
  version: 1,
  documentUrl: 'https://accounts.gigya.com/',
  required: true,
  currentConsent: {
    code: 'terms.of.use',
    consentGivenDate: new Date('3 march 2022'),
    consentWithdrawnDate: undefined,
  },
};
const context$ = of(mockConsentTemplate);

describe('CdcSiteConsentComponent', () => {
  let component: CdcSiteConsentComponent;
  let fixture: ComponentFixture<CdcSiteConsentComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [CdcSiteConsentComponent],
        providers: [
          {
            provide: OutletContextData,
            useValue: { context$ },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CdcSiteConsentComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get consent template from outlet context data', () => {
    component.ngOnInit();
    expect(component.consentTemplate).toEqual(mockConsentTemplate);
  });
});
