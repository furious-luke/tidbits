import React, {useState} from 'react'
import {Select} from 'baseui/select'
import {TreeView} from 'baseui/tree-view'
import {StyledEmptyState} from 'baseui/menu'
import {mergeOverrides} from 'baseui/helpers/overrides'

import {maybe} from '../utils/functional'
import {isNil, toggleKey, toArray} from '../utils/primitives'
import {filterKey} from '../utils/filter'
import {filterTree, transformTree, hasChildren} from '../utils/tree'

import {useFuseSearch} from './hooks'

export function TreeSelect({
  options,
  onChange,
  filterFunc = filterKey,
  startFilter = '',
  startExpanded = {},
  value,
  overrides: treeSelectOverrides = {},
  ...props
}) {
  const [expanded, setExpanded] = useState(startExpanded)
  const [filter, setFilter] = useState(startFilter)
  const search = useFuseSearch(options)
  function handleInputChange(event) {
    setFilter(event.target.value)
  }
  const filteredOptions = filter ? search(filter) : options
  const transformFunc = filter ? node => ({...node, isExpanded: true}) : node => ({...node, isExpanded: expanded[node.id]})
  const expandedOptions = transformTree(filteredOptions, transformFunc)
  function onToggle(item) {
    setExpanded(toggleKey(expanded, item.id))
  }
  const overrides = mergeOverrides(
    {
      StatefulMenu: {
        component: TreeDropdown,
        props: {
          onToggle
        }
      }
    },
    treeSelectOverrides
  )
  // TODO: Need to flatten the options when passed in to the Select.
  return (
    <Select
      value={toArray(value)}
      options={expandedOptions}
      onInputChange={handleInputChange}
      onChange={maybe(onChange)}
      filterOptions={null}
      noResultsMsg={filter.length > 2 ? 'No results' : '3 characters required ...'}
      overrides={overrides}
      {...props}
    />
  )
}

function TreeDropdown({items, onToggle, noResultsMsg, onItemSelect, ...props}) {
  const ungroupedItems = items.__ungrouped
  if (!ungroupedItems.length) {
    return <StyledEmptyState>{noResultsMsg}</StyledEmptyState>
  }
  return (
    <TreeView
      data={ungroupedItems}
      onToggle={item => {
        if (hasChildren(item)) {
          maybe(onToggle)(item)
        } else {
          maybe(onItemSelect)({item})
        }
      }}
      overrides={{
        Root: {
          style: {
            maxHeight: '300px'
          }
        },
        TreeItemContent: {
          style: {
            cursor: 'pointer'
          }
        },
        TreeLabel: {
          style: ({$theme}) => ({
            color: $theme.colors.contentPrimary,
            cursor: 'pointer'
          })
        }
      }}
    />
  )
}
