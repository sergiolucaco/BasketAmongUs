function getFilterCoordAndUncovered( longitude, latitude, km, uncovered) {

    const type = "Point";
    const coordinates = [ longitude , latitude ];

    return { location : { $near: { $geometry: { type, coordinates }, $maxDistance: km*1000 } }, tipology : uncovered }
}

module.exports = getFilterCoordAndUncovered;