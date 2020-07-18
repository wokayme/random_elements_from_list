import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import AppBar from "@material-ui/core/AppBar";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import EditIcon from "@material-ui/icons/Edit";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import CreateList from "./CreateList";
import ResultList from "./ResultList";
import SelectNumber from "./SelectNumber";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <FormatListBulletedIcon />,
    2: <EditIcon />,
    3: <EmojiEventsIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Give me list", "Tell me number", "Get result"];
}

export default function Creator() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [list, setList] = React.useState([]);
  const [generatedList, setGeneratedList] = React.useState([]);
  const [selectedNumber, setSelectedNumber] = React.useState(1);
  const steps = getSteps();

  const generateList = ()=>{
    setGeneratedList([...list].sort(() => Math.random() - 0.5).slice(0, selectedNumber))
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <CreateList list={list} updateList={setList} />;
      case 1:
        return <SelectNumber list={list} selectedNumber={selectedNumber} setSelectedNumber={setSelectedNumber} />;
      case 2:
        return <ResultList list={generatedList} />;
      default:
        return "Unknown step";
    }
  };

  const handleNext = () => {
    if(activeStep + 2 === steps.length){
      generateList();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div
        style={{
          margin: "0 auto",
          width: "800px",
        }}
      >
        <div>
          <Typography className={classes.instructions}>
            {getStepContent(activeStep)}
          </Typography>
        </div>
      </div>
      <AppBar
        position="fixed"
        color="primary"
        style={{
          top: "auto",
          bottom: 0,
          background: '#fff',
          display: 'flex',
          'justify-content': 'flex-end',
          flexDirection: 'row',
          padding: '16px 20px'
        }}
      >
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={classes.button}
        >
          Back
        </Button>

        {activeStep !== steps.length - 1 ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNext}
            className={classes.button}
            disabled={list.length === 0}
          >
            Next
          </Button>
        ):(
          <Button
            variant="contained"
            color="secondary"
            onClick={generateList}
            className={classes.button}
          >
            Regenarate result
          </Button>
        )}
      </AppBar>
    </div>
  );
}
