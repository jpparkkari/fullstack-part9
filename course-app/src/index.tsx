import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
  name: string;
}

interface PartsValue {
  name: string,
  exerciseCount: number
}

const Header: React.FC<HeaderProps> = (props)  => {
  return <h1>{props.name}</h1>;
}

const Content: React.FC<{parts: Array<PartsValue>}> = (props) => {
  return (
    <>
    {props.parts.map((part,i) => <p key={i}>{ part.name } {part.exerciseCount} </p>
      
    )}
    </>
  );
}
const Total: React.FC<{parts: Array<PartsValue>}> = (props) => {
  return ( 
  <p>
  Number of exercises{" "}
  {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p> );
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: Array<PartsValue> = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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