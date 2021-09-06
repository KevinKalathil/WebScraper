import '../App.css';

import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '50%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '50%',
    },
  },
};

const names = [
    'Amazon', 'EBay', 'Walmart'

];

function getStyles(name, theme) {
  return {
    fontWeight:
      theme.typography.fontWeightRegular
  };
}

export default function MultiSelect({vendors,changeVendors}) {
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (event) => {
    changeVendors(event.target.value);
  };

  return (

    <div class="container flex mx-20 w-auto">
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">vendors</InputLabel>
            <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={vendors}
            onChange={handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
                <div className={classes.chips}>
                {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                ))}
                </div>
            )}
            MenuProps={MenuProps}
            >
            {names.map((name) => (
                <MenuItem key={name} value={name} style={getStyles(name, theme)}>
                {name}
                </MenuItem>
            ))}
            </Select>
        </FormControl>

      </div>
  );
}
