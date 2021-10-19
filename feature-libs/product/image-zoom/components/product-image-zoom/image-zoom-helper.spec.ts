import { ElementRef } from '@angular/core';
import {
  calculatePointerMovePosition,
  handleOutOfBounds,
} from './image-zoom-helper';

describe('Image zoom utils', () => {
  describe('calculatePointerMovePosition', () => {
    const mockElem: ElementRef = {
      nativeElement: {
        clientWidth: 600,
        clientHeight: 400,
        getBoundingClientRect: function () {
          const boundingRect = {
            left: 100,
            top: 100,
            right: 100,
            bottom: 100,
          };
          return boundingRect;
        },
      },
    };

    it('should return correct positions', () => {
      expect(calculatePointerMovePosition(mockElem, 10, 10)).toEqual({
        positionX: 390,
        positionY: 290,
      });
    });
  });

  describe('handleOutOfBounds', () => {
    const mockBoundingRect1 = {
      left: 100,
      top: 100,
      right: 100,
      bottom: 100,
      height: 300,
      width: 300,
      x: 20,
      y: 20,
      toJSON: function () {
        return {};
      },
    };

    const mockBoundingRect2 = {
      left: 100,
      top: 100,
      right: 100,
      bottom: 100,
      height: 70,
      width: 70,
      x: 20,
      y: 20,
      toJSON: function () {
        return {};
      },
    };

    const mockImageElement = {
      height: 200,
      width: 300,
    };

    it('should return correct positions', () => {
      expect(
        handleOutOfBounds(10, -200, mockImageElement, mockBoundingRect1)
      ).toEqual({
        x: 10,
        y: -140,
      });

      expect(
        handleOutOfBounds(10, 200, mockImageElement, mockBoundingRect2)
      ).toEqual({
        x: 10,
        y: 10,
      });

      expect(
        handleOutOfBounds(-400, 10, mockImageElement, mockBoundingRect1)
      ).toEqual({
        x: -390,
        y: 10,
      });

      expect(
        handleOutOfBounds(400, 10, mockImageElement, mockBoundingRect2)
      ).toEqual({
        x: 275,
        y: 10,
      });
    });
  });
});
