import { Component, NgModule } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { ConfigService } from '../../newcms/config.service';
import { NavigationService } from './navigation.service';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

fdescribe('NavigationService', () => {
  let navigationService: NavigationService;

  const mockedData = [
    {
      uid: 'MockNavigationNode001',
      children: [
        {
          uid: 'MockChildNode001',
          entries: [
            {
              item: [
                {
                  external: false,
                  linkName: 'MockLinkName001',
                  target: 'SAMEWINDOW',
                  url: '/mockLinkName001'
                }
              ],
              itemId: 'MockLink001'
            }
          ]
        }
      ]
    },
    {
      uid: 'MockNavigationNode002',
      children: [
        {
          uid: 'MockChildNode002',
          entries: [
            {
              item: [
                {
                  external: false,
                  linkName: 'MockLinkName002',
                  target: 'SAMEWINDOW',
                  url: '/mockLinkName002'
                }
              ],
              itemId: 'MockLink002'
            }
          ]
        }
      ]
    }
  ];

  const mockedNode = {
    uid: 'MockNavigationComponent',
    typeCode: 'NavigationComponent',
    modifiedTime: '2017-12-21T18:15:15+0000',
    name: 'TestNavigationComponent',
    container: 'false',
    type: 'Navigation Component',
    styleClass: 'nav-order-tools',
    navigationNode: [
      {
        uid: 'MockNavigationNode001',
        children: [
          {
            uid: 'MockChildNode001',
            entries: [
              {
                item: [
                  {
                    external: false,
                    linkName: 'MockLinkName001',
                    target: 'SAMEWINDOW',
                    url: '/mockLinkName001'
                  }
                ],
                itemId: 'MockLink001'
              }
            ]
          }
        ]
      },
      {
        uid: 'MockNavigationNode002',
        children: [
          {
            uid: 'MockChildNode002',
            entries: [
              {
                item: [
                  {
                    external: false,
                    linkName: 'MockLinkName002',
                    target: 'SAMEWINDOW',
                    url: '/mockLinkName002'
                  }
                ],
                itemId: 'MockLink002'
              }
            ]
          }
        ]
      }
    ]
  };

  const mockNodeObservable = Observable.of(mockedNode);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationService]
    });

    navigationService = TestBed.get(NavigationService);
  });

  beforeEach(() => {
    spyOn(navigationService, 'createNode').and.returnValue(of(mockedNode));
  });

  it(
    'should inject NavigationService',
    inject([NavigationService], (service: NavigationService) => {
      expect(service).toBeTruthy();
    })
  );

  it('should create a new navigation node', () => {
    const node = navigationService.createNode(mockedData);
    expect(node).toEqual(mockNodeObservable);
  });
});
