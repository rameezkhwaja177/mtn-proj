import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

declare var H: any;

@Component({
    selector: 'here-map',
    templateUrl: './here-map.component.html',
    styleUrls: ['./here-map.component.css']
})
export class HereMapComponent implements OnInit {
  private _appId: string = 'DemoAppId01082013GAL';  
  private _appCode: string = 'AJKnXv84fjrb0KIHawS0Tg'; 

  //  private _appId: string = 'ikoiW1TOL74DDyUgT7Xu';  
  //  private _appCode: string = 'EsNxYzlX9ec2JExX4qQXIA';
   
   // Aww4DF65hrRgWAA1U0xdGQ + wpoduXfH9RVqY2L0CHwverBP4_EYEa-P4R9Vf4pPzJlXXmkZy_stJYLfhYdYpTmATlfOqBc3CN1QaO9hNe2lng
  

  private platform: any;
  private map: any;  
  textData:any; 
  search:any;
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
  
  public constructor() {

}
  
ngOnInit(){
    console.dir('test');
    this.platform = new H.service.Platform({  
      "app_id": this._appId,  
      "app_code": this._appCode,  
      // 'apikey': '{uVbMOT4PhzcBKBhc6P9iLUJ4J14AHLhN04E-7qqctGo}',
      useHTTPS: true  
    });  
    this.search = new H.places.Search(this.platform.getPlacesService());  
  
}
public ngAfterViewInit() {  
  let pixelRatio = window.devicePixelRatio || 1;  
  let defaultLayers = this.platform.createDefaultLayers({  
    tileSize: pixelRatio === 1 ? 256 : 512,  
    ppi: pixelRatio === 1 ? undefined : 320  
  });  

  this.map = new H.Map(this.mapElement.nativeElement,  
    defaultLayers.normal.map, { pixelRatio: pixelRatio });  

// Create an icon, an object holding the latitude and longitude, and a marker:
  let icon:any = new H.map.Icon(this.svgMarkup),
      coords = {lat: this.lat, lng: this.lng},
      marker = new H.map.Marker(coords, {icon: icon});

// Add the marker to the map and center the map at the location of the marker:
        // this.map.addObject(marker);

  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));  
  var ui = H.ui.UI.createDefault(this.map, defaultLayers);  

  this.map.setCenter({ lat: this.lat, lng: this.lng });  
  this.map.setZoom(10);  
  this.addInfoBubble(this.map);                  
}  

 addInfoBubble(map) {
  let group = new H.map.Group();

  map.addObject(group);
  let self = this; 
  // add 'tap' event listener, that opens info bubble, to the group
  group.addEventListener('tap', function (evt) {
    // event target is the marker itself, group is a parent event target
    // for all objects that it contains
    let bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
      // read custom data
      content: evt.target.getData()
    });
        // show info bubble
        this.ui.addBubble(bubble);
    }, false);

  this.addMarkerToGroup(group, {lat: '48.043159', lng: '11.663592'},
    'Manchester City' + 'City of Manchester Stadium Capacity: 48,000');

  this.addMarkerToGroup(group, {lat: this.lat, lng: this.lng},
    'Liverpool' + 'Anfield Capacity: 45,362');

}
addMarkerToGroup(group, coordinate, html) {
  let marker = new H.map.Marker(coordinate);
  // add custom data to the marker
  marker.setData(html);
  group.addObject(marker);
}

public places() {  
  this.map.removeObjects(this.map.getObjects());  
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