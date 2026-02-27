import { useState } from "react";
import webData from "../Data/webData";
import { Phone, Mail, MapPin, Github, Linkedin, Instagram } from "lucide-react";

const Contact = () => {
  const contact = webData.contact;
  const [ isLoading, setIsLoading ] = useState(false);

    const onSubmit = async (event) => {

    event.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(event.target);

    formData.append("access_key", "dee85f43-227d-4443-8121-e695d48e8858");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
  
      event.target.reset();
      setIsLoading(false);
    } else {
      console.log("Error", data);
      setIsLoading(false);

    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <MapPin className="text-blue-400" />
              <span>{contact.address}</span>
            </div>

            {contact.phoneNumbers.map((phone, i) => (
              <div key={i} className="flex items-center gap-4">
                <Phone className="text-green-400" />
                <span>
                  {phone.label}: {phone.number}
                </span>
              </div>
            ))}

            {contact.emails.map((email, i) => (
              <div key={i} className="flex items-center gap-4">
                <Mail className="text-yellow-400" />
                <span>
                  {email.label}: {email.email}
                </span>
              </div>
            ))}

            {/* Social Media */}
            <div className="flex gap-5 pt-4">
              <a
                href={contact.socialMedia.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github className="hover:text-blue-400 transition" />
              </a>

              <a
                href={contact.socialMedia.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="hover:text-blue-400 transition" />
              </a>

              <a
                href={contact.socialMedia.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <Instagram className="hover:text-pink-400 transition" />
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
            <form className="space-y-5" onSubmit={onSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
