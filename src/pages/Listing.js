import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { db } from '../firebase/firebase.config';

import { useContext } from 'react';
import shareIcon from '../assets/svg/shareIcon.svg';
import Spinner from '../components/Spinner';

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const { user, authLoading } = useContext(AuthContext);
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

  console.log(listing);

  if (loading || authLoading) return <Spinner />;

  return (
    <main>
      <div
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
        className='shareIconDiv'
      >
        <img src={shareIcon} alt='share icon' />
      </div>
      {shareLinkCopied && <p className='linkCopied'>Link Copied</p>}

      <div className='listingDetails'>
        <p className='listingName'>
          {listing.name} - {listing.offer ? listing.discountedPrice : listing.regularPrice}
        </p>
        <p className='listingLocation'>{listing.location}</p>
        <p className='listingType'>For {listing.type === 'rent' ? 'Rent' : 'Sale'}</p>
        {listing.offer && <p className='discountPrice'>${listing.regularPrice - listing.discountedPrice}</p>}

        <ul className='listingDetailsList'>
          <li>{listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : `1 Bedroom`}</li>
          <li>{listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : `1 Bathroom`}</li>
          <li>{listing.parking && `Parking Spot`}</li>
          <li>{listing.furnished && `Furnished`}</li>
        </ul>

        <p className='listingLocationTitle'>Location</p>

        {user?.uid !== listing.userRef && (
          <Link
            to={`contact/${listing.userRef}?listingName=${listing.name}&listingLocation=${listing.location}`}
            className='primaryButton'
          >
            Contact Landlord
          </Link>
        )}
      </div>
    </main>
  );
};
export default Listing;
