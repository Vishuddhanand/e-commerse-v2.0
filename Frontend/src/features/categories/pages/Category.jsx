import React from 'react'
import { useParams, Link } from 'react-router-dom'
import products from '../../../data/product'
import Navbar from '../../home/components/Navbar'
import '../../home/styles/products.css'

const CategoryPage = () => {
  const { categoryName } = useParams()

  const filteredProducts = products.filter(
    (product) => product.category === categoryName
  )

  const categoryTitles = {
    "two-wheeler-parts": "Two Wheeler Parts",
    "rubber-bushes": "Rubber Bushes",
    "petrol-pipes": "Petrol Pipes",
    "brake-clutch": "Brake & Clutch Parts"
  };

  console.log("Filtered Products for category:", categoryName, filteredProducts)


  return (
    <>
      <Navbar />

      <section className="products">
        <div className="section-header">
          <h2>{categoryTitles[categoryName] || "Category"}</h2>
          <div className="header-underline"></div>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <Link
              to={`/order?product=${product.id}`}
              className="product-card"
              key={product.id}
            >
              <div className="product-img">
                <img src={product.img} alt={product.name} />
              </div>

              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <span className="price">₹{product.price}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default CategoryPage