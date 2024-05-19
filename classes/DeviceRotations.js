export class DeviceRotations {

    #horizontalRotationInGrad = 0;
    #verticalRotationInGrad = 0;


    SetHorizontalRotationInGrad(horizontalRotation) {
        while (horizontalRotation < 0) {
            horizontalRotation += 400;
        }
        while (horizontalRotation >= 400) {
            horizontalRotation -= 400;
        }
        
        horizontalRotation = -horizontalRotation;
        this.#horizontalRotationInGrad = horizontalRotation;
    }

    HorizontalRotationInRadian() {
        return this.#horizontalRotationInGrad * (Math.PI / 200);
    }

    GetHorizontalArcStartAngle() {
        return -Math.PI / 2 - this.HorizontalRotationInRadian();
    }

    GetHorizontalArcLongAngle() {
        var value = this.HorizontalRotationInRadian();
        while (value < 0) {
            value += 2 * Math.PI;
        }
        while (value >= 2 * Math.PI) {
            value -= 2 * Math.PI;
        }
        
        return value;
    }

    DecreaseHorizontalRotationInGrad(decreaseValue) {
        this.#horizontalRotationInGrad -= decreaseValue;
    }

    SetVerticalRotationInGrad(verticalRotation) {
        while (verticalRotation < 0) {
            verticalRotation += 400;
        }
        while (verticalRotation > 400) {
            verticalRotation -= 400;
        }
        verticalRotation = 100 - verticalRotation;
        this.#verticalRotationInGrad = verticalRotation;
    }

    GetVerticalArcStartAngle() {
        return Math.PI / 2;
    }

    GetVerticalArcLongAngle() {
        var verticalArcLongAngle =  (-Math.PI / 2 + this.VerticalRotationInRadian());
        while(verticalArcLongAngle < - Math.PI) {
            verticalArcLongAngle += Math.PI;
        }
        while(verticalArcLongAngle > Math.PI) {
            verticalArcLongAngle -= Math.PI;
        }

        return verticalArcLongAngle;
    }

    // مكان رسم الزاويه العموديه على المحور الافقي
    GetVerticalArcStartRotation() 
    { 
        return Math.PI / 2 + this.HorizontalRotationInRadian()
    }


    VerticalRotationInRadian() {
        return this.#verticalRotationInGrad * (Math.PI / 200);
    }
}