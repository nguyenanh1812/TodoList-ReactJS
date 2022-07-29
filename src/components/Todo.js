import React from 'react'
import Button from '@atlaskit/button'
import styled, { css } from 'styled-components'
import CheckIcon from "@atlaskit/icon/glyph/check"

const ButtonStyle = styled(Button)`
    margin-top: 5px;
    text-align: left;

    &, &:hover{
        ${p => p.isCompleted && css`
            text-decoration: line-through;
        `}
    }   

    &:hover {
        .check-icon {
            display: inline-block;
        }
    }
    .check-icon{
        display: none;

        &:hover {
            background-color: #e2e2e2;
            border-radius: 3px;
        }
    }
`;

export default function Todo({ todo, onCheckIconClick }) {
    return <ButtonStyle
        isCompleted={todo.isCompleted}
        shouldFitContainer
        iconAfter={
            !todo.isCompleted &&
            <span className='check-icon' onClick={() => onCheckIconClick(todo.id)}><CheckIcon primaryColor='#4fff4f'></CheckIcon> </span>
        }>{todo.name}</ButtonStyle>
}
