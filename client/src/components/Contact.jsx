import webData from "../Data/webData";

const Contact = () => {
  const contact = webData.contact;

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8">Contact Us</h2>

        <p className="mb-4">{contact.address}</p>

        {contact.phoneNumbers.map((phone, i) => (
          <p key={i}>
            {phone.label}: {phone.number}
          </p>
        ))}

        {contact.emails.map((email, i) => (
          <p key={i}>
            {email.label}: {email.email}
          </p>
        ))}
      </div>
    </section>
  );
};

export default Contact;
