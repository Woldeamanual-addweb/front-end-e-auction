import React from "react"
import DateTimeDisplay from "./DatetimeDisplay"
import {
  expired_notice,
  show_counter,
  countdown_link,
  countdown,
} from "../styles/countdown.module.css"
import { useCountdown } from "../useCountdown"

const ExpiredNotice = () => {
  return (
    <div className={expired_notice}>
      <span>Auction is over </span>
    </div>
  )
}

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className={show_counter}>
      <a target="_blank" rel="noopener noreferrer" className={countdown_link}>
        <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
      </a>
    </div>
  )
}

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate)

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    )
  }
}

export default CountdownTimer
