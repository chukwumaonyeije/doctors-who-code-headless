"use client";

import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mldqlogz");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "general",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (state.succeeded) {
    return (
      <div className="max-w-2xl mx-auto bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-white mb-3">
          Message Sent Successfully!
        </h3>
        <p className="text-slate-300 mb-6">
          Thank you for reaching out. I'll get back to you as soon as possible.
        </p>
        <button
          onClick={() => {
            setFormData({ name: "", email: "", inquiryType: "general", subject: "", message: "" });
            window.location.reload();
          }}
          className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {/* Hidden field for reply-to email */}
      <input type="hidden" name="_replyto" value={formData.email} />
      
      {/* Subject customization */}
      <input type="hidden" name="_subject" value={`[${formData.inquiryType.toUpperCase()}] New Contact from ${formData.name}: ${formData.subject}`} />

      <div className="grid md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-slate-300 font-medium mb-2"
          >
            Your Name <span className="text-primary">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-surface/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="Dr. Jane Smith"
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-slate-300 font-medium mb-2"
          >
            Email Address <span className="text-primary">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-surface/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="jane@example.com"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
      </div>

      {/* Inquiry Type Field */}
      <div>
        <label
          htmlFor="inquiryType"
          className="block text-slate-300 font-medium mb-2"
        >
          What can I help you with? <span className="text-primary">*</span>
        </label>
        <select
          id="inquiryType"
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-surface/60 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        >
          <option value="general">General Inquiry</option>
          <option value="collaboration">Collaboration Opportunity</option>
          <option value="technical">Technical Question</option>
          <option value="speaking">Speaking Engagement</option>
          <option value="consulting">Consulting / Advisory</option>
          <option value="media">Media / Interview Request</option>
        </select>
        <ValidationError
          prefix="Inquiry Type"
          field="inquiryType"
          errors={state.errors}
        />
      </div>

      {/* Subject Field */}
      <div>
        <label
          htmlFor="subject"
          className="block text-slate-300 font-medium mb-2"
        >
          Subject <span className="text-primary">*</span>
        </label>
        <input
          id="subject"
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-surface/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          placeholder="Project inquiry / Collaboration / Question"
        />
        <ValidationError
          prefix="Subject"
          field="subject"
          errors={state.errors}
        />
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-slate-300 font-medium mb-2"
        >
          Your Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 bg-surface/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
          placeholder="Tell me about your project, question, or how we can collaborate..."
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <p className="text-slate-400 text-sm">
          <span className="text-primary">*</span> Required fields
        </p>
        <button
          type="submit"
          disabled={state.submitting}
          className="px-8 py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
        >
          {state.submitting ? "Sending..." : "Send Message"}
        </button>
      </div>

      {/* Error Message */}
      {state.errors && Object.keys(state.errors).length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
          There was an error sending your message. Please try again.
        </div>
      )}
    </form>
  );
}
