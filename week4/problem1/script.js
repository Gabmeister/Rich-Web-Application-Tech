document.addEventListener("DOMContentLoaded", function() {
    const addContact = document.getElementById("addContact");
    const contactTable = document.getElementById("contactTable");
    const errorDiv = document.getElementById("error");
    const sortName = document.getElementById("sortName");
    const searchInput = document.getElementById("searchInput");
    const nameInput = document.getElementById("Cont_name");
    const mobileInput = document.getElementById("Cont_mobile");
    const emailInput = document.getElementById("Cont_email");

    let contacts = [];

    //add info to table if err != True 
    addContact.addEventListener("click", function() {
        const Cont_name = nameInput.value.trim(); 
        const Cont_mobile = mobileInput.value.trim(); 
        const Cont_email = emailInput.value.trim(); //trim() removes whitespace from string start/end 

        //err check - empty fields
        if (!Cont_name || !Cont_mobile || !Cont_email) {
            errorDiv.textContent = "All fields are required";
            errorDiv.style.display = "block";
            return;
        }

        //err check contd - Cont_name field
        if (!/^[A-Za-z\s]{1,20}$/.test(Cont_name)) {
            errorDiv.textContent = "Name can only contain letters/spaces and must be less than 21 characters...";
            errorDiv.style.display = "block";
        return;
        }

        //err check contd - .+ = matches following char, \. = matches a dot
        if (!/^.+@.+\..+$/.test(Cont_email) || Cont_email.length > 40) {
            errorDiv.textContent = "Invalid email.. email must have '@' and '.com' and be less than 40 characters...";
            errorDiv.style.display = "block";
        return;
        }

        //err check contd - Cont_mobile field
        //d = any digit between 0-9
        if (!/^\d{10}$/.test(Cont_mobile)) {
            errorDiv.textContent = "Mobile no. must be 10 characters and only contain digits";
            errorDiv.style.display = "block";
        return;
        }

        errorDiv.style.display = "none";
        const contact = { Cont_name, Cont_mobile, Cont_email }; //add values to contact{}
        contacts.push(contact); //append contact{} into contacts[] array
        updateTable();
        clearInputs(); 
        console.log(contacts);
    });

    function updateTable(filteredContacts) {//optional parameter - filteredContacts
        const tbody = contactTable.querySelector("tbody");//selects element from contactTable
        tbody.innerHTML = "";//clears row

        const contactsToDisplay = filteredContacts || contacts;//use filteredContacts only if parameter passed

        contactsToDisplay.forEach((contact, index) => {
            const row = document.createElement("tr");//create row
            row.innerHTML = `<td>${contact.Cont_name}</td><td>${contact.Cont_mobile}</td><td>${contact.Cont_email}</td>`;//add cells to new row
            tbody.appendChild(row); //append created row to tbody
        });
    }

    function clearInputs() {
        nameInput.value = "";
        mobileInput.value = "";
        emailInput.value = "";
    }

    //search
    searchInput.addEventListener("input", function() {
        const searchTerm = searchInput.value.trim();
        const filteredContacts = contacts.filter(contact => contact.Cont_mobile.includes(searchTerm));//show contacts that contain specified nums
        updateTable(filteredContacts);//update table to display search result
    });


    sortName.addEventListener("click", function() {
        contacts.sort((a, b) => {
            //If the sortName button has the dataset.sort attribute set to "asc", display asc otherwise desc
            if (sortName.dataset.sort === "asc") {
                return a.Cont_name.localeCompare(b.Cont_name);
            } else {
                return b.Cont_name.localeCompare(a.Cont_name);
            }
        });
        sortName.dataset.sort = sortName.dataset.sort === "asc" ? "desc" : "asc"; //toggle asc -> desc 
        updateTable();
    });

});