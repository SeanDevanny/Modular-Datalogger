async function Chartbuilder(object){

    let series = [{}];
    let refinedobject = {
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

    console.log(object);
    console.log(`%c ${Object.keys(object).length}`,'background: #222; color: #bada55');
    for(let i in object){

    // Get the element
    var elem = document.querySelector('#graphcontainer');                

    // Create a copy of it
    var clone = elem.cloneNode(true);               

    // Update the ID and add a class
    clone.id = `graphcontainer${i}`;
    clone.classList.add('TableData');              

    // Inject it into the DOM
    elem.after(clone);

        let points = [{}];
        let series = [{}];
        let refinedobject = {
            title_label_text: `${object[i].Name}`,
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
        series[0] = {name: object[i].Name};
        console.log(refinedobject);
        console.log(series);
        console.log(object[i].Values);
        for(let j in object[i].Values){
            points[j] = {
                x:  object[i].Values[j],
                y:  object[i].TimeDifference[j]
            };
        }
        console.log(points,'background: #222; color: #bada55');
        series[0].points = points;
        refinedobject.series = series;
        console.log(refinedobject);
        JSC.Chart(`graphcontainer${i}`, refinedobject);
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