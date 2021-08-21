import { Vector2 } from './vector2'

import { epsilon } from './constants'
import { equals } from './utils';

export class Matrix2 
{
    private values = new Float32Array(4);

    constructor();
    constructor(values?: number[]);

    constructor(...args: any[])
    {
        if (typeof(args[0]) === 'object')
        {
            for (let i = 0; i < 4; i++)
            {
                this.values[i] = args[0][i] || 0;
            }
        }
    }

    static get identity()
    {
        return new Matrix2().setIdentity();
    }

    at(index: number) {
        return this.values[index]
    }
    
    set(index: number, value: number)
    {
        this.values[index] = value;
    }

    setAll(values: number[])
    {
        for (let i = 0; i < 4; i++)
        {
            this.values[i] = values[i];
        }
        return this
    }

    reset() 
    {
        for (let i = 0; i < 4; i++) 
        {
            this.values[i] = 0;
        }
    }

    copy(dest = new Matrix2()) 
    {
        for (let i = 0; i < 4; i++) 
        {
            dest.values[i] = this.values[i]
        }
        return dest
    }

    all()
    {
        const data: number[] = []
        for (let i = 0; i < 4; i++) 
        {
            data[i] = this.values[i]
        }
        return data
    }

    row(index: number) 
    {
        return [
            this.values[2 * index + 0],
            this.values[2 * index + 1],
        ]
    }

    col(index: number) 
    {
        return [
            this.values[index + 0],
            this.values[index + 2],
        ]
    }

    equals(matrix: Matrix2, threshold = epsilon) 
    {
        for (let i = 0; i < 4; i++) 
        {
            if (equals(this.at(i), matrix.at(i)), threshold) 
            {
                return false;
            }
        }

        return true;
    }

    determinant() 
    {
        return this.values[0] * this.values[3] - this.values[1] * this.values[2];
    }

    setIdentity() 
    {
        this.values[0] = 1
        this.values[1] = 0
        this.values[2] = 0
        this.values[3] = 1

        return this;
    }

    transpose() 
    {
        const temp = this.values[1];
        this.values[1] = this.values[2];
        this.values[2] = temp;

        return this;
    }

    inverse() 
    {
        let det = this.determinant();

        if (!det) { return };

        const a11 = this.values[0]
        this.values[0] =  this.values[3] / det;
        this.values[1] = -this.values[1] / det;
        this.values[2] = -this.values[2] / det;
        this.values[3] =             a11 / det;

        return this;
    }

    mult(matrix: Matrix2) 
    {
        const a11 = this.values[0];
        const a12 = this.values[1];
        const a21 = this.values[2];
        const a22 = this.values[3];

        this.values[0] = a11 * matrix.at(0) + a12 * matrix.at(2);
        this.values[1] = a11 * matrix.at(1) + a12 * matrix.at(3);
        this.values[2] = a21 * matrix.at(0) + a22 * matrix.at(2);
        this.values[3] = a21 * matrix.at(1) + a22 * matrix.at(3);

        return this;
    }

    rotate(angle: number) 
    {
        const a11 = this.values[0];
        const a12 = this.values[1];
        const a21 = this.values[2];
        const a22 = this.values[3];

        const sin = Math.sin(angle);
        const cos = Math.cos(angle);

        this.values[0] = a11 *  cos + a12 * sin
        this.values[1] = a11 * -sin + a12 * cos
        this.values[2] = a21 *  cos + a22 * sin
        this.values[3] = a21 * -sin + a22 * cos

        return this;
    }

    multiplyVec2(v: Vector2, dest = new Vector2()) 
    {
        const a11 = this.values[0];
        const a12 = this.values[1];
        const a21 = this.values[2];
        const a22 = this.values[3];

        dest.xy = 
        [
            v.x * a11 + v.y * a12,
            v.x * a21 + v.y * a22,
        ];
        return dest;
    }

    scale(v: Vector2) 
    {
        this.values[0] *= v.x;
        this.values[1] *= v.y;
        this.values[2] *= v.x; 
        this.values[3] *= v.y; 

        return this
    }

    static product(a: Matrix2, b: Matrix2, dest = new Matrix2()) 
    {
        dest.setAll([
            a.at(0) * b.at(0) + a.at(1) * b.at(2),
            a.at(0) * b.at(1) + a.at(1) * b.at(3),
            a.at(2) * b.at(0) + a.at(3) * b.at(2),
            a.at(2) * b.at(1) + a.at(3) * b.at(3),
        ]);

        return dest;
    }
}
