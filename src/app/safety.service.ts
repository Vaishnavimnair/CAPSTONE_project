import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SafetyService {
  private readonly overpassApiUrl = 'https://overpass-api.de/api/interpreter';
  private readonly nominatimApiUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  // Method to get hospitals and police stations near the location
  getNearbyLocations(latitude: number, longitude: number): Observable<any> {
    const query = `
      [out:json];
      (
        node["amenity"="hospital"](around:1000, ${latitude}, ${longitude});
        node["amenity"="police"](around:10000, ${latitude}, ${longitude});
      );
      out body;
    `;
    
    const url = `${this.overpassApiUrl}?data=${encodeURIComponent(query)}`;
    return this.http.get(url);
  }

  // Method to get coordinates from location
  getCoordinates(location: string): Observable<any> {
    const url = `${this.nominatimApiUrl}?q=${encodeURIComponent(location)}&format=json&limit=1`;
    return this.http.get(url);
  }
}

