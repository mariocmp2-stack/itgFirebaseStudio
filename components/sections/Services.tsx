"use client";
import { motion } from "framer-motion";

export default function Services() {
  const services = [
    {
      icon: "📱",
      title: "Mobile Applications",
      description: "Native and cross-platform mobile apps with exceptional user experience and performance.",
      features: ["iOS & Android", "React Native", "Flutter", "App Store Optimization"]
    },
    {
      icon: "🌐",
      title: "Web Applications",
      description: "Modern, responsive web applications built with the latest technologies and best practices.",
      features: ["Next.js", "React", "TypeScript", "Progressive Web Apps"]
    },
    {
      icon: "⚡",
      title: "Performance Optimization",
      description: "Lightning-fast websites with Core Web Vitals optimization and superior user experience.",
      features: ["Core Web Vitals", "SEO Optimization", "Speed Optimization", "Analytics"]
    },
    {
      icon: "🔧",
      title: "Automation Solutions",
      description: "Streamline your business processes with custom automation and integration solutions.",
      features: ["Workflow Automation", "API Integration", "Process Optimization", "Custom Tools"]
    }
  ];

  return (
    <section id="servicios" className="section py-20">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
        >
          Our Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          We deliver comprehensive digital solutions tailored to your business needs
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="card hover:shadow-lg transition-all duration-300 group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {service.title}
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {service.description}
            </p>
            <ul className="space-y-2">
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
