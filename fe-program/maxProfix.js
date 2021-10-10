// 买卖股票最大收益 只能交易一次
function maxProfit ( prices ) {
    // 贪心法，最大收益等于昨天的最大收益和今天卖出的收益之间的最大时
    // let min = Number.MAX_VALUE
    // let i = 0
    // let max = 0
    // while(i < prices.length){
    //     min = Math.min(min, prices[i])
    //     max = Math.max(max, prices[i] - min)
    //     i++
    // }
    // return max
    const n = prices.length
    if (n < 2) return 0
    const dp = new Array(n).fill('').map(()=>[])
    // dp[i]表示第n天的收益
    // dp[i][0]表示第n天持有股票的最大收益
    // dp[i][1]表示第n天不持有股票的最大收益
    dp[0] = [-prices[0] ,0]
    for (let i = 1; i < n; i++) {
        dp[i%2][0] = Math.max(dp[(i-1)%2][0], -prices[i])
        dp[i%2][1] = Math.max(dp[(i-1)%2][1], prices[i] + dp[(i-1)%2][0])
    }
    return dp[(n-1)%2][1]
}


// 可以买卖多次
function maxProfit_n( prices ) {
    const n = prices.length
    if (n < 2) return 0
    // 贪心法：如果买卖收益为正，就交易
    // let max = 0
    // // 如果买卖收益为正，就交易
    // for (let i = 1; i < n; i++) {
    //     max = prices[i] - prices[i-1] > 0 ? max + prices[i] - prices[i-1] : max
    // }
    // return max

    const dp = new Array(n).fill('').map(()=>[])
    dp[0] = [-prices[0], 0]
    // dp[i]表示当前天的最大收益
    // dp[i][0]当前持有股票: 前一天就持有,今天买了(今天之前不持有)
    // dp[i][1]当前不持有股票: 前一天就不持有,今天卖了
    for (let i = 1; i < n; i++) {
        dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] - prices[i])
        dp[i][1] = Math.max(dp[i-1][1], prices[i] + dp[i-1][0])
    }
    return dp[n-1][1]
}

// [0 0 0 0 0 111112222223333344444]
// 只能买卖两次 

function maxProfit_2 (prices) {
    const n = prices.length
    if (n < 2) return 0
    const dp = new Array(n).fill('').map(()=>[])
    // dp[i]表示第i天收益
    // dp[i][0]表示当天没交易, 前一天没交易
    // dp[i][1]表示当天第一次买入,前一天没交易,前一天已经买入了
    // dp[i][2]第一次卖出 ,前一天还是买入状态,前一天已经卖出了
    // dp[i][3]表示当天第二次买入
    // dp[i][4]第二次卖出
    dp[0] = [0, -prices[0], 0, -prices[0], 0]
    for (let i = 1; i < n; i++) {
        dp[i][0] = dp[i-1][0]
        dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0] - prices[i])
        dp[i][2] = Math.max(dp[i-1][2], dp[i-1][1] + prices[i])
        dp[i][3] = Math.max(dp[i-1][3], dp[i-1][2] - prices[i])
        dp[i][4] = Math.max(dp[i-1][4], dp[i-1][3] + prices[i])
    }
    return dp[n-1][4]
}

// 可以交易k次
function maxProfit_k (prices, k) {
    // TODO,提前return
    const n = prices.length
    // 核心

    const bp = new Array(n).fill('').map(()=>new Array(2*k+1).fill(0))

    for (let j = 1; j < 2*k; j+=2) {
        bp[0][j] = -prices[0]
    }

    // bp[i][0]表示不操作
    // bp[i][j] j%2===1 买入股票 : 前一天就持有了, 今天刚买
    // bp[i][j] j%2===0 卖出股票:  前一天就没持有, 今天刚卖
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < 2*k - 1; j += 2) {
            bp[i][j+1] = Math.max(bp[i-1][j+1], bp[i-1][j] - prices[i])
            bp[i][j+2] = Math.max(bp[i-1][j+2], bp[i-1][j+1] + prices[i])
        }
    }
    return bp[n-1][2*k]

}






console.log(maxProfit_k([1,7,5,6, 1,3], 1))