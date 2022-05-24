const formatErrMsg = (error) => {
    const string = error.code?.slice(5).replace(/-/g, ' ');
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}

export { formatErrMsg };