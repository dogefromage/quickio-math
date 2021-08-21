import { equals } from "./utils";
import { vec2 } from "./vec2";

export class Ray2
{
    constructor(
        public origin: vec2,
        public direction: vec2
    )
    {

    }

    isParallel(other: Ray2)
    {
        let d1 = this.direction;
        let d2 = other.direction;

        let factors = d1.copy().divide(d2);

        if (isFinite(factors.x))
        {
            return equals(factors.x, factors.y);
        }
        else
        {
            return false;
        }
    }

    angleTo(other: Ray2)
    {
        let d1 = this.direction.copy().normalize();
        let d2 = other.direction.copy().normalize();

        let dot = vec2.dot(d1, d2);

        return Math.acos(dot);
    }

    copy()
    {
        return new Ray2(
            this.origin.copy(),
            this.direction.copy()
        );
    }
}