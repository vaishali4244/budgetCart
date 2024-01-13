
import { useEffect, useState } from "react";
import SearchBar from "../components/searchBar";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from "axios";
import './homepage.css';


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
        setIsFilterApplied(true);
    };

    // Reset filter
    const resetFilter = () => {
        setData(resetData);
        setIsFilterApplied(false);
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

                <div className="price-section">
                    <label>
                        Price range:
                        <input
                            type="number"
                            value={minPrice}
                            step={50}
                            min={0}
                            onChange={(e) => setMinPrice(e?.target?.value)}
                            placeholder={0}
                        />
                    </label>
                    <label>
                        to
                        <input
                            type="number"
                            value={maxPrice}
                            min={parseInt(minPrice) + parseInt(100)}
                            step={50}
                            onChange={(e) => setMaxPrice(e?.target?.value)}
                            placeholder={3000}
                        />
                    </label>
                    <button onClick={handleFilterByPrice} disabled={isFilterApplied}>Apply</button>
                    <button onClick={resetFilter}>Reset value</button>
                </div>
                <div className="product">

                    {data?.map((item, index) => {
                        return (
                            <div className="product-box"
                            >
                                <LazyLoadImage className="product-img" src={item?.thumbnail} alt="" />
                                <span className="rating">{item?.rating} <LazyLoadImage src={require("../assets/images/star.png")} alt="" /> </span>
                                <h3>{item?.title}</h3>

                                <p className="product-price">&#8377;{item?.price} <span>({item?.discountPercentage
                                }% off)</span></p>

                                <button onClick={() => { handleAddToCart(item) }}>Add to cart</button>
                            </div>
                        )
                    })}
                </div>

            </section>
        </div>
    )
}

export default Homepage;