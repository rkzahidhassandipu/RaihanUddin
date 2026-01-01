"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";

// আইকন ম্যাপার (JSON এর স্ট্রিং থেকে কম্পোনেন্ট পাওয়ার জন্য)
export const portfolioData = {
  contact: {
    title: {
      first: "Get in",
      second: "Touch",
    },
    subtitle:
      "Have a project idea or want to collaborate? Feel free to reach out to me, and let's create something amazing together.",
    formAction: "https://formspree.io/f/xknldwlr",
    info: [
      {
        icon: "FaEnvelope",
        label: "Email",
        value: "raihanuddin.dev@gmail.com",
        subtitle: "Send me an email anytime",
      },
      {
        icon: "FaPhoneAlt",
        label: "Phone",
        value: "+60 115 111 0711",
        subtitle: "Available during business hours",
      },
      {
        icon: "FaWhatsapp",
        label: "WhatsApp",
        value: "+60 115 111 0711",
        subtitle: "Quick replies on WhatsApp",
      },
      {
        icon: "FaMapMarkerAlt",
        label: "Location",
        value: "Jessore, Bangladesh",
        subtitle: "Remote work worldwide",
      },
    ],
    formFields: {
      name: "Your Name",
      email: "Email Address",
      subject: "Subject",
      message: "Type your message...",
      buttonText: "Send Message",
    },
  },
};
const IconMap: any = {
  FaEnvelope: <FaEnvelope />,
  FaPhoneAlt: <FaPhoneAlt />,
  FaMapMarkerAlt: <FaMapMarkerAlt />,
  FaWhatsapp: <FaWhatsapp />,
};

const GetInTouch = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { contact } = portfolioData; // JSON থেকে ডাটা নেওয়া হচ্ছে

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-title", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".contact-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative text-white py-20 px-4 bg-black"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 w-4/5 mx-auto">
        <h2 className="contact-title text-3xl sm:text-4xl font-bold text-center mb-2">
          {contact.title.first}{" "}
          <span className="text-red-500">{contact.title.second}</span>
        </h2>
        <div className="h-1 w-24 bg-red-500 mx-auto mb-8 rounded-full" />
        <p className="text-center text-sm sm:text-base text-gray-400 mt-2 mb-10">
          {contact.subtitle}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side: Contact Info */}
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            onMouseMove={(e) => handleMouseMove(e, 0)}
            className="group contact-card relative rounded-2xl p-[1.5px] bg-white/10 overflow-hidden"
          >
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(1000px circle at var(--mouse-x) var(--mouse-y), rgba(239, 68, 68, 0.6), transparent 40%)`,
              }}
            />
            <Card className="relative z-10 h-full bg-[#0b0f1a] border-none rounded-2xl">
              <CardHeader>
                <CardTitle className="text-red-500 tracking-wide uppercase text-xs font-black">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contact.info.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-red-500/40 transition-all group/item"
                  >
                    <div className="w-10 h-10 flex flex-shrink-0 items-center justify-center rounded-lg bg-[#111827] text-red-500 border border-white/10 group-hover/item:bg-red-500 group-hover/item:text-white transition-colors">
                      {IconMap[item.icon]}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{item.label}</p>
                      <p className="text-sm text-slate-300">{item.value}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Form */}
          <div
            ref={(el) => (cardsRef.current[1] = el)}
            onMouseMove={(e) => handleMouseMove(e, 1)}
            className="group contact-card relative rounded-2xl p-[1.5px] bg-white/10 overflow-hidden"
          >
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(1000px circle at var(--mouse-x) var(--mouse-y), rgba(239, 68, 68, 0.6), transparent 40%)`,
              }}
            />
            <Card className="relative z-10 h-full bg-[#0b0f1a] border-none rounded-2xl">
              <CardHeader>
                <CardTitle className="text-red-500 tracking-wide uppercase text-xs font-black">
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  action={contact.formAction}
                  method="POST"
                  className="flex flex-col space-y-4"
                >
                  <Input
                    name="name"
                    placeholder={contact.formFields.name}
                    required
                    className="bg-white/[0.03] border-white/10 text-white h-12"
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder={contact.formFields.email}
                    required
                    className="bg-white/[0.03] border-white/10 text-white h-12"
                  />
                  <Input
                    name="subject"
                    placeholder={contact.formFields.subject}
                    required
                    className="bg-white/[0.03] border-white/10 text-white h-12"
                  />
                  <Textarea
                    name="message"
                    placeholder={contact.formFields.message}
                    required
                    className="bg-white/[0.03] border-white/10 text-white min-h-[180px]"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-6 transition-all"
                  >
                    {contact.formFields.buttonText}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
