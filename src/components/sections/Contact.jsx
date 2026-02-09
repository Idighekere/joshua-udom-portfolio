import React from "react";
import { motion } from "framer-motion";
import { FiFacebook, FiPhone, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const socialLinks = [
  {
    name: "Facebook",
    link: "https://facebook.com/profile.php?id=61558207507000",
    color: "hover:bg-[#1877F2]",
    icon: FiFacebook,
  },
  {
    name: "Whatsapp",
    link: "https://wa.me/+2348171012904",
    color: "hover:bg-[#25D366]",
    icon: FaWhatsapp,
  },
  {
    name: "Phone Call",
    link: "tel:+2348171012904",
    color: "hover:bg-[#34b7f1]",
    icon: FiPhone,
  },
  {
    name: "Send Mail",
    link: "mailto:udomjosh04@gmail.com",
    color: "hover:bg-[#d44638]",
    icon: FiMail,
  },
];

const Contact = () => {
  return (
    <section id="contact-me" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl  font-bold mb-6">Get in Touch</h2>
          <div className="h-1 w-24 bg-primary-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Have a project in mind? Let's create something amazing together.
            Reach out for design projects, brand consultation, or just to say
            hello.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`flex flex-col items-center justify-center p-8 rounded-2xl bg-neutral-900 border border-neutral-800 transition-all duration-300 group ${link.color} hover:border-transparent cursor-pointer`}
            >
              <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/20 transition-colors mb-4">
                <link.icon className="w-8 h-8 text-white" />
              </div>
              <span className="font-medium text-lg">{link.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
