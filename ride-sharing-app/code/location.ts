export interface location{
    name:string,
    lat:number;
    long:number
}
export class Location{
    places:location[]=[];
    set(name:string,latitude: number, longitude: number) {
        const place={
            name,
            lat:latitude,
            long:longitude
        }
       
        this.places.push(place);
         return place;

    }
}