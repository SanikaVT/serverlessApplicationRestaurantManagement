export default function ChatMessage({currentUser, message}) {
    const { text, sentBy } = message;
    const messageClass = sentBy === currentUser.email ? "sent" : "received";

    return (
        <>
        <div className={`message ${messageClass}`}>
            <img
                alt=""
                src={
                    "https://api.adorable.io/avatars/23/abott@adorable.png"
                }
                />
            <p>{text}</p>
        </div>
        </>
    );
}
