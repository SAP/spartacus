import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CmsComponent, CmsLinkComponent } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { of } from 'rxjs';
import { GenericLinkModule } from '../../../shared/components/generic-link/generic-link.module';
import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
  let linkComponent: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;
  let el: DebugElement;

  const componentData: CmsLinkComponent = {
    uid: '001',
    typeCode: 'CMSLinkComponent',
    name: 'TestCMSLinkComponent',
    linkName: 'Arbitrary link name',
    url: '/store-finder',
  };

  const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
    data$: of(componentData),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, GenericLinkModule],
      declarations: [LinkComponent],
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData,
        },
      ],
    }).compileComponents();

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
    expect(element.href).toContain(componentData.url);
  });

  describe('getTarget()', () => {
    it('should return null by default', () => {
      expect(linkComponent.getTarget({})).toBeNull();
    });

    it('should return null for non-external page', () => {
      expect(linkComponent.getTarget({ target: 'false' })).toBeNull();
    });

    it('should return _blank for external page', () => {
      expect(linkComponent.getTarget({ target: 'true' })).toEqual('_blank');
    });

    describe('boolean values', () => {
      it('should return null for false', () => {
        expect(linkComponent.getTarget({ target: false as any })).toBeNull();
      });

      it('should return _blank for true', () => {
        expect(linkComponent.getTarget({ target: true as any })).toEqual(
          '_blank'
        );
      });
    });
  });
});
