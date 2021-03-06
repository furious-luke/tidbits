import React from 'react'
import {Link as RouterLink} from '@reach/router'
import {useNavigate} from '@reach/router'
import {StyledLink} from 'baseui/link'

import {preventDefault, stopPropagation} from '../utils/dom'

import {TO} from './constants'

export function Link(props) {
  const {children, to, href, onClick, ...restProps} = props
  const navigate = useNavigate()
  let _to = to || href
  _to = _to === TO.back ? undefined : _to
  const _onClick = to === TO.back ? preventDefault(handleBack) : preventDefault(onClick)
  const _as = (to === TO.back || !_to) ? undefined : RouterLink
  function handleBack() {
    navigate(-1)
  }
  return (
    <StyledLink
      $as={_as}
      to={_to}
      onClick={stopPropagation(_onClick)}
      href="#"
      {...restProps}
    >
      {children}
    </StyledLink>
  )
}

Link.TO = TO
