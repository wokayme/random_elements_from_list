import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    paddingBottom: '80px'
  },
  textField: {
    width: "100%",
  },
  listElem: {
    margin: '12px 0'
  },
  addButton: {
    backgroundImage:
      "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
  },
  addIcon: {
    fill: "#fff",
  },
}));

export default function CreateList({list, updateList}) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [incorrectData, setIncorrectData] = React.useState('');

  const onPaste = (event) => {
    const paste = (
      event.clipboardData || window.clipboardData
    ).getData("text");
    const arrayToSplit = paste.match(/[^\r\n]+/g).filter(Boolean);
    updateList([...list, ...arrayToSplit])
    setValue("");
    event.preventDefault();
  };

  const addNew = () => {
        if(!value){
            console.log('eee')
            setIncorrectData('You cannot put empty element');
            return;
        }
    updateList([value, ...list ]);
    setValue("");
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
        <ListItemText>
          <TextField
            id="outlined-basic"
            label="Write first element or paste list"
            color="secondary"
            value={value}
            className={classes.textField}
            onPaste={onPaste}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton
            color="secondary"
            onClick={addNew}
            aria-label="remove that position"
            className={classes.addButton}
          >
            <AddIcon className={classes.addIcon} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      {list.map((value, index) => {
        return (
          <ListItem key={index} className={classes.listElem}>
            <ListItemText primary={value} />
            <ListItemSecondaryAction>
              <IconButton
                size="small"
                color="secondary"
                onClick={() => {
                    updateList(list.filter((el, ind) => ind !== index));
                }}
                aria-label="remove that position"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
    </React.Fragment>
  );
}
