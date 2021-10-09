import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import { withTheme } from '@material-ui/core/styles'
import { Card, Chip } from '@material-ui/core';

const MsgHeader = ({ className, title, subtitle,score }) => (
  <Card>
    <div className={className}>
      <div className='header-meta'>
        <div className='header-text'>
          {
            title &&
            <Typography className='header-title'  variant="h6">{title}</Typography>
          }
          {
            subtitle &&
            <Typography className='header-subtitle' variant="subtitle1">{subtitle}</Typography>
          }
        </div>
      </div>
      <div>
      {
        score &&
          <Chip label={"Rating : "+score} color='secondary' />
      }
    </div>
    </div>
  </Card>
)

export default withTheme()(styled(MsgHeader)`
  display: flex;
  justify-content: space-between;
  padding : 1%

  .header-meta {
    align-items: center;
    display: flex;
  }

  .header-visual {
    margin-right: .5rem;
    font-size: 40px;
  }

  .header-title {
    color: ${props => props.theme.palette.primary.main};
    font-weight: 700;
  }

  .header-subtitle {
    color: ${props => props.theme.palette.grey.dark};
    font-size: 12px;
  }
`)
