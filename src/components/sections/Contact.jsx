import React from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Facebook01Icon, CallIcon, Mail01Icon, WhatsappIcon, Chat01Icon } from "@hugeicons/core-free-icons";
import { glowCardClass, GlowSection } from "../ui/GlowCard";

const socialLinks = [
  {
    name: "Facebook",
    link: "https://facebook.com/profile.php?id=61558207507000",
    color: "hover:bg-[#1877F2]",
    icon: Facebook01Icon,
  },
  {
    name: "Whatsapp",
    link: "https://wa.me/+2348171012904",
    color: "hover:bg-[#25D366]",
    icon: WhatsappIcon,
  },
  {
    name: "Phone Call",
    link: "tel:+2347040198190",
    color: "hover:bg-[#34b7f1]",
    icon: CallIcon,
  },
  {
    name: "Send Mail",
    link: "mailto:workwithjoshuaudom@gmail.com",
    color: "hover:bg-[#d44638]",
    icon: Mail01Icon,
  },
];

const Contact = () => {
  return (
    <section id="contact-me" className="py-16 md:py-24">
      <GlowSection className="container mx-auto px-6 pt-10 md:pt-14">
        <div className="text-center mb-10 md:mb-12 space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary-500/10 border border-primary-500/20">
            <HugeiconsIcon
              icon={Chat01Icon}
              size={28}
              color="currentColor"
              className="text-primary-400"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Get in Touch</h2>
          <div className="h-1 w-24 bg-primary-500 mx-auto rounded-full"></div>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
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
              className={`flex flex-col items-center justify-center p-8 ${glowCardClass} border border-white/10 transition-all duration-300 group ${link.color} hover:border-transparent cursor-pointer`}
            >
              <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/20 transition-colors mb-4">
                <HugeiconsIcon icon={link.icon} size={32} color="white" />
              </div>
              <span className="font-medium text-lg md:text-xl">{link.name}</span>
            </motion.a>
          ))}
        </div>
      </GlowSection>
    </section>
  );
};

export default Contact;
