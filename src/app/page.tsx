
"use client";

import { useState } from "react";

const skills = [
  "Python", "SQL", "PySpark", "FastAPI", "Flask", "LangChain",
  "LangGraph", "RAG Architecture", "LLMs", "NLP", "Machine Learning",
  "TensorFlow", "Scikit-learn", "AWS Bedrock", "AWS Glue",
  "Amazon EMR", "Amazon OpenSearch", "Apache Spark", "Kafka",
  "Databricks", "Vector Search", "Hybrid Search", "Prompt Engineering",
  "REST APIs", "PostgreSQL", "Tableau",
];

const experience = [
  {
    role: "AI Engineer",
    company: "American Unit Inc. | Client: Wells Fargo",
    location: "Plano, Texas",
    date: "Jan 2026 – Present",
    points: [
      "Developing enterprise RAG applications using LLMs, embeddings, and hybrid retrieval.",
      "Building multi-agent workflows using LangGraph and Python.",
      "Working with AWS Bedrock, Amazon OpenSearch, and FastAPI.",
      "Implementing prompt evaluation, PII masking, tracing, and audit logging.",
    ],
  },
  {
    role: "Jr. AI/ML Engineer",
    company: "American Unit Pvt. Limited",
    location: "Hyderabad, India",
    date: "Feb 2021 – Dec 2023",
    points: [
      "Developed data pipelines using AWS Glue, EMR, and Apache Spark.",
      "Built NLP and machine learning workflows for text analytics and predictive insights.",
      "Worked with Kafka and AWS Lambda for data processing workflows.",
      "Contributed to anomaly detection and data quality monitoring.",
    ],
  },
];

const projects = [
  {
    number: "01",
    title: "Enterprise AI Knowledge Assistant",
    description:
      "An enterprise knowledge assistant using retrieval-augmented generation, vector search, and agentic workflows to retrieve relevant information.",
    stack: "Python · RAG · LangGraph · AWS Bedrock · OpenSearch",
  },
  {
    number: "02",
    title: "Market Intelligence & Predictive Analytics",
    description:
      "Data engineering and machine learning workflows for processing market intelligence data, identifying trends, and generating predictive insights.",
    stack: "Python · PySpark · AWS Glue · EMR · Machine Learning",
  },
];

const navigation = [
  "Home", "About", "Experience", "Projects",
  "Skills", "Education", "Contact",
];

export default function Home() {
  const [question, setQuestion] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<
    { role: string; text: string }[]
  >([
    {
      role: "assistant",
      text: "Hi! I'm Mitra, Srilekha's AI Portfolio Assistant. Ask me anything about her experience, skills, projects, or education.",
    },
  ]);

  async function sendMessage() {
    if (!question.trim() || sending) return;

    const userQuestion = question.trim();

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userQuestion },
    ]);
    setQuestion("");
    setSending(true);

    try {
     const response = await fetch("https://srilekha-mitra-api.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userQuestion }),
      });

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.answer },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I couldn't connect to the AI server. Please try again.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <main
      className="min-h-screen scroll-smooth bg-[#e0f2fe] text-[#1e3a8a]"
      style={{ fontFamily: "Lato, sans-serif" }}
    >
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-40 border-b border-[#bfdbfe] bg-[#eff8ff]/95 px-5 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-5">
          <a
            href="#home"
            className="text-2xl font-bold text-[#1d4ed8]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            SA.
          </a>

          <div className="flex max-w-[85%] gap-4 overflow-x-auto whitespace-nowrap text-sm font-semibold text-[#1e40af] md:gap-7">
            {navigation.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition hover:text-[#0284c7]"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-6">

        {/* HOME — AI WORLD */}
        <section
          id="home"
          className="relative flex min-h-[700px] scroll-mt-24 flex-col justify-center overflow-hidden rounded-[32px] border border-[#bfdbfe] px-7 py-16 shadow-lg md:px-14"
          
        style={{
        backgroundImage:
           "linear-gradient(90deg, rgba(235,248,255,0.92) 0%, rgba(235,248,255,0.78) 30%, rgba(235,248,255,0.02) 65%), url('/ai-resume-portfolio/ai-hero.png')",
            backgroundSize: "cover",
            backgroundPosition: "65% center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#bae6fd",
            }}
          >              
          <div className="relative z-10 max-w-xl">
            <p className="mb-6 text-xs font-bold tracking-[0.25em] text-[#1d4ed8]">
              HELLO, WELCOME TO MY PORTFOLIO
            </p>

            <h1
              className="text-5xl font-semibold leading-tight text-[#102a65] md:text-7xl"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              I'm{" "}
              <span className="text-[#1d4ed8]">
                Srilekha
                <br />
                Aduvala
              </span>
            </h1>

            <h2 className="mt-6 border-l-4 border-[#2563eb] pl-4 text-2xl font-semibold text-[#1e3a8a]">
              AI Engineer
            </h2>

            <p className="mt-6 max-w-lg text-base leading-8 text-[#1e3a8a]">
              I build intelligent applications and data-driven solutions
              using artificial intelligence, machine learning, generative AI,
              and cloud technologies.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-full bg-[#2563eb] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-[#1d4ed8]"
              >
                Explore My Work →
              </a>

              <a
                href="#contact"
                className="rounded-full border-2 border-[#2563eb] bg-white/80 px-7 py-3.5 text-sm font-semibold text-[#1d4ed8] transition hover:bg-white"
              >
                Contact Me
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-6 text-sm font-medium text-[#1e40af]">
              <span>📍 Denton, Texas</span>
              <a href="mailto:srilekhaa198@gmail.com">
                ✉ Email me
              </a>
              <a
                href="https://www.linkedin.com/in/srilekha-a-4a04b6353/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="scroll-mt-28 py-20">
          <p className="text-xs font-bold tracking-[0.25em] text-[#2563eb]">
            A LITTLE ABOUT ME
          </p>

          <h2
            className="mt-3 text-4xl text-[#1d4ed8]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            About Me
          </h2>

          <div className="mt-8 rounded-3xl border border-[#bfdbfe] bg-[#f0f9ff] p-8 shadow-sm md:p-10">
            <p className="max-w-4xl leading-9 text-[#1e3a8a]">
              AI/ML Engineer with around four years of experience developing
              machine learning and generative AI solutions. My work includes
              LLM applications, retrieval-augmented generation, agentic
              workflows, natural language processing, and scalable data
              pipelines. I enjoy turning complex technical challenges into
              practical solutions.
            </p>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section
          id="experience"
          className="scroll-mt-28 border-t border-[#bfdbfe] py-20"
        >
          <p className="text-xs font-bold tracking-[0.25em] text-[#2563eb]">
            MY PROFESSIONAL JOURNEY
          </p>

          <h2
            className="mt-3 text-4xl text-[#1d4ed8]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Experience
          </h2>

          <div className="mt-10 grid gap-7 md:grid-cols-2">
            {experience.map((job) => (
              <article
                key={job.role}
                className="rounded-3xl border border-[#bfdbfe] bg-[#f0f9ff] p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-sm font-semibold text-[#2563eb]">
                  {job.date}
                </p>

                <h3
                  className="mt-3 text-2xl font-semibold text-[#1e40af]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {job.role}
                </h3>

                <p className="mt-2 text-sm text-[#3b5998]">
                  {job.company} · {job.location}
                </p>

                <ul className="mt-6 space-y-3 text-sm leading-7 text-[#1e3a8a]">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="text-[#3b82f6]">✦</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          className="scroll-mt-28 border-t border-[#bfdbfe] py-20"
        >
          <p className="text-xs font-bold tracking-[0.25em] text-[#2563eb]">
            SELECTED WORK
          </p>

          <h2
            className="mt-3 text-4xl text-[#1d4ed8]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Featured Projects
          </h2>

          <div className="mt-10 grid gap-7 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.number}
                className="rounded-3xl border border-[#bfdbfe] bg-[#f0f9ff] p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-sm font-bold text-[#3b82f6]">
                  {project.number}
                </p>

                <h3
                  className="mt-5 text-2xl text-[#1e40af]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {project.title}
                </h3>

                <p className="mt-5 text-sm leading-8 text-[#1e3a8a]">
                  {project.description}
                </p>

                <p className="mt-7 text-xs font-semibold leading-6 text-[#2563eb]">
                  {project.stack}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          className="scroll-mt-28 border-t border-[#bfdbfe] py-20"
        >
          <p className="text-xs font-bold tracking-[0.25em] text-[#2563eb]">
            MY TECHNICAL TOOLKIT
          </p>

          <h2
            className="mt-3 text-4xl text-[#1d4ed8]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Skills & Technologies
          </h2>

          <div className="mt-10 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[#93c5fd] bg-[#f0f9ff] px-5 py-3 text-sm font-medium text-[#1e40af] shadow-sm transition hover:bg-[#dbeafe]"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section
          id="education"
          className="scroll-mt-28 border-t border-[#bfdbfe] py-20"
        >
          <p className="text-xs font-bold tracking-[0.25em] text-[#2563eb]">
            EDUCATION & CREDENTIALS
          </p>

          <h2
            className="mt-3 text-4xl text-[#1d4ed8]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Education
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-[#bfdbfe] bg-[#f0f9ff] p-8 shadow-sm">
              <h3
                className="text-2xl text-[#1e40af]"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                MS in Advanced Data Analytics
              </h3>

              <p className="mt-3 text-sm text-[#1e3a8a]">
                University of North Texas · Denton, Texas
              </p>

              <p className="mt-4 text-sm font-semibold text-[#2563eb]">
                GPA: 3.8 / 4.0
              </p>
            </div>

            <div className="rounded-3xl border border-[#bfdbfe] bg-[#f0f9ff] p-8 shadow-sm">
              <p className="text-xs font-bold tracking-widest text-[#2563eb]">
                CERTIFICATION
              </p>

              <h3
                className="mt-4 text-2xl text-[#1e40af]"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                AWS Certified Cloud Practitioner
              </h3>

              <p className="mt-3 text-sm text-[#1e3a8a]">
                CLF-C02
              </p>

              <a
                href="https://www.credly.com/users/srilekha-aduvala/badges/credly"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block text-sm font-semibold text-[#2563eb] underline underline-offset-4"
              >
                View certification on Credly ↗
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="scroll-mt-28 border-t border-[#bfdbfe] py-20"
        >
          <p className="text-xs font-bold tracking-[0.25em] text-[#2563eb]">
            LET'S CONNECT
          </p>

          <h2
            className="mt-3 text-4xl text-[#1d4ed8]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Contact Me
          </h2>

          <div className="mt-9 rounded-3xl border border-[#93c5fd] bg-gradient-to-br from-[#bfdbfe] to-[#f0f9ff] p-8 leading-10 text-[#1e3a8a] shadow-sm">
            <p>
              <strong>Location:</strong> Denton, Texas
            </p>

            <p>
              <strong>Email:</strong>{" "}
              <a
                className="text-[#1d4ed8] underline"
                href="mailto:srilekhaa198@gmail.com"
              >
                srilekhaa198@gmail.com
              </a>
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              <a
                className="text-[#1d4ed8] underline"
                href="tel:9453011255"
              >
                945-301-1255
              </a>
            </p>

            <p>
              <strong>LinkedIn:</strong>{" "}
              <a
                className="text-[#1d4ed8] underline"
                href="https://www.linkedin.com/in/srilekha-a-4a04b6353/"
                target="_blank"
                rel="noreferrer"
              >
                View LinkedIn Profile ↗
              </a>
            </p>
          </div>
        </section>

        <footer className="border-t border-[#bfdbfe] py-8 text-center text-xs text-[#3b5998]">
          © 2026 Srilekha Aduvala · AI Engineer
        </footer>
      </div>

      {/* FLOATING MITRA CHATBOT */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {chatOpen && (
          <div className="flex h-[min(520px,75dvh)] w-[min(380px,calc(100vw-40px))] flex-col overflow-hidden rounded-3xl border border-[#93c5fd] bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-gradient-to-r from-[#2563eb] to-[#38bdf8] px-5 py-4 text-white">
              <div>
                <p className="text-lg font-bold">
                  🤖 Mitra
                </p>
                <p className="text-xs text-[#dbeafe]">
                  Srilekha's AI Portfolio Assistant
                </p>
              </div>

              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="rounded-full bg-white/20 px-3 py-1 text-xl hover:bg-white/30"
                aria-label="Close chatbot"
              >
                ×
              </button>
            </div>

            <div
              className="flex-1 space-y-4 overflow-y-auto bg-[#eff8ff] p-4"
              aria-live="polite"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "ml-auto rounded-br-sm bg-[#2563eb] text-white"
                      : "mr-auto rounded-bl-sm border border-[#bfdbfe] bg-white text-[#1e3a8a]"
                  }`}
                >
                  {message.text}
                </div>
              ))}

              {sending && (
                <p className="text-xs text-[#2563eb]">
                  Mitra is thinking...
                </p>
              )}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
              className="flex gap-2 border-t border-[#bfdbfe] bg-white p-3"
            >
              <input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask Mitra anything..."
                aria-label="Message Mitra"
                className="min-w-0 flex-1 rounded-full border border-[#bfdbfe] bg-[#f0f9ff] px-4 py-3 text-xs text-[#1e3a8a] outline-none focus:border-[#2563eb]"
              />

              <button
                type="submit"
                disabled={sending || !question.trim()}
                className="rounded-full bg-[#2563eb] px-5 text-xs font-semibold text-white transition hover:bg-[#1d4ed8] disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        )}

        <button
          type="button"
          onClick={() => setChatOpen((prev) => !prev)}
          aria-label={chatOpen ? "Close Mitra" : "Open Mitra chatbot"}
          aria-expanded={chatOpen}
          className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-[#38bdf8] to-[#2563eb] text-3xl text-white shadow-xl transition hover:scale-110"
        >
          🤖
        </button>
      </div>
    </main>
  );
}
