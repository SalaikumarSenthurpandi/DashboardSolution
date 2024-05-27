
function LoadSpinner() {
    //  $("#loader").fadeIn();
    $("#loader").css("display", "block");
    //$("#loader").hide().fadeIn();    
}

function HideSpinner() {
    // $("#loader").fadeOut("slow");
    setTimeout(function () {
        $("#loader").css("display", "none");
    }, 1000);
}

function convertToJSONUTCDate(strDate) {
    console.log('Input UTC Time - ' + strDate);
    //04/07/2018,17:19:42.000000
    var a = strDate.split(/[   - / , : .]+/);
    var vdate, vTime, vDateTiem;
    vDateTiem = strDate.split(" ");
    vdate = vDateTiem[0];
    vTime = vDateTiem[1];
    vdate = vdate.split("-").reverse().join("/");
    strDate = vdate + "," + vTime;
    var parts = strDate.split(/[/ , : .]/);
    var newDate = new Date(Date.UTC(parts[2], parts[1] - 1, parts[0], parts[3], parts[4], parts[5], parts[6]));
    //var newDate = new Date(Date.UTC(parts[2], parts[1] - 1, parts[0], parts[3], parts[4]));
    return '/Date(' + newDate.getTime() + ')/';
}

//convert To JSON UTC Date
function convertToJSONUTCDate123(strDate) {    //04/07/2018,17:19:42.000000

    var a = strDate.split(/[   - / , : .]+/);
    var vdate, vTime, vDateTiem;
    vDateTiem = strDate.split(" ");
    vdate = vDateTiem[0];
    vTime = vDateTiem[1];
    vdate = vdate.split("-").reverse().join("/");
    strDate = vdate + "," + vTime;
    var parts = strDate.split(/[/ , : .]/);
    //var newDate = new Date(Date.UTC(parts[2], parts[1] - 1, parts[0], parts[3], parts[4], parts[5], parts[6]));
    var newDate = new Date(Date.UTC(parts[2], parts[1] - 1, parts[0], parts[3], parts[4]));
    return '/Date(' + newDate.getTime() + ')/';
}

/*$(document).ready(function () {
    //getCPUTemperature1();
    //getRawKPIDataforVSP();
    //1 sec = 1000 ms
    //Every 10 sec getting refresh
    //    setInterval('getRawKPIDataforVSP();', 10 * 1000);
});*/

function getRawKPIDataforVSP123() {

    let dataSet = "getRawKPIDataforVSP";
    try {

        var dataJsonObject = JSON.stringify({
            'DriveId': "Drive"
        });


        $.ajax({

            type: "POST",
            url: "Home/GetRawKPIDataforVSP_Rest",
            data: dataJsonObject,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (kpiData, status) {
                if (!kpiData.success) {
                    console.log('KPI Request Failed');
                } else {
                    var DataPoints = [];
                    var PlotDataObject;

                    DataPoints = JSON.parse(kpiData.success);

                    //console.log(DataPoints);

                    let PointCount = DataPoints.length;

                    var Index;
                    var data1 = [];
                    var data2 = [];
                    var data3 = [];
                    var data4 = [];
                    var data5 = [];
                    var data6 = [];
                    var data7 = [];
                    var data8 = [];

                    if (PointCount > 0) {

                        let itemObject;
                        let turboThresholdLimit = 100000;
                        for (Index = 0; Index < PointCount; Index++) {

                            //var plotdatetime = DataPoints[Index][0]; //convertToJSONUTCDate(DataPoints[Index][0]);
                            //var key = plotdatetime.match(/\d+/)[0] * 1;

                            itemObject = DataPoints[Index];
                            key = itemObject.time;

                            var Value1 = 0;
                            //let valueName1 = '[KPI.Motor1.Vbc_RMS]';

                            Value1 = itemObject["KPI.Motor1.Vbc_RMS"];

                            if (Value1 == null) {
                                Value1 = 0;
                            } else {
                                Value1 = parseFloat(Value1);
                            }

                            data1.push([key, Value1]);


                            var Value2 = itemObject["KPI.Vib.Motor1_NDE_RMS_Y"];

                            Value2 = DataPoints[Index].valueName2;

                            if (Value2 == null) {
                                Value2 = 0;
                            } else {
                                Value2 = parseFloat(Value2);
                            }

                            data2.push([key, Value2]);

                            var Value3 = 0;

                            Value3 = itemObject["KPI.Vib.Motor1_DE_RMS_X"];

                            if (Value3 == null) {
                                Value3 = 0;
                            } else {
                                Value3 = parseFloat(Value3);
                            }

                            data3.push([key, Value3]);

                            var Value4 = 0;

                            Value4 = itemObject["KPI.Vib.Motor1_NDE_RMS_Z"];

                            if (Value4 == null) {
                                Value4 = 0;
                            } else {
                                Value4 = parseFloat(Value4);
                            }

                            data4.push([key, Value4]);

                            var Value5 = 0;

                            Value5 = itemObject["KPI.Motor1.Reactive_Power"];

                            if (Value5 == null) {
                                Value5 = 0;
                            } else {
                                Value5 = parseFloat(Value5);
                            }

                            data5.push([key, Value5]);

                            var Value6 = itemObject["KPI.Motor1.Apparent_Power"];

                            if (Value6 == null) {
                                Value6 = 0;
                            } else {
                                Value6 = parseFloat(Value6);
                            }

                            data6.push([key, Value6]);


                            var Value7 = itemObject["KPI.CPU.CPU_Temperature"];

                            if (Value7 == null) {
                                Value7 = 0;
                            } else {
                                Value7 = parseFloat(Value7);
                            }

                            data7.push([key, Value7]);



                            var Value8 = itemObject["KPI.Motor1.Vab_RMS"];

                            if (Value8 == null) {
                                Value8 = 0;
                            } else {
                                Value8 = parseFloat(Value8);
                            }

                            data8.push([key, Value8]);

                            itemObject = "";

                        }

                        let dataProcess = "Complated"
                        console.log(dataProcess);
                        Highcharts.chart(document.getElementById('DashboardMetricGraph1'), {
                            chart: {
                                zoomType: 'x',
                                type: 'spline',
                                panning: true,
                                panKey: 'shift'
                            },
                            title: {
                                text: 'KPI.Motor1.Vbc_RMS'
                            },
                            credits: {
                                enabled: false
                            },
                            xAxis: {
                                type: 'datetime'
                            },
                            yAxis: {
                                min: 0,
                            },
                            legend: {
                                enabled: false
                            },
                            series: [{
                                turboThreshold: turboThresholdLimit,
                                color: '#33FF00',
                                data: data1
                            }]
                        });

                        Highcharts.chart(document.getElementById('DashboardMetricGraph2'), {
                            chart: {
                                type: 'line',
                                zoomType: 'x'
                            },
                            title: {
                                text: 'KPI.Vib.Motor1_NDE_RMS_Y'
                            },
                            credits: {
                                enabled: false
                            },
                            xAxis: {
                                type: 'datetime'
                            },
                            yAxis: {
                                min: 0
                            },
                            legend: {
                                enabled: false
                            },
                            series: [{
                                turboThreshold: turboThresholdLimit,
                                color: 'orange',
                                data: data2
                            }]
                        });

                        Highcharts.chart(document.getElementById('DashboardMetricGraph3'), {
                            chart: {
                                type: 'line',
                                zoomType: 'x'
                            },
                            title: {
                                text: 'KPI.Vib.Motor1_DE_RMS_X'
                            },
                            credits: {
                                enabled: false
                            },
                            xAxis: {
                                type: 'datetime'
                            },
                            yAxis: {
                                min: 0
                            },
                            legend: {
                                enabled: false
                            },
                            series: [{
                                turboThreshold: turboThresholdLimit,
                                color: 'blue',
                                data: data3
                            }]
                        });


                        Highcharts.chart(document.getElementById('DashboardMetricGraph4'), {
                            chart: {
                                type: 'line',
                                zoomType: 'x'
                            },
                            title: {
                                text: 'KPI.Vib.Motor1_NDE_RMS_Z'
                            },
                            credits: {
                                enabled: false
                            },
                            xAxis: {
                                type: 'datetime'
                            },
                            yAxis: {
                                min: 0
                            },
                            legend: {
                                enabled: false
                            },
                            series: [{
                                turboThreshold: turboThresholdLimit,
                                color: 'Navy',
                                data: data4
                            }]
                        });

                        Highcharts.chart(document.getElementById('DashboardMetricGraph5'), {
                            chart: {
                                type: 'line',
                                zoomType: 'x'
                            },
                            title: {
                                text: 'KPI.Motor1.Reactive_Power'
                            },
                            credits: {
                                enabled: false
                            },
                            xAxis: {
                                type: 'datetime'
                            },
                            yAxis: {
                                min: 0
                            },
                            legend: {
                                enabled: false
                            },
                            series: [{
                                turboThreshold: turboThresholdLimit,
                                color: 'Fuchsia',
                                data: data5
                            }]
                        });

                        Highcharts.chart(document.getElementById('DashboardMetricGraph6'), {
                            chart: {
                                type: 'line',
                                zoomType: 'x'
                            },
                            title: {
                                text: 'KPI.Motor1.Apparent_Power'
                            },
                            credits: {
                                enabled: false
                            },
                            xAxis: {
                                type: 'datetime'
                            },
                            yAxis: {
                                min: 0
                            },
                            legend: {
                                enabled: false
                            },
                            series: [{
                                turboThreshold: turboThresholdLimit,
                                color: '#FF9933',
                                data: data6
                            }]
                        });

                        Highcharts.chart(document.getElementById('DashboardMetricGraph7'), {
                            chart: {
                                type: 'line',
                                zoomType: 'x'
                            },
                            title: {
                                text: 'KPI.CPU.CPU_Temperature'
                            },
                            credits: {
                                enabled: false
                            },
                            xAxis: {
                                type: 'datetime'
                            },
                            yAxis: {
                                min: 0
                            },
                            legend: {
                                enabled: false
                            },
                            series: [{
                                turboThreshold: turboThresholdLimit,
                                color: '#FF7F50',
                                data: data7
                            }]
                        });

                        Highcharts.chart(document.getElementById('DashboardMetricGraph8'), {
                            chart: {
                                type: 'line',
                                zoomType: 'x'
                            },
                            title: {
                                text: 'KPI.Motor1.Vab_RMS'
                            },
                            credits: {
                                enabled: false
                            },
                            xAxis: {
                                type: 'datetime'
                            },
                            yAxis: {
                                min: 0
                            },
                            legend: {
                                enabled: false
                            },
                            series: [{
                                turboThreshold: turboThresholdLimit,
                                color: '#330066',
                                data: data8
                            }]
                        });
                    }



                    //DataPoints = PlotDataObject.DataPoints;

                    //var PointCount = DataPoints.length;
                }
            },
            error: function (err) {
                console.log(err);
            }

        });

    } catch (e) {
        console.log(e);
    }

    console.log(dataSet);
}

function getCPUTemperature1234() {

    try {

        var dataJsonObject = JSON.stringify({
            'DriveId': "Drive"
        });

        $.ajax({
            type: "POST",
            url: "Home/GetCPUTemperatureKPI_Rest",
            data: dataJsonObject,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (kpiData, status) {

                if (!kpiData.success) {
                    console.log('KPI Request Failed');
                } else {
                    //var pointCount = kpiData.success.length;

                    var DataPoints = [];
                    var PlotDataObject;

                    PlotDataObject = JSON.parse(kpiData.success);

                    DataPoints = PlotDataObject.DataPoints;

                    var PointCount = DataPoints.length;

                    var Index;
                    var data1 = [];
                    var data2 = [];
                    var data3 = [];
                    var data4 = [];
                    var data5 = [];


                    if (PointCount > 0) {

                        for (Index = 0; Index < PointCount; Index++) {

                            var plotdatetime = convertToJSONUTCDate(DataPoints[Index][0]);
                            var key = plotdatetime.match(/\d+/)[0] * 1;

                            var Value1 = 0;

                            Value1 = DataPoints[Index][1];

                            if (Value1 == null) {
                                Value1 = 0;
                            } else {
                                Value1 = parseFloat(Value1);
                            }

                            data1.push([key, Value1]);


                            var Value2 = 0;

                            Value2 = DataPoints[Index][2];

                            if (Value2 == null) {
                                Value2 = 0;
                            } else {
                                Value2 = parseFloat(Value2);
                            }

                            data2.push([key, Value2]);

                            var Value3 = 0;

                            Value3 = DataPoints[Index][3];

                            if (Value3 == null) {
                                Value3 = 0;
                            } else {
                                Value3 = parseFloat(Value3);
                            }

                            data3.push([key, Value3]);

                            var Value4 = 0;

                            Value4 = DataPoints[Index][4];

                            if (Value4 == null) {
                                Value4 = 0;
                            } else {
                                Value4 = parseFloat(Value4);
                            }

                            data4.push([key, Value4]);

                            var Value5 = 0;

                            Value5 = DataPoints[Index][5];

                            if (Value5 == null) {
                                Value5 = 0;
                            } else {
                                Value5 = parseFloat(Value5);
                            }

                            data5.push([key, Value5]);

                        }

                        Highcharts.chart(document.getElementById('DashboardMetricGraph1'), {
                            chart: {
                                type: 'line'
                            },
                            title: {
                                text: 'CCU Cold side water Temperature'
                            },
                            credits: {
                                enabled: false
                            },
                            xAxis: {
                                type: 'datetime'
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: '(degree Celsius)'
                                }
                            },
                            legend: {
                                enabled: false
                            },
                            series: [{
                                color: 'purple',
                                data: data1
                            }]
                        });

                        Highcharts.chart(document.getElementById('DashboardMetricGraph2'), {
                            chart: {
                                type: 'line'
                            },
                            title: {
                                text: 'CCU Water Pressure'
                            },
                            credits: {
                                enabled: false
                            },
                            xAxis: {
                                type: 'datetime'
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: '(bar)'
                                }
                            },
                            legend: {
                                enabled: false
                            },
                            series: [{
                                color: 'orange',
                                data: data2
                            }]
                        });

                        Highcharts.chart(document.getElementById('DashboardMetricGraph3'), {
                            chart: {
                                type: 'line'
                            },
                            title: {
                                text: 'CCU Water Flow'
                            },
                            credits: {
                                enabled: false
                            },
                            xAxis: {
                                type: 'datetime'
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: '(l/min)'
                                }
                            },
                            legend: {
                                enabled: false
                            },
                            series: [{
                                color: 'blue',
                                data: data3
                            }]
                        });


                        Highcharts.chart(document.getElementById('DashboardMetricGraph4'), {
                            chart: {
                                type: 'line'
                            },
                            title: {
                                text: 'Board Temperature'
                            },
                            credits: {
                                enabled: false
                            },
                            xAxis: {
                                type: 'datetime'
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: '(degree Celsius)'
                                }
                            },
                            legend: {
                                enabled: false
                            },
                            series: [{
                                name: 'Board Temperature',
                                color: 'Navy',
                                data: data4
                            }]
                        });

                        Highcharts.chart(document.getElementById('DashboardMetricGraph5'), {
                            chart: {
                                type: 'line'
                            },
                            title: {
                                text: 'CPU Temperature'
                            },
                            credits: {
                                enabled: false
                            },
                            xAxis: {
                                type: 'datetime'
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: '(degree Celsius)'
                                }
                            },
                            legend: {
                                enabled: false
                            },
                            series: [{
                                name: 'CPU Temperature',
                                color: 'Fuchsia',
                                data: data5
                            }]
                        });

                    }

                    //console.log(data);
                    /*
                    console.log(JSON.stringify(kpiData.success));
                    console.log(kpiData.success.length);
                    var Index;
                    var kpiData;
                    kpiData = JSON.stringify(kpiData.success);

                    document.getElementById('DataValueID').innerText = kpiData;
                    */
                }

            },
            error: function (err) {
                console.log(err);
            }
        });

    } catch (err) {
        console.log(err);
    } finally {

    }

}