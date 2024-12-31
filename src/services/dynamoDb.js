import dynamoDB from "../aws-config";

//funciton to insert data into dynamoDB
export const insertData = async (data) => {
  const params = {
    TableName: "ledger_details",
    Item: data,
  };
  try {
    await dynamoDB.put(params).promise();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
