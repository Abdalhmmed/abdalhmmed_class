/**
 * Pure State-Recorder Engine for Data Structures Visual Simulation
 * Supports full snapshots AND fast metricsOnly mode for O(1) benchmark analysis
 */

export const range = (n) => Array.from({ length: n }, (_, i) => (i + 1) * 10)

export const fill = (from, to, c, o = {}) => {
  for (let k = from; k < to; k++) o[k] = c
  return o
}

export function Recorder(init = {}, metricsOnly = false) {
  const isCrypto = init.isCrypto || Boolean(init.cipher)
  const st = {
    a: init.a ? init.a.slice() : null,
    b: init.b ? init.b.slice() : null,
    m: init.m ? init.m.map((r) => r.slice()) : null,
    v: {},
    c: isCrypto
      ? { ops: 0, keys: 0, flips: 0 }
      : { cmp: 0, rd: 0, wr: 0 }
  }
  const S = []

  st.push = (line, msg, o = {}) => {
    if (metricsOnly) return
    const snapshot = Object.freeze({
      line,
      msg,
      a: st.a ? st.a.slice() : null,
      b: st.b ? st.b.slice() : null,
      m: st.m ? st.m.map((r) => r.slice()) : null,
      cls: o.cls || {},
      bcls: o.bcls || {},
      ptr: o.ptr || {},
      bptr: o.bptr || {},
      vars: { ...st.v },
      c: { ...st.c }
    })
    S.push(snapshot)
  }

  st.S = S
  return st
}
