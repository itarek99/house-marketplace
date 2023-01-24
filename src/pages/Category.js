import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase.config';

const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  console.log(params.categoryName);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, 'listing');
        const q = query(listingsRef, where('type', '==', params.categoryName), orderBy('timestamp', 'desc'), limit(10));
        const querySnap = await getDocs(q);
        let listings = [];

        querySnap.forEach((doc) => {
          console.log(doc);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchListings();
  }, [params]);

  return <div>Category</div>;
};
export default Category;
