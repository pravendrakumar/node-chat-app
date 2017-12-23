var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
};

generateLocationMessage = (from,coords)=>{
    return {
        from,
        url:`https://maps.google.com?q=${coords.latitude},${coords.longitude}`,
        createdAt: new Date().getTime()
    }
}


module.exports = { generateMessage, generateLocationMessage };