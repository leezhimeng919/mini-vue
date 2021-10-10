/**
 * 给出两个很大的整数，
 * 要求实现程序求出两个整数之和。
 * 注：我们假设这两个整数用BigInt都无法表示
 */

function bigInt (s, t) {
    const slen = s.length
    const tlen = t.length
    const maxLen = Math.max(slen, tlen)
    s = s.padStart(maxLen, 0)
    t = t.padStart(maxLen, 0)
    let index = maxLen - 1
    const rst = new Array(maxLen).fill(0)
    let flag = false
    while(index > -1) {
        rst[index] += Number(s[index]) + Number(t[index])
        if(rst[index] >= 10){
            rst[index] -= 10
            if(index > 0){
                rst[index-1] = 1
            } else {
                flag = true
            }
        }
        index--
    }
    if(flag){
        rst.unshift(1)
    }
    console.log(rst)
}

bigInt('1258994789086810959258888307221656691275942378416703768','7007001981958278066472683068554254815482631701142544497')