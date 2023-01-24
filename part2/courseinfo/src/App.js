import React from 'react'

const Header = (props) => {
  return <h1>{props.course.name}</h1>
}

const Content = (props) => {
  const parts = props.course.parts

  return(
  <div>
    {parts.map(part => <Part part={part} key={part.id}/>
    )}
  </div>
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
  
  var total = parts.reduce(function(total, course) {
    return total += course.exercises
  }, 0)

  return <b>Number of exercises {total}</b>
}

const Course = (props) => {
  return(
    <div>
      <Header course={props.course}/>
      <Content course={props.course}/>
      <Total course={props.course}/>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return(
  <div>
    {courses.map(course => (
      <Course course={course} key={course.id}/>
    ))}
  </div>
  )
}

export default App