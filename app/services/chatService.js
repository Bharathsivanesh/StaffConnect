import {
  collection,
  addDoc,
  doc,
  setDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../Firebaseconfig/Firebase";

/* Generate chatId */
export const getChatId = (studentId, staffId) => {
  return `${studentId}_${staffId}`;
};

/* Create chat document */
export const createOrUpdateChat = async ({
  chatId,
  studentId,
  staffId,
  lastMessage,
}) => {
  await setDoc(
    doc(db, "chats", chatId),
    {
      studentId,
      staffId,
      lastMessage,
      lastMessageTime: serverTimestamp(),
    },
    { merge: true }
  );
};

/* Send message */
export const sendMessage = async ({
  chatId,
  text,
  senderId,
  senderRole,
}) => {
  const messagesRef = collection(db, "chats", chatId, "messages");

  await addDoc(messagesRef, {
    text,
    senderId,
    senderRole,
    timestamp: serverTimestamp(),
  });
};

/* Listen messages (real-time) */
export const listenToMessages = (chatId, callback) => {
  const messagesRef = collection(db, "chats", chatId, "messages");

  const q = query(messagesRef, orderBy("timestamp", "asc"));

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(messages);
  });
};
