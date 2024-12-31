// //funciton to insert data into dynamoDB
// export const insertData = async (data) => {
//   const params = {
//     TableName: "ledger_details",
//     Item: data,
//   };
//   try {
//     await dynamoDB.put(params).promise();
//     return true;
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// };

import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";

// Configure AWS SDK with your region and credentials

export const getAllItems = async () => {
  const client = new DynamoDBClient({
    region: "eu-north-1",
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    },
  });

  let allItems = [];
  let lastEvaluatedKey = null;

  do {
    const params = {
      TableName: "ledger_details", // Replace with your DynamoDB table name
      ExclusiveStartKey: lastEvaluatedKey, // For pagination
    };

    try {
      const data = await client.send(new ScanCommand(params));
      allItems = allItems.concat(data.Items); // Concatenate new items to the existing array
      lastEvaluatedKey = data.LastEvaluatedKey; // Check if there's more data to fetch
    } catch (error) {
      console.error("Error fetching items:", error);
      break;
    }
  } while (lastEvaluatedKey); // Repeat until all items are fetched

  console.log("All items fetched:", allItems);
  return allItems;
};

getAllItems();
