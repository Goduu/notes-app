import React from "react";
import PropTypes from "prop-types";
import { Responsive, WidthProvider } from "react-grid-layout";
import _ from "lodash";
import { Button, IconButton, Paper, TextField } from '@material-ui/core';

// const ResponsiveReactGridLayout = WidthProvider(RGL);
const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
function GridInterface(props) {
  // Variables
  let { notes, classes, layouts } = props
  // Functions
  let { onAddItem, currentBreakpoint, onRemoveItem,
    onLayoutChange, onBreakpointChange, resize } = props

    const onDrop = (layout, layoutItem, _event) => {
      alert(`Dropped element props:\n${JSON.stringify(layoutItem, ['x', 'y', 'w', 'h'], 2)}`);
    };

  return (
    <div className={classes.root}>
      <Button onClick={onAddItem}>add</Button>
      <ResponsiveReactGridLayout
        onLayoutChange={onLayoutChange}
        layouts={layouts}
        onBreakpointChange={onBreakpointChange}
        rowHeight={80}
        columnHeight={25}
        isResizable={true}
      >
        {notes.map(el => {
          return (
            <Paper key={el.i} data-grid={el} className={classes.paper}>
              <IconButton onClick={el.remove} size="small">x</IconButton>
              
              <br/>
              <TextField className={classes.title} fullWidth></TextField>
              <TextField multiline variant="outlined" className={classes.mainNote} fullWidth></TextField>
            </Paper>
          )
        })}
      </ResponsiveReactGridLayout>

    </div>

  )

}

GridInterface.propTypes = {
  notes: PropTypes.array.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onLayoutChange: PropTypes.func.isRequired,
  onBreakpointChange: PropTypes.func.isRequired,
};

export { GridInterface };