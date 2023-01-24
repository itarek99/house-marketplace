import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { db } from '../firebase/firebase.config';

const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, 'listing');
        const q = query(listingsRef, where('type', '==', params.categoryName), orderBy('timestamp', 'desc'), limit(10));
        const querySnap = await getDocs(q);
        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error('Could Not Fetch Data!');
      }
    };

    fetchListings();
  }, [params]);

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>{params.categoryName === 'rent' ? 'Places For Rent' : 'Places For Sell'}</p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listings.map((listing) => (
                <h3>{listing.data.name}</h3>
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No Listing For {params.categoryName}</p>
      )}
    </div>
  );
};
export default Category;
