// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = [];

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let elements = d3.select(this);
    //console.log(elements)
    // 4b. Save the value that was changed as a variable.
    let value = elements.property("value");
    //console.log(value);
    // 4c. Save the id of the filter that was changed as a variable.
    let id = elements.property("id");
    //console.log(id);
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (value) {
      // removes element from filters if id exists before adding a new one
      for (let i = 0; i < filters.length; i++) {
        if (filters[i] == id) {
          filters.splice(i,1);
        }
      }
      filters.push(id);
    }
    else {
      // removes element from filters if exists and value is empty
      for (let i = 0; i < filters.length; i++) {
        if (filters[i] == id) {
          filters.splice(i,1);
        }
      }
    }
    console.log(filters);
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    var data;
    let filteredData = tableData;
    //console.log(filteredData);
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    filters.forEach(item => {
      data = d3.select("#"+item).property("value");
      //console.log(data);

      filteredData = filteredData.filter(row => row[item] === data);
      //console.log(filteredData)
    });
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);
