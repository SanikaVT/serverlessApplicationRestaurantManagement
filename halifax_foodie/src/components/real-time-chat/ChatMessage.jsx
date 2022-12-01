export default function ChatMessage({currentUser, message}) {
    const { text, sentBy } = message;
    let messageClass = ''
    if(sentBy === 'restaurant') {
        messageClass = currentUser.role?.toLowerCase() === 'owner'  ? "sent" : "received";
    } else {
        messageClass = sentBy === currentUser.email ? "sent" : "received";
    }

    return (
        <>
        <div className={`message ${messageClass}`}>
            <p>{text}</p>
        </div>
        </>
    );
}
