import { ElementRef } from '@angular/core';
import {
  calculatePointerMovePosition,
  handleOutOfBounds,
} from './image-zoom-util';

describe('image zoom util', () => {
  describe('handleOutOfBounds', () => {
    it('should handle left bound', () => {
      const imageElement = { height: 100, width: 100 };
      const boundingRect = { height: 100, width: 100, x: 0, y: 0 } as DOMRect;

      const { x, y } = handleOutOfBounds(-1000, 0, imageElement, boundingRect);

      expect(x).toEqual(-90);
      expect(y).toEqual(0);
    });
    it('should handle right bound', () => {
      const imageElement = { height: 100, width: 100 };
      const boundingRect = { height: 100, width: 100, x: 0, y: 0 } as DOMRect;

      const { x, y } = handleOutOfBounds(1000, 0, imageElement, boundingRect);

      expect(x).toEqual(90);
      expect(y).toEqual(0);
    });
    it('should handle top bound', () => {
      const imageElement = { height: 100, width: 100 };
      const boundingRect = { height: 100, width: 100, x: 0, y: 0 } as DOMRect;

      const { x, y } = handleOutOfBounds(0, -1000, imageElement, boundingRect);

      expect(x).toEqual(0);
      expect(y).toEqual(-40);
    });
    it('should handle bottom bound', () => {
      const imageElement = { height: 100, width: 100 };
      const boundingRect = { height: 100, width: 100, x: 0, y: 0 } as DOMRect;

      const { x, y } = handleOutOfBounds(0, 1000, imageElement, boundingRect);

      expect(x).toEqual(0);
      expect(y).toEqual(40);
    });
    it('should handle corners', () => {
      const imageElement = { height: 100, width: 100 };
      const boundingRect = { height: 100, width: 100, x: 0, y: 0 } as DOMRect;

      const { x, y } = handleOutOfBounds(
        1000,
        1000,
        imageElement,
        boundingRect
      );

      expect(x).toEqual(90);
      expect(y).toEqual(40);
    });
  });
  describe('calculatePointerMovePosition', () => {
    it('should calculate the new position', () => {
      const el = new ElementRef({
        clientWidth: 100,
        clientHeight: 100,
        getBoundingClientRect: () => {
          return { left: 50, top: 50 };
        },
      });
      const { positionX, positionY } = calculatePointerMovePosition(el, 20, 20);
      expect(positionX).toEqual(80);
      expect(positionY).toEqual(80);
    });
  });
});
