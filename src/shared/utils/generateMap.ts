function check(fld: number[][], nRows: number, nCols: number) {
  const was = Array.from({ length: nRows }, () => Array(nCols).fill(0));
  let nComps = 0;
  let nEnds = 0;

  for (let row = 0; row < nRows; row++) {
    for (let col = 0; col < nCols; col++) {
      if (fld[row][col] !== 0) {
        continue;
      }

      let curMoves = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nextRow = row + dr;
          const nextCol = col + dc;
          if (
            nextRow < 0 ||
            nextCol < 0 ||
            nextRow >= nRows ||
            nextCol >= nCols ||
            fld[nextRow][nextCol] !== 0
          ) {
            continue;
          }
          curMoves += 1;
        }
      }

      if (curMoves <= 1) {
        nEnds += 1;
        if (nEnds > 2) {
          return false;
        }
      }

      if (was[row][col] === 1) {
        continue;
      }

      nComps += 1;
      if (nComps > 1) {
        return false;
      }

      const qu = [[row, col]];
      let quPos = 0;
      while (quPos < qu.length) {
        const [curRow, curCol] = qu[quPos];
        quPos += 1;

        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nextRow = curRow + dr;
            const nextCol = curCol + dc;
            if (
              nextRow < 0 ||
              nextCol < 0 ||
              nextRow >= nRows ||
              nextCol >= nCols ||
              was[nextRow][nextCol] === 1 ||
              fld[nextRow][nextCol] !== 0
            ) {
              continue;
            }
            qu.push([nextRow, nextCol]);
            was[nextRow][nextCol] = 1;
          }
        }
      }
    }
  }
  return true;
}

function genPath(
  fld: number[][],
  nRows: number,
  nCols: number,
  curRow: number,
  curCol: number,
  curNum: number
) {
  if (
    curRow < 0 ||
    curCol < 0 ||
    curRow >= nRows ||
    curCol >= nCols ||
    fld[curRow][curCol] !== 0
  ) {
    return false;
  }
  fld[curRow][curCol] = curNum;
  if (curNum === nRows * nCols) {
    return true;
  }
  if (!check(fld, nRows, nCols)) {
    fld[curRow][curCol] = 0;
    return false;
  }
  const dirs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  dirs.sort(() => Math.random() - 0.5);
  for (const [dr, dc] of dirs) {
    if (genPath(fld, nRows, nCols, curRow + dr, curCol + dc, curNum + 1)) {
      return true;
    }
  }
  fld[curRow][curCol] = 0;
  return false;
}

export function genMap(nRows = 5, nCols = 5) {
  const fld = Array.from({ length: nRows }, () => Array(nCols).fill(0));
  const startRow = Math.floor(Math.random() * nRows);
  const startCol = Math.floor(Math.random() * nCols);
  genPath(fld, nRows, nCols, startRow, startCol, 1);
  return fld;
}
