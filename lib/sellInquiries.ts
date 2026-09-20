import { collection, addDoc, getDocs, updateDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import { SellInquiry } from "./types";

const COLLECTION = "sellInquiries";

export async function submitSellInquiry(data: Omit<SellInquiry, "id" | "status" | "createdAt">) {
  await addDoc(collection(db, COLLECTION), {
    ...data,
    status: "new",
    createdAt: new Date().toISOString(),
  });
}

export async function getSellInquiries(): Promise<SellInquiry[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as SellInquiry));
}

export async function updateSellInquiryStatus(id: string, status: SellInquiry["status"]) {
  await updateDoc(doc(db, COLLECTION, id), { status });
}
