import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { LinkComponent } from './link.component';
import { CmsModuleConfig } from '../../cms/cms-module-config';
import { CmsService } from '../../cms/facade/cms.service';

const UseCmsModuleConfig: CmsModuleConfig = {
  cmsComponents: {
    CMSLinkComponent: { selector: 'LinkComponent' }
  }
};

describe('LinkComponent', () => {
  let linkComponent: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;
  let el: DebugElement;

  const componentData = {
    uid: '001',
    typeCode: 'CMSLinkComponent',
    modifiedTime: '2017-12-21T18:15:15+0000',
    name: 'TestCMSLinkComponent',
    type: 'link',
    linkName: 'Arbitrary link name',
    url: 'http://localhost:8888/'
  };

  const MockCmsService = {
    getComponentData: () => of(componentData)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LinkComponent],
      providers: [
        { provide: CmsService, useValue: MockCmsService },
        { provide: CmsModuleConfig, useValue: UseCmsModuleConfig }
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
    expect(linkComponent.component).toBeNull();
    linkComponent.onCmsComponentInit(componentData.uid);
    expect(linkComponent.component).toBe(componentData);
    expect(el.query(By.css('a')).nativeElement.textContent).toEqual(
      linkComponent.component.linkName
    );
    expect(el.query(By.css('a')).nativeElement.url).toEqual(
      linkComponent.component.link
    );
  });
});
