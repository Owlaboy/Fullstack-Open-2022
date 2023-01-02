const Header = (props) => {
  return <h1>{props.course.name}</h1>
}

const Content = (props) => {
  let parts = props.course.parts
  return(
    <>
      <Part part={parts[0]}/>
      <Part part={parts[1]}/>
      <Part part={parts[2]}/>
    </>
  )
}

const Part = (prop) => {
  return(
      <p>
        {prop.part.name} {prop.part.exercises}
      </p>
  )
}

const Total = (props) => {
  const parts = props.course.parts
  return <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App