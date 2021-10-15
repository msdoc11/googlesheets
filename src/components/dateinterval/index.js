import { useState, useEffect } from 'react'
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU'

import axios from '../../lib/axios'

import styles from './style.module.scss'

export const DateInterval = ({ setData, dates, width, languageSetting }) => {
    const [ date, setDate ] = useState(dates)
    useEffect(() => {
        setDate(dates)
    },  [dates])
    const max = width ? width : 245
    const style = {
        width: '100%',
        maxWidth: max,
        borderRadius: 8,
        borderColor: '#F5F5F5',
        margin: '20px 0px',
        marginLeft: 20
    }
    const dateFormat = 'DD.MM.YYYY';

    const fetchData = async (e, status) => {
        if(!!e === false) {
            return null
        }

        const d = moment(e._d).format(dateFormat)
       
        let now = ''
        let past = ''

        const nowSplit = date.dateNow.split(".")
        const pastSplit = date.datePast.split(".")

        const momentSplit = d.split(".")
        
        console.log(d)

        let statuss = true
           
        if(status === 'now') {
            if(new Date(momentSplit[2], momentSplit[1], momentSplit[0]).getTime() > new Date(pastSplit[2], pastSplit[1], pastSplit[0]).getTime()) {
                now = d
                past = date.datePast
            } else {
                statuss = false
            }
    
        } else {
            if(new Date(momentSplit[2], momentSplit[1], momentSplit[0]).getTime() < new Date(nowSplit[2], nowSplit[1], nowSplit[0]).getTime()) {
                now = date.dateNow
                past = d
            } else {
                statuss = false
            }
        }
        
        if(statuss) {
            setDate({
                dateNow: now,
                datePast: past
            })
            
            const response = await axios.post('/gettable', { dateNow: now, datePast: past })
            if(response) {
                setData(response.table)
            }

        }
    }

    
    return (
        <div style={{
            display: 'flex', 
            width: '100%', 
            maxWidth: max * 2 + 40, 
            justifyContent: 'space-between'
        }} className={styles.conteiner}>
            <DatePicker locale={languageSetting.label === "RU" ? locale : ""} className={styles.conteiner} style={style} defaultValue={moment(dates.datePast, dateFormat)} format={dateFormat} onChange={(e) => fetchData(e, 'past')} />
            <DatePicker locale={languageSetting.label === "RU" ? locale : ""} className={styles.conteiner} style={style} defaultValue={moment(dates.dateNow, dateFormat)} format={dateFormat} onChange={(e) => fetchData(e, 'now')}  />
        </div>
    )
}