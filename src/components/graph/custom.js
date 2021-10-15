import { Label } from '../label'

export const Customlabel = (label , data, date) => {
    let str = ""
    data.forEach(v => {
        if(v.name === label) str = v
    });
    if(date) {
        const str = label.split(".")
        return str[0]
    }

    if(str?.pair) {
        const res = str.pair.split("_")
        return res[0] + " " + res[1]
    } else {
        return label
    }
}



export const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    const l = Label(value)
    const pos = l < 0 ? -height : 0
    return (
        <>
        <text className="text-border"  x={x + width / 2} y={y - pos} fill="#18D3BD" textAnchor="middle" dy={-6}>{`${l}`}</text>
        <text  x={x + width / 2} y={y - pos} fill="#18D3BD" textAnchor="middle" dy={-6}>{`${l}`}</text>
        </>
    )
};

export const renderCustomBarLabelLine = ({ payload, x, y, width, height, value }) => {
    const l = Label(value)
    return (
        <>
        <text className="text-border"  x={x} y={y} fill="#18D3BD" textAnchor="middle" dy={-10}>{`${l}`}</text>
        <text  x={x} y={y} fill="#18D3BD" textAnchor="middle" dy={-10}>{`${l}`}</text>
        </>
    )
};