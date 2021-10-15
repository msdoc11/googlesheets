import { useState, useEffect } from 'react'
import { Table, Input, Select } from 'antd'
import { SortTableTitle } from './sort'
import styles from './style.module.scss'
import { TitleText } from '../../ui/title'
import { Text } from '../../ui/text'
import { DateInterval } from '../dateinterval'
import search from '../../svg/search.svg'
import Star from '../../svg/star.svg'
import down from '../../svg/down.svg'
import { SerchSort } from './search'

import { itemRender } from './paggination'

const { Option } = Select;
const suffix = (
  <img alt="" src={search} style={{width: 21, height: 21}}/>
);

const StarSvg = (
  <img alt="" src={Star} style={{width: 21, height: 21}}/>
);
const DomnSvg = (
  <div style={{position: 'relative'}}>
  <img alt="" src={down} style={{width: 21, height: 21, position: "absolute", top: -5, left: 0}}/>
  </div>
);

export const TableComp = (data) => {
  const languageSetting = data.languageSetting
  const { columns } = SortTableTitle(data, languageSetting, data.innerWidth)
  const [ table, setTable ] = useState(data.data.cell)
  const [ pagg, setPagg ] = useState(10)
  const [ search, setSearch ] = useState(data.data.cell)
  
  const [ width, setWidth ] = useState(data.data.cell)

  const setDate = (e) => {
    setTable(e.cell)
    setSearch(e.cell)
  }

  const style = { 
    borderRadius: 8,
    borderColor: '#F5F5F5',
    margin: '20px 0px',
    marginLeft: data.innerWidth > 1200 ? 10 : 20,
    width: data.innerWidth > 1200 ? "100%" : 245
  }

  const Search = (e) => {
    const res = SerchSort(e.target.value, search)
    setTable(res)
  }

  function handleChange(value) {
    setPagg(value)
  }

  useEffect(() => {
    const pdg = document.getElementsByClassName("ant-table-pagination")
    setWidth(pdg[0].offsetWidth)
    pdg[0].addEventListener("click", () => {
      setTimeout(() => {
        const pdg1 = document.getElementsByClassName("ant-table-pagination")
        setWidth(pdg1[0].offsetWidth)
      }, 100)
    });
  }, [true])


  let ds = []
  let n = 0
  table.forEach(element => {
    element.id = n
    ds.push(element)
    n = n + 1
  });
  return (
    <div className={styles.position}>
      <div  className={styles.back}/>
      <div className={styles.overflow + " _scroll_bar_custom"}>
      <div className={styles.conteiner}>
        <TitleText none>{data.label}</TitleText>
        <div style={{display: 'flex', justifyContent: 'center'}} className={styles.input}>
          <Input placeholder={languageSetting.search} style={style} suffix={suffix} onChange={Search}/>
          <DateInterval setData={setDate} dates={data.dates} languageSetting={languageSetting}/>
        </div>
        <Table dataSource={ds} columns={columns} bordered={false} className='time-table-row-select' 
          pagination={{ pageSize: pagg, alignmentBottom: 'left', size: "small", itemRender: itemRender}} 
          rowKey="id"
        />
        <div className={styles.table_cont} style={{ width: `calc(100% - ${width + 10}px)` }}>
          <div className={styles.star}>
            {StarSvg}&nbsp;&nbsp;<Text>{languageSetting.top}</Text>
          </div>
        
          <div>
            <Select defaultValue="10" 
                onChange={handleChange}
                className={styles.select}
                size="small"
                suffixIcon={e => {
                  return <>{DomnSvg}</>
                }}
              >
                <Option value="10">10</Option>
                <Option value="25">25</Option>
                <Option value="50">50</Option>
            </Select>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}