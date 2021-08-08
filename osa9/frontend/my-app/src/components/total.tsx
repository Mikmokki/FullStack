import React from 'react';

interface TotalProps {
    data: {
    name: string,
    exerciseCount: number,
}[]
}
export const Total = ({data}: TotalProps) => (
    <p>
        Number of exercises{" "}
        {data.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
)