exports= function({query, headers,body},response){
  const DB_Data= context.services.get("mongodb-atlas").db("ProjectGeam").collection("UserData").find({});
  
  return DB_Data;
};