import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ApiAllService } from '../services/api-all.service';

declare var H: any;


@Component({
  selector: 'app-here-map-new',
  templateUrl: './here-map-new.component.html',
  styleUrls: ['./here-map-new.component.css']
})
export class HereMapNewComponent implements OnInit {

 // private _appId: string = 'DemoAppId01082013GAL';  
  // private _appCode: string = 'AJKnXv84fjrb0KIHawS0Tg'; 

  //  private _appId: string = 'ikoiW1TOL74DDyUgT7Xu';  
  //  private _appCode: string = 'EsNxYzlX9ec2JExX4qQXIA';
   
   // Aww4DF65hrRgWAA1U0xdGQ + wpoduXfH9RVqY2L0CHwverBP4_EYEa-P4R9Vf4pPzJlXXmkZy_stJYLfhYdYpTmATlfOqBc3CN1QaO9hNe2lng
  

   private platform: any;
   private map: any;  
   private bubble:any;
   textData:any; 
   map1:any;
   search:any;
    // mapdata:any=[
    //   {
    //     "lat" : 48.135793,
    //     "lng" : 11.580593,
    //     "label":"KFC"
    //   },
    //   {
    //     "lat" : 48.1782455,
    //     "lng" : 11.5295687,
    //     "label":"KFC"
    //  },
    //  {
    //   "lat" : 48.1929093,
    //   "lng" : 11.5865583,
    //   "label":"KFC"

    // },
    // {
    //   "lat" : 48.1659883,
    //   "lng" : 11.4568521,
    //   "label":"KFC"

    // },
    // {
    //   "lat" : 48.1491051,
    //   "lng" : 11.460994,
    //   "label":"KFC"

    // },
    // {
    //   "lat" : 48.0429726,
    //   "lng" : 11.6635923,
    //   "label":"KFC"

    //  },
    //  {
    //   "lat" : 48.1392,
    //   "lng" : 11.5631731,
    //   "label":"KFC"
    //  },

    //  {
    //   "lat" : 48.19063527989272,
    //   "lng" : 11.50409142989272,
    //   "label":"Burger & King"
    //  },
    //  {
    //   "lat" : 48.13950149999999,
    //   "lng" : 11.5591742 ,
    //   "label":"Burger & King"
    //  },
    //  {
    //   "lat" : 48.1410297,
    //   "lng" : 11.4133666,
    //   "label":"Burger & King"
    //  },
    //  {
    //   "lat" : 48.14553,
    //   "lng" : 11.47705,
    //   "label":"Burger & King"
    //  },
    //  {
    //   "lat" : 48.1864883,
    //   "lng" : 11.5364966,
    //   "label":"Burger & King"
    //  },
    //  {
    //   "lat" : 48.11421472989272,
    //   "lng" : 11.50393347989272,
    //   "label":"Burger & King"
    //  },
    //  {
    //   "lat" : 48.1364963,
    //   "lng" : 11.6138647,
    //   "label":"Burger & King"
    //  },
    //  {
    //   "lat" : 48.139762,
    //   "lng" : 11.64575,
    //   "label":"Burger & King"
    //  },
    //  {
    //   "lat" : 48.14204892989272,
    //   "lng" : 11.56133447989272,
    //   "label":"Subway" 
    //  },
    //  {
    //   "lat" : 48.13433662989273,
    //   "lng" : 11.58464507989272,
    //   "label":"Subway" 
    //  },
    //  {
    //   "lat" : 48.14305067989272,
    //   "lng" : 11.56013547989272,
    //   "label":"Subway" 
    //  },
    //  {
    //   "lat" : 48.14446299999999,
    //   "lng" : 11.5434091,
    //   "label":"Subway" 
    //  },
    //  {
    //   "lat" : 48.1303158,
    //   "lng" : 11.5909633,
    //   "label":"Subway" 
    //  },
    //  {
    //   "lat" : 48.1156936,
    //   "lng" : 11.5798734,
    //   "label":"Subway" 
    //  },
    //  {
    //   "lat" : 48.1356875,
    //   "lng" : 11.6093371,
    //   "label":"Subway" 
    //  },
    //  {
    //   "lat" : 48.1372462,
    //   "lng" : 11.5635723,
    //   "label":"Subway" 
    //  },
    //  {
    //   "lat" : 48.1517,
    //   "lng" : 11.580619,
    //   "label":"Subway" 
    //  },
    //  {
    //   "lat" : 48.1152542,
    //   "lng" : 11.4768553,
    //   "label":"Subway" 
    //  },
    //  {
    //   "lat" : 48.1278738,
    //   "lng" : 11.6044835,
    //   "label":"Subway" 
    //  },
    //  {
    //   "lat" : 48.194363,
    //   "lng" : 11.5981507,
    //   "label":"Subway" 
    //  },
    //  {
    //   "lat" : 48.1378448,
    //   "lng" : 11.5026721,
    //   "label":"Subway" 
    //  },
    //  {
    //   "lat" : 48.12311902989272,
    //   "lng" : 11.66424507989272,
    //   "label":"Subway" 
    //  },
    //  {
    //   "lat" : 48.1804087,
    //   "lng" : 11.5069752,
    //   "label":"Subway" 
    //   }, 
    //   {
    //     "lat" : 48.1360227,
    //     "lng" : 11.5781413,
    //     "label":"macd" 
    //   },
    //   {
    //     "lat" : 48.1611397,
    //     "lng" : 11.5632315,
    //     "label":"macd" 
    //   },
    // ]

   // Define a variable holding SVG mark-up that defines an icon image:
   public svgMarkup:any = '<svg width="24" height="24" ' +
 'xmlns="http://www.w3.org/2000/svg">' +
 '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
 'height="22" /><text x="12" y="18" font-size="12pt" ' +
 'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
 'fill="white">H</text></svg>';
 
 
  
   public lat: any = '48.1351';  
   public lng: any = '11.5820';  
   private ui: any;  
 
   @ViewChild("map")
   public mapElement: ElementRef;
  ui1: any;
   
  constructor(public services1:ApiAllService) {

 }
   
 ngOnInit(){
     console.dir('test');
     this.platform = new H.service.Platform({  
 
       'apikey': 'uVbMOT4PhzcBKBhc6P9iLUJ4J14AHLhN04E-7qqctGo',
       useHTTPS: true  
     });  
   
 }
 public ngAfterViewInit() {  
 // Obtain the default map types from the platform object:
 var defaultLayers = this.platform.createDefaultLayers();
 
 // Instantiate (and display) a map object:
 var map = new H.Map(
     this.mapElement.nativeElement,
     defaultLayers.vector.normal.map,
     {
       zoom: 10,
       center: { lat: this.lat, lng: this.lng},
       pixelRatio: window.devicePixelRatio || 1

     });
     this.map1=map;
     // Create the default UI:
     var ui = H.ui.UI.createDefault(map, defaultLayers);
     this.ui1=ui;
     var mapSettings = ui.getControl('mapsettings');
     var zoom = ui.getControl('zoom');
     var scalebar = ui.getControl('scalebar');
    

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const provider = map.getBaseLayer().getProvider();
    
    //Initialize router and geocoder
    const router = this.platform.getRoutingService();
    const geocoder = this.platform.getGeocodingService();
    
    window.addEventListener('resize', () => map.getViewPort().resize());

   //this.addInfoBubble(map);                     
   //this.addMarkersToMap(this.mapdata);  
   this.geocode('subway');
   this.geocode('Burger King');
   this.geocode('McDonald’s');
   this.geocode('KFC');

   
 }  
 
 filerres(data){
      // let dataarr = this.mapdata.filter(item =>item.label === data );
      // console.dir(dataarr);
      // this.addMarkersToMap(dataarr);    
       this.map1.removeObjects(this.map1.getObjects());
      //  this.map1.removeLayer();

      this.geocode(data);
 }

 geocode(data) {
  let geocoder = this.platform.getGeocodingService(),
    geocodingParameters = {
      searchText: this.textData,
     // jsonattributes : 1
    };



    //let url= "https://maps.googleapis.com/maps/api/place/textsearch/json?query=kfc+in+munich&key=AIzaSyBLqFJIvMEZBexNe5r5ErVXz9TuS1_7anw";

  //  let url="https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=uVbMOT4PhzcBKBhc6P9iLUJ4J14AHLhN04E-7qqctGo&searchtext="+this.textData+"%20in%20munich" 
    
    let url="https://discover.search.hereapi.com/v1/discover?apiKey=uVbMOT4PhzcBKBhc6P9iLUJ4J14AHLhN04E-7qqctGo&at=48.1351%2C11.5820&q="+data+"&in=countryCode%3ADEU"
    
    this.services1.getService(url).then(data => {
      console.dir(data);
      this.onSuccess(data)
    });

}


onSuccess(result?) {

  console.dir(result);
  var locations = result.items;

  if(locations.length>0){
   // this.map1.removeObjects(this.map1.getObjects());
  } 
 /*
  * The styling of the geocoding response on the map is entirely under the developer's control.
  * A representitive styling can be found the full JS + HTML code of this example
  * in the functions below:
  */
  this.addLocationsToMap(locations);
  //addLocationsToPanel(locations);
  // ... etc.
}


onError(error?) {
  alert('Can\'t reach the remote server');
}


addLocationsToMap(locations){
  //this.map1.removeObjects(this.map1.getObjects());

  var group = new  H.map.Group(),
    position,
    i;

    this.map1.addObject(group);

    let self = this;  
   
     group.addEventListener('tap', function (evt) {
       // event target is the marker itself, group is a parent event target
       // for all objects that it contains
       let bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
         // read custom data
         content: evt.target.getData()
       });
           // show info bubble
           self.ui1.addBubble(bubble);
   
   
           
       }, false);

  // Add a marker for each location found
  for (let i = 0;  i < locations.length; i++) {
    position = {
      lat: locations[i].position.lat,
      lng: locations[i].position.lng
    };
    let marker = new H.map.Marker(position);
    //marker.label = locations[i].Location.Address.Label;
   // this.map1.addObject(marker);
    marker.setData(locations[i].address.label);
    group.addObject(marker);
  }
  this.startClustering(this.map1,locations);


}

startClustering(map, data) {
  // First we need to create an array of DataPoint objects,
  // for the ClusterProvider
  let dataPoints = data.map(function (item) {
    return new H.clustering.DataPoint(item.position.lat, item.position.lng);
  });
  console.dir(dataPoints);
  // Create a clustering provider with custom options for clusterizing the input
  let clusteredDataProvider = new H.clustering.Provider(dataPoints, {
    clusteringOptions: {
      // Maximum radius of the neighbourhood
      eps: 32,
      // minimum weight of points required to form a cluster
      minWeight: 2
    }
  });
    // Create a layer tha will consume objects from our clustering provider
    let clusteringLayer = new H.map.layer.ObjectLayer(clusteredDataProvider);
        
    // To make objects from clustering provder visible,
    // we need to add our layer to the map
    map.addLayer(clusteringLayer);
  }

 addMarkersToMap(data) {
  // var parisMarker = new H.map.Marker({lat:this.lat, lng:this.lng});
  // map.addObject(parisMarker);
  this.map1.removeObjects(this.map1.getObjects());

  let group = new  H.map.Group(),
  position,
  i;
  this.map1.addObject(group);

 let self = this;  

  group.addEventListener('tap', function (evt) {
    // event target is the marker itself, group is a parent event target
    // for all objects that it contains
    let bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
      // read custom data
      content: evt.target.getData()
    });
        // show info bubble
        self.ui1.addBubble(bubble);


        
    }, false);


  for (let i = 0;  i < data.length; i++) {
    let Marker = new H.map.Marker({lat:data[i].lat, lng: data[i].lng});
   // Marker.label = data.Label;
    Marker.setData(data[i].label);
    group.addObject(Marker);

  //  this.map1.addObject(Marker);
  }
  this.startClustering(this.map1,data);


} 


 addMarkerToGroup(group, coordinate, html) {
   let marker = new H.map.Marker(coordinate);
   // add custom data to the marker
   marker.setData(html);
   group.addObject(marker);
 }
 
 public places() {  
   //this.map.removeObjects(this.map.getObjects());  
   this.search.request({ "q": this.textData, "at": this.lat + "," + this.lng }, {}, data => {  
     for (let i = 0; i < data.results.items.length; i++) {  
       this.dropMarker({ "lat": data.results.items[i].position[0], "lng": data.results.items[i].position[1] }, data.results.items[i]);  
       if (i == 0)  
         this.map.setCenter({ lat: data.results.items[i].position[0], lng: data.results.items[i].position[1] })  
     }  
   }, error => {  
     console.error(error);  
   });  
 }  
 private dropMarker(coordinates: any, data: any) {  
   let marker = new H.map.Marker(coordinates);  
   marker.setData("<p>" + data.title + "<br>" + data.vicinity + "</p>");  
   marker.addEventListener('tap', event => {  
     let bubble = new H.ui.InfoBubble(event.target.getPosition(), {  
       content: event.target.getData()  
     });  
     this.ui.addBubble(bubble);  
   }, false);  
   this.map.addObject(marker);  
 }  
 

}
