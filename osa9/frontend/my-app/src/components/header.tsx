import React from 'react';

interface HeaderProps {
name: string;
}
export const Header = ({name}: HeaderProps) => (
    <h1>{name}</h1>
)