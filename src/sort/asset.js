export const profitAsset = (tableData) => {
    if(tableData.length === 0) {
        return []
    } else {
        const date = []

        tableData.cell.forEach(cell => {
            if(date.includes(cell.startDate) === false) {
                date.push(cell.startDate)
            }
        });
        const tableResult = []
      

        date.forEach(cell => {
            tableResult.push({ name: cell, pv: 0 })
        })

        

        for(let i = 0; i < tableResult.length; i++) {
            tableData.cell.forEach(profit => {
 
                if(tableResult[i].name === profit.startDate) {
                    const total = profit.profit.replace(/[^+\d]/g, '')
                    tableResult[i].pv = profit.profit[0] === "-" ? -Number(total) : Number(total)
                    tableResult[i].pair = profit.pair
                }
            })
        }
        return tableResult
    }
}