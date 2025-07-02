import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AttractionsPage from './pages/AttractionsPage';
import AttractionDetailsPage from './pages/AttractionDetailsPage';
import HotelsPage from './pages/HotelsPage';
import AddAttractionPage from './pages/AddAttractionPage';
import NotFoundPage from './pages/NotFoundPage';
import { AttractionProvider } from './context/AttractionContext';
import { LocationProvider } from './context/LocationContext';

function App() {
  return (
    <Router>
      <LocationProvider>
        <AttractionProvider>
          <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/attractions" element={<AttractionsPage />} />
                <Route path="/attractions/:id" element={<AttractionDetailsPage />} />
                <Route path="/hotels" element={<HotelsPage />} />
                <Route path="/add-attraction" element={<AddAttractionPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AttractionProvider>
      </LocationProvider>
    </Router>
  );
}

export default App;