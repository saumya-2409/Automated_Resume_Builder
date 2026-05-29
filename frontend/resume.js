function generatePDF(event) {
    if (event) {
        event.preventDefault();
    }

    // Get form values
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const mail = document.getElementById("mail").value;
    const phno = document.getElementById("phno").value;
    const ghacc = document.getElementById("ghacc").value;
    const lacc = document.getElementById("lacc").value;

    const sname1 = document.getElementById("sname1").value;
    const slocate1 = document.getElementById("slocate1").value;
    const edate1 = document.getElementById("edate1").value;
    const percent1 = document.getElementById("percent1").value;

    const sname2 = document.getElementById("sname2").value;
    const slocate2 = document.getElementById("slocate2").value;
    const edate2 = document.getElementById("edate2").value;
    const stream2 = document.getElementById("stream2").value;
    const percent2 = document.getElementById("percent2").value;

    const uniname3 = document.getElementById("uniname3").value;
    const unilocate3 = document.getElementById("unilocate3").value;
    const sdate3 = document.getElementById("sdate3").value;
    const edate3 = document.getElementById("edate3").value;
    const degree3 = document.getElementById("degree3").value;
    const fostudy3 = document.getElementById("fostudy3").value;
    const descp3 = document.getElementById("descp3").value;

    const uniname4 = document.getElementById("uniname4").value;
    const unilocate4 = document.getElementById("unilocate4").value;
    const sdate4 = document.getElementById("sdate4").value;
    const edate4 = document.getElementById("edate4").value;
    const degree4 = document.getElementById("degree4").value;
    const fostudy4 = document.getElementById("fostudy4").value;
    const descp4 = document.getElementById("descp4").value;

    const ptitle = document.getElementById("ptitle").value;
    const cname = document.getElementById("cname").value;
    const sdate = document.getElementById("sdate").value;
    const edate = document.getElementById("edate").value;
    const wsum = document.getElementById("wsum").value;

    const skill1 = document.getElementById("skill1").value;
    const skill2 = document.getElementById("skill2").value;
    const skill3 = document.getElementById("skill3").value;

    // Define the document definition object
    const docDefinition = {
        content: [
            // Header Section
            {
                text: `${fname.toUpperCase()} ${lname.toUpperCase()}`,
                style: "header",
                alignment: "center",
                margin: [0, 0, 0, 10],
            },
            {
                table : {
                    widths : ["*","*","*","*"],
                    body : [
                        [
                            { text: `+91 ${phno}`, style: "text"},
                            { text: `${mail}`, style: "link",},
                            { text: `${lacc}`, style: "link",},
                            { text: `${ghacc}`, style: "link",},                            
                        ],
                    ],
                },
                layout: "noBorders", // Remove table borders
                margin: [0, 0, 0, 20], // Add margin below the table
            },

            // Education Section
            {
                text: "Education",
                style: "sectionHeader",
                margin: [0, 10, 0, 10],
            },
            ...(uniname4 || unilocate4 || sdate4 || edate4 || degree4 || fostudy4 || descp4
                ? [
                      {
                        text: `${toTitleCase(uniname4)}`, // University Name
                        style: "boldText",
                      },
                      {
                        text: `${degree4} in ${toTitleCase(fostudy4)}`, // Degree
                        style: "italicText",
                    },
                    {
                        text: `${sdate4} - ${edate4}`, // Dates
                        style: "smallItalicText",
                    },
                    {
                        text: `CGPA: ${descp4}`, // CGPA
                        style: "smallItalicText",
                        margin: [0, 0, 0, 10], // Add margin below the CGPA
                    },
                  ]
                : []),
            ...(uniname3 || unilocate3 || sdate3 || edate3 || degree3 || fostudy3 || descp3
                ? [
                      {
                          text: `${degree3.toUpperCase()} in ${toTitleCase(fostudy3)}`,
                          style: "subheader",
                      },
                      {
                          text: `${toTitleCase(uniname3)}, ${toTitleCase(unilocate3)}`,
                          style: "text",
                      },
                      {
                          text: `${sdate3} - ${edate3}`,
                          style: "text",
                      },
                      {
                          text: `${descp3}`,
                          style: "text",
                          margin: [0, 0, 0, 10],
                      },
                  ]
                : []),
            ...(sname2 || slocate2 || edate2 || stream2 || percent2
                ? [
                      {
                          text: `Class XII (${stream2.toUpperCase()})`,
                          style: "subheader",
                      },
                      {
                          text: `${toTitleCase(sname2)}, ${toTitleCase(slocate2)}`,
                          style: "text",
                      },
                      {
                          text: `${edate2}`,
                          style: "text",
                      },
                      {
                          text: `Percentage: ${percent2}%`,
                          style: "text",
                      },
                  ]
                : []),
            ...(sname1 || slocate1 || edate1 || percent1
                ? [
                      {
                          text: `Class X`,
                          style: "subheader",
                      },
                      {
                          text: `${toTitleCase(sname1)}, ${toTitleCase(slocate1)}`,
                          style: "text",
                      },
                      {
                          text: `${edate1}`,
                          style: "text",
                      },
                      {
                          text: `Percentage: ${percent1}%`,
                          style: "text",
                      },
                  ]
                : []),

            // Work Experience Section
            ...(ptitle || cname || sdate || edate || wsum
                ? [
                      {
                          text: "WORK EXPERIENCE",
                          style: "sectionHeader",
                          margin: [0, 10, 0, 10],
                      },
                      {
                          text: `${toTitleCase(ptitle)}`,
                          style: "subheader",
                      },
                      {
                          text: `${toTitleCase(cname)}`,
                          style: "text",
                      },
                      {
                          text: `${sdate} - ${edate}`,
                          style: "text",
                      },
                      {
                          text: `${wsum}`,
                          style: "text",
                          margin: [0, 0, 0, 10],
                      },
                  ]
                : []),

            // Skills Section
            ...(skill1 || skill2 || skill3
                ? [
                      {
                          text: "SKILLS",
                          style: "sectionHeader",
                          margin: [0, 10, 0, 10],
                      },
                      {
                          ul: [skill1, skill2, skill3].filter(Boolean).map((skill) => ({
                              text: skill,
                              style: "text",
                          })),
                      },
                  ]
                : []),
        ],
        styles: {
            header: {
                fontSize: 24,
                bold: true,
                color: "#2c3e50",
            },
            subheader: {
                fontSize: 16,
                bold: true,
                color: "#34495e",
                margin: [0, 5, 0, 5],
            },
            sectionHeader: {
                fontSize: 18,
                bold: true,
                color: "#2c3e50",
                margin: [0, 10, 0, 5],
            },
            text: {
                fontSize: 12,
                color: "#333",
                margin: [0, 0, 0, 5],
            },
            link: {
                fontSize: 12,
                color: "#000000",
                margin: [0, 0, 0, 5],
                decoration: "underline",
            },
            boldText: {
                fontSize: 14,
                bold: true,
                color: "#2c3e50",
                margin: [0, 0, 0, 5],
            },
            italicText: {
                fontSize: 12,
                italics: true,
                color: "#333",
                margin: [0, 0, 0, 5],
            },
            smallItalicText: {
                fontSize: 10,
                italics: true,
                color: "#666",
                margin: [0, 0, 0, 5],
            },
        },
    };

    // Generate the PDF and download it
    pdfMake.createPdf(docDefinition).download();
}

// Helper functions
function toTitleCase(str) {
    return str
        ? str
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(" ")
        : "";
}

document.addEventListener("DOMContentLoaded", function () {
    const resumeForm = document.getElementById("resumeForm");
    if (resumeForm) {
        resumeForm.addEventListener("submit", generatePDF);
    } else {
        console.error("Element with ID 'resumeForm' not found.");
    }
});
