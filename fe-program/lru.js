function LRU( operators ,  k ) {
    // write code here
    const lruQueue = new Map()
    const rst = []
    for(let i = 0; i < operators.length; i++) {
        let opt = operators[i][0]
        let key = operators[i][1]
        let value = operators[i][2]
//       处理超过空间
        if(lruQueue.size > k)  lruQueue.delete(lruQueue.keys().next().value)
//       处理最近使用
        if(lruQueue.get(key)) {
            let curValue = lruQueue.get(key)
            lruQueue.delete(key)
            lruQueue.set(key, curValue)
        } 
//       处理读写
        if (opt === 1) {
            lruQueue.set(key, value)
        } else if (opt === 2) {
            rst.push(lruQueue.get(key) || -1)
        }
    }
    return rst
}

console.log(LRU([[1,1,1],[1,2,2],[2,1],[1,3,3],[2,2],[1,4,4],[2,1],[2,3],[2,4]],2))