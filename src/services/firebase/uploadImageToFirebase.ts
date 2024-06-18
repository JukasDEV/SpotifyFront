import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/services/firebase/firebaseConfig';

//@ts-ignore
export const uploadImageToFirebase = async (file) => {
  if (!file) return;

  // Cria uma referência no Firebase Storage
  const storageRef = ref(storage, `imagens/${file.name}`);

  // Faz o upload do arquivo
  await uploadBytes(storageRef, file)

  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};


//@ts-ignore
export const uploadResumeToFirebase = async (file) => {
  if (!file) return;

  // Cria uma referência no Firebase Storage
  const storageRef = ref(storage, `curriculos/${file.name}`);

  // Faz o upload do arquivo
  await uploadBytes(storageRef, file)

  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}



//@ts-ignore
export const uploadCustomerResumeToFirebase = async (file, customerName) => {
  if (!file) return;

  const now = new Date();
  const formattedDate = now.toISOString().replace(/:/g, '-').split('.')[0];

  const storageRef = ref(storage, `customers_resumes/${customerName}-${formattedDate}`);


  await uploadBytes(storageRef, file)

  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}