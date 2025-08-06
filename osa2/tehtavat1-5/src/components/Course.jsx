const Course = ({ course }) => {
  return (
    <div>
    <Header name={course.name} />
    <Content course={course} />
    <Exercises parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h2>
        {props.name}
      </h2>
    </div>
  )
}

const Content = (props) => {
  const info = props.course.parts
  return (
    <ul key={props.course.id}>
      {info.map(course => <Part key={course.id} name={course.name} exercises={course.exercises} />)}
    </ul>
  )
}

const Part = (props) => {
  return (
    <li key={props.id}>
      {props.name} {props.exercises}
    </li>
  );
};


const Exercises = ({ parts }) => {
  console.log("exercise parts", parts)
  const summa = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <b>Total of {summa} exercises</b>
  )
};
  
  export default Course