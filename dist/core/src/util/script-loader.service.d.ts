import * as i0 from "@angular/core";
export declare enum ScriptPlacement {
    HEAD = "head",
    BODY = "body"
}
export declare class ScriptLoader {
    protected document: any;
    protected platformId: Object;
    constructor(document: any, platformId: Object);
    /**
     * Embeds a javascript from an external URL.
     *
     * @param embedOptions
     * src: URL for the script to be loaded
     * params: additional parameters to be attached to the given URL
     * attributes: the attributes of HTML script tag (exclude src)
     * callback: a function to be invoked after the script has been loaded
     * errorCallback: function to be invoked after error during script loading
     * placement: HTML body or head where script will be placed
     */
    embedScript(embedOptions: {
        src: string;
        params?: Object;
        attributes?: Object;
        callback?: EventListener;
        errorCallback?: EventListener;
        placement?: ScriptPlacement;
    }): void;
    /**
     * Indicates if the script is already added to the DOM.
     */
    protected hasScript(src?: string): boolean;
    /**
     * Parses the given object with parameters to a string "param1=value1&param2=value2"
     * @param params object containing parameters
     */
    private parseParams;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScriptLoader, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ScriptLoader>;
}
