//XMLHttpRequest() - has responseXML property in the response

function getXMLFiles(event){
  //this.preventDefault();
  if (event === undefined) {
      console.log(inVar.not)
  }

  var file = document.getElementById('FileInput');
  let sucessmessage = document.getElementById('successmessage');
  console.log(file.files[0].name);
  sucessmessage.innerHTML = `Uploaded file is <br>${file.files[0].name}`;

  if (file.files.length) {
      var reader = new FileReader();
  
      reader.onload = function(e) {
      /* let data = e.target.result; */
      //   document.getElementById('outputDiv').innerHTML = e.target.result;
        console.log(e.target.result);//why am I slicing 3 charaters from the string? No idea. The file reader for some reason adds the 3 characters ï»¿ to the front of an .L5X XML file because it's almost as dumb as me. This took too long to find. I hate it here. 
        let cut = e.target.result.indexOf("<?xml");
        let parser = new DOMParser();
        let xml = parser.parseFromString(e.target.result.slice(cut), "application/xml");
        console.log(xml);
        buildDataLoggerResultset(xml);
      };
  
      reader.readAsBinaryString(file.files[0]);
    }
};

// document.addEventListener('DOMContentLoaded', ()=>{
//     //fetch the data as soon as the page has loaded
//         let url = "ST25918PLC01R0400_LaserWelding.L5X";
//         console.log(url);
//         fetch(url)
//         .then(response=>response.text())
//         .then(data=>{
//             //console.log(data);  //string
//             let parser = new DOMParser();
//             let xml = parser.parseFromString(data, "application/xml");
//             //document.getElementById('output').textContent = data;//writes xml data to the 'output' html pre element
//             console.log(xml);
//             buildDataLoggerResultset(xml);
//     });
// })

//textContents is all text contained by an element and all its children that are for formatting purposes only. innerText returns all text contained by an element and all its child elements. innerHtml returns all text, including html tags, that is contained by an element.

function buildDataLoggerResultset(x){
  //let list = document.getElementById('DataLoggerResultset');
  let Dataset = x.querySelectorAll('Tag[DataType="udt_DataLoggerResultset"]');
  console.log(Dataset);
      buildtable(x, Dataset).then((response) => {
          console.table(response);
          Chartbuilder(response);
      }).catch((err) => {
          console.error(err);
          console.log("This is run after `fizzbuzz` finishes (and so is the above `console.error`...)");
      });
  
}        


/*function columnDisplay(){
    var RawData       = document.getElementById("RawData"); 
    var ProcessedData = document.getElementById("ProcessedData");
    var Difference    = document.getElementById("Difference");
    var TimeSelect    = document.getElementById("dropdownRawDataInput1").getAttribute("name");

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
*/
