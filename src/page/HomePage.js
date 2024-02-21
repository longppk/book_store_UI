import React from 'react';
import Layout from '../layout/Layout';
import HomeBanner from '../module/home/HomeBanner';
import BookCategory from '../books/BookCategory';
import Footer from '../layout/Footer';


const HomePage = () => {
    return (
        <div>
            <Layout>
                <HomeBanner></HomeBanner>
                <BookCategory></BookCategory>
                <Footer></Footer>
            </Layout>
        </div>
    );
};

export default HomePage;