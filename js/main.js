function columnDisplay(){
    var RawData       = document.getElementById("RawData"); 
    var ProcessedData = document.getElementById("ProcessedData");
    var Difference    = document.getElementById("Difference");
    var TimeSelect    = document.getElementById("dropdownRawDataInput1").getAttribute(name);

    console.log(TimeSelect);

    switch(TimeSelect) {
        case "Raw":
          RawData.style.visibility =        "visibile";
          ProcessedData.style.visibility =  "collapse";
          Difference.style.visibility =     "collapse";
          break;
        case "Processed":
          RawData.style.visibility =        "collapse";
          ProcessedData.style.visibility =  "visibile";
          Difference.style.visibility =     "collapse";
          break;
        case "Difference":
          RawData.style.visibility =        "collapse";
          ProcessedData.style.visibility =  "collapse";  
          Difference.style.visibility =     "visibile";
          break;  
        default:
          RawData.style.visibility =        "visibile";
          ProcessedData.style.visibility =  "collapse";
          Difference.style.visibility =     "collapse";
      }
}

