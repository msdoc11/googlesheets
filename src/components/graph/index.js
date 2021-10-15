import { useState, useEffect } from 'react'
import {
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Line
} from 'recharts';

import { renderCustomBarLabel, Customlabel, renderCustomBarLabelLine } from './custom'
import { Label } from '../label'
import { TitleText } from '../../ui/title'
import { DateInterval } from '../dateinterval'

import { SortIntervel } from './sort'

export const Graph = ({ data, line = false, bar = false, date = false, label="", dates, sort, languageSetting }) => {
  const [ table, setTable ] = useState(data)
  const [ reload, setReload ] = useState(true)
  const [ first, setFirst ] = useState(true)

    const setDate = (e) => {
      setTable(sort(e))
    }
    useEffect(() => {
      if(first) {
        setReload(false)
        setFirst(false)
      } else {
        setReload(true)
        setTimeout(() => {
          setReload(false)
        }, 2000)
      }
    }, [table])

    return (
      <div style={{ display: 'flex', justifyContent: 'center'}}>
      <div style={{ marginTop: 30, overflow: 'auto', marginBottom: 10}} className="_scroll_bar_custom">
        <div style={{ width: 1400 }}>
          <TitleText>{label}</TitleText>
          <DateInterval setData={setDate} dates={dates} width={390} languageSetting={languageSetting}/>
          {
            reload ? <div style={{height: 450}}/> :
            <ResponsiveContainer width="100%" height={date ? 450 : 480}>
            <ComposedChart
              data={SortIntervel(table)}
              margin={{
                top: 20,
                right: 25,
                left: 10,
                bottom: date ? 20 : 50
              }}
            >
              <CartesianGrid stroke="#f5f5f5" vertical={false} />
              
              <XAxis
                dataKey="name"
                padding={{ left: 10 }}  
                stroke="#232323"  
                tickFormatter={(label) => `${Customlabel(label, SortIntervel(table), date)}`}
                tickLine={false}
                minTickGap={-40}
                angle={date ? 0 : -45}
                axisLine={false}
                textAnchor="end"
                tick={{fontSize: 13, fontFamily: `'ssp'`}}
                interval="preserveStart"
                scale="band"
              />
              <YAxis  
                stroke="#8E8E8E" 
                tickFormatter={(label) => `$ ${Label(label)}`} 
                axisLine={false} 
                tickLine={false} 
                width={80} 
                tickCount={6}
                tick={{fontSize: 17, fontFamily: `'ssp'`}}
              />
              {
                line ? <Line dataKey="pv" stroke="#18D3BD" fill="#18D3BD"  type="linear" label={renderCustomBarLabelLine}/> : null
              }
              {
                bar ? <Bar 
                  dataKey="pv" 
                  fill="#18D3BD" 
                  radius={[4, 4, 0, 0]} 
                  label={renderCustomBarLabel}
                  barSize={10}
                /> : null
              }
            </ComposedChart>
          </ResponsiveContainer>
          }
          
        </div>
      </div>
      </div>
    )
}