import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';
import { FooterNavigationComponent } from './footer-navigation.component';
import * as fromRoot from '../../routing/store';
import * as fromCmsReducer from '../../cms/store/reducers';
import { ConfigService } from '../../cms/config.service';
import { MatListModule, MatCardModule } from '@angular/material';

class UseConfigService {
  cmsComponentMapping = {
    FooterNavigationComponent: 'FooterNavigationComponent'
  };
}

// Test Data

export interface Link {
  itemId: string;
  external: boolean;
  linkName: string;
  target: string;
  url: string;
}

export interface Entry {
  linkItem?: Link;
  itemId: string;
}

export interface NavigationNode {
  uid: string;
  children?: NavigationNode[];
  title?: string;
  entries?: Entry[];
}

export class FooterNavigationStubService {
  createLinks(): Link[] {
    const link = [
      {
        itemId: 'AboutAcceleratorLink',
        external: false,
        linkName: 'About Commerce Accelerator',
        target: 'NEWWINDOW',
        url: 'http://www.hybris.com/multichannel-accelerator'
      },
      {
        itemId: 'FAQLink',
        external: false,
        linkName: 'FAQ',
        target: 'SAMEWINDOW',
        url: '/faq'
      }
    ];
    return link;
  }

  createEntry(entry: Entry): { itemId: string } {
    const newEntry: Entry = { itemId: 'testEntry' };
    newEntry.itemId = entry.itemId;
    newEntry.linkItem = this.createLinks().find(
      link => link.itemId === entry.itemId
    );
    return newEntry;
  }

  createNavNode(
    navigationNode: NavigationNode
  ): {
    uid: string;
    children?: NavigationNode[];
    title?: string;
    entries?: Entry[];
  } {
    const newNavigationNode: NavigationNode = { uid: 'testUID' };
    newNavigationNode.uid = navigationNode.uid;
    newNavigationNode.children = navigationNode.children;
    newNavigationNode.title = navigationNode.title;
    newNavigationNode.entries = navigationNode.entries;
    return newNavigationNode;
  }
  getNavigationNodeData() {
    const entry = this.createEntry({ itemId: 'AboutAcceleratorLink' });
    const childAccNavNode = this.createNavNode({
      uid: 'AboutAcceleratorNavNode',
      entries: [entry]
    });
    const childFooterNavNode = this.createNavNode({
      uid: 'AcceleratorNavNode',
      children: [childAccNavNode],
      title: 'Accelerator'
    });
    const footerNavNode = this.createNavNode({
      uid: 'FooterNavNode',
      children: [childFooterNavNode]
    });
    this.createEntry({ itemId: 'AboutAcceleratorLink' });
    return footerNavNode;
  }
}

describe('FooterNavigationComponent', () => {
  let footerNavigationComponent: FooterNavigationComponent;
  let fixture: ComponentFixture<FooterNavigationComponent>;
  let store: Store<fromCmsReducer.CmsState>;
  let el: DebugElement;
  const stubService: FooterNavigationStubService = new FooterNavigationStubService();

  const componentData = {
    uid: 'FooterNavigationComponent',
    typeCode: 'FooterNavigationComponent',
    modifiedTime: '2018-01-05T19:28:34+0000',
    name: 'TestFooterNavigationComponent',
    container: 'false',
    type: 'Footer Navigation Component',
    notice: '© 2016 hybris software',
    navigationNode: stubService.getNavigationNodeData()
  };

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({
            ...fromRoot.reducers,
            cms: combineReducers(fromCmsReducer.reducers)
          }),
          RouterTestingModule,
          MatListModule,
          MatCardModule
        ],
        declarations: [FooterNavigationComponent],
        providers: [{ provide: ConfigService, useClass: UseConfigService }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterNavigationComponent);
    footerNavigationComponent = fixture.componentInstance;
    el = fixture.debugElement;
    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(of(componentData));
  });

  it('should create FooterNavigationComponent in CmsLib', () => {
    expect(footerNavigationComponent).toBeTruthy();
  });

  it('should contain footer navigation component data', () => {
    expect(footerNavigationComponent.component).toBeNull();
    footerNavigationComponent.bootstrap();
    expect(footerNavigationComponent.component).toBe(componentData);
  });

  it('should contain footer navigation node data', () => {
    expect(footerNavigationComponent.component).toBeNull();
    footerNavigationComponent.bootstrap();
    const stubbedNavigationNode = stubService.getNavigationNodeData();
    expect(footerNavigationComponent.component.navigationNode.title).toBe(
      stubbedNavigationNode.title
    );
    expect(footerNavigationComponent.component.navigationNode.children).toEqual(
      stubbedNavigationNode.children
    );
  });
});
