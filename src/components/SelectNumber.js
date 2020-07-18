import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  textField: {
    width: "100%",
  },
  listElem: {
    margin: '12px 0'
  },
  button: {
    width: "100%"
  },
  fieldCol: {
    width: "70%",
  },
  buttonCol: {
    width: "30%",
  },
}));

export default function SelectNumber({list, selectedNumber, setSelectedNumber}) {
  const classes = useStyles();
  const [incorrectData, setIncorrectData] = React.useState('');

  const updateValue = (e) => {
    if(e.target.value > list.length){
        setIncorrectData('You cannot select more elements than list length')
        setSelectedNumber(list.length);
    }else if(e.target.value < 1){
        setIncorrectData('The smallest number is 1')
        setSelectedNumber(1);
    }else{
        setSelectedNumber(e.target.value);
    }
  }

  const gerRandomNumber = ()=>{
    setSelectedNumber(Math.floor(Math.random() * (list.length - 2)) + 1);
  }

  return (
    <React.Fragment>
      <Snackbar anchorOrigin={{ 'vertical': 'top', 'horizontal': 'center' }} open={!!incorrectData} autoHideDuration={2000} onClose={()=>{setIncorrectData('')}}>
        <Alert onClose={()=>{setIncorrectData('')}} severity="error">
            {incorrectData}
        </Alert>
      </Snackbar>
    <List dense className={classes.root}>
      <ListItem>
        <ListItemText
            className={classes.fieldCol}>
          <TextField
            label="How many elements you need?"
            color="secondary"
            type="number"
            value={selectedNumber}
            className={classes.textField}
            onChange={updateValue}
          />
        </ListItemText>
        <ListItemText
            className={classes.buttonCol}>
            <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={gerRandomNumber}
          >
            Get random number
          </Button>
        </ListItemText>
      </ListItem>
    </List>
    </React.Fragment>
  );
}
