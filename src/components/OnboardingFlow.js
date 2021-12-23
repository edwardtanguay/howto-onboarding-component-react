import React from 'react';

export const OnboardingFlow = ({ children, currentIndex, onNext }) => {
	const currentChild = React.Children.toArray(children)[currentIndex];

	const gotoNext = stepData => {
		onNext(stepData, currentChild.props.isLastStep);
	}

	if (React.isValidElement(currentChild)) {
		return React.cloneElement(currentChild, { gotoNext });
	} else {
		return null;
	}
}