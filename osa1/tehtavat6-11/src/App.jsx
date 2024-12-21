import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <><tr><td>{text}</td><td>{value}</td></tr></>
)

const Display = (props) => {
  if (props.allReviews.length === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } else {
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="Good" value={props.good} />
          <StatisticLine text="Neutral" value={props.neutral} />
          <StatisticLine text="Bad" value={props.bad} />
          <StatisticLine text="All" value={props.allReviews.length} />
          <StatisticLine text="Average" value={props.average} />
          <StatisticLine text="Positive" value={`${props.positives} %`} />
        </tbody>
      </table>
    </div>
  )
}
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allReviews, setAll] = useState([])
  const [average, setAverage] = useState(0.00)
  const [allPositives, setAllPositives] = useState([])
  const [positives, setPositives] = useState(0.00)

  const handleGood = () => {
    setGood(good + 1)

    const updatedAll = allReviews.concat(1)
    const updatedPositives = allPositives.concat(1)
    setAll(updatedAll)
    setAllPositives(updatedPositives)

    calculateAverage(updatedAll)
    calculatePositives(updatedAll, updatedPositives)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)

    const updatedAll = allReviews.concat(0)
    const updatedPositives = allPositives
    setAll(updatedAll)
    setAllPositives(updatedPositives)

    calculateAverage(updatedAll)
    calculatePositives(updatedAll, updatedPositives)
  }

  const handleBad = () => {
    setBad(bad + 1)
    
    const updatedAll = allReviews.concat(-1)
    const updatedPositives = allPositives
    setAll(updatedAll)
    setAllPositives(updatedPositives)

    calculateAverage(updatedAll)
    calculatePositives(updatedAll, updatedPositives)
  }

  const calculateAverage = (updatedAll) => {
    let summa = 0
    updatedAll.forEach (value => {
      summa += value
    })
    setAverage(summa / updatedAll.length)
  }

  const calculatePositives = (updatedAll, updatedPositives) => {
    setPositives(updatedPositives.length / updatedAll.length * 100
    )
  }


  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGood} text='Good' />
      <Button handleClick={handleNeutral} text='Neutral' />
      <Button handleClick={handleBad} text='Bad' />
      <h1>Statistics</h1>
      <Display 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        allReviews={allReviews} 
        average={average}
        positives={positives}
         />
    </div>
  )
}

export default App