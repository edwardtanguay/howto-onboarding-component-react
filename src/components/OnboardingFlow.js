import React from 'react';

export const OnboardingFlow = ({ children, onFinish, currentIndex, onNext }) => {
	const gotoNext = stepData => {
		onNext(stepData, onFinish);
	}

	const currentChild = React.Children.toArray(children)[currentIndex];

	if (React.isValidElement(currentChild)) {
		return React.cloneElement(currentChild, { gotoNext });
	} else {
		return null;
	}
}