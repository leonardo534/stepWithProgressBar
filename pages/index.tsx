import * as React from 'react';
import { Step2 } from './step2';
import { useWizard, Wizard } from 'react-use-wizard';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Step = ({ number }) => {
  return <p>Step {number}</p>;
};

const Footer = () => {
  const {
    nextStep,
    previousStep,
    isLoading,
    activeStep,
    stepCount,
    isLastStep,
    isFirstStep,
  } = useWizard();
  const [progress, setProgress] = React.useState(34);

  function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number }
  ) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary"></Typography>
        </Box>
      </Box>
    );
  }

  const handleNextStep = () => {
    nextStep();

    setProgress((nextProgress) =>
      nextProgress >= 100 ? 10 : nextProgress + 33
    );
  };

  const handlePrevStep = () => {
    previousStep();

    setProgress((nextProgress) =>
      nextProgress >= 100 ? 67 : nextProgress - 33
    );
  };

  return (
    <code>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <p>Has previous step: {!isFirstStep ? '✅' : '⛔'}</p>
        <br />
        <p>Has next step: {!isLastStep ? '✅' : '⛔'} </p>
        <br />
        <p>
          Active step: {activeStep + 1} <br />
        </p>
        <br />
        <p>
          Total steps: {stepCount} <br />
        </p>
      </div>
      <div>
        <LinearProgressWithLabel value={progress} />
        <button onClick={handlePrevStep} disabled={isLoading || isFirstStep}>
          Previous
        </button>
        <br />
        <button onClick={handleNextStep} disabled={isLoading || isLastStep}>
          Next
        </button>
      </div>
    </code>
  );
};

const IndexPage = () => {
  return (
    <Wizard footer={<Footer />}>
      <Step number={1} />
      <Step2 />
      <Step number={3} />
    </Wizard>
  );
};

export default IndexPage;
