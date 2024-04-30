exports = async function(sender, selectedFriend, challenge) {
  const usersCollection = context.services.get("mongodb-atlas").db("ProjectGeam").collection("UserData");
  
  try {
    // Find the sender document by email
    const senderName = await usersCollection.findOne({ username: sender });
    if (!senderName) {
      return { error: "Sender not found" };
    }
    
    // Find the recipient document by email
    const recipient = await usersCollection.findOne({ username: selectedFriend });
    if (!recipient) {
      return { error: "Recipient not found" };
    }
    
    // Add the challenge to the recipient's inventory
    await usersCollection.updateOne(
      { username: selectedFriend },
      { $push: { recievedChallenges: challenge } }
    );
    
    // Remove the challenge from the sender's inventory
    await usersCollection.updateOne(
      { username: sender },
      { $pull: { inventory: challenge } }
    );
    
    return true ;
  } catch (error) {
    console.error("Error sending challenge:", error);
    return { error: "An error occurred while sending the challenge" };
  }
};
