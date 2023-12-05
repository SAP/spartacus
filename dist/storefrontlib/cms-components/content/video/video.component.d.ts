import { ChangeDetectorRef } from '@angular/core';
import { CmsService, CmsVideoComponent, SemanticPathService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { Media } from '../../../shared/components/media/media.model';
import { MediaService } from '../../../shared/components/media/media.service';
import * as i0 from "@angular/core";
export declare class VideoComponent {
    protected component: CmsComponentData<CmsVideoComponent>;
    protected mediaService: MediaService;
    protected urlService: SemanticPathService;
    protected cmsService: CmsService;
    protected cd: ChangeDetectorRef;
    styleClasses: string | undefined;
    source: string | undefined;
    thumbnail: Media | undefined;
    routerLink: string | any[] | undefined;
    autoPlay: boolean;
    loop: boolean;
    mute: string | undefined;
    data$: Observable<CmsVideoComponent>;
    constructor(component: CmsComponentData<CmsVideoComponent>, mediaService: MediaService, urlService: SemanticPathService, cmsService: CmsService, cd: ChangeDetectorRef);
    protected setMedia(data: CmsVideoComponent): void;
    protected setControls(data: CmsVideoComponent): void;
    protected setRouting(data: CmsVideoComponent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<VideoComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VideoComponent, "cx-video", never, {}, {}, never, never, false, never>;
}
