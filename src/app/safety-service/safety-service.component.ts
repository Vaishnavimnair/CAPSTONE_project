import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { OverpassPlace } from '../interfaces/overpass-place';
import { SafetyService } from '../safety.service';

@Component({
  selector: 'app-safety-service',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './safety-service.component.html',
  styleUrl: './safety-service.component.css'
})
export class SafetyServiceComponent implements AfterViewInit {
  @ViewChild('map') mapContainer!: ElementRef;
  map: any;
  searchQuery: string = '';

  ngAfterViewInit(): void {
     // Set the default icon path for Leaflet markers
     //delete L.Icon.Default.prototype._getIconUrl;
     L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/assets/hospital-icon.png", 
      iconUrl: "/assets/hospital-icon.png",
      shadowUrl: "/assets/leaflet/images/marker-shadow.png"
     });
    // Initialize the map
    this.map = L.map(this.mapContainer.nativeElement).setView([51.505, -0.09], 13); // Default to London

    // Load the OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  onSearchSubmit() {
    if (this.searchQuery) {
      this.searchLocation(this.searchQuery);
    }
  }

  searchLocation(query: string) {
    // Use the Nominatim API to get location details from the query
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          // const lat = data[0].lat;
          // const lon = data[0].lon;
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          this.map.setView([lat, lon], 13);
          this.addNearbyPlaces(lat, lon);
        }
      });
  }

  addNearbyPlaces(lat: number, lon: number) { // Construct Overpass API URL to fetch nearby hospitals and police stations
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];(node["amenity"="hospital"](around:10000,${lat},${lon});node["amenity"="police"](around:10000,${lat},${lon}););out;`;

    fetch(overpassUrl)
      .then(response => response.json())
      .then(data => {
        // Clear existing markers before adding new ones
        this.map.eachLayer((layer: L.Layer) => {
          if (layer instanceof L.Marker) {
            this.map.removeLayer(layer);
          }
        });

       // Loop through the Overpass API response and add markers
       data.elements.forEach((place: OverpassPlace) => { // Specify type for place
        if (place.lat && place.lon) {
          const name = place.tags.name || 'Unnamed Place'; // Fallback if name is not available
          L.marker([place.lat, place.lon]).addTo(this.map)
            .bindPopup(name).openPopup();
        }
      });
    })
      .catch(error => {
        console.error('Error fetching nearby places:', error);
      });
  }
}
