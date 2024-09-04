import { CartIcon } from '../icons';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { amount } = useSelector((store) => store.cart);
  return (
    <>
      <nav>
        <div className='nav-center'>
          <h3>To Do list</h3>
          
        </div>
      </nav>
    </>
  );
};
export default Navbar;
