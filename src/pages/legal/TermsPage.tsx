import React from 'react';
import Layout from '../../components/layout/Layout';

const TermsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

          <div className="prose prose-lg">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms
                and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. User Account</h2>
              <p>
                To access certain features of the site, you may be required to create an account.
                You are responsible for maintaining the confidentiality of your account information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Content</h2>
              <p>
                Users may post reviews, comments, and other content as long as the content is not
                illegal, obscene, threatening, defamatory, invasive of privacy, infringing on
                intellectual property rights, or otherwise injurious to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Booking and Payments</h2>
              <p>
                All bookings are subject to availability and confirmation. Prices are subject to
                change without notice until the booking is confirmed.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Cancellation Policy</h2>
              <p>
                Cancellation policies vary by service provider. Please review the specific
                cancellation policy before making a booking.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
              <p>
                We shall not be liable for any direct, indirect, incidental, special, or
                consequential damages resulting from the use or inability to use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Your continued use of
                the site following any changes indicates your acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
                <br />
                Email: support@travelwebsite.com
                <br />
                Phone: +1 (555) 123-4567
              </p>
            </section>

            <div className="text-sm text-gray-600 mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage; 