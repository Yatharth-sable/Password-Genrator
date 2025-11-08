import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-64 bg-gradient-to-r from-orange-50 to-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold text-orange-600"
        >
          About PassOP
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-4 max-w-2xl text-gray-700"
        >
          PassOP is designed to keep your passwords secure and accessible. We focus on encryption, simplicity, and cross-device access so you can manage your credentials without worry.
        </motion.p>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 px-4 bg-orange-50">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-semibold text-orange-600 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg">
            Our mission is simple: provide a secure and intuitive platform to store your passwords. We use AES-256 encryption to ensure your data is safe and inaccessible to unauthorized users.
          </p>
        </motion.div>
      </section>

      {/* Our Vision Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-semibold text-orange-600 mb-4">Our Vision</h2>
          <p className="text-gray-700 text-lg">
            We aim to make password management effortless and reliable for everyone. PassOP is committed to providing tools that simplify your digital life while keeping your credentials protected.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      
    </div>
  );
};

export default About;
