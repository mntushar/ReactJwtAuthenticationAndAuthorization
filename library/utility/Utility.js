class Utility {
    getError(error) {
        if (process.env.NODE_ENV === 'development') {
            return error;
        } else if (process.env.NODE_ENV === 'production') {
            return "Something went wrong. Please try again after some time";
        }
    }
}

export default Utility;