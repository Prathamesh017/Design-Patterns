export class Location {
    places = [];
    set(name, latitude, longitude) {
        const place = {
            name,
            lat: latitude,
            long: longitude
        };
        this.places.push(place);
        return place;
    }
}
//# sourceMappingURL=location.js.map