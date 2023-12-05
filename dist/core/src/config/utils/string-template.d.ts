export declare class StringTemplate {
    /**
     * Populates the given template with the variables provided
     *
     * @param templateString template of the OCC endpoint
     * @param templateVariables variables to replace in the template
     * @param encodeVariable encode variable before placing it in the template
     */
    static resolve(templateString: string, templateVariables: Object, encodeVariable?: boolean): string;
}
