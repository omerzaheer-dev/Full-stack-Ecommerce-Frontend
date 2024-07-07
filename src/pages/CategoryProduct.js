import React from 'react'
import { useParams } from "react-router-dom"
const CategoryProduct = () => {
    const params = useParams()
    const { categoryName } = params
  return (
    <div>
      {categoryName}
    </div>
  )
}

export default CategoryProduct
