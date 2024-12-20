import React , {useState}from 'react'
import { Outlet } from 'react-router-dom';

export default function LayOutComponent() {
    const [province, setProvince] = useState<string>("NC");
    const [language, setLanguage] = useState<string>("EN");
    const [searchText, setSearchText] = useState("");
    const[showCategoryMenu,setShowCategoryMenu] = useState<boolean>(false);
    const cartItems =0
    const [isOpenLanShipBox, setisOpenLanShipBox] = useState<boolean>(false)
    const handleSearch = () => {
      console.log("Searching for:", searchText);
      // Add your search logic here
    };
  
    const handleKeyDown = (event: { key: string; }) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };

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
                <div className='row'>
                <i className="bi bi-camera"></i>
                <span>Electronics</span>
                </div>
            </li>
            <li>
                <div className='row'>
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
        <button onClick={handleSearch}>
        <i className="bi bi-search" style={{ fontSize: '20px', cursor: 'pointer' }}></i>
        </button>
      </div>

      {/* shipping adress and language details */}
      <div>
      <div className='hidden column'>
        <div>{province}</div>
        <div className='row'>
            <div>{language}</div>
            <button onClick={()=>setisOpenLanShipBox(pre=>!pre)}>
                <i className="bi bi-caret-down-fill" style={{ fontSize: '20px', cursor: 'pointer' }}></i>
            </button>
        </div>
        {/*open the language and shipping address changing box*/}
        </div>
        {isOpenLanShipBox && 
        <div className='column menu'>
            <h3>Ship To</h3>
            <label id='province'> Province</label>
            <input type='text'></input>
            <label id='district'> District</label>
            <input type='text'></input>
        </div>} 
        </div>
        {/* login details */}
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
       {/* cart details */}
        <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
        <button onClick={()=>{}}>
            <i className="bi bi-cart-fill" style={{ fontSize: '20px', cursor: 'pointer' }}></i>
        </button>
        <div className='hidden'>
            <span>cart {cartItems}</span>
        </div>
      </div>

    </div>
    
    <main>
        <Outlet />
    </main>
    <footer> This is footer</footer>
    </div>
  )
}
