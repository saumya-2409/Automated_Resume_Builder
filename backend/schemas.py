# ── Resumify Backend — schemas.py ────────────────────────────
# Pydantic models that define the shape of resume data
# sent from the frontend to the API.

from typing import Literal, Optional
from pydantic import BaseModel


# ── Resume Section Models ─────────────────────────────────────

class Education(BaseModel):
    university: str = ""
    degree: str = ""          # e.g. "B.Tech"
    field: str = ""           # e.g. "Computer Science and Engineering"
    start: str = ""           # e.g. "Aug 2022"
    end: str = ""             # e.g. "May 2026" or "Present"
    cgpa: str = ""            # e.g. "8.18/10"
    coursework: str = ""      # comma-separated relevant courses


class Experience(BaseModel):
    title: str = ""           # e.g. "Information Technology Intern"
    company: str = ""         # e.g. "Cvent"
    location: str = ""        # e.g. "India"
    start: str = ""           # e.g. "Jan 2025"
    end: str = ""             # e.g. "Jul 2025" or "Present"
    bullets: list[str] = []   # each bullet as a separate string


class Project(BaseModel):
    name: str = ""            # e.g. "AI Academic Research Assistant"
    context: str = ""         # e.g. "GEU" or "Individual"
    github: str = ""          # GitHub URL (optional)
    start: str = ""
    end: str = ""
    bullets: list[str] = []


class SkillCategory(BaseModel):
    category: str = ""        # e.g. "Programming & Frameworks"
    items: str = ""           # comma-separated: "Python, C++, JavaScript"


class Certification(BaseModel):
    provider: str = ""        # e.g. "Google"
    name: str = ""            # e.g. "Google Cloud Computing Foundations"


class Achievement(BaseModel):
    text: str = ""            # full achievement sentence


# ── Root Resume Model ─────────────────────────────────────────

class ResumeData(BaseModel):
    # Personal Info
    name: str = ""
    email: str = ""
    phone: str = ""
    linkedin: str = ""
    github: str = ""
    summary: str = ""

    # Sections
    education_ug: Optional[Education] = None
    education_pg: Optional[Education] = None
    skills: list[SkillCategory] = []
    experience: list[Experience] = []
    projects: list[Project] = []
    certifications: list[Certification] = []
    achievements: list[Achievement] = []


# ── API Request Models ────────────────────────────────────────

class GeneratePDFRequest(BaseModel):
    resume_data: ResumeData
    template: Literal["latex_classic", "modern", "minimal"] = "latex_classic"


class AIEnhanceRequest(BaseModel):
    text: str
    api_key: str
    provider: Literal["gemini", "claude"]
