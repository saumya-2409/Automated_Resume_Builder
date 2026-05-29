# ── Resumify Backend — pdf_generator.py ──────────────────────
# Isolated PDF generation logic.
# Keeps main.py clean — it just calls generate_pdf().

import io
from pathlib import Path
from jinja2 import Environment, FileSystemLoader, select_autoescape
from weasyprint import HTML, CSS

# Path to the templates/ folder (same directory as this file)
TEMPLATES_DIR = Path(__file__).parent / "templates"

# Jinja2 environment — loads HTML files from templates/
_env = Environment(
    loader=FileSystemLoader(str(TEMPLATES_DIR)),
    autoescape=select_autoescape(["html"]),
)


def render_resume(resume_data: dict, template_name: str) -> str:
    """
    Renders a Jinja2 HTML template with the given resume data.
    Returns the rendered HTML string.
    """
    template_file = f"{template_name}.html"
    template = _env.get_template(template_file)
    return template.render(**resume_data)


def generate_pdf(html_string: str) -> bytes:
    """
    Converts an HTML string to a PDF using WeasyPrint.
    Returns the PDF as raw bytes.
    """
    pdf_buffer = io.BytesIO()
    HTML(string=html_string).write_pdf(pdf_buffer)
    return pdf_buffer.getvalue()
