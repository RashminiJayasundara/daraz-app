import React , {useContext, useState}from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import DropDown from './DropDown';
import { Store ,StoreContext} from '../storeProvider';
import useSignInPopup from '../customHooks/useSignInPopup';
import SignIn from '../Popup/SignIn';



export default function LayOutComponent() {
    const store:StoreContext = useContext(Store)
    const{state,dispatch}= store
    const [province, setProvince] = useState<string>(state.shippingAddress.province);
    const [language, setLanguage] = useState<string>(state.language);
    const [searchText, setSearchText] = useState("");
    const{isPopupOpen,openPopup,closePopup} = useSignInPopup();
    const[showSignMenu,setShowSignMenu] = useState<boolean>(false)
    const[showCategoryMenu,setShowCategoryMenu] = useState<boolean>(false);
    const cartItems =state.cartItems.length
    const navigate = useNavigate();
    const [isOpenLanShipBox, setisOpenLanShipBox] = useState<boolean>(false)
    const handleSearch =()=>{
      navigate('/searchResult',{state:searchText})
    }
    const languages=[
      {
        id:"EN",
        name:"English"
      },
      {
        id:'Si',
        name:"Sinhala"
      }
  ]
    const provinces = [
    {
      "id":"NP",
      "name":"North Province"
    },
    {
      "id":"NCP",
      "name":"North Central Province"
    },
    {
      "id":"SP",
      "name":"Sothern Province"
    },
    {
      "id":"WP",
      "name":"Western Province"
    }, 
    {
      "id":"EP",
      "name":"Eastern Province"
    },
    {
      "id":"CP",
      "name":"Central Province"
    },
    {
      "id":"NWP",
      "name":"North Western Province"
    },
    {
      "id":"UP",
      "name":"Uwa Province"
    },
    {
      "id":"SP",
      "name":"Sabaragamuwa Province"
    }
  ]
    const handleKeyDown = (event: { key: string; }) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };
    const handleLanguageSlect = (value:string)=>{
      setLanguage(value)
    }
const handleProvinceSelect = (value:string)=>{
  setProvince(value)  //should display province name
  dispatch({type:"SET_PROVINCE",payload:value})
}
  return (
    <div>
    <div className="headerContainer">
      <div className='row'>
      <h2 className='shopName'> Daraz </h2>
      <div className='menuContainer'
        onMouseEnter={() => setShowCategoryMenu(true)} // Show menu on hover
        onMouseLeave={() => setShowCategoryMenu(false)}>
      <i className="bi bi-list listIcon" 
         style={{ fontSize: '30px', cursor: 'pointer' }}
       ></i>
       {showCategoryMenu && <div className='menu'>
        <ul>
            <li>
                <div className='menuRow'>
                <i className="bi bi-camera"></i>
                <span>Electronics</span>
                </div>
            </li>
            <li>
                <div className='menuRow'>
                <i className="bi bi-controller"></i>
                <span>Toys and Games</span>
                </div>
            </li>
        </ul>
       </div>}
       </div>
      </div> 
      {/* search box */}
      <div className="searchBox"> 
        <div className='inputBox'>
        <input 
            id="search" 
            type="text" 
            placeholder="Search here..."   
            onKeyDown={handleKeyDown}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}>

        </input>
        </div>
        <button onClick={handleSearch} className='iconbutton'>
        <i className="bi bi-search" style={{ fontSize: '20px', cursor: 'pointer' }}></i>
        </button>
      </div>

      {/* shipping adress and language details */}
      <div>
      <div className='hidden column'>
        <div>{province}</div>
        <div className='row'>
            <div>{language}</div>
            <button onClick={()=>setisOpenLanShipBox(pre=>!pre)} className='iconbutton'>
                <i className="bi bi-caret-down-fill" style={{ fontSize: '20px', cursor: 'pointer' }}></i>
            </button>
        </div>
        {/*open the language and shipping address changing box*/}
        </div>
        {isOpenLanShipBox && 
        <div className='column menu'>
            <h3>Language</h3>
            <DropDown options={languages} onSelect={handleLanguageSlect}></DropDown>
            <h3>Ship To</h3>
            <label id='province'> Province</label>
            {/* <input type='text'></input> */}
            <DropDown options={ provinces} onSelect={handleProvinceSelect}></DropDown>
            <label id='district'> District</label>
            <input type='text'></input>
        </div>} 
        </div>
        {/* login details */}
        <div className='menuContainer'
        onMouseEnter={() => setShowSignMenu(true)} // Show menu on hover
        onMouseLeave={() => setShowSignMenu(false)}>
        <div className='row'>
        <i className="bi bi-person-fill" style={{ fontSize: '20px', cursor: 'pointer' }}></i>
        <div className="hidden column">
            <span>Welcome</span>
            <div>
                <span>Sign in/ Register</span>
                <i className="bi bi-caret-down-fill" style={{ fontSize: '20px', cursor: 'pointer' }}></i>
            </div>
        </div>
        </div>
        {showSignMenu && <div className='menu'>

            <div style={{width:"90%"}}>
                <button className='menuItemButton' onClick={openPopup} >Register</button>
                </div>

            <div style={{width:"90%"}}>
                <button className='menuItemButton' onClick={openPopup} style={{backgroundColor:"rgba(232, 233, 208)",color:"red"}}>Sign In</button>
                </div>
       </div>}
        </div>
       {/* cart details */}
        <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
        <button onClick={()=>{navigate("/cart")}} className='iconbutton'>
            <i className="bi bi-cart-fill" style={{ fontSize: '20px', cursor: 'pointer' }}></i>
        </button>
        <div className='hidden'>
            <span>cart {cartItems}</span>
        </div>
      </div>

    </div>
    {state.isPopupOpen && <SignIn onClose={closePopup} isOpen={isPopupOpen}></SignIn>}

    <main style={{opacity:state.isPopupOpen? "0.25" : "1"}}>
        <Outlet />
    </main>
    <footer className='footer'> 
      <div className='footerBox'>
      Intellectual Property Protection - Privacy Policy - Sitemap - Terms of Use - Information for EU consumers - Imprint - Transaction Services Agreement for non-EU/UK Consumers - Terms and Conditions for EU/EEA/UK Consumers - User Information Legal Enquiry Guide ©️2010-2024 AliExpress.com. All rights reserved
      </div>
    </footer>
    </div>
  )
}
