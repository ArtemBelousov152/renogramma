function check(fld, n_rows, n_cols) {
  const was = Array.from({ length: n_rows }, () => Array(n_cols).fill(0));
  let n_comps = 0;
  let n_ends = 0;

  for (let row = 0; row < n_rows; row++) {
    for (let col = 0; col < n_cols; col++) {
      if (fld[row][col] !== 0) {
        continue;
      }

      let cur_moves = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const next_row = row + dr;
          const next_col = col + dc;
          if (
            next_row < 0 ||
            next_col < 0 ||
            next_row >= n_rows ||
            next_col >= n_cols ||
            fld[next_row][next_col] !== 0
          ) {
            continue;
          }
          cur_moves += 1;
        }
      }

      if (cur_moves <= 1) {
        n_ends += 1;
        if (n_ends > 2) {
          return false;
        }
      }

      if (was[row][col] === 1) {
        continue;
      }

      n_comps += 1;
      if (n_comps > 1) {
        return false;
      }

      const qu = [[row, col]];
      let qu_pos = 0;
      while (qu_pos < qu.length) {
        const [cur_row, cur_col] = qu[qu_pos];
        qu_pos += 1;

        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const next_row = cur_row + dr;
            const next_col = cur_col + dc;
            if (
              next_row < 0 ||
              next_col < 0 ||
              next_row >= n_rows ||
              next_col >= n_cols ||
              was[next_row][next_col] === 1 ||
              fld[next_row][next_col] !== 0
            ) {
              continue;
            }
            qu.push([next_row, next_col]);
            was[next_row][next_col] = 1;
          }
        }
      }
    }
  }
  return true;
}

function genPath(fld, n_rows, n_cols, cur_row, cur_col, cur_num) {
  if (
    cur_row < 0 ||
    cur_col < 0 ||
    cur_row >= n_rows ||
    cur_col >= n_cols ||
    fld[cur_row][cur_col] !== 0
  ) {
    return false;
  }
  fld[cur_row][cur_col] = cur_num;
  if (cur_num === n_rows * n_cols) {
    return true;
  }
  if (!check(fld, n_rows, n_cols)) {
    fld[cur_row][cur_col] = 0;
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
    if (genPath(fld, n_rows, n_cols, cur_row + dr, cur_col + dc, cur_num + 1)) {
      return true;
    }
  }
  fld[cur_row][cur_col] = 0;
  return false;
}

function genMap(n_rows = 8, n_cols = 8) {
  const fld = Array.from({ length: n_rows }, () => Array(n_cols).fill(0));
  const start_row = Math.floor(Math.random() * n_rows);
  const start_col = Math.floor(Math.random() * n_cols);
  genPath(fld, n_rows, n_cols, start_row, start_col, 1);
  return fld;
}

const n_rows = 7;
const n_cols = 7;

console.log(genMap(n_rows, n_cols));
