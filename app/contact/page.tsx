import ContactForm from "@/components/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Doctors Who Code",
  description:
    "Get in touch with Dr. Chukwuma Onyeije. Reach out for collaborations, consultations, or questions about healthcare technology and AI-powered medical tools.",
};

export default function ContactPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6">
          Let's Connect
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Have a question, project idea, or collaboration opportunity? I'd love
          to hear from you. Fill out the form below and I'll get back to you as
          soon as possible.
        </p>
      </div>

      {/* Contact Form */}
      <ContactForm />

      {/* Additional Contact Information */}
      <div className="max-w-2xl mx-auto mt-16 pt-12 border-t border-slate-700/50">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Email Card */}
          <div className="bg-gradient-to-br from-surface/60 to-surface/40 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg">Email</h3>
            </div>
            <a
              href="mailto:info@codecraftmd.com"
              className="text-slate-300 hover:text-primary transition-colors"
            >
              info@codecraftmd.com
            </a>
            <p className="text-slate-400 text-sm mt-2">
              For general inquiries and support
            </p>
          </div>

          {/* Social Card */}
          <div className="bg-gradient-to-br from-surface/60 to-surface/40 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-secondary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg">
                Connect on LinkedIn
              </h3>
            </div>
            <a
              href="https://www.linkedin.com/in/chukwumaonyeije/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-secondary transition-colors"
            >
              View Profile →
            </a>
            <p className="text-slate-400 text-sm mt-2">
              Let's connect professionally
            </p>
          </div>
        </div>

        {/* Response Time Notice */}
        <div className="mt-8 bg-primary/10 border border-primary/30 rounded-lg p-4 text-center">
          <p className="text-slate-300 text-sm">
            📬 <strong>Response Time:</strong> I typically respond within 24-48
            hours during business days.
          </p>
        </div>
      </div>
    </main>
  );
}
