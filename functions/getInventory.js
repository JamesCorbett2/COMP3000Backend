exports = async function(email) {
  const users = context.services.get("mongodb-atlas").db("ProjectGeam").collection("UserData");

  try {
    // Fetch the user document based on the email
    const user = await users.findOne({ username: email });

    // Check if the user document exists
    if (!user) {
      console.error("User not found");
      return { error: "User not found" };
    }

    console.log("User inventory:", user.inventory); // Log inventory data

    return user.inventory;
  } catch (error) {
    console.error("Error retrieving user inventory:", error);
    return { error: "An error occurred while retrieving user inventory" };
  }
};

