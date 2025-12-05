import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About - Dr. Chukwuma Onyeije | Doctors Who Code",
  description: "Learn about Dr. Chukwuma Onyeije, maternal-fetal medicine specialist, tech enthusiast, and founder of Doctors Who Code.",
};

export default function AboutPage() {
  return (
    <article className="max-w-4xl mx-auto py-16 px-6">
      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="flex-shrink-0">
            <Image
              src="/dr-onyeije.jpg"
              alt="Dr. Chukwuma Onyeije"
              width={280}
              height={280}
              className="rounded-2xl shadow-2xl border-2 border-primary/30"
              priority
            />
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6 leading-tight">
              Who Am I?
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-invert prose-lg max-w-none space-y-8">
        {/* Introduction */}
        <div className="bg-surface/60 border border-slate-700 rounded-xl p-8">
          <p className="text-slate-300 leading-relaxed text-lg">
            Hi, I'm <span className="text-white font-semibold">Dr. Chukwuma Onyeije</span>—a maternal-fetal medicine specialist, tech enthusiast, and advocate for transforming healthcare through innovation and education. With over 30 years of experience in managing medically complex pregnancies, I've dedicated my career to combining medicine and technology to empower both clinicians and patients.
          </p>
        </div>

        {/* From Physician to Coder */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-4">From Physician to Coder</h2>
          <p className="text-slate-300 leading-relaxed">
            My journey into software development started with a simple idea: healthcare professionals deserve better tools to navigate their daily challenges. Frustrated by inefficiencies in clinical workflows, I began creating apps tailored to improve maternal and fetal outcomes. From fetal kick counting to gestational diabetes tracking, these tools are designed to make life easier for physicians while improving care for patients.
          </p>
          <p className="text-slate-300 leading-relaxed mt-4">
            Today, my passion lies in exploring the cutting edge of artificial intelligence, natural language processing, and LangChain technologies to drive the future of maternal-fetal medicine.
          </p>
        </section>

        {/* Why I Write */}
        <section className="bg-surface/30 border border-slate-700/50 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-white mb-4">Why I Write</h2>
          <p className="text-slate-300 leading-relaxed">
            I created <span className="text-secondary font-semibold">Doctors Who Code</span> as a space for healthcare professionals who, like me, see the potential of technology to revolutionize our field. Whether you're a physician learning to code or looking to integrate AI into your practice, this blog is where I share practical insights, personal stories, and lessons learned from blending two distinct but deeply connected worlds.
          </p>
        </section>

        {/* What Drives Me */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">What Drives Me</h2>
          <div className="grid gap-6">
            <div className="bg-surface/40 border border-slate-700/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Innovation</h3>
              <p className="text-slate-300 leading-relaxed">
                Developing AI-guided tools and digital solutions to tackle real-world healthcare challenges.
              </p>
            </div>

            <div className="bg-surface/40 border border-slate-700/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-secondary mb-3">Education</h3>
              <p className="text-slate-300 leading-relaxed">
                Mentoring the next generation of clinicians and launching initiatives like an ultrasound school for midwives to improve prenatal care in underserved regions.
              </p>
            </div>

            <div className="bg-surface/40 border border-slate-700/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Community Leadership</h3>
              <p className="text-slate-300 leading-relaxed">
                As a long-time elder in the Seventh-day Adventist Church, I find purpose in inspiring others through faith and service.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Let's Connect</h2>
          <p className="text-slate-300 mb-6">
            Whether you're interested in healthcare innovation, AI in medicine, or just want to chat about the intersection of technology and clinical practice, I'd love to hear from you.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://x.com/CodeCraftMD"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-surface/60 border border-slate-700 rounded-lg hover:border-secondary hover:bg-secondary/10 transition-all font-medium text-slate-200"
            >
              Follow on X
            </a>
            <a
              href="https://www.linkedin.com/in/chukwumaonyeije/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-surface/60 border border-slate-700 rounded-lg hover:border-primary hover:bg-primary/10 transition-all font-medium text-slate-200"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
