import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
// import { Loader } from "@googlemaps/js-api-loader";
import {Loader, LoaderOptions} from 'google-maps'

// declare var google: any;

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {
  options: LoaderOptions = { version: "weekly",
  libraries: ["places","visualization"]};
  loader = new Loader('AIzaSyCKMeXCwfKVZhQkduS-RCM5_nA3Gwb7PCQ',this.options );
  google =  this.loader.load();

  @Input() mapData;
  @ViewChild('map', { static: true }) map: ElementRef;
 
  provinces = [
    {
      name: "GP",
      coords:
      {
        lat: -26.058369702576982,
        lng: 28.303636655668157
        ,
      },
    },
    {
      name: "LP",
      coords:
      {
        lat: -23.629222062093202,
        lng: 29.5901150223643,
      },
    },
    {
      name: "MP",
      coords:
      {
        lat: -29.805980751084693,
        lng: 30.62975440020216
      },
    },
    {
      name: "KZN",
      coords:
      {
        lat: -28.574256390265038, 
        lng: 30.749920334437405
      },
    },
    {
      name: "FS",
      coords:
      {
        lat: -28.280858253294955, 
        lng:27.09285965891125
      },
    },
    {
      name: "NW",
      coords:
      {
        lat:-26.26225794809457, 
        lng: 25.726860304313004
      },
    },
    {
      name: "NC",
      coords:
      {
        lat:-29.28819874527113,
        lng:  22.009343693904214
      },
    },
    {
      name: "WC",
      coords:
      {
        lat: -33.09100557280346, 
        lng: 21.15874514080357
      },
    },
    {
      name: "EC",
      coords:
      {
        lat: -32.19114944794681, 
        lng: 26.135189224729164
      },
    }
  ];
  selected = 0;
  activeProvince : any = this.provinces[this.selected];

  hotspots = [];
   
  constructor() {
   
   }

  ngOnInit(): void {
    this.initMap();

    
  }

  ngAfterViewInit(): void {
   }
 
 
   updateMap(i) {
 this.initMap()
     this.activeProvince = this.provinces[i];
     this.drawMap();
   }
   initMap(){
    
    console.log(this.mapData);
// console.log();

    this.mapData.forEach(dataPoint => {
 console.log(dataPoint.geoLocation);
 
      if (typeof dataPoint.geoLocation != "undefined") {
        this.hotspots.push(
          { location: new google.maps.LatLng(dataPoint.geoLocation.latitude, dataPoint.geoLocation.longitude), weight: 1 },
        );
      }

    });
    console.log(this.hotspots);

    this.drawMap();}
 
   drawMap() {
     let map;
     map = new google.maps.Map(this.map.nativeElement, {
       zoom: 8,
       center: { lat: this.activeProvince.coords.lat, lng: this.activeProvince.coords.lng },
       mapTypeId: 'roadmap'
     });
     let heatmap;
     console.log(this.hotspots);

     heatmap = new google.maps.visualization.HeatmapLayer({
       data: this.hotspots,
       map: map
     });
 
     heatmap.set('radius', heatmap.get('radius') ? null : 20);
   }
 

}
