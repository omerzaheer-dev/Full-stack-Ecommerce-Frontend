const backendDomain = "http://localhost:8080"
const summaryApi = {
    signUp:{
        url: `${backendDomain}/api/v1/users/register`,
        method: "POST"
    },
    signIn:{
        url: `${backendDomain}/api/v1/users/login`,
        method: "POST"
    },
    currentUser:{
        url: `${backendDomain}/api/v1/users/userdetails`,
        method: "GET"
    },
    logoutUser:{
        url: `${backendDomain}/api/v1/users/logout`,
        method: "GET"
    },
    allUsers:{
        url: `${backendDomain}/api/v1/admin/all-users`,
        method: "GET"
    },
    updateUserRole:{
        url: `${backendDomain}/api/v1/admin/update-user-role`,
        method: "PATCH"
    },
    uploadProduct:{
        url: `${backendDomain}/api/v1/product/upload-products`,
        method: "POST"
    },
    updateProduct:{
        url: `${backendDomain}/api/v1/product/update-products`,
        method: "PATCH"
    },
    getAllProducts:{
        url: `${backendDomain}/api/v1/product/get-all-products`,
        method: "GET"
    },
    getCategoryProduct:{
        url: `${backendDomain}/api/v1/product/get-categoryProduct`,
        method: "GET"
    },
    getOneCategoryProduct:{
        url: `${backendDomain}/api/v1/product/get-one-categoryProduct`,
        method: "POST"
    },
    getProductDetail:{
        url: `${backendDomain}/api/v1/product/get-productDetails`,
        method: "POST"
    },
    addToCartProduct:{
        url: `${backendDomain}/api/v1/cart/add-toCart`,
        method: "POST"
    },
    productsInCart:{
        url: `${backendDomain}/api/v1/cart/get-cart-products`,
        method: "GET"
    },
    viewCartProducts:{
        url: `${backendDomain}/api/v1/cart/view-cart-products`,
        method: "GET"
    },
    updateAddToCartProducts:{
        url: `${backendDomain}/api/v1/cart/update-addToCart`,
        method: "PATCH"
    },
    searchProducts:{
        url: `${backendDomain}/api/v1/product/search-products`,
        method: "GET"
    },
    filterProducts:{
        url: `${backendDomain}/api/v1/product/filter-products`,
        method: "POST"
    }
}
export default summaryApi