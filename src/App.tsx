import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';

// Main Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import ForumPage from './pages/ForumPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Destinations
import DestinationsPage from './pages/DestinationsPage';
import DestinationDetail from './pages/DestinationDetail';
import RegionPage from './pages/destinations/RegionPage';
import CategoryPage from './pages/CategoryPage';
import DestinationPage from './pages/DestinationPage';

// User Account
import BookingsPage from './pages/account/BookingsPage';
import WishlistPage from './pages/account/WishlistPage';
import TravelHistoryPage from './pages/account/TravelHistoryPage';
import ReviewsPage from './pages/account/ReviewsPage';

// Activities
import ActivitiesPage from './pages/activities/ActivitiesPage';
import ActivityDetailPage from './pages/activities/ActivityDetailPage';

// Festivals
import FestivalsPage from './pages/festivals/FestivalsPage';
import FestivalDetailPage from './pages/festivals/FestivalDetailPage';

// Services
import FlightsPage from './pages/services/FlightsPage';
import HotelsPage from './pages/services/HotelsPage';
import CarRentalsPage from './pages/services/CarRentalsPage';
import TourPackagesPage from './pages/services/TourPackagesPage';
import InsurancePage from './pages/services/InsurancePage';
import VisaServicesPage from './pages/services/VisaServicesPage';

// Resources
import GuidesPage from './pages/resources/GuidesPage';
import WeatherPage from './pages/resources/WeatherPage';
import TipsPage from './pages/resources/TipsPage';
import FAQPage from './pages/resources/FAQPage';
import SafetyPage from './pages/resources/SafetyPage';
import CurrencyPage from './pages/resources/CurrencyPage';

// Legal Pages
import CancellationPage from './pages/legal/CancellationPage';
import RefundPage from './pages/legal/RefundPage';
import TermsPage from './pages/legal/TermsPage';
import PrivacyPage from './pages/legal/PrivacyPage';
import CookiesPage from './pages/legal/CookiesPage';

// Other Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import DestinationManagement from './pages/admin/DestinationManagement';
import BlogManagement from './pages/admin/BlogManagement';
import AddSampleData from './pages/admin/AddSampleData';
import SitemapPage from './pages/SitemapPage';
import ToolsPage from './pages/ToolsPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <AccessibilityProvider>
            <Routes>
              {/* Main Pages */}
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:postId" element={<BlogPost />} />
              <Route path="/forum" element={<ForumPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Authentication */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* User Account - Protected Routes */}
              <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
              <Route path="/bookings" element={<PrivateRoute><BookingsPage /></PrivateRoute>} />
              <Route path="/wishlist" element={<PrivateRoute><WishlistPage /></PrivateRoute>} />
              <Route path="/travel-history" element={<PrivateRoute><TravelHistoryPage /></PrivateRoute>} />
              <Route path="/reviews" element={<PrivateRoute><ReviewsPage /></PrivateRoute>} />

              {/* Destinations */}
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/destination/:id" element={<DestinationPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/regions/:region" element={<RegionPage />} />

              {/* Activities */}
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/activities/:activity" element={<ActivityDetailPage />} />

              {/* Festivals */}
              <Route path="/festivals" element={<FestivalsPage />} />
              <Route path="/festivals/:festival" element={<FestivalDetailPage />} />

              {/* Travel Services */}
              <Route path="/services/flights" element={<FlightsPage />} />
              <Route path="/services/hotels" element={<HotelsPage />} />
              <Route path="/services/car-rentals" element={<CarRentalsPage />} />
              <Route path="/services/tour-packages" element={<TourPackagesPage />} />
              <Route path="/services/insurance" element={<InsurancePage />} />
              <Route path="/services/visa" element={<VisaServicesPage />} />

              {/* Travel Resources */}
              <Route path="/resources/guides" element={<GuidesPage />} />
              <Route path="/resources/weather" element={<WeatherPage />} />
              <Route path="/resources/tips" element={<TipsPage />} />
              <Route path="/resources/faqs" element={<FAQPage />} />
              <Route path="/resources/safety" element={<SafetyPage />} />
              <Route path="/resources/currency" element={<CurrencyPage />} />

              {/* Legal Pages */}
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/cancellation" element={<CancellationPage />} />
              <Route path="/refund" element={<RefundPage />} />

              <Route path ="tools" element={<ToolsPage/>} />
              <Route path="/sitemap" element={<SitemapPage />} />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <Navigate to="/admin/dashboard" replace />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserManagement />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/destinations"
                element={
                  <AdminRoute>
                    <DestinationManagement />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/blogs"
                element={
                  <AdminRoute>
                    <BlogManagement />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/add-sample-data"
                element={
                  <AdminRoute>
                    <AddSampleData />
                  </AdminRoute>
                }
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AccessibilityProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;