// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../Firebaseconfig/Firebase";

// // Fetch all staff details from Firestore
// export const fetchStaffDetails = async () => {
//   try {
//     const snapshot = await getDocs(collection(db, "staff_details"));

//     const staffList = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     return staffList;
//   } catch (error) {
//     console.error("❌ Error fetching staff details:", error);
//     return [];
//   }
// };

// export const fetchCoursesByStaff = async (staffUid) => {
//   try {
//     const q = query(
//       collection(db, "courses_list"),
//       where("UID", "==", staffUid)
//     );
//     const snapshot = await getDocs(q);

//     const courses = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     return courses;
//   } catch (error) {
//     console.error("❌ Error fetching courses:", error);
//     return [];
//   }
// };
import firestore from "@react-native-firebase/firestore";

/* Fetch all staff details */
export const fetchStaffDetails = async () => {
  try {
    const snapshot = await firestore().collection("staff_details").get();

    const staffList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return staffList;
  } catch (error) {
    console.error("❌ Error fetching staff details:", error);
    return [];
  }
};

/* Fetch courses by staff UID */
export const fetchCoursesByStaff = async (staffUid) => {
  try {
    const snapshot = await firestore()
      .collection("courses_list")
      .where("UID", "==", staffUid)
      .get();

    const courses = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return courses;
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    return [];
  }
};
