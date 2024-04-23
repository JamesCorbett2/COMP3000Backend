exports = async function(currentuser) {
  try {
    // Access the MongoDB Atlas service
    const mongodb = context.services.get("mongodb-atlas");
    const usersCollection = mongodb.db("ProjectGeam").collection("UserData");
    const currentuser=context.user
    // Extract the email from the current user object
    const userEmail = currentuser.data.email;
    
    // Find the user document by email
    const user = await usersCollection.findOne({ username: userEmail });
    
    if (!user) {
      return { success: false, message: "User not found" };
    }
    
    const userDoc={ user: user };
    return userDoc; // Include a success flag
  } catch (error) {
    // Handle any errors and return an error message
    console.error("Error retrieving user document:", error);
    // Instead of returning an EJSON string, return an object
    return { success: false, message: "Failed to retrieve user document" };
  }
};

