import { useState, useEffect } from 'react';
import './App.scss';
import { OnboardingFlow } from './components/OnboardingFlow';

const StepOne = ({ gotoNext }) => (
	<>
		<h2>Step 1</h2>
		<p>Name: <input type="text" /></p>
		<button onClick={() => gotoNext({ name: "Harald Schwank" })}>Next</button>
	</>
);

const StepTwo = ({ gotoNext }) => (
	<>
		<h2>Step 2</h2>
		<p>Age: <input type="text" /></p>
		<button onClick={() => gotoNext({ age: 81 })}>Next</button>
	</>
);

const StepThree = ({ gotoNext }) => (
	<>
		<h2>Step 3</h2>
		<p>Contratulations, you qualify for our senior discount!</p>
		<button onClick={() => gotoNext({})}>Next</button>
	</>
);

const StepFour = ({ gotoNext }) => (
	<>
		<h2>Step 4</h2>
		<p>City: <input type="text" /></p>
		<button onClick={() => gotoNext({ city: "Berlin" })}>Next</button>
	</>
);

function App() {
	const [onboardingData, setOnboardingData] = useState({});
	const [currentIndex, setCurrentIndex] = useState(0);
	const [message, setMessage] = useState('');


	useEffect(() => {
		const onFinish = () => setMessage(`finished, send this to backend: ${JSON.stringify(onboardingData)}`);

		if (currentIndex > 3) {
			onFinish();
		}
	}, [currentIndex, onboardingData])

	const onNext = (stepData, onFinish) => {
		setOnboardingData({ ...onboardingData, ...stepData });
		setCurrentIndex(currentIndex + 1);
	}

	return (
		<div className="App">
			{message !== '' && (
				<div className="message">{message}</div>
			)}
			<OnboardingFlow
				currentIndex={currentIndex}
				onNext={onNext}
			>
				<StepOne />
				<StepTwo />
				<StepThree />
				<StepFour />
			</OnboardingFlow>
		</div>
	);
}

export default App;