# ── Resumify Backend — main.py ────────────────────────────────
# FastAPI application entry point.
# Endpoints:
#   GET  /health         → liveness check
#   POST /generate-pdf   → returns a PDF file
#   POST /ai-enhance     → AI bullet rewriter (added in Phase 7)

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response

from schemas import GeneratePDFRequest, AIEnhanceRequest
from pdf_generator import render_resume, generate_pdf

app = FastAPI(title="Resumify API", version="1.0.0")

# Allow requests from any origin during development.
# Tighten this to your Vercel domain after deployment.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Health Check ──────────────────────────────────────────────

@app.get("/health")
def health():
    """Simple liveness check — Render uses this to confirm the service is up."""
    return {"status": "ok", "version": "1.0.0"}


# ── PDF Generation ────────────────────────────────────────────

@app.post("/generate-pdf")
async def generate_pdf_endpoint(payload: GeneratePDFRequest):
    """
    Accepts resume data as JSON, renders the chosen Jinja2 template,
    and returns a downloadable PDF file.
    """
    try:
        # Flatten ResumeData to a plain dict for Jinja2
        resume_dict = payload.resume_data.model_dump()
        html = render_resume(resume_dict, payload.template)
        pdf_bytes = generate_pdf(html)

        filename = f"{payload.resume_data.name or 'resume'}_resume.pdf"
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": f'attachment; filename="{filename}"'},
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── AI Enhancement (Phase 7 — stub for now) ───────────────────

@app.post("/ai-enhance")
async def ai_enhance(payload: AIEnhanceRequest):
    """
    Accepts raw bullet text + a user-supplied API key + provider.
    Calls Gemini or Claude and returns polished bullet text.
    The key is used only for this request and is never stored.
    """
    prompt = (
        "Rewrite the following resume bullet points using strong action verbs, "
        "specific metrics, and outcome-focused language "
        "(format: action verb + what you did + measurable result). "
        "Return ONLY the rewritten bullets as a plain bulleted list starting with •. "
        "Do not add any explanation or commentary.\n\n"
        f"Original:\n{payload.text}"
    )

    try:
        if payload.provider == "gemini":
            import google.generativeai as genai
            genai.configure(api_key=payload.api_key)
            # gemini-1.5-flash is free-tier
            model = genai.GenerativeModel("gemini-1.5-flash")
            response = model.generate_content(prompt)
            return {"enhanced_text": response.text}

        elif payload.provider == "claude":
            import anthropic
            client = anthropic.Anthropic(api_key=payload.api_key)
            # claude-haiku is the cheapest/fastest tier
            message = client.messages.create(
                model="claude-haiku-20240307",
                max_tokens=1024,
                messages=[{"role": "user", "content": prompt}],
            )
            return {"enhanced_text": message.content[0].text}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"AI error: {str(e)}")
