import { Text } from '../../ui/text'
import { Label } from '../label'
import Star from '../../svg/star.svg'

import { topdeals } from '../../setting'

export const SortTableTitle = (table, languageSetting, innerWidth) => {
    const label = table.data.label
    const columns = []
    let n = 0
    for(let i = 0; i < label.length; i++) {
        if(label[i].index !== "trade") {
            let title = label[i].title

            if(label[i].index === "pair") title = languageSetting.patrTrade
            if(label[i].index === "startDate") title = languageSetting.startDateTabel
            if(label[i].index === "endDate") title = languageSetting.endDateTable
            if(label[i].index === "dur") title = languageSetting.durTable
            if(label[i].index === "safeties") title = languageSetting.safetiesTable
            if(label[i].index === "profit") title = languageSetting.profitTable
            if(label[i].index === "total") title = languageSetting.totalTable

            columns.push({
                key: n,
                title: title,
                dataIndex: label[i].index,
                render: (text, index) => CustomLabel(text, label[i].index, index, languageSetting, innerWidth > 1024 ? "" : title),
                bordered: false
            })
            n = n + 1
        }
        
    }
    return { columns }
}

const CustomLabel = (text, label, index, languageSetting, title) => {
    const profit = Label(index.profit)
    const spl = profit.split(".")
    let sum = ""
    spl.forEach(v => sum = sum + v) 
    const bold = sum > topdeals? "600" : "400"
    
    if(label === "pair") {
        const split = text.split("_")
        return (
            <div key={index} style={{ display: 'flex', alignItems: 'center'}}>
                {
                    bold === "600"?  <img alt="" src={Star} style={{width: 21, height: 21}}/> :
                    <div style={{width: 21}}/>
                }&nbsp;
                <div style={{ display: 'flex', paddingTop: 5}}>
                    <Text color="#555BE9" >{split[0]}</Text>&nbsp;
                    <Text weight={bold} >{split[1]}</Text>
                </div>
            </div>
        )
    }
    if(label === "startDate" || label === "endDate" ) {
        return <Text  key={index} weight={bold} >{text}</Text>
    }
    if(label === "dur" ) {
        const split = text.split(",")
        const num = Number(split[0])
        return <Text  key={index} weight={bold} >
            {num / 24 > 1 ? ((num / 24).toFixed(1)) + " " + days(languageSetting.days, ((num / 24).toFixed(1))) 
            :
              num >= 1 ? num === 24 ? 23 + " "  + Hours(languageSetting.hours, num) 
              : 
                num + " "  + Hours(languageSetting.hours, num)
                :
                    split[1] === "00" ? "-" : split[1] + " " + Minutest(languageSetting.mins, num)} <span>{title}</span></Text>
    }
    if(label === "profit" ) {
        return <Text  key={index} weight={bold} >{ "$ " + Label(text)} <span>{title}</span></Text>
    }
    if(label === "total" ) {
        return <Text  key={index} weight={bold} >{Label(text) + " $"} <span>{title}</span></Text>
    }
    return <Text  key={index} weight={bold} >{text} <span>{title}</span></Text>
}

const days = (label, num) => {
    if(num <= 1) {
        return label[0]
    }
    if(num >= 1 && num <= 4) {
        return label[1]
    }
    
    return label[2]
}

const Hours = (label, num) => {
    if(num === 1) {
        return label[0]
    }
    if(num >= 2 && num <= 4 ) {
        return label[1]
    }

    if(num === 24 ) {
        return label[1]
    }

    return label[2]
}

const Minutest = (label, num) => {
    if(num === 1) {
        return label[0]
    }
    if(num >= 2 && num <= 4 ) {
        return label[1]
    }
    return label[2]
}