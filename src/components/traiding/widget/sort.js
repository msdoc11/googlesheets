export const sortBalance = (data) => {
    const past = split(data.cell[0].total.slice(1))
    const now = split(data.cell[data.cell.length - 1].total.slice(1))

    const profit = now - past
    const persent = (profit / (past / 100)).toFixed(0)

    let hours = 0
    let sucsses = 0
    data.cell.forEach(v => {
        hours = hours + splitHours(v.dur)
        const prof = splitProfit(v.profit)
        if(prof > 0) {
            sucsses = sucsses + 1
        }
    })

    const dur = (hours / data.cell.length).toFixed(2)

    return { persent, profit, dur, trades: data.cell.length, sucsses }
}

const split = (data) => {
    const str = data.split(",")

    let num = ""
    str.forEach(v => {
        num = num + v
    });
    return Number(num)
}

const splitHours = (data) => {
    const str = data.split(",")

    let num = ""
    let i = 1
    str.forEach(v => {
        num = num + v + ( i === str.length ? "" : ".")
        i++
    });
    return Number(num)
}


const splitProfit = (data) => {
    const sl1 = data[0] ==="-" ? data.slice(1) : data
    const sl2 = sl1.split("$")

    const str = sl2[1].split(",")
    
    let num = ""
    str.forEach(v => {
        num = num + v
    });
    return data[0] ==="-" ? -Number(num) : Number(num)
}