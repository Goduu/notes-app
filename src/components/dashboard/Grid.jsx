import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { GridInterface } from './GridInterface'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
  },
  paper: {
    overflow: 'hidden'
  },
  mainNote: {
    padding: theme.spacing(1),
    height: '100%'
  },
  title: {
    padding: theme.spacing(1),

  }
}))

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
function Grid() {

  const [items, setItems] = useState([])
  const [cols, setCols] = useState({ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },)
  const [layout, setLayout] = useState({})
  const [layouts, setLayouts] = useState({})
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
  const classes = useStyles();


  /**
   * Math.random should be unique because of its seeding algorithm.
   * Convert it to base 36 (numbers + letters), and grab the first 9 characters
   * after the decimal.
   * @returns a random Id
   */
  const randomId = () => {
    return '_' + Math.random().toString(36).substr(2, 9).toString();
  }

  const resize = (id) => {
    console.log('resize', items)
    setLayout(prev => {
      return prev.map(el => {
        if (el.i === id) {
          el.h = el.h + 1
          return el
        } else {
          return el
        }
      })
    })
  }


  const onAddItem = () => {
    const id = randomId()
    setItems(prev => {
      return prev.concat({
        i: id,
        x: (items.length * 2) % (cols[currentBreakpoint] || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
        remove: () => onRemoveItem(id),
      })
    })


  }

  const onRemoveItem = (id) => {
    console.log("remove", id)
    setItems(prev => {
      return _.reject(prev, { i: id })
    })

  }

  // We're using the cols coming back from this to calculate where to add new items.
  const onBreakpointChange = (breakpoint, cols) => {
    setCurrentBreakpoint(breakpoint)

  }

  const onLayoutChange = (layout_, layouts) => {
    console.log("layout layouts", layout, layouts)
    setLayout(layout_)
    setLayouts(layouts)
  }



  return (
    // <NewGrid/>
    <GridInterface
      notes={items}
      onAddItem={onAddItem}
      resize={resize}
      onRemoveItem={onRemoveItem}
      onLayoutChange={onLayoutChange} onBreakpointChange={onBreakpointChange} currentBreakpoint={currentBreakpoint}
      classes={classes} layouts={layouts}
    />
  )

}

Grid.propTypes = {
};

export default Grid;