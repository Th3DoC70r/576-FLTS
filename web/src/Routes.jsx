// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import { useAuth } from './auth'
import PageLayout from './layouts/PageLayout/PageLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={PageLayout}>
        <Route path="/admin-tools" page={AdminToolsPage} name="adminTools" />
        <Route path="/event" page={EventPage} name="event" />
        <Route path="/cart" page={CartPage} name="cart" />
        <Route path="/profile" page={ProfilePage} name="profile" />
        <Route path="/" page={LandingPage} name="landing" />
        <Route path="/shop" page={ShopPage} name="shop" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
