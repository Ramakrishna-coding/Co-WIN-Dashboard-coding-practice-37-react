import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGender} = props
  return (
    <PieChart width={1000} height={300}>
      <Pie
        cx="50%"
        cy="70%"
        data={vaccinationByGender}
        startAngle={0}
        endAngle={180}
        innerRadius="40%"
        outerRadius="70%"
        dataKey="count"
      >
        <Cell name="Male" fill="#2d87bb" />
        <Cell name="Female" fill=" #5a8dee" />
        <Cell name="Others" fill="#f54394" />
      </Pie>
      <Legend
        iconType="circle"
        layout="horizontal"
        verticalAlign="bottom"
        align="center"
        wrapperStyle={{padding: 10}}
      />
    </PieChart>
  )
}

export default VaccinationByGender
