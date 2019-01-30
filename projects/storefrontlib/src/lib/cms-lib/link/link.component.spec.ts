import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { LinkComponent } from './link.component';
import { CmsComponentData } from '@spartacus/storefront';
import {
  CmsLinkComponent,
  Component as SpaComponent,
  TranslateUrlOptions,
  CmsConfig
} from '@spartacus/core';

const UseCmsModuleConfig: CmsConfig = {
  cmsComponents: {
    CMSLinkComponent: { selector: 'LinkComponent' }
  }
};

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(options: TranslateUrlOptions): string | string[] {
    return '/translated-path' + options.url;
  }
}

describe('LinkComponent', () => {
  let linkComponent: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;
  let el: DebugElement;

  const componentData: CmsLinkComponent = {
    uid: '001',
    typeCode: 'CMSLinkComponent',
    name: 'TestCMSLinkComponent',
    linkName: 'Arbitrary link name',
    url: '/store-finder'
  };

  const MockCmsComponentData = <CmsComponentData<SpaComponent>>{
    data$: of(componentData)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LinkComponent, MockTranslateUrlPipe],
      providers: [
        { provide: CmsConfig, useValue: UseCmsModuleConfig },
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkComponent);
    linkComponent = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create link component', () => {
    expect(linkComponent).toBeTruthy();
  });

  it('should contain link name and url', () => {
    fixture.detectChanges();
    const element: HTMLLinkElement = el.query(By.css('a')).nativeElement;

    expect(element.textContent).toEqual(componentData.linkName);
    expect(element.href).toContain('/translated-path' + componentData.url);
  });
});
