export function ConvertGradToRad(angel) {
    var result = (angel * 2 * Math.PI) / 400;
    while (result < 0) result += 2 * Math.PI;
    while (result >= 2 * Math.PI) result -= 2 * Math.PI;
    return result;
  }
  
  export function ConvertRadToGrad(angel) {
    var result = (angel * 400) / (2 * Math.PI);
    while (result < 0) result += 400;
    while (result >= 400) result -= 400;
    return result;
  }
  
  export function calculateHorizontalAngel(x1, y1, x2, y2) {
        return calculateAngle(x1, y1, x2, y2);
  }
  
  export function calculateVerticalAngel(x1, y1, x2, y2) {
        return calculateAngle(x1, y1, x2, y2);
  }

  function calculateAngle(x1, y1, x2, y2) {
    var tmp =
      (x1 - x2) /
      (y2 - y1 - Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1)));
  
    var angel = 2 * Math.atan(tmp) + Math.PI;
  
    return angel;
  }
  