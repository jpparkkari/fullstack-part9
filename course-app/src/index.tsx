import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
  name: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartExtendedBase extends CoursePartBase{
  description: string;
}

interface CoursePartOne extends CoursePartExtendedBase {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartExtendedBase {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

const Header: React.FC<HeaderProps> = (props)  => {
  return <h1>{props.name}</h1>;
}

const Content: React.FC<{parts: Array<CoursePart>}> = (props) => {
  return (
    <div>
    {props.parts.map((coursePart, i) => <Part part={coursePart} key={i}/>)}
    </div>
  );
}
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  
  switch (part.name) {
    case "Fundamentals":
      return <p>{part.name} {part.exerciseCount} {part.description} </p>
     
    case "Using props to pass data":
      return <p>{part.name} {part.exerciseCount}, {part.groupProjectCount}</p>
     
    case "Deeper type usage":
      return <p>{part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink} </p>

    default:
      return assertNever(part);
  }
  
}

const Total: React.FC<{parts: Array<CoursePart>}> = (props) => {
  return ( 
  <p>
  Number of exercises{" "}
  {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p> );
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));