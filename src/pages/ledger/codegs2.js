function doPost(e) {
  try {
    console.log("Hello", e);
    const payload = JSON.parse(e.postData.getDataAsString());
    const action = payload?.action;
    var response = ContentService.createTextOutput();
    if (e && e.method === "OPTIONS") {
      return response; // Early return for OPTIONS requests
    }
    response.setMimeType(ContentService.MimeType.JSON);

    // Based on action, call the corresponding function
    if (action === "update") {
      doUpdate(payload);
      response.setContent(JSON.stringify({ result: "Update success" }));
    } else if (action === "delete") {
      doDelete(payload);
      response.setContent(JSON.stringify({ result: "Delete success" }));
    } else if (action === "insert") {
      doInsert(payload);
      response.setContent(JSON.stringify({ result: "Insert success" }));
    } else {
      response.setContent(JSON.stringify({ error: "Invalid action method" }));
    }

    return response;
  } catch (error) {
    // Handle errors
    var errorResponse = ContentService.createTextOutput();
    errorResponse.setMimeType(ContentService.MimeType.JSON);
    errorResponse.setContent(JSON.stringify({ error: error.message }));
    return errorResponse;
  }
}
function doGet() {
  const sheetURL = SpreadsheetApp.openByUrl(
    "https://docs.google.com/spreadsheets/d/1zZiCRmhPISpi2cA33KXpchf7_xAoL1q6-lcONrsRKmE/edit?gid=0#gid=0"
  );
  const sheet = sheetURL.getSheetByName("Sheet1");
  let allData = {};
  const data = sheet.getDataRange().getValues();
  allData["sheetData"] = data;
  var response = ContentService.createTextOutput(
    JSON.stringify(allData)
  ).setMimeType(ContentService.MimeType.JSON);
  return response;
}

function doUpdate(payload) {
  const sheetURL = SpreadsheetApp.openByUrl(
    "https://docs.google.com/spreadsheets/d/1zZiCRmhPISpi2cA33KXpchf7_xAoL1q6-lcONrsRKmE/edit?gid=0#gid=0"
  );
  const sheet = sheetURL.getSheetByName("Sheet1");
  var row = payload?.row;
  var data = payload?.data;
  for (const [col, value] of Object.entries(data)) {
    sheet.getRange(row, parseInt(col)).setValue(value); // Ensure col is treated as an integer index
  }
}

function doDelete(payload) {
  const sheetURL = SpreadsheetApp.openByUrl(
    "https://docs.google.com/spreadsheets/d/1zZiCRmhPISpi2cA33KXpchf7_xAoL1q6-lcONrsRKmE/edit?gid=0#gid=0"
  );
  const sheet = sheetURL.getSheetByName("Sheet1");
  var row = payload?.row;

  // Delete the row (shift all rows up)
  sheet.deleteRow(row);
}

function doInsert(payload) {
  const sheetURL = SpreadsheetApp.openByUrl(
    "https://docs.google.com/spreadsheets/d/1zZiCRmhPISpi2cA33KXpchf7_xAoL1q6-lcONrsRKmE/edit?gid=0#gid=0"
  );
  const sheet = sheetURL.getSheetByName("Sheet1");
  var data = payload?.data; // Data is expected to be an object { column: value, ... }

  // Find the first empty row in the sheet
  const lastRow = sheet.getLastRow() + 1; // Get the next empty row
  const columns = Object.keys(data); // Get the columns to insert
  const values = columns.map((col) => data[col]); // Get the corresponding values

  // Insert the values into the corresponding columns
  sheet.getRange(lastRow, 1, 1, values.length).setValues([values]);
}
