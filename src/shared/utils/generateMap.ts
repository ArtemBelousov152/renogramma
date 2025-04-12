function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function check(
  fld: Array<Array<number | null>>,
  nRows: number,
  nCols: number
): boolean {
  const was: number[][] = Array.from({ length: nRows }, () =>
    Array(nCols).fill(0)
  );
  let nComps = 0;
  let nEnds = 0;

  for (let row = 0; row < nRows; row++) {
    for (let col = 0; col < nCols; col++) {
      if (fld[row][col] !== null) continue;

      let curMoves = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nextRow = row + dr;
          const nextCol = col + dc;
          if (
            nextRow < 0 ||
            nextCol < 0 ||
            nextRow >= nRows ||
            nextCol >= nCols
          )
            continue;
          if (fld[nextRow][nextCol] !== null) continue;
          curMoves++;
        }
      }

      if (curMoves <= 1) {
        nEnds++;
        if (nEnds > 2) return false;
      }

      if (was[row][col] === 1) continue;

      nComps++;
      if (nComps > 1) return false;

      const queue: Array<[number, number]> = [[row, col]];
      let queuePos = 0;
      was[row][col] = 1;

      while (queuePos < queue.length) {
        const [curRow, curCol] = queue[queuePos];
        queuePos++;

        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nextRow = curRow + dr;
            const nextCol = curCol + dc;
            if (
              nextRow < 0 ||
              nextCol < 0 ||
              nextRow >= nRows ||
              nextCol >= nCols
            )
              continue;
            if (was[nextRow][nextCol] === 1 || fld[nextRow][nextCol] !== null)
              continue;
            was[nextRow][nextCol] = 1;
            queue.push([nextRow, nextCol]);
          }
        }
      }
    }
  }
  return true;
}

function genPath(
  fld: Array<Array<number | null>>,
  positions: Array<[number, number] | null>,
  nRows: number,
  nCols: number,
  curRow: number,
  curCol: number,
  curNum: number
): [boolean, number] {
  if (
    curRow < 0 ||
    curCol < 0 ||
    curRow >= nRows ||
    curCol >= nCols ||
    fld[curRow][curCol] !== null
  ) {
    return [false, 1];
  }

  fld[curRow][curCol] = curNum;
  positions[curNum] = [curRow, curCol];

  if (curNum === nRows * nCols) {
    return [true, 1];
  }

  if (!check(fld, nRows, nCols)) {
    fld[curRow][curCol] = null;
    positions[curNum] = null;
    return [false, 1];
  }

  const dirs: Array<[number, number]> = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      dirs.push([dr, dc]);
    }
  }
  shuffleArray(dirs);

  let totalBt = 0;
  for (const [dr, dc] of dirs) {
    const [success, bt] = genPath(
      fld,
      positions,
      nRows,
      nCols,
      curRow + dr,
      curCol + dc,
      curNum + 1
    );
    totalBt += bt;
    if (success) {
      return [true, totalBt];
    }
    if (totalBt > 1000) {
      break;
    }
  }

  fld[curRow][curCol] = null;
  positions[curNum] = null;
  return [false, totalBt];
}

function genWays(
  fld: Array<Array<number | null>>,
  positions: Array<[number, number]>,
  nRows: number,
  nCols: number,
  curRow: number,
  curCol: number,
  curNum: number
): [number, number] {
  if (
    curRow < 0 ||
    curCol < 0 ||
    curRow >= nRows ||
    curCol >= nCols ||
    (fld[curRow][curCol] !== null && fld[curRow][curCol] !== curNum)
  ) {
    return [0, 1];
  }

  if (curNum === nRows * nCols) {
    return [1, 1];
  }

  for (let nextNum = curNum + 1; nextNum <= nRows * nCols; nextNum++) {
    if (positions[nextNum][0] !== -1) {
      const [targetRow, targetCol] = positions[nextNum];
      const rowDiff = Math.abs(targetRow - curRow);
      const colDiff = Math.abs(targetCol - curCol);
      if (rowDiff > nextNum - curNum || colDiff > nextNum - curNum) {
        return [0, 1];
      }
    }
  }

  const needReset = fld[curRow][curCol] === null;
  fld[curRow][curCol] = curNum;
  positions[curNum] = [curRow, curCol];

  const dirs: Array<[number, number]> = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      dirs.push([dr, dc]);
    }
  }
  shuffleArray(dirs);

  let total = 0;
  let totalBt = 0;

  for (const [dr, dc] of dirs) {
    const [count, bt] = genWays(
      fld,
      positions,
      nRows,
      nCols,
      curRow + dr,
      curCol + dc,
      curNum + 1
    );
    total += count;
    totalBt += bt;
    if (total >= 2) {
      break;
    }
  }

  if (needReset) {
    fld[curRow][curCol] = null;
    positions[curNum] = [-1, -1];
  }

  return [total, totalBt];
}

function calcWays(
  fld: Array<Array<number | null>>,
  positions: Array<[number, number]>,
  nRows: number = 8,
  nCols: number = 8
): [number, number] {
  let total = 0;
  let totalBt = 0;

  for (let row = 0; row < nRows; row++) {
    for (let col = 0; col < nCols; col++) {
      const [count, bt] = genWays(fld, positions, nRows, nCols, row, col, 1);
      total += count;
      totalBt += bt;
      if (totalBt > 100000) {
        total = 2;
      }
      if (total > 1) {
        return [total, totalBt];
      }
    }
  }

  return [total, totalBt];
}

export function genMap(
  nRows: number = 8,
  nCols: number = 8
): { fld: Array<Array<number | null>>; fullfld: Array<Array<number | null>> } {
  const fld: Array<Array<number | null>> = Array.from({ length: nRows }, () =>
    Array(nCols).fill(null)
  );
  const positions: Array<[number, number]> = Array(nRows * nCols + 1).fill([
    -1, -1,
  ]);

  const startRow = Math.floor(Math.random() * nRows);
  const startCol = Math.floor(Math.random() * nCols);

  while (true) {
    const [success] = genPath(
      fld,
      positions,
      nRows,
      nCols,
      startRow,
      startCol,
      1
    );
    if (success) {
      break;
    }
  }

  const pos: Array<[number, number]> = [];
  for (let row = 0; row < nRows; row++) {
    for (let col = 0; col < nCols; col++) {
      pos.push([row, col]);
    }
  }

  const fullfld = structuredClone(fld);

  shuffleArray(pos);

  for (const [row, col] of pos) {
    const current = fld[row][col];
    if (!current || current === 1 || current === nRows * nCols) {
      continue;
    }

    fld[row][col] = null;
    positions[current] = [-1, -1];

    const [count] = calcWays(fld, positions, nRows, nCols);
    if (count > 1) {
      fld[row][col] = current;
      positions[current] = [row, col];
    }
  }

  return { fld, fullfld };
}
