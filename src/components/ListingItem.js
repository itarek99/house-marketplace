import { Link } from 'react-router-dom';
import bathtubIcon from '../assets/svg/bathtubIcon.svg';
import bedIcon from '../assets/svg/bedIcon.svg';
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg';

const ListingItem = ({ listing, id, handleDelete }) => {
  console.log(listing);
  return (
    <li className='categoryListing'>
      <Link className='categoryListingLink' to={`/category/${listing.type}/${id}`}>
        <img className='categoryListingImg' src={listing.imagesUrls[0]} alt={listing.name} />
        <div className='categoryListingDetails'>
          <p className='categoryListingLocation'>{listing.location}</p>
          <p className='categoryListingName'>{listing.name}</p>
          <p className='categoryListingPrice'>
            ${listing.offer ? listing.discountedPrice : listing.regularPrice} {listing.type === 'rent' && ' / Month'}
          </p>

          <div className='categoryListingInfoDiv'>
            <img src={bedIcon} alt='bed' />
            <p className='categoryListingInfoText'>
              {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : `${listing.bedrooms} Bedroom`}
            </p>
            <img src={bathtubIcon} alt='bath' />
            <p className='categoryListingInfoText'>
              {listing.bedrooms > 1 ? `${listing.bedrooms} Bathrooms` : `${listing.bedrooms} Bathroom`}
            </p>
          </div>
        </div>
      </Link>
      {handleDelete && (
        <DeleteIcon
          className='removeIcon'
          fill='rgb(231, 76,60'
          onClick={() => handleDelete(listing.id, listing.name)}
        />
      )}
    </li>
  );
};
export default ListingItem;
