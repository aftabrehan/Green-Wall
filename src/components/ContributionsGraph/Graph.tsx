import { levels } from '../../constants'
import { numberWithCommas } from '../../helpers'
import type { ContributionCalendar, ContributionDay } from '../../types'
import { ContributionLevel } from '../../types'
import styles from './Graph.module.css'

interface GraphProps {
  data: ContributionCalendar
  daysLabel?: boolean
}

export default function Graph(props: GraphProps) {
  return (
    <div>
      <div className="mb-2 text-sm">
        <span className="mr-2 italic">{props.data.year}:</span>
        {numberWithCommas(props.data.total)} Contributions
      </div>

      <div className={`${styles['graph']}`}>
        <ul className={`${styles['months']}`}>
          <li>Jan</li>
          <li>Feb</li>
          <li>Mar</li>
          <li>Apr</li>
          <li>May</li>
          <li>Jun</li>
          <li>Jul</li>
          <li>Aug</li>
          <li>Sep</li>
          <li>Oct</li>
          <li>Nov</li>
          <li>Dec</li>
        </ul>

        {props.daysLabel && (
          <ul className={`${styles['days']}`}>
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
        )}

        <ul className={`${styles['grids']} ${styles['blocks']}`}>
          {props.data.weeks.reduce<React.ReactElement[]>((acc, week, i) => {
            let days = week.days

            if (days.length < 7) {
              const fills = Array.from(Array(7 - days.length)).map<ContributionDay>(() => ({
                level: ContributionLevel.Null,
              }))
              if (i === 0) {
                days = [...fills, ...week.days]
              } else {
                days = [...week.days, ...fills]
              }
            }

            days.forEach((day, j) => {
              acc.push(<li key={`${i}${j}`} data-level={levels[day.level]}></li>)
            })

            return acc
          }, [])}
        </ul>
      </div>
    </div>
  )
}
