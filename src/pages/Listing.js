import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase/firebase.config';

import shareIcon from '../assets/svg/shareIcon.svg';

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLink, setShareLink] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listing', params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      <div className='shareIconDiv'>
        <img src={shareIcon} alt='' />
      </div>
    </main>
  );
};
export default Listing;
