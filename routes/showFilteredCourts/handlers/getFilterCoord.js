function getFilterCoord( longitude, latitude, km) {

    const type = "Point";
    const coordinates = [ longitude , latitude ];

    return { location : { $near: { $geometry: { type, coordinates }, $maxDistance: km*1000 } } }
}

module.exports = getFilterCoord