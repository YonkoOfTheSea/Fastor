import React from 'react'
import styled from 'styled-components'
import { withTheme, Typography } from '@material-ui/core'

const Panel = ({ className, children, style }) => (
  <div className={className} style={style}>
    { children &&
      <Typography>{ children }</Typography>
    }
  </div>
)

export default withTheme()(styled(Panel)`
    align-items: center;
    background-color: ${props => props.theme.palette.secondary.lightBlue};
    border: 1px solid ${props => props.theme.palette.grey.light};
    border-radius: ${props => props.theme.borderRadius};
    display: flex;
    justify-content: center;
    min-height: 5--px;
    padding: 2rem;

    p {
      color: ${props => props.theme.palette.grey.dark};
      text-align: center;
    }
`)
