
$(document).ajaxStart(function () {
    //alert("ajaxStart");
    $("#loader").fadeIn();
});
$(document).ajaxComplete(function () {
   // alert("ajaxComplete");
    $("#loader").fadeOut("slow");
});
$(window).on(function () {
    $("#loader").fadeOut("slow");
});

//function popup_helpwindow(width, height) {
//    var a = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft;
//    var i = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop;
//    var g = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.documentElement.clientWidth;
//    var f = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.documentElement.clientHeight - 22);
//    var h = (a < 0) ? window.screen.width + a : a;
//    var left = parseInt(h + ((g - width) / 2), 10);
//    var top = parseInt(i + ((f - height) / 2.5), 10);
//    return 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top + ',scrollbars=1';
//}
//function openDataHelp(e) {
//    window.open(sessionStorage.getItem("Help_DataHistorianDataHelp"), "_blank", "menubar=no,resizable=yes,directories=no,location=1," + popup_helpwindow(500, 500));
//}

function showEdit(id) {
    //alert('showEdit fun called ' + id);
    var item = JSON.parse($('#signals').val()).filter(item => item.id == id);
    document.getElementById('Id').value = item[0].signal.vcb_signal_id;
    document.getElementById('SiteId').value = item[0].siteId;
    document.getElementById('SignalName').value = item[0].signal.vcb_signal_asset_name + '.' + item[0].signal.vcb_signal_name;
    document.getElementById('SignalDisplayName').value = item[0].signalDisplayName;
    document.getElementById('SignalThreshold').value = item[0].signalThreshold;
    document.getElementById('SignalUnit').value = item[0].signalUnit;
      
    $('#editSignalContainer').modal('show');
    $('#SignalDisplayName').focus();
    dragElement(document.getElementById("updateSignalpopup"));
 }

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        if (e.target.nodeName == 'INPUT') { return;}
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function loadStockChart(p, signal, kpiData, min, max) {
    var colors = ['blue', 'darkgray', 'Fuchsia', '#ccb2e5', '#2E5090', '#380474', '#CC00FF', '#FF9933', '#FF7F50', '#330066'];
    var _elementDiv = document.getElementById('divG' + p);
    _elementDiv.style.display = 'block';

    //Set Asset Name in the footer
    var footerText = '<div><a class="btn-link" style="color:#0094ff;cursor:pointer;" onclick="showEdit(' + signal[0].signal.vcb_signal_id + ')">';
    footerText += '<span>' + signal[0].signal.vcb_signal_asset_name + '</span>';
    /*footerText += '<img src="~/css/icon_edit.png" />'*/
    /* footerText += '<span style="font-size: 20px;">&#x270D;</span>'*/
    footerText += '    <span class="edit-icon" style="color: #0094ff;">&#9998;&#xfe0e;</span>'
    footerText += '        <style>'
    footerText += '            .edit-icon {'
    footerText += '                color: primary; cursor:pointer; display: inline-block;'
    footerText += 'transform: rotateZ(90deg);'
    footerText += '}'
    footerText += '</style>'
    footerText += '</a></div>';

    var footer = _elementDiv.getElementsByTagName("footer")[0].innerHTML = footerText;//signal[0].signal.vcb_signal_asset_name;
    _elementDiv.getElementsByTagName("footer")[0].style.textAlign = "center";
    _elementDiv.style.display = 'block';

    var threshold = signal[0].signalThreshold;
    if (threshold == null || threshold == 0) {
        threshold = null;
    } else {
        if (min > threshold) {
            min = threshold;
        }
        if (max < threshold) {
            max = threshold;
            //if (threshold > 1) {
            //    max = threshold + 1;
            //} else {
            //    max = threshold;
            //}
        }
    }

    //Set the display name
    var displayname = signal[0].signalDisplayName;
    if (displayname == null || displayname == '') {
        let dn = signal[0].signal.vcb_signal_name.split('.');
        displayname = dn[dn.length - 1].replace(/\_/g, ' ');
    }

    Highcharts.stockChart(document.getElementById('DashboardMetricGraph' + p), {
        chart: {
            zoomType: 'x',
            type: 'spline',
            panning: true,
            panKey: 'shift'
        },
        title: {
            text: displayname.slice(0, 50) + (displayname.length > 50 ? "..." : ""),
            style: {
                fontSize: '14px;',
                fontFamily: 'GE Inspira Sans',
                //color: '#FF00FF',
                fontWeight: 'bold'
            }
        },
        credits: {
            enabled: false
        },
        rangeSelector: {
            buttons: [{
                type: 'minute',
                count: 10,
                text: '10min'
            }, {
                type: 'minute',
                count: 20,
                text: '20min'
            }, {
                type: 'minute',
                count: 30,
                text: '30min'
            }, {
                type: 'hour',
                count: 1,
                text: '1hour'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false, // it supports only days
            selected: 4 // all
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%e %b'  //day: '%b %d',  //hour: '%b %d, %H:%M'  //hour: '%H:%M'
            }
            //labels: {
            //    formatter: function () {
            //        return Highcharts.dateFormat('%e-%b %H:%M', this.value);
            //    }
            //}
        },
        yAxis: {
            //min: __signalMin,
            //max: __signalMax,
            title: {
                text: signal[0].signalUnit.slice(0, 10) + (signal[0].signalUnit.length > 10 ? "..." : ""),
                style: {
                    fontSize: '14px;',
                    fontFamily: 'GE Inspira Sans',
                    //color: '#FF00FF',
                    fontWeight: 'bold'
                }
            },
            plotLines: [{
                value: signal[0].signalThreshold,
                color: 'orange',
                dashStyle: 'shortdash',
                width: 2,
                zIndex: 10
            }]
        },
        legend: {
            enabled: false
        },
        exporting: {
            useMultiLevelHeaders: false,
            buttons: {
                contextButton: {
                    menuItems: [
                        {
                            textKey: 'viewFullscreen',
                            onclick: function () {
                                this.fullscreen.toggle();
                            }
                        },
                        {
                            textKey: 'downloadCSV',
                            onclick: function () {
                                this.downloadCSV();
                            }
                        }
                    ]
                }
            }
        },
        series: [{
            name: '',
            turboThreshold: kpiData.length,
            color: colors[p],
            data: kpiData
        }]
    });
}

function loadChart(p, signal, kpiData, min, max) {
    var colors = ['blue', 'darkgray', 'Fuchsia', '#ccb2e5', '#2E5090', '#380474', '#CC00FF', '#FF9933', '#FF7F50', '#330066'];
    var _elementDiv = document.getElementById('divG' + p);
    _elementDiv.style.display = 'block';

    //Set Asset Name in the footer
    var footerText = '<div><a class="btn-link" style="color:#0094ff;cursor:pointer;" onclick="showEdit(' + signal[0].signal.vcb_signal_id + ')">';
    footerText += '<span>' + signal[0].signal.vcb_signal_asset_name + '</span>';
    /*footerText += '<img src="~/css/icon_edit.png" />'*/
    /* footerText += '<span style="font-size: 20px;">&#x270D;</span>'*/
    footerText += '    <span class="edit-icon" style="color: #0094ff;">&#9998;&#xfe0e;</span>'
    footerText += '        <style>'
    footerText += '            .edit-icon {'
    footerText += '                color: primary; cursor:pointer; display: inline-block;'
    footerText += 'transform: rotateZ(90deg);'
    footerText += '}'
    footerText += '</style>'
    footerText += '</a></div>';
    
    var footer = _elementDiv.getElementsByTagName("footer")[0].innerHTML = footerText;//signal[0].signal.vcb_signal_asset_name;
    _elementDiv.getElementsByTagName("footer")[0].style.textAlign = "center";
    _elementDiv.style.display = 'block';

    var threshold = signal[0].signalThreshold;
    if (threshold == null || threshold == 0) {
        threshold = null;
    } else {        
        if (min > threshold) {
            min = threshold;
        }
        if (max < threshold) {
            if (threshold > 1) {
                max = threshold + 1;
            } else {
                max = threshold;
            }          
        }
    }

    //Set the display name
    var displayname = signal[0].signalDisplayName;
    if (displayname == null || displayname == '') {
        let dn = signal[0].signal.vcb_signal_name.split('.');
        displayname = dn[dn.length - 1].replace(/\_/g, ' ');
        if (dn.length > 1) {
            displayname = dn[dn.length - 2].replace(/\_/g, ' ') + ' ' + displayname;
        }
        displayname = displayname.slice(0, 50) + (displayname.length > 50 ? "..." : "");
    } else {
        displayname = displayname.slice(0, 50) + (displayname.length > 50 ? "..." : "");
    }

    //console.log($('#dtFromDate').val());
    
    Highcharts.chart(document.getElementById('DashboardMetricGraph' + p), {
        chart: {
            zoomType: 'x',
            type: 'spline',
            panning: true,
            panKey: 'shift'
        },
        title: {
            text: displayname,
            style: {
                fontSize: '14px;',
                fontFamily: 'GE Inspira Sans',
                //color: '#FF00FF',
                fontWeight: 'bold'
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            //min: $('#dtFromDate').val(),
            //max: $('#dtToDate').val(),
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%e %b'  //day: '%b %d',  //hour: '%b %d, %H:%M'  //hour: '%H:%M'
            }
            //labels: {
            //    formatter: function () {
            //        return Highcharts.dateFormat('%e-%b %H:%M', this.value);
            //    }
            //}
        },
        yAxis: {
            //min: min,
            //max: max,
            title: {
                text: (signal[0].signalUnit != null)?(signal[0].signalUnit.slice(0, 10) + (signal[0].signalUnit.length > 10 ? "..." : "")):""
            },
            //labels: {
            //format: '{value:.2f}'
            //},
            plotLines: [{
                value: threshold, //signal[0].signalThreshold,
                color: 'orange',
                dashStyle: 'shortdash',
                width: 2,
                zIndex: 10
            }]
        },
        legend: {
            enabled: false
        },
        exporting: {
            useMultiLevelHeaders: false,
            buttons: {
                contextButton: {
                    menuItems: [
                        {
                            textKey: 'viewFullscreen',
                            onclick: function () {
                                this.fullscreen.toggle();
                            }
                        },
                        {
                            textKey: 'downloadCSV',
                            onclick: function () {
                                this.downloadCSV();
                            }
                        }
                    ]
                }
            }
        },
        series: [{
            name: '',
            turboThreshold: kpiData.length,
            color: colors[p],
            data: kpiData
        }]
    });
}

function loadXYChart(p, signal, kpiData, min, max) {
    var colors = ['blue', 'darkgray', 'Fuchsia', '#ccb2e5', '#2E5090', '#380474', '#CC00FF', '#FF9933', '#FF7F50', '#330066'];
    var _elementDiv = document.getElementById('divG0');
    _elementDiv.style.display = 'block';

    //Set the display name
    var displayname = signal[0].signalDisplayName;
    if (displayname == null || displayname == '') {
        let dn = signal[0].signal.vcb_signal_name.split('.');
        displayname = dn[dn.length - 1].replace(/\_/g, ' ');
        if (dn.length > 1) {
            displayname = dn[dn.length - 2].replace(/\_/g, ' ') + ' ' + displayname;
        }
        displayname = displayname.slice(0, 50) + (displayname.length > 50 ? "..." : "");
    } else {
        displayname = displayname.slice(0, 50) + (displayname.length > 50 ? "..." : "");
    }

    let PointCount = kpiData.length;
    var Index;
    var data1 = [];
    /*i = i + 1;*/
    if (PointCount > 0) {
        let turboThresholdLimit = PointCount;
        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;
        for (Index = 0; Index < PointCount; Index++) {
            let itemObject = kpiData[Index];

            let key;
            var Value = 0;
            
            key = Object.values(itemObject)[0];
            Value = Object.values(itemObject)[1];

            //let newKey = key.match(/\d+/)[0] * 1;
            //console.log(newKey);

            if (Value == null) {
                Value = 0;
            } else {
                Value = parseFloat(Value);
                if (Value < min) {
                    min = Value;
                }
                if (Value > max) {
                    max = Value;
                }
            }

            data1.push([key, Value]);
        }
    }

    //console.log($('#dtFromDate').val());

    Highcharts.chart(document.getElementById('DashboardMetricGraph' + p), {
        chart: {
            zoomType: 'x',
            type: 'spline',
            panning: true,
            panKey: 'shift'
        },
        title: {
            text: displayname,
            style: {
                fontSize: '14px;',
                fontFamily: 'GE Inspira Sans',
                //color: '#FF00FF',
                fontWeight: 'bold'
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            //min: $('#dtFromDate').val(),
            //max: $('#dtToDate').val(),
            type: 'Linear',
            //dateTimeLabelFormats: {
            //    day: '%e %b'  //day: '%b %d',  //hour: '%b %d, %H:%M'  //hour: '%H:%M'
            //}
            //labels: {
            //    formatter: function () {
            //        return Highcharts.dateFormat('%e-%b %H:%M', this.value);
            //    }
            //}
        },
        yAxis: {
            //min: min,
            //max: max,
            title: {
                text: (signal[0].signalUnit != null) ? (signal[0].signalUnit.slice(0, 10) + (signal[0].signalUnit.length > 10 ? "..." : "")) : ""
            },
            //labels: {
            //format: '{value:.2f}'
            //},
            //plotLines: [{
            //    value: threshold, //signal[0].signalThreshold,
            //    color: 'orange',
            //    dashStyle: 'shortdash',
            //    width: 2,
            //    zIndex: 10
            //}]
        },
        legend: {
            enabled: false
        },
        exporting: {
            useMultiLevelHeaders: false,
            buttons: {
                contextButton: {
                    menuItems: [
                        {
                            textKey: 'viewFullscreen',
                            onclick: function () {
                                this.fullscreen.toggle();
                            }
                        },
                        {
                            textKey: 'downloadCSV',
                            onclick: function () {
                                this.downloadCSV();
                            }
                        }
                    ]
                }
            }
        },
        series: [{
            name: '',
            color: colors[p],
            data: data1
        }]
    });
}

function loadEmptyChart(i, signal) {
    //alert("empty");
    var _elementDiv = document.getElementById('divG' + i);
    _elementDiv.style.display = 'block';
    //Set Signal Name in the header
    //var header = _elementDiv.getElementsByTagName("header")[0].innerHTML = signal[0].signal.vcb_signal_name//signalwithasset.split('.', 1)[0];
    //_elementDiv.getElementsByTagName("header")[0].style.textAlign = "center";
    //_elementDiv.getElementsByTagName("header")[0].style.maxWidth = "100px";
    //console.log("_elementDiv" + _elementDiv);
    //_elementDiv.style.display = 'block';

    //Edit Title
    var _elementEditTitle = document.getElementById('editTitle' + i);

    var _editTitleHTML = '<a class="btn btn-dark" width="10px;"  title="Update Signal Information" onclick="showEdit(' + signal[0].signal.vcb_signal_id + ')"><img src="~/icons/icons8-edit-64.png" width="64" height="64" /></a>';

    try {
        _elementEditTitle.innerHTML = _editTitleHTML;
    } catch (e) {
        console.log(e);
    }


    //Set Asset Name in the footer
    var footerText = '<div><a class="btn-link" style="color:#0094ff;cursor:pointer;" onclick="showEdit(' + signal[0].signal.vcb_signal_id + ')">';
    footerText += '<span>' + signal[0].signal.vcb_signal_asset_name + '</span>';
    /*footerText += '<img src="~/css/icon_edit.png" />'*/
    /* footerText += '<span style="font-size: 20px;">&#x270D;</span>'*/
    footerText += '    <span class="edit-icon" style="color: #0094ff;">&#9998;&#xfe0e;</span>'
    footerText += '        <style>'
    footerText += '            .edit-icon {'
    footerText += '                color: primary; cursor:pointer; display: inline-block;'
    footerText += 'transform: rotateZ(90deg);'
    footerText += '}'
    footerText += '</style>'
    footerText += '</a></div>';

    var footer = _elementDiv.getElementsByTagName("footer")[0].innerHTML = footerText;//signal[0].signal.vcb_signal_asset_name;
    _elementDiv.getElementsByTagName("footer")[0].style.textAlign = "center";
    _elementDiv.style.display = 'block';

    //Set the display name
    var displayname = signal[0].signalDisplayName;
    if (displayname == null || displayname == '') {
        let dn = signal[0].signal.vcb_signal_name.split('.');
        displayname = dn[dn.length - 1].replace(/\_/g, ' ');
        if (dn.length > 1) {
            displayname = dn[dn.length - 2].replace(/\_/g, ' ') + ' ' + displayname;
        }

        displayname = displayname.slice(0, 50) + (displayname.length > 50 ? "..." : "");
    } else {
        displayname = displayname.slice(0, 50) + (displayname.length > 50 ? "..." : "");
    }

    //Set No Data message in chart
    Highcharts.setOptions({ lang: { noData: "No data to display" } })
    Highcharts.chart(document.getElementById('DashboardMetricGraph' + i), {
        title: {
            text: displayname,
            style: {
                fontSize: '14px;',
                fontFamily: 'GE Inspira Sans',
                //color: '#FF00FF',
                fontWeight: 'bold'
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        xAxis: {
            title: ""
        },
        yAxis: {
            title: ""
        },
        exporting: {
            enabled: false
        },
        series: [{
            data: []
        }]
    });
}

function loadSonardyneEmptyChart(i, signal) {
    //alert("empty");
    var _elementDiv = document.getElementById('divG' + i);
    _elementDiv.style.display = 'block';

    //Set Asset Name in the footer
    var footerText = '<div><a class="btn-link" style="color:#0094ff;cursor:pointer;">';
    footerText += '<span>' + signal[0].asset_name + '</span>' ;
    /*footerText += '<img src="~/css/icon_edit.png" />'*/
   /* footerText += '<span style="font-size: 20px;">&#x270D;</span>'*/
    footerText += '    <span class="edit-icon" style="color: #0094ff;">&#9998;&#xfe0e;</span>'
    footerText += '        <style>'
    footerText += '            .edit-icon {'
    footerText += '                color: primary; cursor:pointer; display: inline-block;'
    footerText += 'transform: rotateZ(90deg);'
    footerText += '}'
    footerText += '</style>'
    footerText += '</a></div>';

    var footer = _elementDiv.getElementsByTagName("footer")[0].innerHTML = footerText;//signal[0].signal.vcb_signal_asset_name;
    _elementDiv.getElementsByTagName("footer")[0].style.textAlign = "center";
    _elementDiv.style.display = 'block';

    //Set No Data message in chart
    Highcharts.setOptions({ lang: { noData: "No data to display" } })
    Highcharts.chart(document.getElementById('DashboardMetricGraph' + i), {
        title: {
            text: signal[0].asset_name,
            style: {
                fontSize: '14px;',
                fontFamily: 'GE Inspira Sans',
                //color: '#FF00FF',
                fontWeight: 'bold'
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        xAxis: {
            title: ""
        },
        yAxis: {
            title: ""
        },
        exporting: {
            enabled: false
        },
        series: [{
            data: []
        }]
    });
}

function generatePFseries(assetSignals, DataPoints) {

    var sjson = [];
    var categories = "";
    var ds = [];

    let PointCount = DataPoints.length;
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    var Index;

    for (let j = 0; j < assetSignals.length; j++) {
        //if (l.getTime() == stdt.getTime()) {
        //    ds[j] = [];
        //}
        ds[j] = [];

        for (Index = 0; Index < PointCount; Index++) {
            let itemObject = DataPoints[Index];       

            let key;
            var Value = 0;
            if (assetSignals[j].asset_name == "jxjy" || assetSignals[j].asset_name == "gridposition") {
                key = Object.values(itemObject)[0];
            } else {
                key = convertToJSONDateTime((itemObject.time.replace("T", " ")).replace("Z", " "));
            }
            
            //console.log('db_key' + key);
            Value = itemObject[assetSignals[j].signal_name];
            //} else {
            //    key = convertToJSONUTCDate(itemObject[0]);
            //    //console.log('s3_key' + key);
            //    Value = itemObject[1];
            //}

            let newKey = key.match(/\d+/)[0] * 1;
            //console.log(newKey);

            if (Value == null) {
                Value = 0;
            } else {
                Value = parseFloat(Value);
                if (Value < min) {
                    min = Value;
                }
                if (Value > max) {
                    max = Value;
                }
            }
            var pnt = [newKey, Value];
            ds[j].push(pnt);
        }
    }

    var xaxs = [];
    var yaxs = [];
    var hval = Math.floor(100.0 / assetSignals.length);
    var hgt = (hval - 5) + "%";
    for (let k = 0; k < assetSignals.length; k++) {
        var s = {
            "name": assetSignals[k]["signal_display_name"], "data": ds[k], "yAxis": k
        };
        sjson.push(s);
        var top = ((k * hval)) + "%";
        var lbl = (-3 * (k + 1))
        var syax = {
            "labels": {
                "align": "left", "x": 3
            }, "offset": 0,
            "title": {
                "text": assetSignals[k]["signal_display_name"] }, "height": hgt, "top": top, "lineWidth": 1, "resize": { "enabled": true },
            "opposite": false
        }
        yaxs.push(syax);        
    }
    var res = [sjson, yaxs]
    return res;
}

function generateObsViewPFseries(assetSignals, DataPoints) {

    var sjson = [];
    var categories = "";
    var ds = [];

    let PointCount = DataPoints.length;
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    var Index;

    for (let j = 0; j < assetSignals.length; j++) {
        //if (l.getTime() == stdt.getTime()) {
        //    ds[j] = [];
        //}
        ds[j] = [];

        for (Index = 0; Index < PointCount; Index++) {
            let itemObject = DataPoints[Index];

            let key;
            var Value = 0;
            key = convertToJSONDateTime((itemObject.time.replace("T", " ")).replace("Z", " "));
            //console.log('key' + key);
            let newKey = key.match(/\d+/)[0] * 1;
            //console.log(newKey);

            //Value = itemObject[assetSignals[j].signal_name];
            var signalName = itemObject["name"];
            if (signalName == assetSignals[j].signal_name) {
                Value = itemObject["valid"];

                if (Value == null) {
                    Value = 0;
                } else {
                    Value = parseFloat(Value);
                    if (Value < min) {
                        min = Value;
                    }
                    if (Value > max) {
                        max = Value;
                    }
                }
                var pnt = [newKey, Value];
                ds[j].push(pnt);
            }
            
        }
    }

    var xaxs = [];
    var yaxs = [];
    var hval = Math.floor(100.0 / assetSignals.length);
    var hgt = (hval - 5) + "%";
    for (let k = 0; k < assetSignals.length; k++) {
        var s = {
            "name": assetSignals[k]["signal_name"], "data": ds[k], "yAxis": k
        };
        sjson.push(s);
        var top = ((k * hval)) + "%";
        var lbl = (-3 * (k + 1))
        var syax = {
            "labels": {
                "align": "left", "x": 3
            }, "offset": 0,
            "title": { "text": assetSignals[k]["signal_name"] }, "height": hgt, "top": top, "lineWidth": 1, "resize": { "enabled": true },
            "opposite": false
        }
        yaxs.push(syax);
    }
    var res = [sjson, yaxs]
    return res;
}

//function generatePFseries_events(assetSignals, DataPoints) {

//    var sjson = [];
//    var categories = "";
//    var ds = [];
//    var msg = [];

//    let PointCount = DataPoints.length;
//    let min = Number.MAX_VALUE;
//    let max = Number.MIN_VALUE;
//    var Index;

//    for (let j = 0; j < 5; j++) {
//        //if (l.getTime() == stdt.getTime()) {
//        //    ds[j] = [];
//        //}
//        ds[j] = [];

//        for (Index = 0; Index < PointCount; Index++) {
//            let itemObject = DataPoints[Index];
//            if (itemObject["type"] == j) {
//                let key = convertToJSONDateTime((itemObject.time.replace("T", " ")).replace("Z", " "));
//                let newKey = key.match(/\d+/)[0] * 1;
//                //console.log(newKey);

//                var Value = 0;
//                Value = itemObject["type"];
//                var pnt = [newKey, Value];
//                ds[j].push(pnt);

//                msg[j] = itemObject["message"];               
//            }
//        }
//    }

//    var xaxs = [];
//    var yaxs = [];
//    var hval = Math.floor(100.0 / 5);
//    var hgt = (hval - 5) + "%";
//    for (let k = 0; k < 5; k++) {
//        var s = {
//            "name": k, "data": ds[k], "yAxis": 0, "valueSuffix": msg[k]
//        };
//        sjson.push(s);
//        var top = ((k * hval)) + "%";
//        var lbl = (-3 * (k + 1))
//        var syax = {
//            "labels": {
//                "align": "left", "x": 3
//            }, "offset": 0,
//            "title": { "text": "Alarms & Events" }, "height": hgt, "top": top, "lineWidth": 1, "resize": { "enabled": true },
//            "opposite": false
//        }
//        yaxs.push(syax);
//    }
//    var res = [sjson, yaxs, msg]
//    return res;
//}

function generatePFseries_events(assetSignals, DataPoints) {

    var sjson = [];
    var categories = "";
    var ds = [];
    var msg = [];

    let PointCount = DataPoints.length;
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    var Index;

    for (Index = 0; Index < PointCount; Index++) {
        let itemObject = DataPoints[Index];
        //if (itemObject["type"] == j) {
            let key = convertToJSONDateTime((itemObject.time.replace("T", " ")).replace("Z", " "));
            let newKey = key.match(/\d+/)[0] * 1;
            //console.log(newKey);

            var Value = 0;
            Value = itemObject["type"] + 1;
            var pnt = [newKey, Value];
            ds.push(pnt);

            msg.push(itemObject["message"]);
        //}
    }
    var s = "data: [";
    for (Index = 0; Index < PointCount; Index++) {       
        let itemObject = DataPoints[Index];
        //if (itemObject["type"] == j) {
        let key = convertToJSONDateTime((itemObject.time.replace("T", " ")).replace("Z", " "));
        let newKey = key.match(/\d+/)[0] * 1;
        //console.log(newKey);

        var Value = 0;
        Value = itemObject["type"] + 1;

        var eventtype;
        switch (Value) {
            case 1:
                eventtype = "Event Type: Debug Trace";
                break;
            case 2:
                eventtype = "Event Type: System Information";
                break;
            case 3:
                eventtype = "Event Type: System Warning";
                break;
            case 4:
                eventtype = "Event Type: System Alarm";
                break;
            case 5:
                eventtype = "Event Type: User Transaction";
                break;
            default:
                eventtype = "Event Type: Debug Trace";
                break;
        }

        s = {
            "x": newKey,
            "y": Value,
            "name": eventtype,
            "label": itemObject["message"],
            //"description": 'test desc',
            /*"yAxis": 0,*/
            /*"valueSuffix": msg*/
        };

        sjson.push(s);
    }

    var yaxs = [];
    //var hval = Math.floor(100.0);
    //var hgt = (hval) + "%";
    //for (let k = 0; k < 5; k++) {
        //var s = {
        //   /* "name": k,*/
        //    "data": ds,
        //    /*"yAxis": 0,*/
        //    /*"valueSuffix": msg*/
        //};
        //sjson.push(s);
       /* var top = ((0 * hval)) + "%";*/
        var lbl = (-3 * (0 + 1))
        var syax = {
            //"min": 0,
            //"max": 5,
            "labels": {
                "align": "left",
                "x": 3
            },
            "offset": 0,
            "title": {
                "text": "Alarms & Events"
            },
            //"height": hgt,
            //"top": top,
            "lineWidth": 1,
            "resize": {
                "enabled": true
            },
            //"plotLines": [{
            //    column: {
            //        zones: [{
            //            value: 2, // Values up to 10 (not including) ...
            //            color: 'pink' // ... have the color blue.
            //        }, {
            //            color: 'red' // Values from 10 (including) and up have the color red
            //        }]
            //    }
            //}],
            "opposite": false
        }
        yaxs.push(syax);
    //}
    var res = [sjson, yaxs, msg]
    return res;
}

function plotTeesporttimeseries(GraphTitle, stitle, xtitle, ytitle, seriesdata, GraphType) {
    var _elementDiv = document.getElementById('divG0');
    _elementDiv.style.display = 'block';

    var chartDiv = document.getElementById('DashboardMetricGraph0');//document.getElementById('divG0');
    chartDiv.style.display = 'block';
    try {
        kpichart = Highcharts.stockChart(chartDiv, {
            chart: {
                renderTo: chartDiv,
                type: GraphType,
                zoomType: 'xy',
                height: 600,
                panning: true,
                panKey: 'shift',
                ignoreHiddenSeries: false,
                marginBottom: 100,

            },
            loading: {
                labelStyle: {
                    color: 'white'
                },
                style: {
                    backgroundColor: 'gray'
                }
            },
            title: {
                text: GraphTitle
            },
            subtitle: {
                text: stitle
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: true,
                fallbackToExportServer: false,
                chartOptions: {
                    chart: {
                        width: 1200
                    },
                    legend: {
                        navigation: {
                            enabled: false
                        },
                    },
                },
                buttons: {
                    contextButton: {
                        menuItems: [
                            {
                                textKey: 'printChart',
                                onclick: function () {
                                    this.print();
                                }
                            }, {
                                separator: true
                            }, {
                                textKey: 'downloadPNG',
                                onclick: function () {
                                    this.exportChartLocal({
                                        type: 'image/png'
                                    });
                                }
                            }, {
                                textKey: 'downloadJPEG',
                                onclick: function () {
                                    this.exportChartLocal({
                                        type: 'image/jpeg'
                                    });
                                }
                            },
                            //{
                            //    textKey: 'downloadPDF',
                            //    onclick: function () {
                            //        this.exportChartLocal({
                            //            type: 'application/pdf'
                            //        });
                            //    }
                            //},
                            {
                                textKey: 'downloadSVG',
                                onclick: function () {
                                    this.exportChartLocal({
                                        type: 'image/svg+xml'
                                    });
                                }
                            }, {
                                separator: true
                            }, {
                                textKey: 'downloadCSV',
                                onclick: function () {
                                    this.downloadCSV();
                                }
                            }
                        ]
                    }

                }
            },
            rangeSelector: {
                buttons: [{
                    type: 'minute',
                    count: 10,
                    text: '10min'
                }, {
                    type: 'minute',
                    count: 20,
                    text: '20min'
                }, {
                    type: 'minute',
                    count: 30,
                    text: '30min'
                }, {
                    type: 'hour',
                    count: 1,
                    text: '1hour'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                inputEnabled: false, // it supports only days
                selected: 4 // all
            },
            tooltip: {
                //valueSuffix: seriesdata[2],
                split: true,
            },
            plotOptions: {
                series: {
                    //dataGrouping: {
                    //    enabled:false
                    //},
                    enableMouseTracking: true,
                    allowPointSelect: true,
                    states: {
                        inactive: {
                            opacity: 1
                        }
                    },
                    marker: {
                        states: {
                            select: {
                                fillColor: 'yellow',
                                radius: 6,
                                lineWidth: 1,
                                //symbol: 'square'
                            },
                            hover: {
                                enabled: true,
                                opacity: 1,
                            }
                        }
                    },
                    point: {
                        events: {
                            click: function (e) {
                                //if (vEnableZoom == true) {
                                    
                                //    var curX = 0;
                                //    var curY = 0;

                                //    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
                                //        //alert('Opera');
                                //    }
                                //    else if (navigator.userAgent.indexOf("Chrome") != -1) {
                                //        //alert('Chrome');
                                //        curX = event.chartX;
                                //        curY = event.chartY;
                                //    }
                                //    else if (navigator.userAgent.indexOf("Safari") != -1) {
                                //        //alert('Safari');
                                //    }
                                //    else if (navigator.userAgent.indexOf("Firefox") != -1) {
                                //        //alert('Firefox');
                                //        curX = event.chartX;
                                //        curY = event.chartY;
                                //    }
                                //    else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
                                //    {
                                //        //alert('IE');
                                //        curX = event.x;
                                //        curY = event.y;
                                //    }

                                //    xPos = curX - 50;
                                //    yPos = curY - 50;

                                //    vZoomPointer = scatterplot.renderer.rect(xPos, yPos, vHundred, vHundred, 5)
                                //        .attr({
                                //            'stroke-width': 5,
                                //            stroke: 'red',
                                //            opacity: 0.3,
                                //            zIndex: 5
                                //        })
                                //        .add();
                                //    vHline = scatterplot.renderer.path(['M', xPos, curY, 'L', xPos + vHundred, curY])
                                //        .attr({
                                //            'stroke-width': 1,
                                //            stroke: 'black',
                                //            zIndex: 5
                                //        })
                                //        .add();

                                //    vVLine = scatterplot.renderer.path(['M', curX, curY - vFifty, 'L', curX, curY + vFifty])
                                //        .attr({
                                //            'stroke-width': 1,
                                //            stroke: 'black',
                                //            zIndex: 5

                                //        })
                                //        .add();

                                //    vCircle = scatterplot.renderer.circle(curX, curY, 4).attr({
                                //        fill: 'transparent',
                                //        stroke: 'black',
                                //        'stroke-width': 1,
                                //        zIndex: 5
                                //    })
                                //        .add();

                                //}
                                //else {
                                    var vspeed = event.point.x;
                                    var vusage = event.point.y;
                                var seriesName = this.series.name;
                                console.log("Point X:" + vspeed + "; Point Y:" + vusage + "; Series Name:" + seriesName);
                                    //let splitSeriesName = seriesName.split('-');
                                    //let fuelType = vCurrFuelType; vSelectedFuelType = vCurrFuelType;
                                    //if (typeof splitSeriesName[1] !== 'undefined') { fuelType = splitSeriesName[1]; vSelectedFuelType = splitSeriesName[1]; }
                                    //if (!seriesName.startsWith("Current")) {
                                    //    UpdateSpeedVsFuelUsageSeclectedConfig(vspeed, vusage, fuelType);
                                    //}
                                /*}*/
                                //xAxis.afterSetExtremes(this.x - 1, this.x + 1);
                                //yAxis.afterSetExtremes(this.y - 1, this.y + 1);
                            }
                        }
                    },
                    events: {
                        legendItemClick: function () {
                            var visibility = this.visible ? 'hidden' : 'visible';
                            toggleplotlines(this, visibility);
                        }
                    },
                    showCheckbox: true,
                    selected: true,
                    events: {
                        checkboxClick: function () {
                            this.setVisible(!this.visible);
                        },
                    },

                    showInNavigator: true,
                    marker: {
                        enabled: true
                    },
                    //  turboThreshold: turbotThresholdLength,
                    states: {
                        inactive: {
                            opacity: 1
                        },
                        hover: {
                            enabled: true
                        }
                    },
                }
            },
            xAxis: {
                gridLineWidth: 1,
                dateTimeLabelFormats: {
                    day: '%b %d',
                    // hour: '%b %d, %H:%M'
                    hour: '%H:%M',
                    month: '%b \'%y',
                    year: '%Y'
                }, title: {
                    text: xtitle,
                    style: {
                        font: 'regular 14px GE Inspira Sans',
                        color: '#000000'
                    }
                },
                type: 'datetime',
                labels: {
                    overflow: 'justify'
                },
                //  ordinal: false,
            },
            yAxis: seriesdata[1],
            legend: {
                enabled: true,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0,
                itemHoverStyle: {
                    color: '#FF0000'
                },
                itemStyle: {
                    lineHeight: '5px',

                },
                maxHeight: 90
            },
            series: seriesdata[0]


        });
        kpichart.reflow();
    } catch (er) {
        alert(er.message);
    }
}

function loadLollipopChart(GraphTitle, stitle, xtitle, ytitle, seriesdata, GraphType) {
    var _elementDiv = document.getElementById('divG0');
    _elementDiv.style.display = 'block';

    var chartDiv = document.getElementById('DashboardMetricGraph0');//document.getElementById('divG0');
    chartDiv.style.display = 'block';
    try {
        Highcharts.chart(document.getElementById('DashboardMetricGraph0'), {

            chart: {
                type: 'column'
            },

            //accessibility: {
            //    point: {
            //        valueDescriptionFormat: '{index}. {xDescription}, {point.y}.'
            //    }
            //},

            legend: {
                enabled: false
            },

            title: {
                text: GraphTitle
            },
            subtitle: {
                text: stitle
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: true,
                fallbackToExportServer: false,
                chartOptions: {
                    chart: {
                        width: 1200
                    },
                    legend: {
                        navigation: {
                            enabled: false
                        },
                    },
                },
                buttons: {
                    contextButton: {
                        menuItems: [
                            {
                                textKey: 'printChart',
                                onclick: function () {
                                    this.print();
                                }
                            }, {
                                separator: true
                            }, {
                                textKey: 'downloadPNG',
                                onclick: function () {
                                    this.exportChartLocal({
                                        type: 'image/png'
                                    });
                                }
                            }, {
                                textKey: 'downloadJPEG',
                                onclick: function () {
                                    this.exportChartLocal({
                                        type: 'image/jpeg'
                                    });
                                }
                            },
                            //{
                            //    textKey: 'downloadPDF',
                            //    onclick: function () {
                            //        this.exportChartLocal({
                            //            type: 'application/pdf'
                            //        });
                            //    }
                            //},
                            {
                                textKey: 'downloadSVG',
                                onclick: function () {
                                    this.exportChartLocal({
                                        type: 'image/svg+xml'
                                    });
                                }
                            }, {
                                separator: true
                            }, {
                                textKey: 'downloadCSV',
                                onclick: function () {
                                    this.downloadCSV();
                                }
                            }
                        ]
                    }

                }
            },
            rangeSelector: {
                buttons: [{
                    type: 'minute',
                    count: 10,
                    text: '10min'
                }, {
                    type: 'minute',
                    count: 20,
                    text: '20min'
                }, {
                    type: 'minute',
                    count: 30,
                    text: '30min'
                }, {
                    type: 'hour',
                    count: 1,
                    text: '1hour'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                inputEnabled: false, // it supports only days
                selected: 4 // all
            },

            xAxis: {
                type: 'category'
            },

            yAxis: {
                title: {
                    text: 'Population'
                }
            },

            series: [{
                name: 'Population',
                data: JSON.stringify(seriesdata[0])
            }]

        });
        //kpichart.reflow();
    } catch (er) {
        alert(er.message);
    }
}

function loadSonardyeChart(p, signal, kpiData, min, max, DataPoints) {
    var colors = ['blue', 'darkgray', 'Fuchsia', '#ccb2e5', '#2E5090', '#380474', '#CC00FF', '#FF9933', '#FF7F50', '#330066'];
    var _elementDiv = document.getElementById('divG0');
    _elementDiv.style.display = 'block';

    //Set Asset Name in the footer
    var footerText = '<div>';
    footerText += '<span>' + signal[0].signal.vcb_signal_asset_name + '</span>';
    /*footerText += '<img src="~/css/icon_edit.png" />'*/
    /* footerText += '<span style="font-size: 20px;">&#x270D;</span>'*/
    footerText += '    <span class="edit-icon" style="color: #0094ff;">&#9998;&#xfe0e;</span>'
    footerText += '        <style>'
    footerText += '            .edit-icon {'
    footerText += '                color: primary; cursor:pointer; display: inline-block;'
    footerText += 'transform: rotateZ(90deg);'
    footerText += '}'
    footerText += '</style>'
    footerText += '</a></div>';

    var footer = _elementDiv.getElementsByTagName("footer")[0].innerHTML = footerText;//signal[0].signal.vcb_signal_asset_name;
    _elementDiv.getElementsByTagName("footer")[0].style.textAlign = "center";
    _elementDiv.style.display = 'block';

    var threshold = signal[0].signalThreshold;
    if (threshold == null || threshold == 0) {
        threshold = null;
    } else {
        if (min > threshold) {
            min = threshold;
        }
        if (max < threshold) {
            if (threshold > 1) {
                max = threshold + 1;
            } else {
                max = threshold;
            }
        }
    }

    //Set the display name
    var displayname = Object.keys(DataPoints[0])[1];//signal[0].signalDisplayName;
    //if (displayname == null || displayname == '') {
    //    let dn = signal[0].signal.vcb_signal_name.split('.');
    //    displayname = dn[dn.length - 1].replace(/\_/g, ' ');
    //    if (dn.length > 1) {
    //        displayname = dn[dn.length - 2].replace(/\_/g, ' ') + ' ' + displayname;
    //    }
    //    displayname = displayname.slice(0, 50) + (displayname.length > 50 ? "..." : "");
    //} else {
    //    displayname = displayname.slice(0, 50) + (displayname.length > 50 ? "..." : "");
    //}

    //console.log($('#dtFromDate').val());

    Highcharts.chart(document.getElementById('DashboardMetricGraph' + p), {
        chart: {
            zoomType: 'x',
            type: 'spline',
            panning: true,
            panKey: 'shift'
        },
        title: {
            text: displayname,
            style: {
                fontSize: '14px;',
                fontFamily: 'GE Inspira Sans',
                //color: '#FF00FF',
                fontWeight: 'bold'
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            //min: $('#dtFromDate').val(),
            //max: $('#dtToDate').val(),
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%e %b'  //day: '%b %d',  //hour: '%b %d, %H:%M'  //hour: '%H:%M'
            }
            //labels: {
            //    formatter: function () {
            //        return Highcharts.dateFormat('%e-%b %H:%M', this.value);
            //    }
            //}
        },
        yAxis: {
            //min: min,
            //max: max,
            title: {
                text: (signal[0].signalUnit != null) ? (signal[0].signalUnit.slice(0, 10) + (signal[0].signalUnit.length > 10 ? "..." : "")) : ""
            },
            //labels: {
            //format: '{value:.2f}'
            //},
            plotLines: [{
                value: threshold, //signal[0].signalThreshold,
                color: 'orange',
                dashStyle: 'shortdash',
                width: 2,
                zIndex: 10
            }]
        },
        legend: {
            enabled: false
        },
        exporting: {
            useMultiLevelHeaders: false,
            buttons: {
                contextButton: {
                    menuItems: [
                        {
                            textKey: 'viewFullscreen',
                            onclick: function () {
                                this.fullscreen.toggle();
                            }
                        },
                        {
                            textKey: 'downloadCSV',
                            onclick: function () {
                                this.downloadCSV();
                            }
                        }
                    ]
                }
            }
        },
        series: [{
            name: Object.keys(DataPoints[0])[1],
            turboThreshold: kpiData.length,
            color: colors[p],
            data: kpiData
        }
        ]
    });
}

function PlotXYGraph(KPISeriesData, GraphTitle) {
    var axisTitle = [];
    //var dataseries = KPISeriesData[0].KPIData;
    var dataseries = KPISeriesData;
    var datastr = [];
    var xindx;
    var yindx;
    var xminval;
    var xmaxval;
    var yminval;
    var ymaxval;
    //var swapaxis = changeaxis;
    //var isRealTime = $('#togBtn').prop('checked');
    //if (!isRealTime) {
    //    if (isarchiveddata == false) {
    //        if (!swapaxis) {
    //            xindx = 1;
    //            yindx = 2;
    //        } else {
    //            xindx = 2;
    //            yindx = 1;
    //        }
    //    }
    //    else {
    //        if (!swapaxis) {
    //            xindx = newsignalmap[0] + 1;
    //            yindx = newsignalmap[1] + 1;
    //        } else {
    //            xindx = newsignalmap[1] + 1;
    //            yindx = newsignalmap[0] + 1;
    //        }
    //    }
    //}
    //if (isRealTime) {
    //    if (isarchiveddataPG == false) {
    //        if (!swapaxis) {
    //            xindx = 1;
    //            yindx = 2;
    //        } else {
    //            xindx = 2;
    //            yindx = 1;
    //        }
    //    }
    //    else {
    //        if (!swapaxis) {
    //            xindx = newsignalmap[0] + 1;
    //            yindx = newsignalmap[1] + 1;
    //        } else {
    //            xindx = newsignalmap[1] + 1;
    //            yindx = newsignalmap[0] + 1;
    //        }
    //    }
    //}
    xindx = 1;
    yindx = 2;

    if (dataseries != null) {
        PointCount = dataseries.length;
        if ((PointCount > 1) || (((PointCount == 1) && (dataseries[0] != "No Data")))) {
            try {
                var indx = 1;
                axisTitle = [];
                //for (var prop in ChoosenSignals) {
                //    axisTitle[indx] = ChoosenSignals[prop][4] + " (" + ChoosenSignals[prop][0] + ")";
                //    indx++;
                //}
                // datastr = "["
                axisTitle[1] = Object.keys(dataseries[0])[0];
                axisTitle[2] = Object.keys(dataseries[0])[1];
                var outObj = {};
                for (Index = 0; Index < PointCount; Index++) {


                    //if (Index > 0) {
                    //    datastr += ",";
                    //}

                    var xval;
                    if (Object.values(dataseries[Index])[0] != null) {
                        //if (dataseries[Index][xindx] == "false") {
                        //    xval = 0;
                        //} else if (dataseries[Index][xindx] == "true") {
                        //    xval = 1;
                        //} else {
                        xval = parseFloat(Object.values(dataseries[Index])[0]);
                        //}
                    } else {
                        xval = null;
                    }
                    var yval;
                    if (Object.values(dataseries[Index])[1] != null) {
                        //if (dataseries[Index][yindx] == "false") {
                        //    yval = 0;
                        //} else if (dataseries[Index][yindx] == "true") {
                        //    yval = 1;
                        //} else {
                        yval = parseFloat(Object.values(dataseries[Index])[1]);
                        //}
                    } else {
                        yval = null;
                    }
                    var dt = dataseries[Index].time;
                    if (Index == 0) {
                        xminval = xval;
                        xmaxval = xval;
                        yminval = yval;
                        ymaxval = yval;
                    }
                    else {
                        if (xminval > xval) {
                            xminval = xval
                        }
                        if (xmaxval < xval) {
                            xmaxval = xval;
                        }
                        if (yminval > yval) {
                            yminval = yval
                        }
                        if (ymaxval < yval) {
                            ymaxval = yval;
                        }
                    }


                    //  datastr += "{\"x\":" + xval + ", \"y\":" + yval + ", \"rddate\":\"" + dt + "\"}";
                    //  datastr += "{x:" + xval + ",y:" + yval + "}";
                    //var inobj = {};
                    //inobj["x"] = xval;
                    //inobj["y"] = yval;
                    //inobj["rddate"] = "abcd";
                    if ((xval != null) && (yval != null)) {
                        datastr.push([xval, yval]);
                    }
                    // datastr.push(inobj);
                }
                // datastr.push(outObj);
                // datastr += "]";

                // var jsondatastr = JSON.parse(datastr);

                //if (document.getElementById("div2mwplotdata") != null) {
                //    $('#div2mwplotdata').empty();
                //}


                //var chartDiv = document.createElement('div');
                //document.getElementById('div2mwplotdata').appendChild(chartDiv);
                //chartDiv.style.marginBottom = "15px";
                //chartDiv.style.padding = "10px";

                //signaldivishidden = true;
                //document.getElementById("divsignaltree").style.display = 'none';
                //document.getElementById("div2mwplot").classList.remove("col-sm-9");
                //document.getElementById("div2mwplot").classList.add("col-sm-12");
                //if (document.getElementById("ssig") != null) {
                //    document.getElementById("ssig").style.display = 'none';
                //}
                //if (document.getElementById("hsig") != null) {
                //    document.getElementById("hsig").style.display = 'block';
                //}

               // alert("xminval:" + xminval + ";xmaxval:" + xmaxval + ";yminval:" + yminval + ";ymaxval:" + ymaxval + ";");

                var chartDiv = document.getElementById('DashboardMetricGraph0');//document.getElementById('divG0');
                chartDiv.style.display = 'block';

                kpixychart = Highcharts.chart(chartDiv, {
                    chart: {
                        renderTo: chartDiv,
                        type: "line",//changeChartType,
                        zoomType: 'xy',
                        height: 500,
                        panning: true,
                        panKey: 'shift'
                    },

                    title: {
                        text: GraphTitle
                    },
                    credits: {
                        enabled: false
                    },
                    exporting: {
                        buttons: {
                            contextButton: {
                                menuItems: [
                                    {
                                        textKey: 'printChart',
                                        onclick: function () {
                                            this.print();
                                        }
                                    }, {
                                        separator: true
                                    }, {
                                        textKey: 'downloadPNG',
                                        onclick: function () {
                                            this.exportChart({
                                                type: 'image/png'
                                            });
                                        }
                                    }, {
                                        textKey: 'downloadJPEG',
                                        onclick: function () {
                                            this.exportChart({
                                                type: 'image/jpeg'
                                            });
                                        }
                                    }, {
                                        textKey: 'downloadPDF',
                                        onclick: function () {
                                            this.exportChart({
                                                type: 'application/pdf'
                                            });
                                        }
                                    }, {
                                        textKey: 'downloadSVG',
                                        onclick: function () {
                                            this.exportChart({
                                                type: 'image/svg+xml'
                                            });
                                        }
                                    }, {
                                        separator: true
                                    }, {
                                        textKey: 'downloadCSV',
                                        onclick: function () {
                                            this.downloadCSV();
                                        }
                                    }
                                ]
                            }

                        }
                    },

                    tooltip: {
                        headerFormat: '',
                        pointFormat: '<span style="color:{series.color}">\u25CF</span> X:<b>{point.x:.2f}</b>,Y:<b>{point.y:.2f}</b><br/>',

                    },
                    plotOptions: {
                        series: {
                            showInNavigator: true,
                            marker: {
                                enabled: true
                            },

                            states: {
                                inactive: {
                                    opacity: 1
                                },
                                hover: {
                                    enabled: true
                                }
                            },
                        }
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        gridLineWidth: 1,
                        title: {
                            text: axisTitle[xindx],
                            style: {
                                font: 'regular 14px GE Inspira Sans',
                                color: '#000000'
                            }
                        },
                        min: xminval,
                        max: (xmaxval),
                        minRange: 1,

                    },
                    yAxis: {
                        offset: 15,
                        title: {
                            text: axisTitle[yindx],
                        },
                        opposite: false,
                        showLastLabel: true,
                        min: yminval,
                        max: (ymaxval),
                        minorGridLineDashStyle: "longdash",
                        minorTickInterval: "auto",
                        gridLineWidth: 1

                    },

                    legend: {
                        enabled: true
                    },

                    series: [
                        {
                            name: 'XY Plot',
                            data: datastr
                        }
                    ]
                });

                //if (document.getElementById("swapaxis") != null) {
                //    document.getElementById("swapaxis").style.display = 'block';
                //}
                //if (document.getElementById("chosescatter") != null) {
                //    document.getElementById("chosescatter").style.display = 'block';
                //}

            } catch (e) {
                alert(e.message);
            }

        }
    }

}

function Plot3DGraph(KPISeriesData, GraphTitle) {
    var effdata = KPISeriesData[0].KPIData;;
    var title = GraphTitle;
    var chartDiv = null;
    if (effdata != null) {
        var PointCount = effdata.length; //plotData.success.length;
        var Index;
        var xaxis = [];
        var yaxis = [];
        var zaxis = [];

        var axistitle = [];
        var hovertemp = "";

        var xindx = null;
        var yindx = null;
        var zindx = null;
        var isRealTime = $('#togBtn').prop('checked');

        if (!isRealTime) {
            if (isarchiveddata == false) {
                xindx = 1;
                yindx = 2;
                zindx = 3;
            }
            else {
                xindx = newsignalmap[0] + 1;
                yindx = newsignalmap[1] + 1;
                zindx = newsignalmap[2] + 1;
            }
        }
        if (isRealTime) {
            if (isarchiveddataPG == false) {
                xindx = 1;
                yindx = 2;
                zindx = 3;
            }
            else {
                xindx = newsignalmap[0] + 1;
                yindx = newsignalmap[1] + 1;
                zindx = newsignalmap[2] + 1;
            }
        }

        if ((PointCount > 1) || (((PointCount == 1) && (effdata[0] != "No Data")))) {

            var indx = 1;
            axistitle = [];

            for (var prop in ChoosenSignals) {
                axistitle[indx] = ChoosenSignals[prop][4] + " (" + ChoosenSignals[prop][0] + ")";
                if (indx == 1) {
                    hovertemp += prop + ": %{x:.2f}" + ChoosenSignals[prop][0] + "<br />";
                } else if (indx == 2) {
                    hovertemp += prop + ": %{y:.2f}" + ChoosenSignals[prop][0] + "<br />";
                } else if (indx == 3) {
                    hovertemp += prop + ": %{z:.2f}" + ChoosenSignals[prop][0];
                }
                indx++;
            }


            for (Index = 0; Index < PointCount; Index++) {
                var numval;
                numval = Number(effdata[Index][xindx]);
                xaxis.push(numval);
                numval = Number(effdata[Index][yindx]);
                yaxis.push(numval);
                numval = Number(effdata[Index][zindx]);
                zaxis.push(numval);

            }
        }

        var surface_peakeff = {
            x: xaxis, y: yaxis, z: zaxis,
            mode: 'markers',
            marker: {
                size: 3,
                opacity: 0.8,
            },
            type: 'scatter3d',
            hovertemplate: hovertemp
        };
        var config = { responsive: true };

        var layout2 = {
            title: title,
            scene: {
                camera: {
                    up: { x: 0, y: 0, z: 1 },
                    center: { x: 0, y: 0, z: 0 },
                    eye: { x: 1.75, y: 1.75, z: 0.2 }
                },
                xaxis: { title: axistitle[1] },
                yaxis: { title: axistitle[2] },
                zaxis: { title: axistitle[3] },
            },
            autosize: false,
            width: 950,
            height: 500,
            margin: {
                l: 15,
                r: 15,
                b: 25,
                t: 30,
            },
            showlegend: false,
        };
        if (document.getElementById("div2mwplotdata") != null) {
            $('#div2mwplotdata').empty();
        }
        chartDiv = document.createElement('div');
        document.getElementById('div2mwplotdata').appendChild(chartDiv);
        //chartDiv.style.marginBottom = "15px";
        chartDiv.style.padding = "10px";

        signaldivishidden = true;
        document.getElementById("divsignaltree").style.display = 'none';
        document.getElementById("div2mwplot").classList.remove("col-sm-9");
        document.getElementById("div2mwplot").classList.add("col-sm-12");
        if (document.getElementById("ssig") != null) {
            document.getElementById("ssig").style.display = 'none';
        }
        if (document.getElementById("hsig") != null) {
            document.getElementById("hsig").style.display = 'block';
        }

        Plotly.newPlot(chartDiv, [surface_peakeff], layout2, config);

    }
    else {

        if (chartDiv != null) {
            chartDiv.innerHTML = '<h4>Data Not Available</h4>';
        }

    }

}

function openSonardyneMdfFilesPopUp() {
    $("#mdfFiles").modal('show');
    dragElement(document.getElementById("mdfFilepopup"));
}

function opensignalPopUp() {
    $("#reportDashboard").modal('show');
    $('#searchInput').focus();
    dragElement(document.getElementById("signalpopup"));
}

function clearallsignals() {

    $('#checkboxContainer').find('input[type="checkbox"]').each(function () {
        $(this).prop('checked', false);
    });
    document.getElementById("searchInput").value = "";
    var value = $('#searchInput').val().toLowerCase();
    search(value);
    //SetProgressBarValue();
}

//load signals on unit change / date change
function loadsignals(mode) {
    var content = "";
    var livegroupcontent = "";
    var livenestedContent = "";
    var groupcontent = "";
    var nestedContent = "";
    var nestedcontentCnt = 0;

    var assets = JSON.parse($("#assets").val());
    var signals = JSON.parse($("#signals").val());
    var defaultsignals = JSON.parse(JSON.parse($('#selectedSignals').val())); //retrieve array
    //alert(defaultsignals);
        
    $('#checkboxContainer').empty();
    content += "<ul id=\"signalUL\">";
    content += "<li class=\"groupli\"><span class=\"caret\"/>";
    content += "<label style=\"font-family:'GE Inspira Sans';\">";
    content += " <b>Live Signals</b> </label></span>";
    content += "<ul class=\"nested\">";
    for (a = 0; a < assets.length; a++) {       
        var assetSignals = signals.filter(item => item.signal.vcb_signal_asset_name == assets[a] && item.signal.vcb_signal_status ==1);
        if (assetSignals.length > 0) {
            livegroupcontent = "<li class=\"groupli\"><span class=\"signalcaret\"/> <span class=\"grplbltglr\" style=\"font-family:'GE Inspira Sans';\"><label>&nbsp;" + assets[a] + "</label></span>";

            livenestedContent = "<ul class=\"nested\">";
            for (i = 0; i < assetSignals.length; i++) {
                var defchk = '';
                var selectedSignals = defaultsignals.filter(item => item.signal_id == assetSignals[i].id);

                //var selectedSignals = $("#selectedSignals").val().filter(ss => ss.id == signals[i].id);
                if (selectedSignals.length > 0) {
                    defchk = 'checked="true"';
                }
                
                //if (signalsData[j].HideSignal != true) {
                livenestedContent += '<li><input type="checkbox" name="' + assetSignals[i].signal.vcb_signal_id +
                    '" title=' + assetSignals[i].signal.vcb_signal_name +
                    ' id="' +
                    assetSignals[i].signal.vcb_signal_id +
                    '" onclick="chkValidSelection(this) "' + defchk + ' data-unit="' + assetSignals[i].signalUnit + '" data-assetname="' + assetSignals[i].signal.vcb_signal_asset_name + '" data-displayname="' + assetSignals[i].signalDisplayName + '" data-threshold="' + assetSignals[i].signalThreshold + '" data-SignalID="' + assetSignals[i].signal.vcb_signal_id + '"' + '><label title=' +
                    assetSignals[i].signal.vcb_signal_name +
                    ' style="white-space:nowrap;margin-left:5px;vertical-align:middle;\"><span style=\"font-family:\"GE Inspira Sans\";\">' +
                    assetSignals[i].signal.vcb_signal_name +
                    '</span></label></input></li>';
                nestedcontentCnt++;               
                //}
            }
            livenestedContent += "</ul>";
            content += livegroupcontent;
            content += livenestedContent;
            content += "</li>"
        }
    }
    content += "</ul></li>"

    //Add Historical Signals
    if (mode == 'H') {   
        content += "<li class=\"groupli\"><span class=\"caret\"/>";
        content += "<label style=\"font-family:'GE Inspira Sans';\">";
        content += " <b>Historical Signals</b> </label></span>";
        content += "<ul class=\"nested\">";
        for (a = 0; a < assets.length; a++) {
            var assetSignals = signals.filter(item => item.signal.vcb_signal_asset_name == assets[a] && item.signal.vcb_signal_status == 0);
            if (assetSignals.length > 0) {
                groupcontent = "<li class=\"groupli\"><span class=\"signalcaret\"/> <span class=\"grplbltglr\" style=\"font-family:'GE Inspira Sans';\"><label>&nbsp;" + assets[a] + "</label></span>";

                nestedContent = "<ul class=\"nested\">";
                for (i = 0; i < assetSignals.length; i++) {
                    var defchk = '';
                    var selectedSignals = defaultsignals.filter(item => item.signal_id == assetSignals[i].id);

                    //var selectedSignals = $("#selectedSignals").val().filter(ss => ss.id == signals[i].id);
                    if (selectedSignals.length > 0) {
                        defchk = 'checked="true"';
                    }

                    //if (signalsData[j].HideSignal != true) {
                    nestedContent += '<li><input type="checkbox" name="' + assetSignals[i].signal.vcb_signal_id +
                        '" title=' + assetSignals[i].signal.vcb_signal_name +
                        ' id="' +
                        assetSignals[i].signal.vcb_signal_id +
                        '" onclick="chkValidSelection(this) "' + defchk + ' data-unit="' + assetSignals[i].signalUnit + '" data-assetname="' + assetSignals[i].signal.vcb_signal_asset_name + '" data-displayname="' + assetSignals[i].signalDisplayName + '" data-threshold="' + assetSignals[i].signalThreshold + '" data-SignalID="' + assetSignals[i].signal.vcb_signal_id + '"' + '><label title=' +
                        assetSignals[i].signal.vcb_signal_name +
                        ' style="white-space:nowrap;margin-left:5px;vertical-align:middle;\"><span style=\"font-family:\"GE Inspira Sans\";\">' +
                        assetSignals[i].signal.vcb_signal_name +
                        '</span></label></input></li>';
                    nestedcontentCnt++;

                    //}
                }
                nestedContent += "</ul>";
                content += groupcontent;
                content += nestedContent;
                content += "</li>"
            }
        }
        content += "</ul></li>"
    }
        content += "</ul>";
    //console.log(content);
    $('#checkboxContainer').html(content);
    //var toggler = document.getElementsByClassName("signalcaret");
    //var toggler2 = document.getElementsByClassName("grplbltglr");
    //var i;

    //for (i = 0; i < toggler.length; i++) {
    //    toggler[i].addEventListener("click", function () {
    //        this.parentElement.querySelector(".nested").classList.toggle("active");
    //        this.classList.toggle("signalcaret-down");
    //    });
    //}

    //for (i = 0; i < toggler2.length; i++) {
    //    toggler2[i].addEventListener("click", function () {
    //        this.parentElement.querySelector(".nested").classList.toggle("active");
    //        this.parentElement.children['0'].classList.toggle("signalcaret-down");
    //    });
    //}
}

//load signals on unit change / date change
function loadSonardyneSignals(mode) {
    var assets = JSON.parse($("#assets").val());
    var signals = JSON.parse($("#signals").val());
    var selectedasset = JSON.parse($("#selConfigAssetName").val());
    var defaultsignals = JSON.parse(JSON.parse($('#selectedSignals').val())); //retrieve array
    //alert(defaultsignals);

    for (a = 0; a < assets.length; a++) {
        var assetSignals = signals.filter(item => item.signal.vcb_signal_asset_name == assets[a] && item.signal.vcb_signal_status == 1);
        if (assetSignals.length > 0) {
            for (i = 0; i < assetSignals.length; i++) {
                var defchk = '';
                var selectedSignals = defaultsignals.filter(item => item.signal_id == assetSignals[i].id);

                //var selectedSignals = $("#selectedSignals").val().filter(ss => ss.id == signals[i].id);

                livenestedContent += '<li><input type="checkbox" name="' + assetSignals[i].signal.vcb_signal_id +
                    '" title=' + assetSignals[i].signal.vcb_signal_name +
                    ' id="' +
                    assetSignals[i].signal.vcb_signal_id +
                    '" onclick="chkValidSelection(this) "' + defchk + ' data-unit="' + assetSignals[i].signalUnit + '" data-assetname="' + assetSignals[i].signal.vcb_signal_asset_name + '" data-displayname="' + assetSignals[i].signalDisplayName + '" data-threshold="' + assetSignals[i].signalThreshold + '" data-SignalID="' + assetSignals[i].signal.vcb_signal_id + '"' + '><label title=' +
                    assetSignals[i].signal.vcb_signal_name +
                    ' style="white-space:nowrap;margin-left:5px;vertical-align:middle;\"><span style=\"font-family:\"GE Inspira Sans\";\">' +
                    assetSignals[i].signal.vcb_signal_name +
                    '</span></label></input></li>';
                nestedcontentCnt++;
            }
        }
    }
     if (mode == 'H') {
        content += "<li class=\"groupli\"><span class=\"caret\"/>";
        content += "<label style=\"font-family:'GE Inspira Sans';\">";
        content += " <b>Historical Signals</b> </label></span>";
        content += "<ul class=\"nested\">";
        for (a = 0; a < assets.length; a++) {
            var assetSignals = signals.filter(item => item.signal.vcb_signal_asset_name == assets[a] && item.signal.vcb_signal_status == 0);
            if (assetSignals.length > 0) {
                groupcontent = "<li class=\"groupli\"><span class=\"signalcaret\"/> <span class=\"grplbltglr\" style=\"font-family:'GE Inspira Sans';\"><label>&nbsp;" + assets[a] + "</label></span>";

                nestedContent = "<ul class=\"nested\">";
                for (i = 0; i < assetSignals.length; i++) {
                    var defchk = '';
                    var selectedSignals = defaultsignals.filter(item => item.signal_id == assetSignals[i].id);

                    //var selectedSignals = $("#selectedSignals").val().filter(ss => ss.id == signals[i].id);
                    if (selectedSignals.length > 0) {
                        defchk = 'checked="true"';
                    }

                    //if (signalsData[j].HideSignal != true) {
                    nestedContent += '<li><input type="checkbox" name="' + assetSignals[i].signal.vcb_signal_id +
                        '" title=' + assetSignals[i].signal.vcb_signal_name +
                        ' id="' +
                        assetSignals[i].signal.vcb_signal_id +
                        '" onclick="chkValidSelection(this) "' + defchk + ' data-unit="' + assetSignals[i].signalUnit + '" data-assetname="' + assetSignals[i].signal.vcb_signal_asset_name + '" data-displayname="' + assetSignals[i].signalDisplayName + '" data-threshold="' + assetSignals[i].signalThreshold + '" data-SignalID="' + assetSignals[i].signal.vcb_signal_id + '"' + '><label title=' +
                        assetSignals[i].signal.vcb_signal_name +
                        ' style="white-space:nowrap;margin-left:5px;vertical-align:middle;\"><span style=\"font-family:\"GE Inspira Sans\";\">' +
                        assetSignals[i].signal.vcb_signal_name +
                        '</span></label></input></li>';
                    nestedcontentCnt++;

                    //}
                }
                nestedContent += "</ul>";
                content += groupcontent;
                content += nestedContent;
                content += "</li>"
            }
        }
    }
}


function chkValidSelection(ctrl) {
    var container = document.querySelector('#checkboxContainer');
    var checkBoxesSelected = container.querySelectorAll('input[type="checkbox"]:checked');
    var sigcnt = checkBoxesSelected.length;
    //document.getElementById("cleargigs").style.display = 'block';
    if (sigcnt > 0) {       
        if (sigcnt > 6) {
            alert("Maximum 6 signals only allowed.");
            ctrl.checked = false;
            return;
        }
        $('#lblshwSignalCnt').val(sigcnt + " Signals");
        SignalsSelected();
    } else {
       // document.getElementById("cleargigs").style.display = 'none';
        $('#lblshwSignalCnt').val('Select Signals...');
        SignalsNotSelected();
    } 
}

function chkValidSelection_clear() {
    var container = document.querySelector('#checkboxContainer');
    var checkBoxesSelected = container.querySelectorAll('input[type="checkbox"]:checked');
    var sigcnt = checkBoxesSelected.length;
    //document.getElementById("cleargigs").style.display = 'block';
    if (sigcnt > 0) {
        $('#lblshwSignalCnt').val(sigcnt + " Signals");
    } else {
        // document.getElementById("cleargigs").style.display = 'none';
        $('#lblshwSignalCnt').val('Select Signals...');
    }
}

function search(searchStr) {
    if (document.getElementById("signalUL") != null) {
        ul = document.getElementById("signalUL");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            if (li[i].getAttribute("class") == null) {
                lbl = li[i].getElementsByTagName("Label")[0];                

                try {
                    txtValue = lbl.textContent || lbl.innerText;
                    if (txtValue.toLowerCase().indexOf(searchStr) > -1) {
                        li[i].style.display = "";
                    } else {
                        li[i].style.display = "none";
                    }
                }
                catch (err) {
                    li[i].style.display = "none";
                }
            }
        }
    }
}

function siteNoSignalConfig() {
    //alert('No Signal Configure');
    for (let d = 0; d < 6; d++) {
        let _divName = "divG" + d;
        var elementDiv = document.getElementById(_divName);
        elementDiv.style.display = 'none';
    }
    let _siteNotConfigID = document.getElementById('siteNotConfigID');
    _siteNotConfigID.style.display = 'block';
    let _SignalsNotSelected = document.getElementById('SignalsNotSelected');
    _SignalsNotSelected.style.display = 'none';
    $('#checkboxContainer').empty();
    $("#loader").fadeOut("slow");
}

function SignalsNotSelected() {
    //alert('No Signal Configure');
    for (let d = 0; d < 6; d++) {
        let _divName = "divG" + d;
        var elementDiv = document.getElementById(_divName);
        elementDiv.style.display = 'none';
    }
    let _siteNotConfigID = document.getElementById('siteNotConfigID');
    _siteNotConfigID.style.display = 'none';
    let _SignalsNotSelected = document.getElementById('SignalsNotSelected');
    _SignalsNotSelected.style.display = 'block';
    $("#loader").fadeOut("slow");
}

function SignalsSelected() {   
    let _siteNotConfigID = document.getElementById('siteNotConfigID');
    _siteNotConfigID.style.display = 'none';
    let _SignalsNotSelected = document.getElementById('SignalsNotSelected');
    _SignalsNotSelected.style.display = 'none';
    $("#loader").fadeOut("slow");
}

function RealTimeDataChange(isRealTime) {
    var isRealTime = $('#togBtn').prop('checked');
    //if (isRealTime) {
    //    $('#togBtn').bootstrapToggle('on');
    //}
    //else {
    //    $('#togBtn').bootstrapToggle('off');
    //}
    //$('#togBtn').val = isRealTime;
   
    if (isRealTime) {
       // document.getElementById("historicalDateSpan").style = "display: none;";
        onSiteChange();
        //document.getElementById("FromDateContainer").style = "display: none;";
        //document.getElementById("ToDateContainer").style = "display: none;";
    } else {
      //  document.getElementById("historicalDateSpan").style = "display: block;";
        onSiteChange();
        //document.getElementById("FromDateContainer").style = "display: block;";
        //document.getElementById("ToDateContainer").style = "display: block;";
    }
}

