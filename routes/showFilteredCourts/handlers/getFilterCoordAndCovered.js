function getFilterCoordAndCovered( longitude, latitude, km, covered) {

    const type = "Point";
    const coordinates = [ longitude , latitude ];

    return { location : { $near: { $geometry: { type, coordinates }, $maxDistance: km*1000 } }, tipology : covered }
}

module.exports = getFilterCoordAndCovered