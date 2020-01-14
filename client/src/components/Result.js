import React from "react";

function Result(props) {

  return (
    <>
      <a href={props.link}><img src={props.image} alt="tech news" /></a>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </>
  )
};

export default Result; 