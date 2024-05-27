function searchFilter() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function searchFilterTable(id) {
    // Declare variables
    var input, filter, tbody, tr, td1, td2, i, txtValue1, txtValue2;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    tbody = document.getElementById(id);
    tr = tbody.getElementsByTagName('tr');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td1 = tr[i].getElementsByTagName("td")[0];
        td2 = tr[i].getElementsByTagName("td")[1];
        txtValue1 = td1.textContent || td1.innerText;
        txtValue2 = td2.textContent || td2.innerText;
        if (txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

 //$(document).ready(function () {
    //    $("ul[id*=tabDiv] li").click(function () {
    //        //alert($(this).html()); // gets innerHTML of clicked li
    //        //alert($(this).text()); // gets text contents of clicked li
    //        var actionDiv = document.getElementById("tabDiv");
    //        var activeTab = document.getElementById($(this).text().trim());
    //        if (activeTab == null) {
    //            activeTab = document.getElementById('Update');
    //        }
    //    //var tabs = actionDiv.getElementsByClassName("nav-item");
    //    var tabs = actionDiv.getElementsByClassName("active");
    //    for (var i = 0; i < tabs.length; i++) {
    //        tabs[i].style.backgroundColor = '#FFFFFF';
    //        tabs[i].style.color = '#0366D6';
    //        tabs[i].className = tabs[i].className.replace("active", "");           
    //        /*tabs[i].addEventListener("click", function () {*/
    //        //var current = document.getElementsByClassName("active");
    //        //current[0].className = current[0].className.replace(" active", "");
    //        /* });*/
    //    }
    //    activeTab.className += " active";
    //        activeTab.style.backgroundColor = '#1B6EC2';
    //    activeTab.style.color = '#FFFFFF';
    //    });
    //});

    //var input, selectedItem, ul, li, a, i, txtValue;
    //input = document.getElementById('SelectedUser');

    //selectedItem = input.value.toUpperCase();
    //ul = document.getElementById("tabDiv");
    //li = ul.getElementsByTagName('li');

    //// Loop through all list items, and hide those who don't match the search query
    //for (i = 0; i < li.length; i++) {
    //    a = li[i].getElementsByTagName("a")[0];
    //    txtValue = a.textContent || a.innerText;
    //    if (txtValue.toUpperCase() == selectedItem) {
    //        a.className += " active";
    //        a.style.backgroundColor = '#B0BED9';
    //        a.style.color = '#FFFFFF';
    //    }
    //}

    //// Add active class to the current tab (highlight it)
    //function selectTab(activeTab) {
    //    var actionDiv = document.getElementById("tabDiv");
    ////    //var tabs = actionDiv.getElementsByClassName("nav-item");
    //    var tabs = actionDiv.getElementsByClassName("active");
    //    for (var i = 0; i < tabs.length; i++) {
    //        tabs[i].style.backgroundColor = '#1B6EC2';
    //        tabs[i].style.color = '#FFFFFF';
    ////        tabs[i].className = tabs[i].className.replace("active", "");           
    ////        /*tabs[i].addEventListener("click", function () {*/
    ////        //var current = document.getElementsByClassName("active");
    ////        //current[0].className = current[0].className.replace(" active", "");
    ////        /* });*/
    //    }
    ////    activeTab.className += " active";
    ////    activeTab.style.backgroundColor = '#B0BED9';
    ////    activeTab.style.color = '#FFFFFF';
    //}