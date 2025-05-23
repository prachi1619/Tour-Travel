import React from 'react';
import Layout from '../../components/layout/Layout';

const CookiesPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>

          <div className="prose prose-lg">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit
                our website. They help us provide you with a better experience by:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Remembering your preferences</li>
                <li>Keeping you signed in</li>
                <li>Understanding how you use our website</li>
                <li>Improving our services based on your behavior</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Essential Cookies</h3>
                  <p>Required for the website to function properly. Cannot be disabled.</p>
                </div>

                <div>
                  <h3 className="font-medium">Functional Cookies</h3>
                  <p>Remember your preferences and personalize your experience.</p>
                </div>

                <div>
                  <h3 className="font-medium">Analytics Cookies</h3>
                  <p>Help us understand how visitors interact with our website.</p>
                </div>

                <div>
                  <h3 className="font-medium">Advertising Cookies</h3>
                  <p>Used to deliver relevant advertisements and track campaign performance.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Managing Cookies</h2>
              <p>
                You can control cookies through your browser settings. Please note that
                disabling certain cookies may limit your ability to use some features of our website.
              </p>
              <div className="mt-4">
                <h3 className="font-medium mb-2">How to manage cookies in popular browsers:</h3>
                <ul className="list-disc pl-6">
                  <li>Google Chrome: Settings → Privacy and Security → Cookies</li>
                  <li>Mozilla Firefox: Options → Privacy & Security → Cookies</li>
                  <li>Safari: Preferences → Privacy → Cookies</li>
                  <li>Microsoft Edge: Settings → Privacy & Security → Cookies</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
              <p>
                Some cookies are placed by third-party services that appear on our pages.
                We do not control these cookies. You can review their respective privacy
                policies for more information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Cookie Consent</h2>
              <p>
                When you first visit our website, you will be asked to accept or decline
                cookies. You can change your preferences at any time through our cookie
                settings panel.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. Any changes will be
                posted on this page with an updated revision date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
              <p>
                If you have questions about our Cookie Policy, please contact us at:
                <br />
                Email: privacy@travelwebsite.com
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

export default CookiesPage; 