import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <div className="privacy-policy-container">
        <h1 className="privacy-policy-title">Privacy Policy</h1>
        <p className="privacy-policy-date">Last updated: 1 july 2024</p>

        <p className="privacy-policy-description">
          Welcome to our Privacy Policy page. We respect your privacy and are committed to protecting the personal information you share with us. This policy explains how we collect, use, and safeguard your information.
        </p>

        <h2 className="privacy-policy-heading">1. Information We Collect</h2>
        <p className="privacy-policy-text">
          We may collect personal information such as your name, email address, and other contact details when you sign up for our newsletter, create an account, or contact us. We also collect non-personal information such as browser type, device information, and usage data to improve our services.
        </p>

        <h2 className="privacy-policy-heading">2. How We Use Your Information</h2>
        <p className="privacy-policy-text">
          We use your personal information to provide and improve our services, communicate with you, send newsletters, and respond to your inquiries. Non-personal information is used to analyze trends, administer the site, and gather demographic information.
        </p>

        <h2 className="privacy-policy-heading">3. Sharing Your Information</h2>
        <p className="privacy-policy-text">
          We do not sell, trade, or otherwise transfer your personal information to outside parties. We may share your information with trusted third parties who assist us in operating our website, conducting our business, or serving you, as long as those parties agree to keep this information confidential.
        </p>

        <h2 className="privacy-policy-heading">4. Cookies</h2>
        <p className="privacy-policy-text">
          We use cookies to enhance your experience on our website. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information.
        </p>

        <h2 className="privacy-policy-heading">5. Security</h2>
        <p className="privacy-policy-text">
          We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
        </p>

        <h2 className="privacy-policy-heading">6. Changes to Our Privacy Policy</h2>
        <p className="privacy-policy-text">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="privacy-policy-heading">7. Contact Us</h2>
        <p className="privacy-policy-text">
          If you have any questions about this Privacy Policy, please contact us at [Your Contact Information].
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
