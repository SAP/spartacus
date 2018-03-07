import { TestBed, inject } from '@angular/core/testing';
import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let navigationService: NavigationService;

  const mockedData = {
    uid: 'MockNavigationNode001',
    children: [
      {
        uid: 'MockChildNode001',
        entries: [
          {
            linkItem: {
              external: false,
              linkName: 'MockLinkName001',
              target: 'SAMEWINDOW',
              url: '/mockLinkName001'
            },
            itemId: 'MockLink001'
          }
        ]
      },
      {
        uid: 'MockChildNode002',
        entries: [
          {
            linkItem: {
              external: false,
              linkName: 'MockLinkName002',
              target: 'SAMEWINDOW',
              url: '/mockLinkName002'
            },
            itemId: 'MockLink002'
          }
        ]
      }
    ]
  };

  const resultNode = {
    childs: [
      { title: 'MockLinkName001', url: '/mockLinkName001' },
      { title: 'MockLinkName002', url: '/mockLinkName002' }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationService]
    });

    navigationService = TestBed.get(NavigationService);
  });

  it(
    'should inject NavigationService',
    inject([NavigationService], (service: NavigationService) => {
      expect(service).toBeTruthy();
    })
  );

  it('should create a new navigation node', () => {
    const node = navigationService.createNode(mockedData);
    expect(node).toEqual(resultNode);
  });
});
