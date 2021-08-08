import React from "react";
import { CoursePart } from "../App";
  
  export const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    switch (coursePart.type) {
      case "normal": {
        return (
          <>
            <b>
              {coursePart.name} {coursePart.exerciseCount}
            </b>
            <p>{coursePart.description}</p>
          </>
        );
      }
      case "groupProject": {
        return (
          <>
            <b>
              {coursePart.name} {coursePart.exerciseCount}
            </b>
            <p>project exercises {coursePart.groupProjectCount}</p>
          </>
        );
      }
      case "submission": {
        return (
          <>
            <b>
              {coursePart.name} {coursePart.exerciseCount}
            </b>
            <p>{coursePart.description}</p>
            <p>submit to {coursePart.exerciseSubmissionLink}</p>
          </>
        );
      }
      case "special": {
        return (
          <>
            <b>
              {coursePart.name} {coursePart.exerciseCount}
            </b>
            <p>{coursePart.description}</p>
            <p>required skills: {coursePart.requirements.join(' ')}</p>
          </>
        );
      }
      
      default: {
        return <></>
      }
    }
  };