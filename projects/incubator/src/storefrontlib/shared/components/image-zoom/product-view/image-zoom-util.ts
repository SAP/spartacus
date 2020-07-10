import { ElementRef } from '@angular/core';

/**
 * Keeps the zoom image from leaving the bounding container
 *
 * @param positionX
 * @param positionY
 * @param imageElement
 * @param boundingRect
 */
export function handleOutOfBounds(
  positionX: number,
  positionY: number,
  imageElement: any,
  boundingRect: DOMRect
): { x: number; y: number } {
  const paddingX = 60;
  const paddingY = 60;

  if (positionY <= -imageElement.height + paddingY) {
    positionY = -imageElement.height + paddingY;
  }
  if (positionY >= boundingRect.height - paddingY) {
    positionY = boundingRect.height - paddingY;
  }
  if (positionX <= -imageElement.width - boundingRect.width / 2 + paddingX) {
    positionX = -imageElement.width - boundingRect.width / 2 + paddingX;
  }
  if (positionX >= imageElement.width + boundingRect.width / 2 - paddingX) {
    positionX = imageElement.width + boundingRect.width / 2 - paddingX;
  }

  return { x: positionX, y: positionY };
}

/**
 * Returns the position of the image based on the cursor pointer
 *
 * @param element
 * @param clientX
 * @param clientY
 */
export function calculatePointerMovePosition(
  element: ElementRef,
  clientX: number,
  clientY: number
): { positionX: number; positionY: number } {
  const boundingRect = element.nativeElement.getBoundingClientRect() as DOMRect;

  const x = clientX - boundingRect.left;
  const y = clientY - boundingRect.top;

  const positionX = -x + element.nativeElement.clientWidth / 2;
  const positionY = -y + element.nativeElement.clientHeight / 2;

  return { positionX, positionY };
}
