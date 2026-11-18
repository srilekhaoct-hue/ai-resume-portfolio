
import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel

load_dotenv(Path(__file__).with_name(".env"))

app = FastAPI(title="Mitra - Hybrid AI Resume Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",
    "https://srilekhaoct-hue.github.io",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("OPENAI_API_KEY")
model = os.getenv("OPENAI_MODEL", "gpt-6-luna")
resume_path = Path(__file__).resolve().parent / "resume_knowledge.txt"
resume_knowledge = resume_path.read_text(encoding="utf-8")
client = OpenAI(api_key=api_key) if api_key else None


class ChatRequest(BaseModel):
    question: str


# Resume knowledge base: free answers for common recruiter questions
RESUME_KNOWLEDGE = [
    (
        ["skill", "technical stack", "technologies", "programming language"],
        "Srilekha's technical skills include Python, SQL, PySpark, "
        "FastAPI, Flask, LangChain, LangGraph, RAG, machine learning, "
        "NLP, AWS, Databricks, Apache Spark, Kafka, and vector search."
    ),
    (
        ["experience", "work history", "professional background"],
        "Srilekha has around four years of experience in AI and machine "
        "learning. She has worked as an AI Engineer at American Unit Inc. "
        "and previously as a Jr. AI/ML Engineer at American Unit Pvt. Limited."
    ),
    (
        ["education", "degree", "university", "master"],
        "Srilekha completed an MS in Advanced Data Analytics at the "
        "University of North Texas, with a GPA of 3.8 out of 4.0."
    ),
    (
    ["graduation date", "when did she graduate",
     "when did she complete her masters",
     "when did she finish her masters",
     "masters completion date"],
    "Srilekha completed her MS in Advanced Data Analytics "
    "at the University of North Texas in December 2025."
    ),
    (
        ["certification", "certified", "aws certificate"],
        "Srilekha holds the AWS Certified Cloud Practitioner certification."
    ),
    (
        ["rag", "retrieval augmented", "retrieval-augmented"],
        "Srilekha has experience building RAG applications, including "
        "document chunking, embedding generation, vector indexing, "
        "hybrid retrieval, BM25 search, and reranking."
    ),
    (
        ["langgraph", "agentic", "multi-agent"],
        "Srilekha has worked with LangGraph to build multi-step and "
        "multi-agent AI workflows."
    ),
    (
        ["aws", "amazon web services", "bedrock"],
        "Her AWS experience includes services and technologies such as "
        "AWS Bedrock, AWS Glue, EMR, Lambda, and Amazon S3."
    ),
    (
        ["project", "projects", "portfolio"],
        "Her project experience includes enterprise AI knowledge "
        "assistants, RAG-based applications, market intelligence "
        "platforms, predictive analytics, and scalable data pipelines."
    ),
    (
        ["contact", "email", "reach", "linkedin"],
        "You can contact Srilekha at srilekhaa198@gmail.com or connect "
        "with her on LinkedIn: "
        "https://www.linkedin.com/in/srilekha-a-4a04b6353/"
    ),
    (
        ["current role", "current company", "currently working"],
        "Srilekha is working as an AI Engineer at American Unit Inc. "
        "on a Wells Fargo client engagement."
    ),
]


def get_qa_answer(question: str):
    question = question.lower()

    for keywords, answer in RESUME_KNOWLEDGE:
        if any(keyword in question for keyword in keywords):
            return answer

    return None


@app.get("/")
def home():
    return {"message": "Mitra Hybrid AI backend is running!"}


@app.post("/chat")
def chat(request: ChatRequest):
    question = request.question.strip()

    if not question:
        return {"answer": "Please enter a question."}

    # First: try the free Q&A knowledge base

    # Second: use OpenAI only if no Q&A match is found
    if client:
        try:
            response = client.responses.create(
                model=model,
                instructions=f"""
You are Mitra, Srilekha Aduvala's AI Portfolio Assistant.

Use the complete resume information below to answer
recruiters' questions accurately and naturally.

RESUME:
{resume_knowledge}

RULES:
- Be friendly, professional, and conversational.
- Explain technical experience with specific resume-supported details.
- For follow-up questions, provide additional relevant details.
- Never invent experience, achievements, or metrics.
- If something isn't in the resume, say so.
- Keep answers concise unless the user asks for more detail.
""",
                input=question,
            )

            return {
                "answer": response.output_text,
                "source": "openai_llm"
            }

        except Exception as error:
            print(f"OpenAI fallback unavailable: {error}")

    # Third: graceful fallback if OpenAI is unavailable
    return {
        "answer": (
            "I don't have a predefined answer for that question yet. "
            "Please ask me about Srilekha's skills, experience, "
            "projects, education, or certifications."
        ),
        "source": "fallback"
    }
