import { Injectable } from '@angular/core';

@Injectable()
export class StubService {
    private stubData = {
        'index/components': {
            page: 'home',
            pageType: 'ContentPage',
            pageLabel: 'index',
            components: [
                {
                    uid: 'uid1',
                    position: 'position1',
                    typeCode: 'CMSLinkComponent',
                    url: '/',
                    linkName: 'home'
                },
                {
                    uid: 'uid2',
                    position: 'position1',
                    typeCode: 'CmsParagraphComponent',
                    content: '<p>the content for <b>UID2</b></p>'
                }
            ]
        },
        'page/index/templates/components': {
            page: 'home',
            pageType: 'ContentPage',
            pageLabel: 'home page'
        },
        'page/cart/components': {
            page: 'cart',
            pageType: 'ContentPage',
            pageLabel: 'cart',
            components: [
                {
                    uid: 'uid3',
                    position: 'position1',
                    typeCode: 'CmsParagraphComponent',
                    content: '<p>the content for uid3</p>'
                }
            ]
        },
        'page/cart/templates/components': {
            page: 'cart',
            pageType: 'ContentPage',
            pageLabel: 'cart page'
        },
        'page/myaccount/components': {
            page: 'myaccount',
            pageType: 'ContentPage',
            pageLabel: 'myaccount',
            components: [
                {
                    uid: 'uid3',
                    position: 'position1',
                    typeCode: 'CmsParagraphComponent',
                    content: '<p>the content for uid3</p>'
                }
            ]
        },
    }
    
    constructor() { }
    
    hasData(url) {
        return this.stubData.hasOwnProperty(url);
    }

    getData(url) {
        return this.stubData[url];
    }
}
