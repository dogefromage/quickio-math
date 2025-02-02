import { Matrix4 } from './matrix4'
import { Quaternion } from './quaternion'
import { Vector2 } from './vector2'
import { Vector3 } from './vector3'

import { epsilon } from './constants'
import { equals } from './utils'

export class Matrix3 {

    private values = new Float32Array(9)

    constructor();
    constructor(values?: number[]);

    constructor(...args: any[])
    {
        if (typeof(args[0]) === 'object')
        {
            for (let i = 0; i < 9; i++)
            {
                this.values[i] = args[0][i] || 0;
            }
        }
    }

    static get identity()
    {
        return new Matrix3().setIdentity();
    }

    at(index: number) 
    {
        return this.values[index];
    }
    
    set(index: number, value: number)
    {
        this.values[index] = value;
    }

    setAll(values: number[]) {
        for (let i = 0; i < 9; i++) {
            this.values[i] = values[i]
        }
        return this
    }

    reset() {
        for (let i = 0; i < 9; i++) {
            this.values[i] = 0
        }
    }

    copy(dest = new Matrix3()) {

        for (let i = 0; i < 9; i++) {
            dest.values[i] = this.values[i]
        }

        return dest
    }

    all() {
        const data: number[] = []
        for (let i = 0; i < 9; i++) {
            data[i] = this.values[i]
        }

        return data
    }

    row(index: number) {
        return [
            this.values[index * 3 + 0],
            this.values[index * 3 + 1],
            this.values[index * 3 + 2],
        ]
    }

    col(index: number) {
        return [
            this.values[index],
            this.values[index + 3],
            this.values[index + 6],
        ]
    }

    equals(matrix: Matrix3, threshold = epsilon) {
        for (let i = 0; i < 9; i++) {
            if (equals(this.at(i), matrix.at(i)), threshold) {
                return false
            }
        }

        return true
    }

    determinant() {
        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a10 = this.values[3]
        const a11 = this.values[4]
        const a12 = this.values[5]
        const a20 = this.values[6]
        const a21 = this.values[7]
        const a22 = this.values[8]

        const det01 = a22 * a11 - a12 * a21
        const det11 = -a22 * a10 + a12 * a20
        const det21 = a21 * a10 - a11 * a20

        return a00 * det01 + a01 * det11 + a02 * det21
    }

    setIdentity() {
        this.values[0] = 1
        this.values[1] = 0
        this.values[2] = 0
        this.values[3] = 0
        this.values[4] = 1
        this.values[5] = 0
        this.values[6] = 0
        this.values[7] = 0
        this.values[8] = 1

        return this
    }

    transpose() {
        const temp01 = this.values[1]
        const temp02 = this.values[2]
        const temp12 = this.values[5]

        this.values[1] = this.values[3]
        this.values[2] = this.values[6]
        this.values[3] = temp01
        this.values[5] = this.values[7]
        this.values[6] = temp02
        this.values[7] = temp12

        return this
    }

    inverse() {
        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a10 = this.values[3]
        const a11 = this.values[4]
        const a12 = this.values[5]
        const a20 = this.values[6]
        const a21 = this.values[7]
        const a22 = this.values[8]

        const det01 = a22 * a11 - a12 * a21
        const det11 = -a22 * a10 + a12 * a20
        const det21 = a21 * a10 - a11 * a20

        let det = a00 * det01 + a01 * det11 + a02 * det21

        if (!det) {
            return
        }

        det = 1.0 / det

        this.values[0] = det01 * det
        this.values[1] = (-a22 * a01 + a02 * a21) * det
        this.values[2] = (a12 * a01 - a02 * a11) * det
        this.values[3] = det11 * det
        this.values[4] = (a22 * a00 - a02 * a20) * det
        this.values[5] = (-a12 * a00 + a02 * a10) * det
        this.values[6] = det21 * det
        this.values[7] = (-a21 * a00 + a01 * a20) * det
        this.values[8] = (a11 * a00 - a01 * a10) * det

        return this
    }

    multiply(matrix: Matrix3) {
        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a10 = this.values[3]
        const a11 = this.values[4]
        const a12 = this.values[5]
        const a20 = this.values[6]
        const a21 = this.values[7]
        const a22 = this.values[8]

        const b00 = matrix.at(0)
        const b01 = matrix.at(1)
        const b02 = matrix.at(2)
        const b10 = matrix.at(3)
        const b11 = matrix.at(4)
        const b12 = matrix.at(5)
        const b20 = matrix.at(6)
        const b21 = matrix.at(7)
        const b22 = matrix.at(8)

        this.values[0] = b00 * a00 + b01 * a10 + b02 * a20
        this.values[1] = b00 * a01 + b01 * a11 + b02 * a21
        this.values[2] = b00 * a02 + b01 * a12 + b02 * a22

        this.values[3] = b10 * a00 + b11 * a10 + b12 * a20
        this.values[4] = b10 * a01 + b11 * a11 + b12 * a21
        this.values[5] = b10 * a02 + b11 * a12 + b12 * a22

        this.values[6] = b20 * a00 + b21 * a10 + b22 * a20
        this.values[7] = b20 * a01 + b21 * a11 + b22 * a21
        this.values[8] = b20 * a02 + b21 * a12 + b22 * a22

        return this
    }

    multiplyVec2(v: Vector2, dest = new Vector2()) 
    {
        dest.xy = 
        [
            v.x * this.at(0) + v.y * this.at(1) + this.at(2),
            v.x * this.at(3) + v.y * this.at(4) + this.at(5),
        ];

        return dest;
    }

    multiplyVec3(v: Vector3, dest = new Vector3()) 
    {
        dest.xyz = 
        [
            v.x * this.at(0) + v.y * this.at(1) + v.z * this.at(2),
            v.x * this.at(3) + v.y * this.at(4) + v.z * this.at(5),
            v.x * this.at(6) + v.y * this.at(7) + v.z * this.at(8),
        ];

        return dest;
    }

    toMat4(dest = new Matrix4()) 
    {
        dest.setAll([
            this.at(0), this.at(1), this.at(2),     0,
            this.at(3), this.at(4), this.at(5),     0,
            this.at(6), this.at(7), this.at(8),     0,
            0,          0,          0,              1,
        ]);

        return dest;
    }

    toQuat() {
        const m00 = this.values[0]
        const m01 = this.values[1]
        const m02 = this.values[2]
        const m10 = this.values[3]
        const m11 = this.values[4]
        const m12 = this.values[5]
        const m20 = this.values[6]
        const m21 = this.values[7]
        const m22 = this.values[8]

        const fourXSquaredMinus1 = m00 - m11 - m22
        const fourYSquaredMinus1 = m11 - m00 - m22
        const fourZSquaredMinus1 = m22 - m00 - m11
        const fourWSquaredMinus1 = m00 + m11 + m22

        let biggestIndex = 0

        let fourBiggestSquaredMinus1 = fourWSquaredMinus1

        if (fourXSquaredMinus1 > fourBiggestSquaredMinus1) {
            fourBiggestSquaredMinus1 = fourXSquaredMinus1
            biggestIndex = 1
        }

        if (fourYSquaredMinus1 > fourBiggestSquaredMinus1) {
            fourBiggestSquaredMinus1 = fourYSquaredMinus1
            biggestIndex = 2
        }

        if (fourZSquaredMinus1 > fourBiggestSquaredMinus1) {
            fourBiggestSquaredMinus1 = fourZSquaredMinus1
            biggestIndex = 3
        }

        const biggestVal = Math.sqrt(fourBiggestSquaredMinus1 + 1) * 0.5
        const mult = 0.25 / biggestVal

        const result = new Quaternion()

        switch (biggestIndex) {
            case 0:

                result.w = biggestVal
                result.x = (m12 - m21) * mult
                result.y = (m20 - m02) * mult
                result.z = (m01 - m10) * mult

                break

            case 1:

                result.w = (m12 - m21) * mult
                result.x = biggestVal
                result.y = (m01 + m10) * mult
                result.z = (m20 + m02) * mult

                break

            case 2:

                result.w = (m20 - m02) * mult
                result.x = (m01 + m10) * mult
                result.y = biggestVal
                result.z = (m12 + m21) * mult

                break

            case 3:

                result.w = (m01 - m10) * mult
                result.x = (m20 + m02) * mult
                result.y = (m12 + m21) * mult
                result.z = biggestVal

                break
        }

        return result
    }

    rotate(angle: number, axis: Vector3) 
    {
        let x = axis.x
        let y = axis.y
        let z = axis.z

        let length = Math.sqrt(x * x + y * y + z * z)

        if (!length) {
            return
        }

        if (length !== 1) {
            length = 1 / length
            x *= length
            y *= length
            z *= length
        }

        const s = Math.sin(angle)
        const c = Math.cos(angle)

        const t = 1.0 - c

        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a10 = this.values[4]
        const a11 = this.values[5]
        const a12 = this.values[6]
        const a20 = this.values[8]
        const a21 = this.values[9]
        const a22 = this.values[10]

        const b00 = x * x * t + c
        const b01 = y * x * t + z * s
        const b02 = z * x * t - y * s
        const b10 = x * y * t - z * s
        const b11 = y * y * t + c
        const b12 = z * y * t + x * s
        const b20 = x * z * t + y * s
        const b21 = y * z * t - x * s
        const b22 = z * z * t + c

        this.values[0] = a00 * b00 + a10 * b01 + a20 * b02
        this.values[1] = a01 * b00 + a11 * b01 + a21 * b02
        this.values[2] = a02 * b00 + a12 * b01 + a22 * b02

        this.values[3] = a00 * b10 + a10 * b11 + a20 * b12
        this.values[4] = a01 * b10 + a11 * b11 + a21 * b12
        this.values[5] = a02 * b10 + a12 * b11 + a22 * b12

        this.values[6] = a00 * b20 + a10 * b21 + a20 * b22
        this.values[7] = a01 * b20 + a11 * b21 + a21 * b22
        this.values[8] = a02 * b20 + a12 * b21 + a22 * b22

        return this
    }

    static product(m1: Matrix3, m2: Matrix3, dest = new Matrix3()) 
    {
        const a00 = m1.at(0)
        const a01 = m1.at(1)
        const a02 = m1.at(2)
        const a10 = m1.at(3)
        const a11 = m1.at(4)
        const a12 = m1.at(5)
        const a20 = m1.at(6)
        const a21 = m1.at(7)
        const a22 = m1.at(8)

        const b00 = m2.at(0)
        const b01 = m2.at(1)
        const b02 = m2.at(2)
        const b10 = m2.at(3)
        const b11 = m2.at(4)
        const b12 = m2.at(5)
        const b20 = m2.at(6)
        const b21 = m2.at(7)
        const b22 = m2.at(8)

        dest.setAll([
            b00 * a00 + b01 * a10 + b02 * a20,
            b00 * a01 + b01 * a11 + b02 * a21,
            b00 * a02 + b01 * a12 + b02 * a22,

            b10 * a00 + b11 * a10 + b12 * a20,
            b10 * a01 + b11 * a11 + b12 * a21,
            b10 * a02 + b11 * a12 + b12 * a22,

            b20 * a00 + b21 * a10 + b22 * a20,
            b20 * a01 + b21 * a11 + b22 * a21,
            b20 * a02 + b21 * a12 + b22 * a22,
        ]);

        return dest;
    }
}
