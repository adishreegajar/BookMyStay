import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './components/HomePage'
import Rooms from './components/Rooms'
import BookingConfirmation from './components/BookingConfirmation'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'
import Book from './components/Book'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function Root(){
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<Book />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="*" element={<div className="p-8 text-center"><h1 className="text-4xl font-bold">404 - Page Not Found</h1></div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
