import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CmsLinkComponent } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import { GenericLinkModule } from '../../../shared/components/generic-link/generic-link.module';
import { LinkComponent } from './link.component';

const mockLinkData = {
  uid: '001',
  typeCode: 'CMSLinkComponent',
  name: 'TestCMSLinkComponent',
  linkName: 'Arbitrary link name',
  url: '/store-finder',
  styleAttributes: 'color:red; border-color:blue;',
};

const data$: BehaviorSubject<CmsLinkComponent> = new BehaviorSubject(
  mockLinkData
);

class MockCmsComponentData {
  get data$(): Observable<CmsLinkComponent> {
    return data$.asObservable();
  }
}

describe('LinkComponent', () => {
  let linkComponent: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, GenericLinkModule],
      declarations: [LinkComponent],
      providers: [
        {
          provide: CmsComponentData,
          useClass: MockCmsComponentData,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkComponent);
    linkComponent = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create link component', () => {
    expect(linkComponent).toBeTruthy();
  });

  it('should contain link name and url', () => {
    const element: HTMLLinkElement = el.query(By.css('a')).nativeElement;
    expect(element.textContent).toEqual(mockLinkData.linkName);
    expect(element.href).toContain(mockLinkData.url);
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

  describe('styling', () => {
    it('should have style attributes', () => {
      const element: HTMLLinkElement = el.query(By.css('a')).nativeElement;
      expect(element.style.color).toEqual('red');
      expect(element.style.borderColor).toEqual('blue');
    });

    it('should have style classes', () => {
      data$.next({ styleClasses: 'cls-1 cls-2' });
      fixture.detectChanges();

      expect(linkComponent.styleClasses).toContain('cls-1');
      expect(linkComponent.styleClasses).toContain('cls-2');
      expect((el.nativeElement as HTMLElement).classList).toContain('cls-1');
      expect((el.nativeElement as HTMLElement).classList).toContain('cls-2');

      // roll back for other tests
      data$.next(mockLinkData);
    });
  });
});
