import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/home-page.jsx";
import ProductByBrand from "./pages/product-by-brand.jsx";
import ProductByCategory from "./pages/product-by-category.jsx";
import ProductByKeyword from "./pages/product-by-keyword.jsx";
import ProductDetails from "./pages/product-details.jsx";
import AboutPage from "./pages/about-page.jsx";
import RefundPage from "./pages/refund-page.jsx";
import PrivacyPage from "./pages/privacy-page.jsx";
import TermsPage from "./pages/terms-page.jsx";
import HowToBuyPage from "./pages/how-to-buy-page.jsx";
import ContactPage from "./pages/contact-page.jsx";
import ComplainPage from "./pages/complain-page.jsx";
import LoginPage from "./pages/login-page.jsx";
import OtpPage from "./pages/otp-page.jsx";
import ProfilePage from "./pages/profile-page.jsx";
import CartPage from "./pages/cart-page.jsx";
import InvoicePage from "./pages/invoice-page.jsx";
import WishPage from './pages/Wish-Page.jsx';
const App = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/by-brand/:id" element={<ProductByBrand/>}/>
                <Route path="/by-category/:id" element={<ProductByCategory/>}/>
                <Route path="/by-keyword/:keyword" element={<ProductByKeyword/>}/>
                <Route path="/details/:id" element={<ProductDetails/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/refund" element={<RefundPage/>}/>
                <Route path="/privacy" element={<PrivacyPage/>}/>
                <Route path="/terms" element={<TermsPage/>}/>
                <Route path="/how-to-buy" element={<HowToBuyPage/>}/>
                <Route path="/contact" element={<ContactPage/>}/>
                <Route path="/complain" element={<ComplainPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/otp" element={<OtpPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/invoices" element={<InvoicePage/>}/>
                <Route path="/wish" element={<WishPage/>}/>

            </Routes>
        </BrowserRouter>
    );
};
export default App;