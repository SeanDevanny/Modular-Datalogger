async function Chartbuilder(object){

    console.log(object);

    let series = [{}];
    let refinedobject = {
        type: 'vertical column',
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
        // refinedobject.series[i] = refinedobject.series[0];
        let points = [{}];
        series[i] = {name: object[i].Name};
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
        series[i].points = points;
    }
    
    
    refinedobject.series = series;
    console.log(refinedobject);
    JSC.Chart('chartDiv', refinedobject);

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