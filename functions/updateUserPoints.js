exports = async function(packCost) {
  const users = context.services.get("mongodb-atlas").db("ProjectGeam").collection("UserData");
  const packs = context.services.get("mongodb-atlas").db("ProjectGeam").collection("packData");
  const currentuser=context.user;

  try {
    const user = await users.findOne({ username: currentuser.data.email });

    // Check if the user has enough points to purchase the pack
    if (user.points >= packCost) {
      // Deduct the cost of the pack from the user's points balance
      const newPoints = user.points - packCost;

      // Update the user document with the new points
      const result = await users.updateOne({ _id: userId }, { $set: { points: newPoints } });

      if (result.modifiedCount === 1) {
        // Indicates successful update
        return true;
      } else {
        // Indicates failure to update
        return { error: "Failed to update user points" };
      }
    } else {
      // Insufficient points to purchase the pack
      return { error: "Insufficient points" };
    }
  } catch (error) {
    console.error("Error updating user points:", error);
    return { error: "An error occurred while updating user points" };
  }
}

