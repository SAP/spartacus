/**
 * A subset of the content types that may be returned by the EPD Visualization service.
 * We use filtering to ensure that we only get visualizations of the types below returned.
 * Some values start with numbers, so the identifiers do not match the values
 */
export enum ContentType {
  /**
   * 3D content (rendered using WebGL)
   */
  Model3D = '3DModel',
  /**
   * 2D vector content (rendered using SVG)
   */
  Drawing2D = '2DDrawing',
}
