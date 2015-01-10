var vincentyDist = function(lat1, long1, lat2, long2) {

    // Converts degrees to radians.
    Math.radians = function(degrees) {
        return degrees * Math.PI / 180;
    };

    // Converts radians to degrees.
    Math.degrees = function(radians) {
        return radians * 180 / Math.PI;
    };

    var phi1 = Math.radians(lat1);
    var lambda1 = Math.radians(long1);
    var phi2 = Math.radians(lat2);
    var lambda2 = Math.radians(long2);

    // a = length of semi-major axis of the ellipsoid (radius at equator)
    // b = length of semi-minor axis of the ellipsoid (radius at the poles) 
    // f = 1- (b/a) - flattening of the ellipsoid
    var a = 6378137;
    var b = 6356752.314245;
    var f = 1 / 298.257223563;

    var L = Math.radians(long2 - long1);
    var tanU1 = (1 - f) * Math.tan(phi1);
    var cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1));
    var sinU1 = tanU1 * cosU1;
    var tanU2 = (1 - f) * Math.tan(phi2);
    var cosU2 = 1 / Math.sqrt((1 + tanU2 * tanU2));
    var sinU2 = tanU2 * cosU2;

    var sinLambda, cosLambda, sinSqSigma, sinSigma, cosSigma, sigma, sinAlpha, cosSqAlpha, cos2SigmaM, C;

    var lambda = L;
    var lambdaD, iterations = 0;
    do {
        sinLambda = Math.sin(lambda);
        cosLambda = Math.cos(lambda);
        sinSqSigma = (cosU2 * sinLambda) * (cosU2 * sinLambda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda);
        sinSigma = Math.sqrt(sinSqSigma);

        // co-incident points
        if (sinSigma == 0) return 0;
        cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
        sigma = Math.atan2(sinSigma, cosSigma);
        sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
        cosSqAlpha = 1 - sinAlpha * sinAlpha;
        cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;

        // set cos2SigmaM = 0 on equatorial lines since cos2SigmaM approaches 0
        if (isNaN(cos2SigmaM)) cos2SigmaM = 0;
        C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
        lambdaD = lambda;
        lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    } while (Math.abs(lambda - lambdaD) > 1e-12 && ++iterations < 200);
    if (iterations >= 200) throw new Error('Formula failed to converge');

    var uSq = cosSqAlpha * (a * a - b * b) / (b * b);
    var A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    var deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
        B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));

    var d = b * A * (sigma - deltaSigma);

    var alpha1 = Math.atan2(cosU2 * sinLambda, cosU1 * sinU2 - sinU1 * cosU2 * cosLambda);
    var alpha2 = Math.atan2(cosU1 * sinLambda, -sinU1 * cosU2 + cosU1 * sinU2 * cosLambda);

    alpha1 = (alpha1 + 2 * Math.PI) % (2 * Math.PI); // normalise to 0...360
    alpha2 = (alpha2 + 2 * Math.PI) % (2 * Math.PI); // normalise to 0...360

    d = Number(d.toFixed(3)); // round to 1mm precision
    return {
        distance: d // just return the distance, which is in meters
    };
};
