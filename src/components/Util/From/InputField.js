import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

class InputField extends Component {
    render () {
        const {
            type,
            disabled,
            name,
            placeholder,
            label,
            required,
            error,
            classes,
            ...rest
        } = this.props;

        return (
            <div className={classes}>
                <TextField
                    {...rest}
                    name={name}
                    type={type || 'text'}
                    error={error}
                    placeholder={placeholder}
                    disabled={!!(disabled)}
                    required={!!(required)}
                    onChange={this.handleChange}
                    label={label}
                />
            </div>
        );
    }

    handleChange = (e) => {
        e.preventDefault();
        this.props.onChange(e.target.value, e.target.name);
    }
}

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    classes: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.bool
};

export default InputField;
