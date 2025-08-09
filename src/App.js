import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import CategoryList from "./components/CategoryList";
import CategoryPage from "./components/CategoryPage";
import BookingPage from "./components/BookingPage";
import AllProductsPage from "./components/AllProductsPage";
import ProfilePage from "./components/ProfilePage";
import SearchResultsPage from "./components/SearchResultsPage";
import PaymentPage from "./components/PaymentPage";
// Images
import cleaning from "./components/resources/clean.jpg";
import repair from "./components/resources/repair.jpg";
import homeimprovement from "./components/resources/improvement.jpg";
import outdoorgarden from "./components/resources/garden.jpg";
import homeinstallation from "./components/resources/installation.jpg";
import homemovingpacking from "./components/resources/moving.jpg";
import homestaff from "./components/resources/staff.jpg";
import homedryclean from "./components/resources/dryclean.jpg";
import homesecurity from "./components/resources/security.jpg";


// Importing services images
import homedeepclean from "./components/resources/deepclean.jpg";
import homesofaclean from "./components/resources/sofaclean.jpg";
import homekitchenclean from "./components/resources/kitchenclean.jpg";
import homebathroomclean from "./components/resources/bathroomclean.jpg";
import homewatertankclean from "./components/resources/watertankclean.jpg";
import homepestclean from "./components/resources/pestClean.jpg";
import homefurnitureclean from "./components/resources/pestClean.jpg";
// Repair and Services
import homeacrepair from "./components/resources/AC.jpg";
import homeplumbingrepair from "./components/resources/plumbing.jpg";
import homeelectricalrepair from "./components/resources/electrical.jpg"
import homeappliancerepair from "./components/resources/Appliance.jpg"
import homecarpentary from "./components/resources/Carpentary.jpg"
import homewaterpurifier from "./components/resources/waterPurifier.jpg"
import homeinverter from "./components/resources/inventor.jpg"
import homepainting from "./components/resources/Carpentary.jpg"
import homeflooring from "./components/resources/flooring.jpg"
import homeceiling from "./components/resources/falseceiling.jpg"
import homewallrepair from "./components/resources/painting.jpg"
import homemodularkitchen from "./components/resources/kitchensetup.jpg"
import homelawnmaintenance from "./components/resources/lawn.jpg"
import homelandscaping from "./components/resources/landscaping.jpg"
import hometreetrimming from "./components/resources/treetriming.jpg"
import homeoutdoorlighting from "./components/resources/outdoorlight.jpg"
import homeacinstallation from "./components/resources/AC.jpg"
import hometvmounting from "./components/resources/tvmounting.jpg"
import homewashingmachine from "./components/resources/washingmachine.jpg"
import homesmarthomedevice from "./components/resources/smartdevice.jpg"
import homelocalshifting from "./components/resources/localshifting.jpg"
import homeintercityrelocation from "./components/resources/intercity.jpg"
import homefurnituredisassembly from "./components/resources/pestClean.jpg"
// import homeloadingunloading from "./components/resources/.jpg"
// import homecooksandchefs from "./components/resources/.jpg"
// import homehousemaids from "./components/resources/.jpg"
// import homecareprovider from "./components/resources/.jpg"
// import homedrivers from "./components/resources/.jpg"
// import homeclothing from "./components/resources/.jpg"
// import homedrycleaning from "./components/resources/.jpg"
// import homeshoecleaning from "./components/resources/.jpg"
// import homecctvinstall from "./components/resources/.jpg"
// import homesmartlocks from "./components/resources/.jpg"
// import homeintercom from "./components/resources/.jpg"
// import homesalon from "./components/resources/.jpg"
// import homefitness from "./components/resources/.jpg"
// import homephysiotherapy from "./components/resources/.jpg"


import "./App.css";

function AppContent() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || []
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [currentUserEmail, setCurrentUserEmail] = useState(
    localStorage.getItem("currentUserEmail") || null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [redirectPath, setRedirectPath] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("currentUserEmail", currentUserEmail || "");
  }, [isAuthenticated, userData, currentUserEmail]);

  // Debug: Log all imported components to check for undefined
  console.log({
    Header,
    Login,
    Register,
    CategoryList,
    CategoryPage,
    BookingPage,
    AllProductsPage,
    ProfilePage,
    SearchResultsPage,
    PaymentPage
  });

  const products = [
    { id: 1, category: "Cleaning and Services", image: cleaning },
    { id: 2, category: "Repair And Maintenance", image: repair },
    { id: 3, category: "Home Improvement and Rennovation", image: homeimprovement },
    { id: 4, category: "Outdoor and Garden Services", image: outdoorgarden },
    { id: 5, category: "Installation Services", image: homeinstallation },
    { id: 6, category: "Moving and Packing Services", image: homemovingpacking },
    { id: 7, category: "Household Staffing Services", image: homestaff },
    { id: 8, category: "Laundry and Dry Cleaning Services", image: homedryclean },
    { id: 9, category: "Security and Surveillance", image: homesecurity },
  ];

  const categoryProducts = [
    { id: 101, name: "House deep cleaning", category: "Cleaning and Services", price: "₹6000", image: homedeepclean },
    { id: 102, name: "Sofa and carpet cleaning", category: "Cleaning and Services", price: "₹500", image: homesofaclean },
    { id: 103, name: "Bathroom Cleaning", category: "Cleaning and Services", price: "₹699", image: homebathroomclean },
    { id: 104, name: "Kitchen Cleaning", category: "Cleaning and Services", price: "₹1000", image: homekitchenclean },
    { id: 105, name: "Water tank cleaning", category: "Cleaning and Services", price: "₹1500", image: homewatertankclean },
    { id: 106, name: "Pest control (cockroach, termite, rodent, etc.)", category: "Cleaning and Services", price: "₹1500", image: homepestclean },
    { id: 108, name: "Furniture Cleaning", category: "Cleaning and Services", price: "₹999", image: homefurnitureclean },
    { id: 201, name: "AC and HVAC repair", category: "Repair and Maintenance", price: "₹1500", image: homeacrepair },
    { id: 202, name: "Plumbing Services", category: "Repair and Maintenance", price: "₹1200", image: homeplumbingrepair },
    { id: 203, name: "Electrical Repairs", category: "Repair and Maintenance", price: "₹1300", image: homeelectricalrepair },
    { id: 204, name: "Appliance Repairs", category: "Repair and Maintenance", price: "₹1400", image: homeappliancerepair },
    { id: 205, name: "Carpentry work", category: "Repair and Maintenance", price: "₹1600", image: homecarpentary},
    { id: 206, name: "RO/Water purifier servicing", category: "Repair and Maintenance", price: "₹1000", image: homewaterpurifier },
    { id: 207, name: "Inverter/UPS services", category: "Repair and Maintenance", price: "₹1700", image: homeinverter },
    { id: 301, name: "Painting (interior/exterior)", category: "Home Improvement and Rennovation", price: "₹2000", image: homepainting },
    { id: 302, name: "Flooring and tiling", category: "Home Improvement and Rennovation", price: "₹3000", image: homeflooring},
    { id: 303, name: "False ceiling installation", category: "Home Improvement and Rennovation", price: "₹3500", image:homeceiling },
    { id: 304, name: "Wall repair or waterproofing", category: "Home Improvement and Rennovation", price: "₹2500", image: homewallrepair },
    { id: 305, name: "Modular kitchen setup", category: "Home Improvement and Rennovation", price: "₹15000", image: homemodularkitchen },
    { id: 401, name: "Lawn maintenance", category: "Outdoor and Garden Services", price: "₹1200", image: homelawnmaintenance },
    { id: 402, name: "Landscaping", category: "Outdoor and Garden Services", price: "₹8000", image: homelandscaping },
    { id: 403, name: "Tree Trimming/pruning", category: "Outdoor and Garden Services", price: "₹2000", image:  hometreetrimming},
    { id: 404, name: "Outdoor Lighting Installation", category: "Outdoor and Garden Services", price: "₹3000", image: homeoutdoorlighting },
    { id: 501, name: "AC installation/uninstallation", category: "Installation Services", price: "₹1200", image: homeacinstallation  },
    { id: 502, name: "TV mounting", category: "Installation Services", price: "₹800", image: hometvmounting },
    { id: 503, name: "Washing Machine Setup", category: "Installation Services", price: "₹1000", image: homewashingmachine },
    { id: 504, name: "Smart home devices (CCTV, doorbell, etc.)", category: "Installation Services", price: "₹2500", image:  homesmarthomedevice},
    { id: 601, name: "Local Shifting", category: "Moving and Packing Services", price: "₹5000", image: homelocalshifting },
    { id: 602, name: "Intercity Relocation", category: "Moving and Packing Services", price: "₹15000", image: homeintercityrelocation },
    { id: 603, name: "Furniture Disassembly/Reassembly", category: "Moving and Packing Services", price: "₹2500", image:homefurnituredisassembly },
    { id: 604, name: "Loading and Unloading", category: "Moving and Packing Services", price: "₹2000", image: homefurnitureclean },
    { id: 701, name: "Cooks and chefs", category: "Household Staffing Services", price: "₹15000/month", image: homefurnitureclean },
    { id: 702, name: "Housemaids", category: "Household Staffing Services", price: "₹8000/month", image: homefurnitureclean },
    { id: 703, name: "Elderly care providers", category: "Household Staffing Services", price: "₹12000/month", image: homefurnitureclean },
    { id: 704, name: "Drivers on demand", category: "Household Staffing Services", price: "₹20000/month", image: homefurnitureclean },
    { id: 801, name: "Clothing washing and ironing", category: "Laundry and Dry Cleaning Services", price: "₹150", image: homefurnitureclean },
    { id: 802, name: "Dry cleaning", category: "Laundry and Dry Cleaning Services", price: "₹300", image: homefurnitureclean },
    { id: 803, name: "Shoe cleaning", category: "Laundry and Dry Cleaning Services", price: "₹250", image: homefurnitureclean },
    { id: 901, name: "CCTV installation & monitoring", category: "Security and Surveillance", price: "₹4000", image: homefurnitureclean },
    { id: 902, name: "Smart locks and alarms", category: "Security and Surveillance", price: "₹3500", image: homefurnitureclean },
    { id: 903, name: "Intercom systems", category: "Security and Surveillance", price: "₹3000", image: homefurnitureclean },
    { id: 110, name: "At-home salon", category: "Wellness and LifeStyle Services", price: "₹1200", image: homefurnitureclean },
    { id: 111, name: "Fitness/Yoga trainers", category: "Wellness and LifeStyle Services", price: "₹1500", image: homefurnitureclean },
    { id: 112, name: "Physiotherapy", category: "Wellness and LifeStyle Services", price: "₹2000", image: homefurnitureclean }
  ];

  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  const handleSearch = (term) => {
    setSearchTerm(term);
    const lowerTerm = term.toLowerCase();

    // Check if search term exactly matches a category
    const categoryMatch = products.find(
      (category) => category.category.toLowerCase() === lowerTerm
    );

    if (categoryMatch) {
      navigate(`/category/${encodeURIComponent(categoryMatch.category)}`);
      setSearchTerm('');
      return;
    }

    // Check for product matches
    const productMatches = categoryProducts.filter(
      (product) => product.name.toLowerCase().includes(lowerTerm)
    );

    if (productMatches.length > 0) {
      navigate(`/search?term=${encodeURIComponent(term)}`);
      setSearchTerm('');
      return;
    }

    // If no exact category or product match, navigate to all products
    navigate("/all-products");
    setSearchTerm('');
  };

  const handleLogin = (email, password) => {
    const user = userData.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      alert(`Login successful! Welcome, ${user.name}`);
      setIsAuthenticated(true);
      setCurrentUserEmail(user.email);
      setShowAuthModal(false);
      if (redirectPath) {
        navigate(redirectPath);
      }
    } else {
      alert("Invalid email or password");
    }
  };

  const handleRegister = (user) => {
    if (userData.some((u) => u.email === user.email)) {
      alert("Email already registered");
      return;
    }
    // Initialize user with empty orders array
    const newUser = { ...user, orders: [] };
    setUserData([...userData, newUser]);
    alert(`Registered successfully! Welcome, ${user.name}`);
    setIsLoginPage(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUserEmail(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUserEmail");
    navigate("/");
    setSearchTerm('');
  };

  const requestLogin = (path) => {
    setRedirectPath(path);
    setShowAuthModal(true);
  };

  return (
    <>
      {showAuthModal && (
        <div className="modal-overlay">
          <div className="modal-content auth-modal">
            {isLoginPage ? (
              <>
                <Login onLogin={handleLogin} />
                <p>
                  Don't have an account?{" "}
                  <button onClick={() => setIsLoginPage(false)}>Register</button>
                </p>
              </>
            ) : (
              <>
                <Register onRegister={handleRegister} />
                <p>
                  Already have an account?{" "}
                  <button onClick={() => setIsLoginPage(true)}>Login</button>
                </p>
              </>
            )}
            <button
              className="btn-close"
              onClick={() => setShowAuthModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
                requestLogin={requestLogin}
                setIsLoginPage={setIsLoginPage}
                onSearch={handleSearch}
                setSearchTerm={setSearchTerm}
              />
              <div className="product-page">
                <div className="hero-section">
                  <div className="hero-overlay">
                    <h1 className="hero-quote">
                      "Your comfort, our service – bringing help home!"
                    </h1>
                  </div>
                </div>
                <div className="ServiceTitle" id="services-section">
                  <h1>Services</h1>
                  <div className="cat">
                  <CategoryList
                    categories={filteredProducts}
                    requestLogin={requestLogin}
                    isAuthenticated={isAuthenticated}
                  />
                  </div>
                </div>
                {/* About Us Section */}
                  <div className="ServiceTitle" id="services-section"><h1>About Us</h1></div>
                  <section id="about-us-section" className="info-section">
                     <p>
                      At HomiGo, our mission is to bring convenience, comfort, and trusted professional services right to your doorstep. We understand the importance of a clean, safe, and well-maintained home environment, and we are committed to delivering exceptional home services that fit your unique lifestyle and budget.</p>
                    <p>Our platform connects you with a wide range of verified, experienced, and skilled service providers across various categories, including cleaning, repair and maintenance, home improvement, gardening, installation, packing and moving, household staffing, laundry, security, and wellness. Each service is carefully curated to ensure top-quality workmanship, timely delivery, and full customer satisfaction.</p>
                    <p>At HomiGo, we are passionate about enhancing your home living experience by providing a one-stop solution for all your household needs. Whether you require a deep cleaning, urgent repair, renovation, or ongoing maintenance, we are here to make your life easier with trusted, reliable, and efficient services.</p>
                    <p>Thank you for choosing HomiGo — your partner in creating a comfortable and well-cared-for home.</p>
                    {/* Add more detailed content as you want */}
                  </section>
                  {/* Contact Us Section */}
                  <div className="ServiceTitle" id="services-section"><h1>Contact Us</h1></div>
                  <section id="contact-us-section" className="info-section">
                    <p>
                        Have questions? Reach out to us via our email.<br></br>
                        Email ID :support@homigo.com <br></br>
                        Phone: +91 12345 67890.<br></br>
                        We're here to help you 24/7.
                    </p>
                    {/* Add address, contact form, map, or any details */}
                  </section>
                </div>
            </>
          }
        />
        <Route
          path="/category/:name"
          element={
            <>
              <Header
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
                requestLogin={requestLogin}
                setIsLoginPage={setIsLoginPage}
                onSearch={handleSearch}
                setSearchTerm={setSearchTerm}
              />
              <CategoryPage
                products={categoryProducts}
                requestLogin={requestLogin}
                isAuthenticated={isAuthenticated}
              />
            </>
          }
        />
        <Route
          path="/book/:id"
          element={
            <>
              <Header
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
                requestLogin={requestLogin}
                setIsLoginPage={setIsLoginPage}
                onSearch={handleSearch}
                setSearchTerm={setSearchTerm}
              />
              <BookingPage services={categoryProducts} />
            </>
          }
        />
        <Route
          path="/all-products"
          element={
            <>
              <Header
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
                requestLogin={requestLogin}
                setIsLoginPage={setIsLoginPage}
                onSearch={handleSearch}
                setSearchTerm={setSearchTerm}
              />
              <AllProductsPage
                products={categoryProducts}
                isAuthenticated={isAuthenticated}
                requestLogin={requestLogin}
              />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
                requestLogin={requestLogin}
                setIsLoginPage={setIsLoginPage}
                onSearch={handleSearch}
                setSearchTerm={setSearchTerm}
              />
              <ProfilePage
                isAuthenticated={isAuthenticated}
                userData={userData}
                currentUserEmail={currentUserEmail}
                requestLogin={requestLogin}
              />
            </>
          }
        />
        <Route
          path="/search"
          element={
            <>
              <Header
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
                requestLogin={requestLogin}
                setIsLoginPage={setIsLoginPage}
                onSearch={handleSearch}
                setSearchTerm={setSearchTerm}
              />
              <SearchResultsPage
                products={categoryProducts}
                isAuthenticated={isAuthenticated}
                requestLogin={requestLogin}
              />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Header
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
                requestLogin={requestLogin}
                setIsLoginPage={setIsLoginPage}
                onSearch={handleSearch}
                setSearchTerm={setSearchTerm}
              />
              <PaymentPage
                userData={userData}
                setUserData={setUserData}
                currentUserEmail={currentUserEmail}
              />
            </>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;