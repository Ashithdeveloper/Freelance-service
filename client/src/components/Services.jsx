import webData from "../Data/webData";
import { Code, Palette, Server } from "lucide-react";

const iconMap = {
  Code: Code,
  Palette: Palette,
  Server: Server,
};

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <h2 className="text-4xl text-center font-bold mb-12">Our Services</h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {webData.services
          .filter((s) => s.isActive)
          .map((service) => {
            const Icon = iconMap[service.icon];

            return (
              <div
                key={service._id}
                className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-xl transition text-center"
              >
                {Icon && <Icon size={40} className="mx-auto mb-4" />}
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Services;
