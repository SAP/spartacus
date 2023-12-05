import { OnDestroy } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { PageMeta, PageMetaService, PageRobotsMeta } from '@spartacus/core';
import { PageMetaLinkService } from './page-meta-link.service';
import * as i0 from "@angular/core";
export declare class SeoMetaService implements OnDestroy {
    protected ngTitle: Title;
    protected ngMeta: Meta;
    protected pageMetaService: PageMetaService;
    protected pageMetaLinkService?: PageMetaLinkService | undefined;
    constructor(ngTitle: Title, ngMeta: Meta, pageMetaService: PageMetaService, pageMetaLinkService?: PageMetaLinkService | undefined);
    private subscription;
    init(): void;
    protected set meta(meta: PageMeta);
    protected set title(title: string | undefined);
    protected set description(value: string | undefined);
    protected set image(imageUrl: string | undefined);
    protected set robots(value: PageRobotsMeta[] | undefined);
    /**
     * Add the canonical Url to the head of the page.
     *
     * If the canonical url already exists the link is removed. This is quite
     * unlikely though, since canonical links are (typically) only added in SSR.
     */
    protected set canonicalUrl(url: string | undefined);
    protected addTag(meta: MetaDefinition): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SeoMetaService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SeoMetaService>;
}
