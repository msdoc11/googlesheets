export const Label = (label) => {
    const str = String(label)
    const total = str.replace(/[^+\d]/g, '')
    
    const arr = total.split("")
    arr.reverse()

    let i = 1
    let strRes = ""
    arr.forEach(element => {
        strRes = strRes + (i % 3 === 0 && i !== arr.length ? element + "." : element)
        i++
    });
    const arr2 = strRes.split("")
    arr2.reverse()
    const res = arr2.join("")
    return str[0] === "-" ? "-" + res : res
};