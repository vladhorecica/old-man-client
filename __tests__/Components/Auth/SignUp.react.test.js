import React from "react";
import { shallow } from "enzyme";
import Button from '@material-ui/core/Button';
import SignUpRedux from '../../../src/components/Auth/SignUp'

jest.mock("react-router-dom", () => ({ withRouter: component => component }));

const SignUp = SignUpRedux.WrappedComponent;

describe('<SignUp/> Component', () => {
    it('Should have errors on password and confirmPassword fields on submit', () => {
        const wrapper = shallow(<SignUp/>).dive();
        const submitButton = wrapper.find(Button).at(0);

        const inputData = {
            password: 'Password',
            confirmPassword: 'SamePassword,ButDifferent,ButSamePassword'
        };

        // This state is initialized properly.
        const initialState = wrapper.state();

        // Set state data as in the customer typed values in password and confirmPassword fields
        wrapper.setState({
            ...initialState,
            data:  {
                ...initialState.data,
                ...inputData
            }
        });

        // Test initial error for password field to be false
        expect(initialState.error.password).toEqual(false);

        // Trigger onSubmit
        submitButton.simulate('click');

        // On submit we change error.password and error.confirmPassword to true since those input values are different
        const newState = wrapper.state();

        // And then God said "It shall remain false..."
        expect(newState.error.password).toEqual(true);

        // The test fails tho' but I have no idea why.
    });
});
