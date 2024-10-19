const sideNavbtn = document.querySelector(".sideNav");
const sideNav = document.querySelector("main > aside");
const medInput = document.querySelector("#med-class");
const medNameInput = document.querySelector("#med-name");
const doseInput = document.querySelector("#dose");
const searchDiv1 = document.querySelector("#search-data1");
const searchDiv2 = document.querySelector("#search-data2");
const medData1 = document.querySelector("#result1");
const medData2 = document.querySelector("#result2");
const loader1 = document.querySelector("#spinner1");
const loader2 = document.querySelector("#spinner2");
const closeSearch = document.querySelectorAll(".close-search");
const addPrescription = document.querySelector("#add-prescription");
const intervalInput = document.querySelector("#interval");
const duration1 = document.querySelector("#duration1");
const duration2 = document.querySelector("#duration2");
const instructionInput = document.querySelector("#instruction");
const tableBody = document.querySelector("#tbody");
const noDrugRow = document.querySelector("#no-drugrow");
const donePrescribingBtn = document.querySelector("#done-prescribing");
const remarkDiv = document.querySelector("#remark");

// side navigation events
sideNavbtn.addEventListener("mouseover", () => {
  sideNav.classList.add("show");
});
sideNav.addEventListener("mouseleave", () => {
  sideNav.classList.remove("show");
});

// First api call when the first input field is clicked
medInput.addEventListener("focus", async () => {
  loader1.style.display = "block"; // start loading animation
  try {
    const request = await fetch(
      "https://cliniqueplushealthcare.com.ng/prescriptions/drug_class"
    );
    const response = await request.json();
    if (!request.ok) {
      throw new Error(); // throw error if the request is bad
    }
    searchDiv1.style.display = "flex"; // show the result dialog
    medData1.innerHTML = ""; // empty the div container incase something was displayed
    // display the result
    response.forEach((item) => {
      const resultItem = document.createElement("div");
      resultItem.classList.add("result-item");
      resultItem.textContent = item.name;
      medData1.appendChild(resultItem);
      resultItem.addEventListener("click", () => {
        medInput.value = item.name; // retrieve the selected value
        medData1.innerHTML = ""; // Clear results after selection
        searchDiv1.style.display = "none";
        // Trigger focus on the second input field and fetch its data
        medNameInput.focus();
        fetchMedNameData(item.id);
      });
    });
  } catch (error) {
    console.error(error.message);
  } finally {
    loader1.style.display = "none"; // stop animation when either the data is fetched or an error is returned
  }
});
// function to close the both search result
closeSearch.forEach((btn) => {
  btn.addEventListener("click", () => {
    searchDiv1.style.display = "none";
    searchDiv2.style.display = "none";
  });
});

// Second api call after the first input value has been selected
async function fetchMedNameData(id) {
  loader2.style.display = "block"; // start loading animation
  try {
    const request = await fetch(
      `https://cliniqueplushealthcare.com.ng/prescriptions/get_drug_class_by_id/${id}`
    );
    const response = await request.json();
    if (!request.ok) {
      throw new Error(); // throw error if the request is bad
    }
    searchDiv2.style.display = "flex"; // show the result dialog
    medData2.innerHTML = ""; // empty the div container incase something was displayed
    response.forEach((item) => {
      const resultItem = document.createElement("div");
      resultItem.classList.add("result-item");
      resultItem.textContent = item.medicine_name;
      medData2.appendChild(resultItem);
      // display the result
      resultItem.addEventListener("click", () => {
        medNameInput.value = item.medicine_name; // retrieve the selected value
        medData2.innerHTML = ""; // Clear results after selection
        searchDiv2.style.display = "none";
        doseInput.focus();
      });
    });
  } catch (error) {
    console.error(error.message);
  } finally {
    loader2.style.display = "none"; // stop animation when either the data is fetched or an error is returned
  }
}

// function to add the prescription to the table
addPrescription.addEventListener("click", () => {
  // check for empty input
  if (
    !medInput.value ||
    !medNameInput.value ||
    !doseInput.value ||
    !intervalInput.value ||
    !duration1.value ||
    !duration2.value ||
    !instructionInput.value
  ) {
    alert("Please fill in all fields before adding the prescription.");
    return;
  }

  // new table row
  const newRow = document.createElement("tr");
  // s/n cell
  const snCell = document.createElement("td");
  snCell.textContent = tableBody.children.length + 1;
  // medicine class cell
  const medClassCell = document.createElement("td");
  medClassCell.textContent = medInput.value;
  // medicine name cell
  const medNameCell = document.createElement("td");
  medNameCell.textContent = medNameInput.value;
  // dose & interval cell
  const dose_freqCell = document.createElement("td");
  dose_freqCell.textContent = `${doseInput.value} - ${intervalInput.value}`;
  // duration cell
  const durationCell = document.createElement("td");
  durationCell.textContent = `${duration1.value} / ${duration2.value}`;
  // instruction cell
  const instructionCell = document.createElement("td");
  instructionCell.textContent = instructionInput.value;
  // action cell
  const actionCell = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Remove";
  deleteBtn.addEventListener("click", () => {
    tableBody.removeChild(newRow);
    updateSN(); // update s/n value
    checkDrugRow(); // check if table is empty
    remarkDiv.style.display = "none"; // close the done prescription modal
  });
  actionCell.appendChild(deleteBtn);

  newRow.appendChild(snCell);
  newRow.appendChild(medNameCell);
  newRow.appendChild(medClassCell);
  newRow.appendChild(dose_freqCell);
  newRow.appendChild(durationCell);
  newRow.appendChild(instructionCell);
  newRow.appendChild(actionCell);

  tableBody.appendChild(newRow);
  checkDrugRow(); // check if the table is empty
  clearInput(); // clear the input fields
});
// function to update the s/n values
function updateSN() {
  const rows = tableBody.children;
  for (let i = 0; i < rows.length; i++) {
    rows[i].firstElementChild.textContent = i + 1;
  }
}
// function to check if the drug table is empty
function checkDrugRow() {
  if (tableBody.children.length === 0) {
    noDrugRow.style.display = "";
  } else {
    noDrugRow.style.display = "none";
  }
}
checkDrugRow();
// function to reset input
function clearInput() {
  medInput.value = "";
  medNameInput.value = "";
  doseInput.value = "";
  intervalInput.value = "";
  duration1.value = "";
  duration2.value = "";
  instructionInput.value = "Nil";
}
// done prescription click
donePrescribingBtn.addEventListener("click", () => {
  remarkDiv.style.display = "flex";
});
