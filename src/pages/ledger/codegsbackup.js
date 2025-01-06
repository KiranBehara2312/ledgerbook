function doPost(e) {
  const sheetURL = SpreadsheetApp.openByUrl(
    "https://docs.google.com/spreadsheets/d/1zZiCRmhPISpi2cA33KXpchf7_xAoL1q6-lcONrsRKmE/edit?gid=0#gid=0"
  );
  const sheet = sheetURL.getSheetByName("Sheet1");
  let formData = e.parameter;
  sheet.appendRow([
    formData?.transactionAmount ?? "0",
    formData?.transactionDate ?? "01/01/1997",
    formData?.transactionMode ?? "Cash",
    formData?.transactionNote ?? "Some Notes",
    formData?.transactionTo ?? "Mr. Random Person",
    formData?.transactionType ?? "Debit",
    formData?.transactionFor ?? "Testing",
    formData?.uuid ?? "",
    formData?.thumbnailUrl ?? "",
    formData?.fileSize ?? "",
    formData?.fileUrl ?? "",
  ]);
  return ContentService.createTextOutput("Added into Sheets...!");
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

function doNiceUpdate(e) {
  try {
    const payload = JSON.parse(e.postData.contents); // Parse the JSON payload from the request
    doUpdate(payload); // Call the doUpdate function to update the sheet
    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doUpdate(payload) {
  const sheetURL = SpreadsheetApp.openByUrl(
    "https://docs.google.com/spreadsheets/d/1zZiCRmhPISpi2cA33KXpchf7_xAoL1q6-lcONrsRKmE/edit?gid=0#gid=0"
  );
  const sheet = sheetURL.getSheetByName("Sheet1");
  var json = payload;
  var row = json?.row;
  var data = json?.data;
  for (const [col, value] of Object.entries(data)) {
    sheet.getRange(row, parseInt(col)).setValue(value); // Ensure col is treated as an integer index
  }
  return ContentService.createTextOutput("Modified...!");
}

function doUpdate(payload) {
  const sheetURL = SpreadsheetApp.openByUrl(
    "https://docs.google.com/spreadsheets/d/1zZiCRmhPISpi2cA33KXpchf7_xAoL1q6-lcONrsRKmE/edit?gid=0#gid=0"
  );
  const sheet = sheetURL.getSheetByName("Sheet1");
  var json = payload;
  var row = json?.row;
  var data = json?.data;
  for (const [col, value] of Object.entries(data)) {
    sheet.getRange(row, col).setValue(value);
  }
}
