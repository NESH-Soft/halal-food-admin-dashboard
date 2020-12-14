import React,{useContext,useEffect} from 'react';
import moment from 'moment'
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import OrderContext from '../../context/OrderContext/OrderContext'

export default function Chart() {

  const theme = useTheme();
  const {getTodayOrder,todayOrder} = useContext(OrderContext)
  useEffect(()=>{
    getTodayOrder();
    // eslint-disable-next-line
  },[])

const data = todayOrder.map((t)=>{
 return  {time:moment(t.createdAt).format('h:mm'), amount: t.totalPrice}
})


  return (
    <React.Fragment>
      <Title>Today Activity</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
               (¥)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}