exports = async function(email, newPoints) {
  const users = context.services.get("mongodb-atlas").db("ProjectGeam").collection("UserData");

  try {
    // Update the user document with the new points
    const result = await users.updateOne({ username: email }, { $set: { points: newPoints } });

    // Check if the update operation was successful
    if (result.modifiedCount === 1) {
      // Indicates successful update
      return true;
    } else {
      // Indicates failure to update
      return { error: "Failed to update user points" };
    }
  } catch (error) {
    console.error("Error updating user points:", error);
    return { error: "An error occurred while updating user points" };
  }
};

