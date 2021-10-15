import { useState, useEffect } from 'react'
import styles from './app.module.scss'
import axios from './lib/axios'
import { useLocation } from 'react-router-dom'
import moment from 'moment'

import { Traiding } from './components/traiding'
import { Graph } from './components/graph'
import { TableComp } from './components/table'

import { profitTotal } from './sort/total'
import { profitDay } from './sort/profitday'
import { profitAsset } from './sort/asset'

import { Header } from './components/header'

import { language } from './setting'

import { Footer } from './components/footer'

const App = () => {
  const [ table, setTable ] = useState([])
  const [ balance, setBalance ] = useState(null)

  const [ innerWidth, setWidth ] = useState(window.innerWidth)

  const [ languageSetting, setLanguageSetting ] = useState(language[0])

  const date = new Date();
  //eslint-disable-next-line
  const dates = {
    dateNow: moment(new Date()).format("DD.MM.YYYY"),
    datePast: moment(new Date(date.setDate(date.getDate() - 30))).format("DD.MM.YYYY")
  }

  const location = useLocation()
  useEffect(() => {
    if(location.pathname.indexOf(language[0].value) >= 0) {
        setLanguageSetting(language[0])
    }
    if(location.pathname.indexOf(language[1].value) >= 0) {
        setLanguageSetting(language[1])
    }
  }, [true])

  useEffect(() => {
    (async function fetchData() {
      
      const response = await axios.post('/gettable', { dateNow: dates.dateNow, datePast: dates.datePast })
      if(response) {
        setTable(response.table)
        setBalance(response.balance)
      }
    })()
  //eslint-disable-next-line
  }, [])


  useEffect(() => {
    window.addEventListener('resize', ()=>{
      setWidth(window.innerWidth)
    })
  }, [true])

  if(table.length === 0 ) {
    return null
  }
  return (
    <div className={styles.conteiner}>
      <div className={styles.body}>
          <Header languageSetting={languageSetting} innerWidth={innerWidth}/>
          <Traiding data={table} label={languageSetting.labelTraiding} dates={dates} balance={balance} innerWidth={innerWidth} languageSetting={languageSetting}/>
          <Graph data={profitTotal(table)} line date label={languageSetting.labelProfit} dates={dates} sort={profitTotal} innerWidth={innerWidth} languageSetting={languageSetting}/>
          <Graph data={profitAsset(table)} bar label={languageSetting.labelAsset} dates={dates} sort={profitAsset} innerWidth={innerWidth} languageSetting={languageSetting}/>
          <Graph data={profitDay(table)} bar date label={languageSetting.labelDay} dates={dates} sort={profitDay} innerWidth={innerWidth} languageSetting={languageSetting}/>
          <TableComp data={table} label={languageSetting.labelHistory} dates={dates} innerWidth={innerWidth}  languageSetting={languageSetting}/>
          <Footer languageSetting={languageSetting}/>
      </div>
    </div>
  );
}

export default App;
