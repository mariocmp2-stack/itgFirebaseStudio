"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hasWhatsApp: false,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappStatus = formData.hasWhatsApp ? "Yes" : "No";
    alert(`Thank you for your message!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nHas WhatsApp: ${whatsappStatus}\nMessage: ${formData.message}`);
    setFormData({ name: "", email: "", phone: "", hasWhatsApp: false, message: "" });
  };

  return (
    <section className="section relative py-16 md:py-24 min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-itg-blue/5" />

      <div className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-itg-gray">
            Ready to build something clear, fast and measurable? Tell us about your challenge and we&apos;ll propose a plan in 24-48 hours.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="mx-auto max-w-lg space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-itg-ink">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-itg-border bg-white px-4 py-3 text-itg-ink placeholder-itg-gray focus:border-itg-blue focus:outline-none focus:ring-2 focus:ring-itg-blue/20"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-itg-ink">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-itg-border bg-white px-4 py-3 text-itg-ink placeholder-itg-gray focus:border-itg-blue focus:outline-none focus:ring-2 focus:ring-itg-blue/20"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-itg-ink">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-itg-border bg-white px-4 py-3 text-itg-ink placeholder-itg-gray focus:border-itg-blue focus:outline-none focus:ring-2 focus:ring-itg-blue/20"
              placeholder="+1 (555) 123-4567"
            />
            
            <div className="mt-3 flex items-center">
              <input
                type="checkbox"
                id="hasWhatsApp"
                name="hasWhatsApp"
                checked={formData.hasWhatsApp}
                onChange={handleChange}
                className="h-4 w-4 rounded border-itg-border text-itg-blue focus:ring-2 focus:ring-itg-blue/20"
              />
              <label htmlFor="hasWhatsApp" className="ml-2 text-sm text-itg-gray flex items-center gap-2">
                <WhatsAppIcon className="w-5 h-5" style={{ color: '#25D366' }} />
                This number has WhatsApp
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-itg-ink">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="mt-1 block w-full rounded-lg border border-itg-border bg-white px-4 py-3 text-itg-ink placeholder-itg-gray focus:border-itg-blue focus:outline-none focus:ring-2 focus:ring-itg-blue/20"
              placeholder="Tell us about your project..."
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full rounded-lg py-3 text-lg"
          >
            Send Message
          </button>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-auto max-w-lg mt-12 text-center"
        >
          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-itg-ink mb-4">Other ways to reach us</h3>
            <div className="space-y-3 text-sm">
              <div>
                <a href="mailto:hola@itg.dev" className="text-itg-blue hover:underline">
                  hola@itg.dev
                </a>
              </div>
              <div className="text-itg-gray">
                Business hours: Mon-Fri 9:00–18:00
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ---------- WhatsApp Icon ---------- */
function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
    </svg>
  );
}

export default Contact;
