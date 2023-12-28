
import { useEffect, useState } from "react";
import SearchBar from "../components/searchBar";
import axios from "axios";
import './homepage.css'




const Homepage = () => {

    const [data, setData] = useState([]);
    const [price, setPrice] = useState(0)
    const [productCount, setProductCount] = useState(0)
    const [search, setSearch] = useState("")
    const [minPrice, setMinPrice] = useState(""); // new state for minimum price filter
    const [maxPrice, setMaxPrice] = useState(""); // new state for maximum price filter
    const [resetData, setResetData] = useState([]);
    const [isFilterApplied, setIsFilterApplied] = useState(false);


    useEffect(() => {
        axios.get(`https://dummyjson.com/products`)
            .then(res => {
                if (search?.length === 0) {
                    setData(res?.data?.products)
                    setResetData(res?.data?.products);
                    console.log("all data", res?.data?.products);
                } else {
                    const filteredData = res?.data?.products.filter((item) => {
                        return (
                            item?.title?.toLowerCase()?.includes(search?.toLowerCase())
                        )
                    })
                    console.log(filteredData, "filtered title");
                    setData(filteredData);
                }
            }).catch(err => console.log("error", err));
    }, [search])


    const handleAddToCart = (item) => {

        // Calculate the total amount by adding the price of the selected item
        const totalAmount = parseFloat(price) + parseFloat(item.price);
        setPrice(totalAmount.toFixed(0));
        console.log('Total Sum:', totalAmount);
        // Increment the product count every time the "Add to cart" button is clicked
        setProductCount((prevCount) => prevCount + 1);
    };


    const handleFilterByPrice = () => {
        // Filter initial data based on price range
        const filteredData = data.filter((item) => {
            const itemPrice = parseFloat(item.price);
            const min = minPrice !== "" ? parseFloat(minPrice) : Number.MIN_SAFE_INTEGER;
            const max = maxPrice !== "" ? parseFloat(maxPrice) : Number.MAX_SAFE_INTEGER;

            return itemPrice >= min && itemPrice <= max;
        });

        setData(filteredData);
        setIsFilterApplied(true); // Set the filter applied flag to true
    };

    // Reset filter
    const resetFilter = () => {
        setData(resetData);
        // console.log("setdata", setData)
        setIsFilterApplied(false); // Reset the filter applied flag to false
        setMinPrice("");
        setMaxPrice("");
    };
    
    
    return (
        <div>
            <nav className="navbar">
            <h2>Create your Shopping List now !</h2>
                <div className="cart-box">
                    <div className="cart-img">
                        <img src={require("../assets/images/shoppingCart.png")} alt="" className="cart-icon" />

                    </div>
                    <p className="cart-count" style={{}}>{productCount}</p>
                    <p className="cart-amount">=  <span>&#8377;</span>{price}</p>
                </div>
            </nav>
            <section className="content-section">

            <SearchBar search={search} setSearch={setSearch} />
            
            <div>
                <label>
                    Min Price:
                    <input
                        type="number"
                        value={minPrice}
                        step={50}
                        min={0}
                        onChange={(e) => setMinPrice(e?.target?.value)}
                    />
                </label>
                <label>
                    Max Price:
                    <input
                        type="number"
                        value={maxPrice}
                        min={parseInt(minPrice) + parseInt(100)}
                        step={50}
                        onChange={(e) => setMaxPrice(e?.target?.value)}
                        />
                </label>
                <button onClick={handleFilterByPrice} disabled={isFilterApplied}>Apply Filter</button>
                <button onClick={resetFilter}>Reset Filter</button>
            </div>
            
            {data?.map((item, index) => {
                return (
                    <div style={{ border: "1px solid green" }}>
                        <p>Title:{item?.title}</p>
                        <p>rating:{item?.rating}
                        </p>
                        <img src={item?.thumbnail} alt="" />
                        
                        <p>Price:{item?.price} <span>Discount:{item?.discountPercentage
}% off</span></p>
                        
                        <button onClick={() => { handleAddToCart(item) }}>Add to cart</button>
                    </div>
                )
            })}
            
                        </section>
        </div>
    )
}

export default Homepage;