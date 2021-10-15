import { Label } from '../label'

export const SerchSort = (input, data) => {
    const result = []
    data.forEach(cell => {
        const split = cell.pair.split("_")

        const pairl = (split[0] + " " + split[1]).toLowerCase()
        const dur = cell.dur.toLowerCase()
        const endDate = cell.endDate.toLowerCase()
        const profit = Label(cell.profit.toLowerCase())
        const safeties= cell.safeties.toLowerCase()
        const startDate = cell.startDate.toLowerCase()
        const total = Label(cell.total.toLowerCase())
 
        const i = input.toLowerCase()
        if(
            dur.indexOf(i) >= 0 ||
            endDate.indexOf(i) >= 0 ||
            pairl.indexOf(i) >= 0 ||
            profit.indexOf(i) >= 0 ||
            safeties.indexOf(i) >= 0 ||
            startDate.indexOf(i) >= 0 ||
            total.indexOf(i) >= 0 
        ) {
            result.push(cell)
        }
    });

    return result
}