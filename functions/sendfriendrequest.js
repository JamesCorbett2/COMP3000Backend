exports = async function sendfriendrequest(username) {
    const currentUser = context.user;
    if (!currentUser) {
        return { success: false, message: "User not authenticated" };
    }
    
    const usersCollection = context.services.get("mongodb-atlas").db("ProjectGeam").collection("UserData");
    const recipient = await usersCollection.findOne({ username: username });
    if (!recipient) {
        return { success: false, message: "Recipient not found" };
    }

    const friendRequestsCollection = context.services.get("mongodb-atlas").db("ProjectGeam").collection("FriendRequests");
    await friendRequestsCollection.insertOne({
        senderId: currentUser.data.email,
        recipientId: recipient.username,
        status: "pending"
    });

    return { success: true, message: "Friend request sent successfully" };
};
