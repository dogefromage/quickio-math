import { expect } from 'chai'
import 'mocha'

import { Matrix3 } from '../src/matrix3'
import { Vector2 } from '../src/vector2'
import { Vector3 } from '../src/vector3'

describe('mat3', () => {

  it('transposes', () => {
    const matrix = new Matrix3([
        1.0, 2.0, 3.0,
        4.0, 5.0, 6.0,
        7.0, 8.0, 9.0,
    ])

    matrix.transpose()

    expect(matrix.at(0)).to.equal(1.0)
    expect(matrix.at(1)).to.equal(4.0)
    expect(matrix.at(2)).to.equal(7.0)

    expect(matrix.at(3)).to.equal(2.0)
    expect(matrix.at(4)).to.equal(5.0)
    expect(matrix.at(5)).to.equal(8.0)

    expect(matrix.at(6)).to.equal(3.0)
    expect(matrix.at(7)).to.equal(6.0)
    expect(matrix.at(8)).to.equal(9.0)

  })

  it('multiplies a vector2', () =>
  {
    const matrix = new Matrix3([
        1.0, 2.0, 3.0,
        4.0, 5.0, 6.0,
        7.0, 8.0, 9.0,
    ])

    const v = new Vector2(1, 2);

    let result = matrix.multiplyVec2(v);

    expect(result.x).to.equal(8);
    expect(result.y).to.equal(20);
  })

  it('multiplies a vector3', () =>
  {
    const matrix = new Matrix3([
        -1.0, 2.0, -3.0,
        4.0, -5.0, 6.0,
        7.0, -8.0, 9.0,
    ])

    const v = new Vector3(5, -7, 6);

    let result = matrix.multiplyVec3(v);

    expect(result.x).to.equal(-37);
    expect(result.y).to.equal(91);
    expect(result.z).to.equal(145);
  })

})
