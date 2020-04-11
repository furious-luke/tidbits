import React from 'react'
import useReactRouter from 'use-react-router'
import {Card} from 'baseui/card'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'

import {Form} from '../form'
import {Link} from '../link'

export function CrudForm({
  update,
  title,
  loading,
  submit,
  submitTo,
  cancelTo,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  children
}) {
  const {history} = useReactRouter()
  const verb = update ? 'Update' : 'Create'
  function handleSubmit() {
    if (submitTo) {
      history.push(submitTo)
    } else {
      history.goBack()
    }
  }
  return (
    <Card title={`${verb} ${title}`}>
      <Form>
        {children}
      </Form>
      <Block display="flex" justifyContent="space-between" alignItems="center" paddingRight="scale1000">
        <Button
          type="submit"
          onClick={() => submit().then(handleSubmit)}
          disabled={loading}
          isLoading={loading}
          $style={{minWidth: '8rem'}}
        >
          {submitLabel}
        </Button>
        <Link to={cancelTo || Link.TO.back}>{cancelLabel}</Link>
      </Block>
    </Card>
  )
}