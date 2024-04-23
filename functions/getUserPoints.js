exports = async function(_id) {
  try {
    // Access the MongoDB Realm user collection
    const users = context.services.get("mongodb-atlas").db("ProjectGeam").collection("UserData");
  
    // Find the user document by their unique identifier
    const user = await users.findOne({ _id: _id });
    
    if (!user) {
      // User document not found
      return { error: "User not found" };
    }
    
    // Extract and return the user points
    const points = user.points; // Assuming points is a field in the user document
    return points;
  } catch (error) {
    // Handle any errors that occur during the function execution
    console.error("Error retrieving user points:", error);
    return { error: "An error occurred while retrieving user points" };
  }
};

