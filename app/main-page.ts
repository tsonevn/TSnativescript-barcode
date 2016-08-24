import { EventData } from "data/observable";
import { Page } from "ui/page";
import { HelloWorldModel } from "./main-view-model";
var barcodescanner = require("nativescript-barcodescanner");


// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();
}
export function onTap(args:EventData){
  barcodescanner.scan({
    formats: "UPC_E",   // Pass in of you want to restrict scanning to certain types
    cancelLabel: "Stop scanning", // iOS only, default 'Close'
    message: "Go scan something", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
    preferFrontCamera: false,     // Android only, default false
    showFlipCameraButton: true,   // Android only, default false (on iOS it's always available)
    orientation: "landscape"      // Android only, optionally lock the orientation to either "portrait" or "landscape"
  }).then(
      function(result) {
        console.log("Scan format: " + result.format);
        console.log("Scan text:   " + result.text);
        alert("Scan format: " + result.format+" "+"Scan text:   " + result.text);
      },
      function(error) {
        console.log("No scan: " + error);
        alert("No scan "+error);
      }
  );
}