import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

const VaccinationCoverage = props => {
  const {last7Days} = props

  const DataFormatter = number => {
    if (number > 100) {
      return `${(number / 10).toString()}k`
    }
    return number.toString()
  }

  return (
    <BarChart
      data={last7Days} // -->This value has to be data value modified
      width={1000}
      height={400}
    >
      <XAxis
        dataKey="vaccineDate" // --->Data key has to be modified The bottom data key elements is also to be modified
        tick={{
          stroke: '#6c757d',
          strokeWidth: 1,
        }}
      />
      <YAxis
        tickFormatter={DataFormatter}
        tick={{
          stroke: '#6c757d',
          strokeWidth: 0,
        }}
      />
      <Legend
        wrapperStyle={{
          padding: 30,
        }}
      />
      <Bar dataKey="dose1" name="Dose1" fill="#5a8dee" barSize="20%" />
      <Bar dataKey="dose2" name="Dose2" fill="#f54394" barSize="20%" />
    </BarChart>
  )
}

export default VaccinationCoverage
