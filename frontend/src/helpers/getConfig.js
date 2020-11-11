const getConfig = () => {
    const jwt = localStorage.getItem("jwt");
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
    };
};

export default getConfig;