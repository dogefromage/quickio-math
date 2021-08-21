import { expect } from 'chai'
import 'mocha'

import { Matrix2 } from '../src/matrix2'

describe('mat2', () => {

  it('transposes', () => {
    const matrix = new Matrix2([
        1.0, 2.0,
        3.0, 4.0,
    ])

    console.log(matrix);

    matrix.transpose()

    expect(matrix.at(0)).to.equal(1.0)
    expect(matrix.at(1)).to.equal(3.0)
    expect(matrix.at(2)).to.equal(2.0)
    expect(matrix.at(3)).to.equal(4.0)
  })

  it('inverses', () => {
    const matrix = new Matrix2([
        1.0, 2.0,
        3.0, 4.0,
    ])

    matrix.inverse()

    expect(matrix.at(0)).to.equal(-2.0)
    expect(matrix.at(1)).to.equal(1.0)
    expect(matrix.at(2)).to.equal(1.5)
    expect(matrix.at(3)).to.equal(-0.5)
  })

})
