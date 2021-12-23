import React, { useState, useEffect } from 'react';
import './App.scss';
import { OnboardingFlow } from './components/OnboardingFlow';

const StepOne = ({ gotoNext }) => {
	const field_name = React.createRef();
	return (
		<>
			<p>Name: <input type="text" ref={field_name} /></p>
			<button onClick={() => gotoNext({ name: field_name.current.value })}>Next</button>
		</>
	)
};

const StepTwo = ({ gotoNext }) => {
	const field_age = React.createRef();
	return (
		<>
			<p>Age: <input type="text" ref={field_age} /></p>
			<button onClick={() => gotoNext({ age: field_age.current.value })}>Next</button>
		</>
	)
};

const StepThree = ({ gotoNext }) => (
	<>
		<p>Contratulations, you qualify for our senior discount!</p>
		<button onClick={() => gotoNext({})}>Next</button>
	</>
);

const StepFour = ({ gotoNext }) => {
	const field_city = React.createRef();
	return (
		<>
			<p>City: <input type="text" ref={field_city} /></p>
			<button onClick={() => gotoNext({ city: field_city.current.value })}>Next</button>
		</>
	)
};

function App() {
	const [onboardingData, setOnboardingData] = useState({});
	const [currentIndex, setCurrentIndex] = useState(0);
	const [message, setMessage] = useState('');
	const [finished, setFinished] = useState(false);


	useEffect(() => {
		if (finished) setMessage(`finished, send this to backend: ${JSON.stringify(onboardingData, null, 2)}`);
	}, [finished, onboardingData])

	const onNext = (stepData, isLastStep = false) => {

		setOnboardingData({ ...onboardingData, ...stepData });
		setCurrentIndex(currentIndex + 1);
		if (isLastStep) setFinished(true);
	}

	return (
		<div className="App">
			{message !== '' && (
				<pre className="message">{message}</pre>
			)}
			{message === '' && (
				<div className="row">
					<div className="col s12 m6">
						<div className="card blue-grey darken-3">
							<div className="card-content white-text">
								<OnboardingFlow
									currentIndex={currentIndex}
									onNext={onNext}
								>
									<StepOne />
									<StepTwo />
									{Number(onboardingData.age) >= 60 && <StepThree />}
									<StepFour isLastStep={true} />
								</OnboardingFlow>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;