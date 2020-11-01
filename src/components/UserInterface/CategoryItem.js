import React from 'react'

const CategoryItem = ({category}) => {
    const roundedWeight = Math.round(category.sum * 100) / 100
    return (
        <div>
             {category.title+"  "+ roundedWeight}
        </div>
    )
}

export default CategoryItem
