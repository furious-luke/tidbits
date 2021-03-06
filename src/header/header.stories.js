import React from 'react'
import {storiesOf} from '@storybook/react'
import {Stateful, BackgroundDecorator} from '../helpers'
import {styled} from 'baseui'
import {Header} from './header'

const tabs = [
  {
    title: 'Tab 1',
    link: '/tab1/'
  },
  {
    title: 'Tab 2',
    link: '/tab2/'
  }
]

const StyledDiv = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'orange',
  color: 'white',
  width: '4.5rem',
  height: '3.5rem'
})

function Logo() {
  return <StyledDiv>Logo</StyledDiv>
}

storiesOf('Header', module)
  .addDecorator(BackgroundDecorator)
  .add('Demonstration', () => (
    <Header logo={Logo} />
  ))
  .add('Header with tabs', () => (
    <Stateful
      valueProp="activeTab"
      onChangeProp="onTabChange"
      defaultValue={0}
    >
      <Header logo={Logo} tabs={tabs} />
    </Stateful>
  ))
