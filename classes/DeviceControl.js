export class DeviceControl {
    #mode = "move";
    #verticalAngleInGrad = 100;
    #horizontalAngleInGrad = 0.0000;

    constructor(mode) {
        this.#mode = mode;
    }

    SetMode(mode) {
        this.#mode = mode;
    }

    GetMode() {
        return this.#mode;
    }
}