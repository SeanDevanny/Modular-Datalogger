async function Chartbuilder(object){

    console.log(object);
    console.log(`%c ${Object.keys(object).length}`,'background: #222; color: #bada55');
    for(let i in object){
        //copying chart div for graphs to populate
    // Get the element
    var elem = document.querySelector('#graphcontainer');                

    // Create a copy of it
    var clone = elem.cloneNode(true);               

    // Update the ID and add a class
    clone.id = `graphcontainer${i}`;
    clone.classList.add('TableData');              

    // Inject it into the DOM
    elem.after(clone);

        let points = [{}]; //initialises and clears object array on each iteration
        let series = [{}]; //initialises and clears object array on each iteration
        let refinedobject = { //initialises and clears object on each iteration
            title_label_text: `${object[i].Name}`,
            annotations: [{
                label_text: 'How long cycle spends on each value',
                position: 'bottom left'
            }],
            type: 'pie',
            // series: [
            //     {
            //        name:`${object[0].Name}`,
            //        points: [
            //           {x: 0, y: 0}
            //        ]
            //     }
            // ]
        };
        series[0] = {name: object[i].Name};//adding the data's name to chart
        
        for(let j in object[i].Values){//x is a string value (preferably) and y is a numeric value
            points[j] = {
                x:  object[i].Values[j],
                y:  object[i].TimeDifference[j]
            };
        }
        series[0].points = points;//populating points object array into series object array under name 
        refinedobject.series = series; //populating series object array into refinedobject
        JSC.Chart(`graphcontainer${i}`, refinedobject); //grahping chart 
        }
    
    


    // JSC.Chart('chartDiv', {
    //     type: 'series',
    //     series: [
    //    {
    //       name:`${object.Name}`,
    //       points: [
    //          {x: 0, y: 0}
    //       ]
    //    },{
    //       name:'Anna',
    //       points: [
    //          {x: 'Apples', y: 30},
    //          {x: 'Oranges', y: 22}
    //       ]
    //    }
    // ]});
}