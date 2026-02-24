import webData from "../Data/webData";

const About = () => {
  const about = webData.aboutSection[0];

  return (
    <section id="about" className="py-20 bg-gray-100">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">{about.heading}</h2>
        <p className="text-lg text-gray-600">{about.content}</p>
      </div>
    </section>
  );
};

export default About;
