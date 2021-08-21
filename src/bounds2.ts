import { Ray2 } from "./ray2";
import { vec2 } from "./vec2";

export class Bounds2
{
    constructor(
        public min: vec2,
        public max: vec2,
        fixOrder = false
    )
    {
        if (fixOrder)
        {
            for (let i = 0; i < 3; i++)
            {
                let min = this.min.at(i);
                let max = this.max.at(i);
                if (min > max)
                {
                    // swap
                    this.min.set(i, max);
                    this.max.set(i, min);
                }
            }
        }
    }

    getDimensions()
    {
        return this.max.copy().subtract(this.min);
    }

    getArea()
    {
        return (this.max.x - this.min.x) * (this.max.y - this.min.y);
    }

    intersectsBounds2(other: Bounds2)
    {
        return (this.max.x > other.min.x &&
                this.min.x < other.max.x &&
                this.max.y > other.min.y &&
                this.min.y < other.max.y);
    }

    intersectsRay(ray: Ray2)
    {
        let txmin = (this.min.x - ray.origin.x) / ray.direction.x; 
        let txmax = (this.max.x - ray.origin.x) / ray.direction.x; 
    
        if (txmin > txmax)
        {
            let t = txmin;
            txmin = txmax;
            txmax = t;
        }
    
        let tymin = (this.min.y - ray.origin.y) / ray.direction.y; 
        let tymax = (this.max.y - ray.origin.y) / ray.direction.y; 
    
        if (tymin > tymax)
        {
            let t = tymin;
            tymin = tymax;
            tymax = t;
        }
    
        if ((txmin > tymax) || (tymin > txmax)) 
            return false; 
    
        return true; 
    }

    containsPoint(point: vec2)
    {
        return (this.min.x <= point.x && point.x <= this.max.x &&
                this.min.y <= point.y && point.y <= this.max.y);
    }

    copy()
    {
        return new Bounds2(
            this.min.copy(),
            this.max.copy()
        );
    }
}