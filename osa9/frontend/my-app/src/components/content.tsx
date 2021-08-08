import React from 'react';
import { CoursePart } from '../App';
import { Part } from './part';

interface ContentProps {
    data: CoursePart[]
}

export const Content = ({data}: ContentProps) => <div> {data.map(part=><Part key={part.name} coursePart={part}/>)} </div>