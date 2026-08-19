import React from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Facebook01Icon,
  CallIcon,
  Mail01Icon,
  WhatsappIcon,
  Chat01Icon,
} from "@hugeicons/core-free-icons";
import { glowCardClass, GlowSection } from "../ui/GlowCard";

const socialLinks = [
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
    name: "Facebook",
    link: "https://facebook.com/profile.php?id=61558207507000",
    color: "hover:bg-[#1877F2]",
    icon: Facebook01Icon,
  },
  // {
  //   name: "Send Mail",
  //   link: "mailto:workwithjoshuaudom@gmail.com",
  //   color: "hover:bg-[#d44638]",
  //   icon: Mail01Icon,
  // },
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
          <h2 className="text-2xl md:text-3xl font-bold">Start a Project</h2>
          <div className="h-1 w-24 bg-primary-500 mx-auto rounded-full"></div>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
            Have a project in mind? Let's create something amazing together.
            Reach out for design projects, brand consultation, or just to say
            hello.
          </p>
        </div>
        <div className=" pb-10 bg-black/5 rounded-3xl   flex justify-center">
          <div className="flex gap-3 items-center">
            <HugeiconsIcon icon={Mail01Icon} size={24} color="white" />

            <a
              href="mailto:workwithjoshuaudom@gmail.com"
              className="underline text-xl md:text-2xl text-center"
            >
              workwithjoshuaudom@gmail.com
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto">
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
              className={`flex flex-col items-center justify-center p-2 ${glowCardClass}  transition-all duration-300 group ${link.color} hover:border-transparent cursor-pointer`}
            >
              <div className=" rounded-full  transition-colors ">
                <HugeiconsIcon icon={link.icon} size={26} color="white" />
              </div>
            </motion.a>
          ))}
        </div>
      </GlowSection>
    </section>
  );
};

export default Contact;
