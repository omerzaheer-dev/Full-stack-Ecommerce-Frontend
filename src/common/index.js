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
        url: `${backendDomain}/api/v1/product//get-categoryProduct`,
        method: "GET"
    },
}
export default summaryApi