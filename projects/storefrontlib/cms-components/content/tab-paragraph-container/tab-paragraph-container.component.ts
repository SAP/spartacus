import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  CmsService,
  CMSTabParagraphContainer,
  WindowRef,
} from '@spartacus/core';
// import Globe from 'globe.gl';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
// import TrackballControls from 'three-trackballcontrols';

import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { ComponentWrapperDirective } from '../../../cms-structure/page/component/component-wrapper.directive';
import { CmsComponentData } from '../../../cms-structure/page/model/index';

@Component({
  selector: 'cx-tab-paragraph-container',
  templateUrl: './tab-paragraph-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabParagraphContainerComponent implements AfterViewInit, OnInit {
  activeTabNum = 0;
  ariaLabel: string;

  @ViewChildren(ComponentWrapperDirective)
  children!: QueryList<ComponentWrapperDirective>;

  tabTitleParams: (Observable<any> | null)[] = [];

  @ViewChild('globeViz') globeViz: ElementRef<HTMLElement>;
  // myGlobe = Globe();

  constructor(
    public componentData: CmsComponentData<CMSTabParagraphContainer>,
    protected cmsService: CmsService,
    protected winRef: WindowRef
  ) {}

  components$: Observable<any[]> = this.componentData.data$.pipe(
    distinctUntilChanged((x, y) => x?.components === y?.components),
    tap((data: CMSTabParagraphContainer) => {
      this.ariaLabel = `${data?.uid}.tabPanelContainerRegion`;
    }),
    switchMap((data) =>
      combineLatest(
        (data?.components ?? '').split(' ').map((component) =>
          this.cmsService.getComponentData<any>(component).pipe(
            distinctUntilChanged(),
            map((tab) => {
              if (!tab) {
                return undefined;
              }

              if (!tab.flexType) {
                tab = {
                  ...tab,
                  flexType: tab.typeCode,
                };
              }

              return {
                ...tab,
                title: `${data.uid}.tabs.${tab.uid}`,
              };
            })
          )
        )
      )
    )
  );

  select(tabNum: number, event?: MouseEvent): void {
    this.activeTabNum = this.activeTabNum === tabNum ? -1 : tabNum;
    if (event && event?.target) {
      const target = event.target as HTMLElement;
      const parentNode = target.parentNode as HTMLElement;
      this.winRef?.nativeWindow?.scrollTo({
        left: 0,
        top: parentNode.offsetTop,
        behavior: 'smooth',
      });
    }
  }

  ngOnInit(): void {
    this.activeTabNum =
      this.winRef?.nativeWindow?.history?.state?.activeTab ?? this.activeTabNum;
  }

  ngAfterViewInit(): void {
    // If the sub cms components data exist, the components created before ngAfterViewInit are called.
    // In this case, the title parameters are directly pulled from them.
    if (this.children.length > 0) {
      this.getTitleParams(this.children);
    }

    // const N = 300;
    // const gData = [1,1,1,1,1,1,1,1,1,1,1,1,].map(() => ({
    //   lat: (Math.random() - 0.5) * 180,
    //   lng: (Math.random() - 0.5) * 360,
    //   size: Math.random() / 3,
    //   color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    // }));

    // console.log(this.globeViz);
    // Globe()
    //   .globeImageUrl('http://unpkg.com/three-globe/example/img/earth-night.jpg')
    //   .pointsData(gData)
    //   .pointAltitude('size')
    //   .pointColor('color')
    // (this.globeViz.nativeElement);

    // this.myGlobe(this.globeViz.nativeElement).globeImageUrl(
    //   'https://unpkg.com/three-globe/example/img/earth-night.jpg'
    // ).pointsData([]);

    // const myGlobe = new ThreeGlobe().globeImageUrl(
    //   'http://unpkg.com/three-globe/example/img/earth-night.jpg'
    // );
    // .pointsData(myData);

    // const myScene = new THREE.Scene();
    // myScene.add(myGlobe);

    const gData = [1, 2, 3, 4, 5, 5, 6].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: Math.random() / 3,
      color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
    }));

    const Globe = new ThreeGlobe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .pointsData(gData)
      .pointAltitude('size')
      .pointColor('color');

    setTimeout(() => {
      gData.forEach((d) => (d.size = Math.random()));
      Globe.pointsData(gData);
    }, 4000);

    // Setup renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.globeViz.nativeElement.appendChild(renderer.domElement);

    // Setup scene
    const scene = new THREE.Scene();
    scene.add(Globe);
    scene.add(new THREE.AmbientLight(0xbbbbbb));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

    // Setup camera
    const camera = new THREE.PerspectiveCamera();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera.position.z = 500;

    // Add camera controls
    const tbControls = new TrackballControls(camera, renderer.domElement)();
    tbControls.minDistance = 101;
    tbControls.rotateSpeed = 5;
    tbControls.zoomSpeed = 0.8;

    // Kick-off renderer
    (function animate() {
      // IIFE
      // Frame cycle
      tbControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    })();
  }

  tabCompLoaded(componentRef: any): void {
    this.tabTitleParams.push(componentRef.instance.tabTitleParam$);
  }

  protected getTitleParams(children: QueryList<ComponentWrapperDirective>) {
    children.forEach((comp) => {
      this.tabTitleParams.push(comp['cmpRef']?.instance.tabTitleParam$ ?? null);
    });
  }
}
