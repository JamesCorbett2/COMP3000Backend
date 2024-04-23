exports = async function saveuser(username, points) {
  try {
    // Access the MongoDB Atlas service
    const mongodb = context.services.get("mongodb-atlas");
    const usersCollection = mongodb.db("ProjectGeam").collection("UserData");

    // Insert the new user document into the MongoDB collection
    await usersCollection.insertOne({
      username: username,
      points: points  // Add the points field to the user document
    });

    // Return a success message
    return { success: true, message: "User registration successful" };
  } catch (error) {
    // Handle any errors and return an error message
    console.error("Error registering user:", error);
    return { success: false, message: "User registration failed" };
  }
};
