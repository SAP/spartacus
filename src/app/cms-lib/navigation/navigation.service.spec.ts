import { Component, NgModule } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { ConfigService } from '../../newcms/config.service';
import { NavigationService } from './navigation.service';
import { of } from 'rxjs/observable/of';

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationService]
    });

    navigationService = TestBed.get(NavigationService);
  });

  beforeEach(() => {
    spyOn(navigationService, 'createNode').and.callThrough();
  });

  it(
    'should inject NavigationService',
    inject([NavigationService], (service: NavigationService) => {
      expect(service).toBeTruthy();
    })
  );

  it('should create a new navigation node', () => {
    navigationService.createNode(mockedData);
    expect(navigationService.createNode).toHaveBeenCalled();
  });
});
