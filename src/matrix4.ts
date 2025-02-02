import { Matrix3 } from './matrix3'
import { Vector3 } from './vector3'
import { Vector4 } from './vector4'

import { epsilon } from './constants'
import { equals } from './utils';

export class Matrix4 
{
    private values = new Float32Array(16)

    constructor();
    constructor(values?: number[]);

    constructor(...args: any[])
    {
        if (typeof(args[0]) === 'object')
        {
            for (let i = 0; i < 16; i++)
            {
                this.values[i] = args[0][i] || 0;
            }
        }
    }

    static get identity()
    {
        return new Matrix4().setIdentity();
    }

    at(index: number) {
        return this.values[index]
    }
    
    set(index: number, value: number)
    {
        this.values[index] = value;
    }

    setAll(values: number[]) {
        for (let i = 0; i < 16; i++) {
            this.values[i] = values[i]
        }

        return this
    }

    reset() {
        for (let i = 0; i < 16; i++) {
            this.values[i] = 0
        }
    }

    copy(dest = new Matrix4()) 
    {
        for (let i = 0; i < 16; i++) {
            dest.values[i] = this.values[i]
        }

        return dest
    }

    all() {
        const data: number[] = []
        for (let i = 0; i < 16; i++) {
            data[i] = this.values[i]
        }

        return data
    }

    row(index: number) {
        return [
            this.values[index * 4 + 0],
            this.values[index * 4 + 1],
            this.values[index * 4 + 2],
            this.values[index * 4 + 3],
        ]
    }

    col(index: number) {
        return [
            this.values[index],
            this.values[index + 4],
            this.values[index + 8],
            this.values[index + 12],
        ]
    }

    equals(matrix: Matrix4, threshold = epsilon) {
        for (let i = 0; i < 16; i++) {
            if (equals(matrix.at(i), this.at(i), threshold)) {
                return false
            }
        }

        return true
    }

    determinant() {
        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a03 = this.values[3]
        const a10 = this.values[4]
        const a11 = this.values[5]
        const a12 = this.values[6]
        const a13 = this.values[7]
        const a20 = this.values[8]
        const a21 = this.values[9]
        const a22 = this.values[10]
        const a23 = this.values[11]
        const a30 = this.values[12]
        const a31 = this.values[13]
        const a32 = this.values[14]
        const a33 = this.values[15]

        const det00 = a00 * a11 - a01 * a10
        const det01 = a00 * a12 - a02 * a10
        const det02 = a00 * a13 - a03 * a10
        const det03 = a01 * a12 - a02 * a11
        const det04 = a01 * a13 - a03 * a11
        const det05 = a02 * a13 - a03 * a12
        const det06 = a20 * a31 - a21 * a30
        const det07 = a20 * a32 - a22 * a30
        const det08 = a20 * a33 - a23 * a30
        const det09 = a21 * a32 - a22 * a31
        const det10 = a21 * a33 - a23 * a31
        const det11 = a22 * a33 - a23 * a32

        return (det00 * det11 - det01 * det10 + det02 * det09 + det03 * det08 - det04 * det07 + det05 * det06)
    }

    setIdentity() {

        this.reset();
        this.values[0] = 1
        this.values[5] = 1
        this.values[10] = 1
        this.values[15] = 1

        return this
    }

    transpose() {
        const temp01 = this.values[1]
        const temp02 = this.values[2]
        const temp03 = this.values[3]
        const temp12 = this.values[6]
        const temp13 = this.values[7]
        const temp23 = this.values[11]

        this.values[1] = this.values[4]
        this.values[2] = this.values[8]
        this.values[3] = this.values[12]
        this.values[4] = temp01
        this.values[6] = this.values[9]
        this.values[7] = this.values[13]
        this.values[8] = temp02
        this.values[9] = temp12
        this.values[11] = this.values[14]
        this.values[12] = temp03
        this.values[13] = temp13
        this.values[14] = temp23

        return this
    }

    inverse() {
        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a03 = this.values[3]
        const a10 = this.values[4]
        const a11 = this.values[5]
        const a12 = this.values[6]
        const a13 = this.values[7]
        const a20 = this.values[8]
        const a21 = this.values[9]
        const a22 = this.values[10]
        const a23 = this.values[11]
        const a30 = this.values[12]
        const a31 = this.values[13]
        const a32 = this.values[14]
        const a33 = this.values[15]

        const det00 = a00 * a11 - a01 * a10
        const det01 = a00 * a12 - a02 * a10
        const det02 = a00 * a13 - a03 * a10
        const det03 = a01 * a12 - a02 * a11
        const det04 = a01 * a13 - a03 * a11
        const det05 = a02 * a13 - a03 * a12
        const det06 = a20 * a31 - a21 * a30
        const det07 = a20 * a32 - a22 * a30
        const det08 = a20 * a33 - a23 * a30
        const det09 = a21 * a32 - a22 * a31
        const det10 = a21 * a33 - a23 * a31
        const det11 = a22 * a33 - a23 * a32

        let det = (det00 * det11 - det01 * det10 + det02 * det09 + det03 * det08 - det04 * det07 + det05 * det06)

        if (!det) {
            return
        }

        det = 1.0 / det

        this.values[0] = (a11 * det11 - a12 * det10 + a13 * det09) * det
        this.values[1] = (-a01 * det11 + a02 * det10 - a03 * det09) * det
        this.values[2] = (a31 * det05 - a32 * det04 + a33 * det03) * det
        this.values[3] = (-a21 * det05 + a22 * det04 - a23 * det03) * det
        this.values[4] = (-a10 * det11 + a12 * det08 - a13 * det07) * det
        this.values[5] = (a00 * det11 - a02 * det08 + a03 * det07) * det
        this.values[6] = (-a30 * det05 + a32 * det02 - a33 * det01) * det
        this.values[7] = (a20 * det05 - a22 * det02 + a23 * det01) * det
        this.values[8] = (a10 * det10 - a11 * det08 + a13 * det06) * det
        this.values[9] = (-a00 * det10 + a01 * det08 - a03 * det06) * det
        this.values[10] = (a30 * det04 - a31 * det02 + a33 * det00) * det
        this.values[11] = (-a20 * det04 + a21 * det02 - a23 * det00) * det
        this.values[12] = (-a10 * det09 + a11 * det07 - a12 * det06) * det
        this.values[13] = (a00 * det09 - a01 * det07 + a02 * det06) * det
        this.values[14] = (-a30 * det03 + a31 * det01 - a32 * det00) * det
        this.values[15] = (a20 * det03 - a21 * det01 + a22 * det00) * det

        return this
    }

    multiply(matrix: Matrix4) {
        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a03 = this.values[3]
        const a10 = this.values[4]
        const a11 = this.values[5]
        const a12 = this.values[6]
        const a13 = this.values[7]
        const a20 = this.values[8]
        const a21 = this.values[9]
        const a22 = this.values[10]
        const a23 = this.values[11]
        const a30 = this.values[12]
        const a31 = this.values[13]
        const a32 = this.values[14]
        const a33 = this.values[15]

        let b0 = matrix.at(0)
        let b1 = matrix.at(1)
        let b2 = matrix.at(2)
        let b3 = matrix.at(3)

        this.values[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
        this.values[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
        this.values[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
        this.values[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

        b0 = matrix.at(4)
        b1 = matrix.at(5)
        b2 = matrix.at(6)
        b3 = matrix.at(7)

        this.values[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
        this.values[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
        this.values[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
        this.values[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

        b0 = matrix.at(8)
        b1 = matrix.at(9)
        b2 = matrix.at(10)
        b3 = matrix.at(11)

        this.values[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
        this.values[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
        this.values[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
        this.values[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

        b0 = matrix.at(12)
        b1 = matrix.at(13)
        b2 = matrix.at(14)
        b3 = matrix.at(15)

        this.values[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
        this.values[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
        this.values[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
        this.values[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

        return this
    }

    multiplyVec3(v: Vector3, dest = new Vector3()) {

        dest.xyz =
        [
            this.values[0] * v.x + this.values[1] * v.y + this.values[2] *  v.z + this.values[3],
            this.values[4] * v.x + this.values[5] * v.y + this.values[6] *  v.z + this.values[7],
            this.values[8] * v.x + this.values[9] * v.y + this.values[10] * v.z + this.values[11],
        ];

        return dest;
    }

    multiplyVec4(vector: Vector4, dest = new Vector4()) {

        const x = vector.x
        const y = vector.y
        const z = vector.z
        const w = vector.w

        dest.x = this.values[0] * x + this.values[1] * y + this.values[2] * z + this.values[3] * w;
        dest.y = this.values[4] * x + this.values[5] * y + this.values[6] * z + this.values[7] * w;
        dest.z = this.values[8] * x + this.values[9] * y + this.values[10] * z + this.values[11] * w;
        dest.w = this.values[12] * x + this.values[13] * y + this.values[14] * z + this.values[15] * w;

        return dest;
    }

    toMat3() {
        return new Matrix3([
            this.values[0],
            this.values[1],
            this.values[2],
            this.values[4],
            this.values[5],
            this.values[6],
            this.values[8],
            this.values[9],
            this.values[10],
        ])
    }

    toInverseMat3() {
        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a10 = this.values[4]
        const a11 = this.values[5]
        const a12 = this.values[6]
        const a20 = this.values[8]
        const a21 = this.values[9]
        const a22 = this.values[10]

        const det01 = a22 * a11 - a12 * a21
        const det11 = -a22 * a10 + a12 * a20
        const det21 = a21 * a10 - a11 * a20

        let det = a00 * det01 + a01 * det11 + a02 * det21

        if (!det) {
            return
        }

        det = 1.0 / det

        return new Matrix3([
            det01 * det,
            (-a22 * a01 + a02 * a21) * det,
            (a12 * a01 - a02 * a11) * det,
            det11 * det,
            (a22 * a00 - a02 * a20) * det,
            (-a12 * a00 + a02 * a10) * det,
            det21 * det,
            (-a21 * a00 + a01 * a20) * det,
            (a11 * a00 - a01 * a10) * det,
        ])
    }

    translate(vector: Vector3) {
        const x = vector.x
        const y = vector.y
        const z = vector.z

        this.values[12] += this.values[0] * x + this.values[4] * y + this.values[8] * z
        this.values[13] += this.values[1] * x + this.values[5] * y + this.values[9] * z
        this.values[14] += this.values[2] * x + this.values[6] * y + this.values[10] * z
        this.values[15] += this.values[3] * x + this.values[7] * y + this.values[11] * z

        return this
    }

    scale(vector: Vector3) {
        const x = vector.x
        const y = vector.y
        const z = vector.z

        this.values[0] *= x
        this.values[1] *= x
        this.values[2] *= x
        this.values[3] *= x

        this.values[4] *= y
        this.values[5] *= y
        this.values[6] *= y
        this.values[7] *= y

        this.values[8] *= z
        this.values[9] *= z
        this.values[10] *= z
        this.values[11] *= z

        return this
    }

    rotate(angle: number, axis: Vector3) {
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
        const a03 = this.values[3]

        const a10 = this.values[4]
        const a11 = this.values[5]
        const a12 = this.values[6]
        const a13 = this.values[7]

        const a20 = this.values[8]
        const a21 = this.values[9]
        const a22 = this.values[10]
        const a23 = this.values[11]

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
        this.values[3] = a03 * b00 + a13 * b01 + a23 * b02

        this.values[4] = a00 * b10 + a10 * b11 + a20 * b12
        this.values[5] = a01 * b10 + a11 * b11 + a21 * b12
        this.values[6] = a02 * b10 + a12 * b11 + a22 * b12
        this.values[7] = a03 * b10 + a13 * b11 + a23 * b12

        this.values[8] = a00 * b20 + a10 * b21 + a20 * b22
        this.values[9] = a01 * b20 + a11 * b21 + a21 * b22
        this.values[10] = a02 * b20 + a12 * b21 + a22 * b22
        this.values[11] = a03 * b20 + a13 * b21 + a23 * b22

        return this
    }

    static frustum(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        const rl = (right - left)
        const tb = (top - bottom)
        const fn = (far - near)

        return new Matrix4([
            (near * 2) / rl,
            0,
            0,
            0,

            0,
            (near * 2) / tb,
            0,
            0,

            (right + left) / rl,
            (top + bottom) / tb,
            -(far + near) / fn,
            -1,

            0,
            0,
            -(far * near * 2) / fn,
            0,
        ])
    }

    static perspective(fov: number, aspect: number, near: number, far: number) {
        const top = near * Math.tan(fov * Math.PI / 360.0)
        const right = top * aspect

        return Matrix4.frustum(-right, right, -top, top, near, far)
    }

    static orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        const rl = (right - left)
        const tb = (top - bottom)
        const fn = (far - near)

        return new Matrix4([
            2 / rl,
            0,
            0,
            0,

            0,
            2 / tb,
            0,
            0,

            0,
            0,
            -2 / fn,
            0,

            -(left + right) / rl,
            -(top + bottom) / tb,
            -(far + near) / fn,
            1,
        ])
    }

    static lookAt(position: Vector3, target: Vector3, up: Vector3 = Vector3.up) {
        if (position.equals(target)) {
            return this.identity
        }

        const z = Vector3.difference(position, target).normalize()

        const x = Vector3.cross(up, z).normalize()
        const y = Vector3.cross(z, x).normalize()

        return new Matrix4([
            x.x,
            y.x,
            z.x,
            0,

            x.y,
            y.y,
            z.y,
            0,

            x.z,
            y.z,
            z.z,
            0,

            -Vector3.dot(x, position),
            -Vector3.dot(y, position),
            -Vector3.dot(z, position),
            1,
        ])
    }

    static product(m1: Matrix4, m2: Matrix4, dest = new Matrix4()) {
        const a00 = m1.at(0)
        const a01 = m1.at(1)
        const a02 = m1.at(2)
        const a03 = m1.at(3)
        const a10 = m1.at(4)
        const a11 = m1.at(5)
        const a12 = m1.at(6)
        const a13 = m1.at(7)
        const a20 = m1.at(8)
        const a21 = m1.at(9)
        const a22 = m1.at(10)
        const a23 = m1.at(11)
        const a30 = m1.at(12)
        const a31 = m1.at(13)
        const a32 = m1.at(14)
        const a33 = m1.at(15)

        const b00 = m2.at(0)
        const b01 = m2.at(1)
        const b02 = m2.at(2)
        const b03 = m2.at(3)
        const b10 = m2.at(4)
        const b11 = m2.at(5)
        const b12 = m2.at(6)
        const b13 = m2.at(7)
        const b20 = m2.at(8)
        const b21 = m2.at(9)
        const b22 = m2.at(10)
        const b23 = m2.at(11)
        const b30 = m2.at(12)
        const b31 = m2.at(13)
        const b32 = m2.at(14)
        const b33 = m2.at(15)

        dest.setAll([
            b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
            b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
            b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
            b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,

            b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
            b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
            b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
            b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,

            b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
            b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
            b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
            b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,

            b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
            b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
            b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
            b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
        ])

        return dest;
    }
}
