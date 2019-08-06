
const throttle = (func, delay = 500) => {
    let timer = null;
    return () => {
        if (!timer) {
            timer = setTimeout(() => {
                console.log('get in timeout')
                func();
                clearTimeout(timer);
                timer = null;
            }, delay)
        };
    };
}

export default throttle;
