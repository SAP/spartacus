/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A subset of the content types that may be returned by the EPD Visualization service.
 * We use filtering to ensure that we only get visualizations of the types below returned.
 * Some values start with numbers, so the identifiers do not match the values
 */
export var ContentType;
(function (ContentType) {
    /**
     * 3D content (rendered using WebGL)
     */
    ContentType["Model3D"] = "3DModel";
    /**
     * 2D vector content (rendered using SVG)
     */
    ContentType["Drawing2D"] = "2DDrawing";
})(ContentType || (ContentType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9lcGQtdmlzdWFsaXphdGlvbi9yb290L21vZGVscy92aXN1YWxpemF0aW9ucy9jb250ZW50LXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVIOzs7O0dBSUc7QUFDSCxNQUFNLENBQU4sSUFBWSxXQVNYO0FBVEQsV0FBWSxXQUFXO0lBQ3JCOztPQUVHO0lBQ0gsa0NBQW1CLENBQUE7SUFDbkI7O09BRUc7SUFDSCxzQ0FBdUIsQ0FBQTtBQUN6QixDQUFDLEVBVFcsV0FBVyxLQUFYLFdBQVcsUUFTdEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG4vKipcbiAqIEEgc3Vic2V0IG9mIHRoZSBjb250ZW50IHR5cGVzIHRoYXQgbWF5IGJlIHJldHVybmVkIGJ5IHRoZSBFUEQgVmlzdWFsaXphdGlvbiBzZXJ2aWNlLlxuICogV2UgdXNlIGZpbHRlcmluZyB0byBlbnN1cmUgdGhhdCB3ZSBvbmx5IGdldCB2aXN1YWxpemF0aW9ucyBvZiB0aGUgdHlwZXMgYmVsb3cgcmV0dXJuZWQuXG4gKiBTb21lIHZhbHVlcyBzdGFydCB3aXRoIG51bWJlcnMsIHNvIHRoZSBpZGVudGlmaWVycyBkbyBub3QgbWF0Y2ggdGhlIHZhbHVlc1xuICovXG5leHBvcnQgZW51bSBDb250ZW50VHlwZSB7XG4gIC8qKlxuICAgKiAzRCBjb250ZW50IChyZW5kZXJlZCB1c2luZyBXZWJHTClcbiAgICovXG4gIE1vZGVsM0QgPSAnM0RNb2RlbCcsXG4gIC8qKlxuICAgKiAyRCB2ZWN0b3IgY29udGVudCAocmVuZGVyZWQgdXNpbmcgU1ZHKVxuICAgKi9cbiAgRHJhd2luZzJEID0gJzJERHJhd2luZycsXG59XG4iXX0=