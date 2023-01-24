import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg';
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg';
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg';

const Navbar = () => {
  const location = useLocation();
  const activeRoute = (route) => {
    if (route === location.pathname) return true;
  };

  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          <Link to='/'>
            <li className='navbarListItem'>
              <ExploreIcon fill={activeRoute('/') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
              <p className={activeRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Explore</p>
            </li>
          </Link>
          <Link to='offers'>
            <li className='navbarListItem'>
              <OfferIcon fill={activeRoute('/offers') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
              <p className={activeRoute('/offers') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Offers</p>
            </li>
          </Link>
          <Link to='profile'>
            <li className='navbarListItem'>
              <PersonOutlineIcon fill={activeRoute('/profile') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
              <p className={activeRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Profile</p>
            </li>
          </Link>
        </ul>
      </nav>
    </footer>
  );
};
export default Navbar;
