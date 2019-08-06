import React, { Component } from 'react';

class ErrorToast extends Component {

    render() {
        const { message } = this.props;
        return (
            <div className="errorToast">
                <div className="errorToast_text" >
                    {message}
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.props.clearError();
        }, 3000);
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
}
export default ErrorToast;
