import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Autor from "./Autor";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  listElem: {
    margin: '12px 0'
  },
}));

export default function ResultList({list}) {

  const classes = useStyles();

  return (
    <List dense className={classes.root}>
      {list.map((value, index) => {
        return (
          <ListItem key={index} className={classes.listElem}>
            <ListItemText primary={value} />
          </ListItem>
        );
      })}
      <Autor />
    </List>
  );
}
