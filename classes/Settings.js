export class Settings {
    #step = 1 / 10;
    #RadianStep = this.#step;
    #canMeasure = true;
    #canDraw = true;

    constructor() {
        this.GradStep = this.ConvertRadToGrad();
    }

    GetRadianStep() {
        return this.#RadianStep;
    }

  ConvertRadToGrad() {
    var result = (this.#step * 400) / (2 * Math.PI);
    while (result < 0) result += 400;
    while (result >= 400) result -= 400;
    return result;
  }

  SetStepInRadian(step) {
    this.#step = step;
    this.RadianStep = step;
    this.GradStep = ConvertRadToGrad();
  }

  SetGradStep(stepInGrad) {    
    this.#step = stepInGrad * (2 * Math.PI) / 400;
    this.#RadianStep = this.#step;
    this.GradStep = stepInGrad;
  }

  GetGradStep() {
    return this.GradStep;
  }

  GetMoveStep() {
    return this.GetGradStep() / 10;
  }

  GetRotateStep() {
    return this.GetGradStep() / 50;
  }

  SetCanMeasure(canMeasure) {
    this.#canMeasure = canMeasure;
  }

  CanMeasure() {
    return this.#canMeasure;
  }

  SetCanDraw(canDraw) {
    this.#canDraw = canDraw;
  }

  CanDraw() {
    return this.#canDraw;
  }
}
