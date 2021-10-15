export const profitTotal = (tableData) => {
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
                    const total = profit.total.replace(/[^+\d]/g, '')
                    tableResult[i].pv = total
                }
            })
        }
        return tableResult
    }
}