const btnInsertUpdate = document.getElementById("btnInsertUpdate");
const btnClearItems = document.getElementById("btnClearItems");
const btnClear = document.getElementById("btnClear");
const tblRecords = document.getElementById("tblRecords");
const sortSelect1 = document.getElementById("sortSelect1");
const sortSelect2 = document.getElementById("sortSelect2");
const btnsave = document.getElementById("btnsave");




let arrRecords = new Array();

const tblTHsLabels = [
    "First Name",
    "Middle Name",
    "Last Name",
    "Age",
    "Action"
];




let savedRecords = localStorage.getItem("records");

if (savedRecords != null) {

    arrRecords = JSON.parse(savedRecords);

}



if(arrRecords.length == 0) {

    document.getElementById("status").style.display = "inline";

    document.getElementById("status").innerHTML = "No Records...";

} else {

    document.getElementById("status").style.display = "none";

    iterateRecords();

}



btnInsertUpdate.addEventListener("click", () => {

    const inputTxt = document.getElementsByTagName("input");


    

    if(btnInsertUpdate.value == "insert") {

        

        for(const txt of inputTxt) {

            if(txt.value.trim() == "") {

                alert("Please complete all the text inputs!");

                return;
            }

        }


        

        if(parseInt(inputTxt[3].value) <= 0) {

            alert("Please enter a valid age!");

            return;
        }


        

        let infoRecord = {

            fname: inputTxt[0].value.trim(),

            mname: inputTxt[1].value.trim(),

            lname: inputTxt[2].value.trim(),

            age: parseInt(inputTxt[3].value)

        };


        

        for(const txt of inputTxt) {

            txt.value = "";

        }


        

        arrRecords.push(infoRecord);


        

        iterateRecords();


        console.log(inputTxt);

        console.log(infoRecord);

        console.log(arrRecords);

    }


    

    else {

        

        for(const txt of inputTxt) {

            if(txt.value.trim() == "") {

                alert("Please complete all the text inputs!");

                return;
            }

        }


        

        let index = parseInt(btnInsertUpdate.value);


        

        arrRecords[index].fname = inputTxt[0].value.trim();

        arrRecords[index].mname = inputTxt[1].value.trim();

        arrRecords[index].lname = inputTxt[2].value.trim();

        arrRecords[index].age = parseInt(inputTxt[3].value);


       

        iterateRecords();


        

        for(const txt of inputTxt) {

            txt.value = "";

        }


        

        btnInsertUpdate.innerHTML = "Insert";

        btnInsertUpdate.value = "insert";

    }

});




btnClear.addEventListener("click", () => {

    const inputTxt = document.getElementsByTagName("input");

    for(const txt of inputTxt) {

        txt.value = "";

    }

    btnInsertUpdate.innerHTML = "Insert";

    btnInsertUpdate.value = "insert";

});




btnClearItems.addEventListener("click", () => {

    arrRecords = [];


    while(tblRecords.hasChildNodes()) {

        tblRecords.removeChild(tblRecords.firstChild);

    }


    document.getElementById("status").style.display = "inline";

    document.getElementById("status").innerHTML = "No Records...";


    btnInsertUpdate.innerHTML = "Insert";

    btnInsertUpdate.value = "insert";

});




function iterateRecords() {

  

    while(tblRecords.hasChildNodes()) {

        tblRecords.removeChild(tblRecords.firstChild);

    }


   

    if(!(arrRecords.length == 0)) {

        document.getElementById("status").style.display = "none";


        

        const tblHeaderRow = document.createElement("tr");

        const tblHeader = document.createElement("thead");


        tblHeaderRow.style.borderTop = "1px solid black";

        tblHeaderRow.style.borderBottom = "1px solid black";


        

        for(let i = 0; i < 5; i++) {

            const tblTHs = document.createElement("th");

            tblTHs.style.padding = "5px";


            if(i != 4) {

                tblTHs.style.borderRight = "1px solid black";

            }


            tblTHs.innerHTML = tblTHsLabels[i];

            tblHeaderRow.appendChild(tblTHs);

        }


        tblHeader.appendChild(tblHeaderRow);

        tblRecords.appendChild(tblHeader);


        

        const tblBody = document.createElement("tbody");


        arrRecords.forEach((rec, i) => {

            const tblRow = document.createElement("tr");


            const tbdataFname = document.createElement("td");

            const tbdataMname = document.createElement("td");

            const tbdataLname = document.createElement("td");

            const tbdataAge = document.createElement("td");

            const tbdataActionBtn = document.createElement("td");


           

            const btnDelete = document.createElement("button");

            const btnUpdate = document.createElement("button");



            tbdataFname.style.borderRight = "1px solid black";

            tbdataFname.style.padding = "10px";


            tbdataMname.style.borderRight = "1px solid black";

            tbdataMname.style.padding = "10px";


            tbdataLname.style.borderRight = "1px solid black";

            tbdataLname.style.padding = "10px";


            tbdataAge.style.borderRight = "1px solid black";

            tbdataAge.style.padding = "10px";


            tbdataActionBtn.style.padding = "10px";


            tblRow.style.borderBottom = "1px solid black";


            

            tbdataFname.innerHTML = rec.fname;

            tbdataMname.innerHTML = rec.mname;

            tbdataLname.innerHTML = rec.lname;

            tbdataAge.innerHTML = rec.age;


           

            btnDelete.innerHTML = "Delete";

            btnDelete.setAttribute("onclick", `deleteData(${i})`);

            btnDelete.style.marginRight = "5px";


            

            btnUpdate.innerHTML = "Edit";

            btnUpdate.setAttribute("value", "update");

            btnUpdate.setAttribute("onclick", `updateData(${i})`);

            btnUpdate.style.marginRight = "5px";


           

            tbdataActionBtn.appendChild(btnDelete);

            tbdataActionBtn.appendChild(btnUpdate);


           

            tblRow.appendChild(tbdataFname);

            tblRow.appendChild(tbdataMname);

            tblRow.appendChild(tbdataLname);

            tblRow.appendChild(tbdataAge);

            tblRow.appendChild(tbdataActionBtn);


            

            tblBody.appendChild(tblRow);

        });


        

        tblRecords.appendChild(tblBody);

    }




    else {

        document.getElementById("status").style.display = "inline";

        document.getElementById("status").innerHTML = "No Records...";

    }

}




function deleteData(i) {

    arrRecords.splice(i, 1);

    iterateRecords();

}




function updateData(i) {

    const inputTxt = document.getElementsByTagName("input");


    inputTxt[0].value = arrRecords[i].fname;

    inputTxt[1].value = arrRecords[i].mname;

    inputTxt[2].value = arrRecords[i].lname;

    inputTxt[3].value = arrRecords[i].age;


    btnInsertUpdate.innerHTML = "Update";

    btnInsertUpdate.value = `${i}`;

}




function sortnames() {

    let choice = document.getElementById("sortSelect1").value;

    let order = document.getElementById("sortSelect2").value;


    

    if(order == "") {

        return;

    }




    if(choice === "FirstN") {

        arrRecords.sort(function(a, b) {

            if(order === "ascending") {

                return a.fname.localeCompare(b.fname);

            }

            else if(order === "descending") {

                return b.fname.localeCompare(a.fname);

            }

        });

    }




    else if(choice === "LastN") {

        arrRecords.sort(function(a, b) {

            if(order === "ascending") {

                return a.lname.localeCompare(b.lname);

            }

            else if(order === "descending") {

                return b.lname.localeCompare(a.lname);

            }

        });

    }


    // Display sorted records

    iterateRecords();

}



function sortletters() {

    let choice = document.getElementById("sortSelect2").value;

    let nameChoice = document.getElementById("sortSelect1").value;


    // If no name is selected

    if(nameChoice == "") {

        return;

    }




    if(choice === "ascending") {

        arrRecords.sort(function(a, b) {

            if(nameChoice === "FirstN") {

                return a.fname.localeCompare(b.fname);

            }

            else if(nameChoice === "LastN") {

                return a.lname.localeCompare(b.lname);

            }

        });

    }


  

    else if(choice === "descending") {

        arrRecords.sort(function(a, b) {

            if(nameChoice === "FirstN") {

                return b.fname.localeCompare(a.fname);

            }

            else if(nameChoice === "LastN") {

                return b.lname.localeCompare(a.lname);

            }

        });

    }


    

    iterateRecords();

}


btnsave.addEventListener("click", () => {

    localStorage.setItem(
        "records",
        JSON.stringify(arrRecords)
    );


    alert("Records saved successfully!");

});