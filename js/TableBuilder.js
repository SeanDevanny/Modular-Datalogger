
async function buildtable(x, Dataset){
    let TableData = { 
    };

    for(let i=0; i<Dataset.length; i++){
    // Get the element
    var elem = document.querySelector('#content');                

    // Create a copy of it
    var clone = elem.cloneNode(true);               

    // Update the ID and add a class
    clone.id = `content${i}`;
    clone.classList.add('TableData');              

    // Inject it into the DOM
    elem.after(clone);

    // $('.divider').css({'display': 'flex'})
    //     .css({'flex-direction': 'row'})
    //     .css({'justify-content': 'center'})
    //     .css({'align-items': 'center'})
    //     .css({'background-color': 'aliceblue'})
    //     .css({'padding-top': '1em'})
    //     .css({'height': '3rem'})
    //     .css({'visiblity': 'visible'})
    //     .css({'position': 'static'})
    //     ;

    $('.divider').css({'visibility': 'visible'}).css({'height': '3rem'});//using jQuery to add back in the hidden divider segments, rest of css defined in main.css
    
    let field = document.getElementById(`content${i}`);
    console.log(field);
    let Tbody = field.children[1].children[1];//populates the table of the new, empty cloned field
    console.log(Tbody);
    console.log(Dataset[i].children[2].children[0].children[1]);

    //Populating the fieldset legend with the Tagname
    let Dataloggertagname =  Dataset[i].getAttribute('Name');
    console.log(Dataloggertagname);

    var TagName = "";//Used to store the real tagname
    var Values = [];//Used to store the values data
    x.querySelectorAll('Rung').forEach(Rung => {//grabbing actual tag name from AOI definition Rung.
        let text = Rung.querySelector('Text');
        let globalsearch = new RegExp(Dataloggertagname, "g");//preparing to search globally for the string
        if(text.textContent.match(globalsearch)){//searching the string until correct rung is found

            var TargetString = text.textContent.replace("<![CDATA[[","")
            TargetString = TargetString.replace("];]]>","")
            var TagString = TargetString.split(",").map(TagString => {
                return TagString.split('(');
            });
            var StorageTag = "";
            TagString.forEach(parent =>{
                parent.forEach(child =>{
                    if(child.match("VarToRecord")){
                        TagName = StorageTag;
                    }else{
                        StorageTag = child;
                    };
                })
            })
        };
    });

    field.children[0].innerText = TagName;//populating the legend element with the actual tagname 
    TableData[i] = {//Defining TableData here so TagName is used
        Name: TagName,
        Values: {},
        RawTime: {},
        ProcessedTime: {},
        TimeDifference: {},
        Comments: {}
        }    


    //value
    Dataset[i].children[2].children[0].children[0].querySelectorAll('Element').forEach(DataArrayMemberElement => {//grabbing individual nodes
        let row = document.createElement('tr');//to add a row add one of these under the previous one
        let column = document.createElement('td');//populate 4 of these with their approprate positional data

        let Value = DataArrayMemberElement.getAttribute('Value');
        let Index = DataArrayMemberElement.getAttribute('Index');
        let Indexnum = parseInt(Index.replace(/[^0-9]/g, ""), 10);//removes non-number charaters from string and converts it to an int
        column.innerText = Value;//DataArrayMemberElement.children[1].innerHTML;
        column.id = `${TagName}Value${Indexnum}`;
        row.appendChild(column);
        row.setAttribute("id", `${TagName}${Indexnum}`);
        row.classList.add(Indexnum);
        row.classList.add(TagName); 

        Tbody.appendChild(row);//populates row into tbody
        Values[Indexnum] = Value;//populating the array for use later to grab rung comments
        TableData[i].Values[Indexnum] = Value;
    });
    
    //for time columns
    var Time = Dataset[i].children[2].children[0].children[1].querySelectorAll('Element');
    var LastTime = Time[Time.length -1].getAttribute('Value');

    //Rawtimestamps
    Time.forEach(DataArrayMemberElement => {//grabbing individual nodes
        //let row is not used here because it was already populated into tbody in the previous forEach loop
        let column = document.createElement('td');//populate 4 of these with their approprate positional data

        let TimeStamps = DataArrayMemberElement.getAttribute('Value');
        let Index = DataArrayMemberElement.getAttribute('Index');
        let Indexnum = parseInt(Index.replace(/[^0-9]/g, ""), 10);//removes non-number charaters from string and converts it to an int
        column.innerText = TimeStamps;//DataArrayMemberElement.children[1].innerHTML; 
        column.id = `${TagName}RawTimeStamp${Indexnum}`

        Tbody.children[Indexnum].appendChild(column);
        //populates current element value into a second column of the parent elemet described in the previous forEach loop
        TableData[i].RawTime[Indexnum] = TimeStamps;
    });

    //ProcessedTimeStamps
    Time.forEach(DataArrayMemberElement => {//grabbing individual nodes
        //let row is not used here because it was already populated into tbody in the previous forEach loop
        let column = document.createElement('td');//populate 4 of these with their approprate positional data

        let TimeStamps = DataArrayMemberElement.getAttribute('Value');
        let Index = DataArrayMemberElement.getAttribute('Index');
        let Indexnum = parseInt(Index.replace(/[^0-9]/g, ""), 10);//removes non-number charaters from string and converts it to an int
        let TimeProduct =  TimeStamps - LastTime;
        column.innerText = TimeProduct;//DataArrayMemberElement.children[1].innerHTML; 
        column.id = `${TagName}ProTimeStamp${Indexnum}`

        Tbody.children[Indexnum].appendChild(column);
        //populates current element value into a second column of the parent elemet described in the previous forEach loop
        TableData[i].ProcessedTime[Indexnum] = TimeProduct;
    });

    //ReducedTimeStamps

    var previousTime = Time[0].getAttribute('Value');//declared outside because it's used as a memory bit

    Time.forEach(DataArrayMemberElement => {//grabbing individual nodes
        //let row is not used here because it was already populated into tbody in the previous forEach loop
        let column = document.createElement('td');//populate 4 of these with their approprate positional data

        let TimeStamps = DataArrayMemberElement.getAttribute('Value');
        let Index = DataArrayMemberElement.getAttribute('Index');
        let Indexnum = parseInt(Index.replace(/[^0-9]/g, ""), 10);//removes non-number charaters from string and converts it to an int
        let TimeProduct =  previousTime - TimeStamps;
        column.innerText = TimeProduct;//taking the last time from the current time to get their difference. This way we can see just how long as step took
        column.id = `${TagName}ProTimeStamp${Indexnum}`

       if(Indexnum === 0){//First Pass
        Tbody.children[Time.length-1].appendChild(column);//first value calculated will be 0. This moves it to the last row because that makes the code more legible
        TableData[i].TimeDifference[Time.length-1] = TimeProduct;
        previousTime = TimeStamps;
        console.log(`%c ${column.innerHTML}`,'background: #222; color: #bada55');//colour? Badass B)
        return;//return acts as continue within a .forEach() loop
        }
        Tbody.children[Indexnum-1].appendChild(column);//Indexnum-1 because the last child is populated in the above if() statement
        //populates current element value into a second column of the parent elemet described in the previous forEach loop
        TableData[i].TimeDifference[Indexnum-1] = TimeProduct;
        previousTime = TimeStamps;
    });
    
    //Comments
    for(let j=0; j<Values.length; j++){//where values are taken from the above routine
        let Value = Values[j];
        let ID = `${TagName}${j}`;//constructing argument to call row declared via row.setAttribute("id", `${TagName}${Indexnum}`);
        let row = document.getElementById(ID);
        var column = document.createElement('td');//populate 4 of these with their approprate positional data
        x.querySelectorAll('Rung').forEach(Rung => {//grabbing actual tag name from AOI definition Rung.
            let text = Rung.querySelector('Text');
            let comment = Rung.querySelector('LocalizedComment[Lang="en-US"]');

            let SearchTerm = `EQU(${TagName},${Value})`;
            if(((text.textContent.indexOf(SearchTerm)) !== -1)&&(comment)){//searching the string until correct run is found
                column.innerText = comment.textContent.replace(/__/g,'');//constructing the new column... .replace is cleaning up the comments by removing buggy lines
                TableData[i].Comments[j] = comment.textContent.replace(/__/g,'');
                row.appendChild(column);
            }
        });
    };
    }//End of Dataset[i]
    
    console.log(TableData);
    return TableData;
}

