import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect, useState} from 'react';
import {ProductList} from "./components/ProductList";
import {Summary} from "./components/Summary";
import axios from "axios";
import swal from 'sweetalert';

function App() {
    const [products, setProducts] = useState([
        {productId: 'uuid-1', productName: '콜롬비아 커피 1', category: '커피빈', price: 5000},
        {productId: 'uuid-2', productName: '콜롬비아 커피 2', category: '커피빈', price: 5000},
        {productId: 'uuid-3', productName: '콜롬비아 커피 3', category: '커피빈', price: 5000},
    ]);

    const [fixProducts, setFixProducts] = useState([
        axios.get('http://localhost:7456/api/v1/products')
            .then(v => setFixProducts(v.data))
        ]
    );


    const [items, setItems] = useState([]);
    const handleAddClicked = productId => {
        const product = products.find(v => v.productId === productId);
        const found = items.find(v => v.productId === productId);
        const updatedItems =
            found ? items.map(v => (v.productId === productId) ? {...v, count: v.count + 1} : v) : [...items, {
                ...product,
                count: 1
            }]
        setItems(updatedItems);
    }



    useEffect(() => {
        axios.get('http://localhost:7456/api/v1/products')
            .then(v => setProducts(v.data));
    }, [])

    const handleOrderSubmit = (order) => {
        if (items.length === 0) {
            swal('주문 실패!',"주문하실 상품을 추가해 주세요!",'warning');
        } else {
            axios.post('http://localhost:7456/api/v1/orders', {
                email: order.email,
                address: order.address,
                postcode: order.postcode,
                orderItems: items.map(v => ({
                    productId: v.productId,
                    category: v.category,
                    price: v.price,
                    quantity: v.count
                }))
            }).then(
                v => {
                    swal({
                        title : ("주문이 완료되었습니다!"),
                        icon  : "success",
                        closeOnClickOutside : false
                    }).then(function(){
                        window.location.reload();
                    });
                },
                e => {
                    swal('주문 실패!',"올바른 입력값이 아닙니다!\n 다시 확인한 후 주문해주세요!",'warning');
                    console.error(e);
                })
        }

    }

    const handleAllClicked = () => {
        setProducts(fixProducts);
    }

    const handleBeanClicked = () => {
        const beanProducts = fixProducts.filter(v => v.category === 'COFFEE_BEAN_PACKAGE');
        setProducts(beanProducts);
    }

    const handleTeaClicked = () => {
        const beanProducts = fixProducts.filter(v => v.category === 'TEA');
        setProducts(beanProducts);
    }

    const handleMDClicked = () => {
        const beanProducts = fixProducts.filter(v => v.category === 'MD');
        setProducts(beanProducts);
    }

    const handleDripBagClicked = () => {
        const beanProducts = fixProducts.filter(v => v.category === 'DRIP_BAG');
        setProducts(beanProducts);
    }

    return (

        <div className="container-fluid">
            <div className="row justify-content-center m-4" >
                <h1 id = "font" className="text-center">너는 지금 커피가 먹고 싶다.</h1>
            </div>
            <div className="card">
                <div className="row">
                    <div className="col-md-8 mt-4 d-flex flex-column align-items-start p-3 pt-0">
                        <h5 className="mx-2">Category</h5>
                        <div>
                            <button onClick={handleAllClicked} className = "mx-2">All</button>
                            <button onClick={handleBeanClicked} className = "mx-2">Coffee Bean</button>
                            <button onClick={handleDripBagClicked} className = "mx-2">Drip Bag</button>
                            <button onClick={handleTeaClicked} className = "mx-2">Tea</button>
                            <button onClick={handleMDClicked} className = "mx-2">MD</button>
                        </div>

                        <hr />
                        <ProductList products={products} onAddClick={handleAddClicked}/>
                    </div>
                    <div className="col-md-4 summary p-4">
                        <Summary items={items} onOrderSubmit={handleOrderSubmit}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
