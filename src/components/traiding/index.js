import { useState } from 'react'

import { TitleText } from '../../ui/title'
import { DateInterval } from '../dateinterval'

import styles from './style.module.scss'
import { shadow, shadowPhone } from './style'

import graph from '../../svg/graph.svg'
import group from '../../svg/group.svg'

import { Text } from '../../ui/text'
import { Widget } from './widget'

export const Traiding = ({ dates, label, data, balance = false, innerWidth, languageSetting }) => {

    const [ table, setTable ] = useState(data)

    const setDate = (e) => {
      setTable(e)
    }

    if(!!balance?.start === false || !!balance?.current === false) {
        return null
    }

    const str = SortBalance(balance.start)
    const cur = SortBalance(balance.current)

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
        <div style={{ marginTop: 30, width: '100%', maxWidth: 1440}}>
            <TitleText>{label}</TitleText>
            <DateInterval setData={setDate} dates={dates} width={innerWidth > 787 ? 390 : 200} languageSetting={languageSetting}/>
            <div className={styles.conteiner}>
                <div className={styles.content_conteiner} style={{ maxWidth: 450, padding: "20px 40px", marginRight: "5%" }}>
                    
                    <div className={styles.content} style={{ width: 210, height: 124, padding: 24}}>
                        <div className={innerWidth > 787 ? shadow : shadowPhone}/>
                        <div>
                            <img alt="" src={graph}/>
                            <div style={{ height: 16 }}/>
                            <Text size={14} weight={700} line={1} roboto>
                                {str} USDT
                            </Text>
                            <Text size={14} roboto>
                                {languageSetting.balanceStart}
                            </Text>
                        </div>
                        <div  className={styles.content} style={innerWidth > 787 ? shadow : shadowPhone}>
                            <div className={styles.shadow}/>
                            <img alt="" src={group}/>
                            <div style={{ height: 16 }}/>
                            <Text size={14} weight={700} line={1} roboto>
                                {cur} USDT
                            </Text>
                            <Text size={14} roboto>
                                {languageSetting.balanceCurr}
                            </Text>
                        </div>
                    </div>
                </div>
                <div className={styles.content_conteiner}>
                    <Widget data={table} languageSetting={languageSetting}/>
                </div>
            </div>
        </div>
        </div>
    )
}

const SortBalance = (data) => {
    const split = data.split(",")
    
    let label = ""


    split.forEach(v => {
        const plus = v[0] === "$" ? Split(v) : v

        label = label + plus + " "
    });

    return label
}

const Split = (data) => {
    const res = data.split("$")
    return res[1] 
}