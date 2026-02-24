import webData from "../Data/webData";

const Hero = () => {
  const hero = webData.heroSection[0];

  return (
    <section
      className="h-screen flex items-center justify-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${hero.image})` }}
    >
      <div className="bg-black/60 p-10 rounded-2xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">{hero.content}</h1>
        <a
          href="#contact"
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default Hero;
