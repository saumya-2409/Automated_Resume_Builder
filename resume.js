// Define the generatePDF function
function generatePDF(event) {
    if(event){
        event.preventDefault(); // Prevent the form from submitting and refreshing the page
    }

    // Get the values from the form
    const fname =document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const mail = document.getElementById("mail").value;
    const phno = document.getElementById("phno").value;
    const ghacc = document.getElementById("ghacc").value;
    const lacc = document.getElementById("lacc").value;

    const sname1 = document.getElementById("sname1").value;
    const slocate1 = document.getElementById("slocate1").value;
    const sdate1 = document.getElementById("sdate1").value;
    const edate1 = document.getElementById("edate1").value;
    const percent1 = document.getElementById("percent1").value;
    const acheive1 = document.getElementById("acheive1").value;

    const sname2 = document.getElementById("sname2").value;
    const slocate2 = document.getElementById("slocate2").value;
    const sdate2 = document.getElementById("sdate2").value;
    const edate2 = document.getElementById("edate2").value;
    const stream2 = document.getElementById("stream2").value;
    const percent2 = document.getElementById("percent2").value;
    const acheive2 = document.getElementById("acheive2").value;

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
            ...(fname || lname ? [
            {
                alignment: 'center',
                fontSize:'20',
                text:`${fname.toUpperCase()} ${lname.toUpperCase()}`,
                style:"header"
            }
            ] : []),

            ...(mail||phno ? [
            {
                alignment: 'center',
                text:`${mail} | (+91) ${phno}`,
                style:"subheader",
                color: 'grey'
            }
            ] : []),

            ...( ghacc || lacc? [
            {
                style:'texthead',
                color:'blue',
                text:   `${ghacc}
                        ${lacc}`
            }
            ] : []),

            ...(skill1 || skill2 || skill3 ? [
                {
                    text: "SKILLS",
                    style: "header"
                },
                {
                    type: 'square',
                    style: "texthead",
                    ul: [
                        toSentenceCase(skill1),
                        toSentenceCase(skill2),
                        toSentenceCase(skill3)
                    ]
                }
                ] : []),

            {
                text:"EDUCATION",
                style: "header"
            },
            
            {
                ul:[
                    // Check and include Master's details only if not all values are blank
                    ...(uniname4 || unilocate4 || sdate4 || edate4 || degree4 || fostudy4 || descp4 ? [
                        {
                            style:"subheader",
                            text: `${degree4.toUpperCase()} ${toSentenceCase(fostudy4)} | ${toTitleCase(uniname4)} ${toTitleCase(unilocate4)}
                                    ${sdate4}  -  ${edate4}`
                        },
                        {
                            style: "texthead",
                            ul: [
                                toSentenceCase(descp4)
                            ]
                        }
                    ] : []),

                    // Check and include Bachelor's details only if not all values are blank
                    ...(uniname3 || unilocate3 || sdate3 || edate3 || degree3 || fostudy3 || descp3 ? [
                        {
                            style:"subheader",
                            text: `${degree3.toUpperCase()} ${toSentenceCase(fostudy3)} | ${toTitleCase(uniname3)} ${toTitleCase(unilocate3)}
                                    ${sdate3}  -  ${edate3}`
                        },
                        {
                            style: "texthead",
                            ul: [
                                toSentenceCase(descp3)
                        ]
                        }
                    ] : []),

                    // Check and include 12th details only if not all values are blank
                    ...(sname2 || slocate2 || sdate2 || edate2 || stream2 || percent2 || acheive2 ? [
                        {
                            style:"subheader",
                            text: `XII | ${toTitleCase(sname2)} ${toTitleCase(slocate2)}
                                    ${sdate2}  -  ${edate2}
                                    ${stream2.toUpperCase()}
                                    Grade: ${percent2}%`,
                        },
                        {
                            style: "texthead",
                            ul: [
                                toSentenceCase(acheive2)
                            ]
                        }
                    ] : []),

                    // Check and include 10th details only if not all values are blank
                    ...(sname1 || slocate1 || sdate1 || edate1 || percent1 || acheive1 ? [
                        {
                            style:"subheader",
                            text: `X | ${toTitleCase(sname1)} ${toTitleCase(slocate1)}
                                    ${sdate1}  -  ${edate1}
                                    Grade: ${percent1}%`,
                        },
                        {
                            style: "texthead",
                            ul: [
                                toSentenceCase(acheive1)
                            ]
                        }
                        ] : []),
                ]
            },
            
            ...(cname|| ptitle || sdate || edate ? [
            {
                text: "EXPERIENCE",
                style: "header"
            },
            {
                text: `${toTitleCase(ptitle)} | ${toTitleCase(cname)}
                        ${sdate}  -  ${edate}`,
                style: "subheader"
            },
            {
                style: "texthead",
                ul: [
                    toSentenceCase(wsum)
                ]
            }
            ] : []),


        ],

        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 20, 0, 10],
                color:'#4A86E8'
            },
            subheader: {
                fontSize: 14,
                bold:true,
                margin: [0, 10, 0, 5],
                color:'black'
            },
            texthead: {
                fontSize: 12,
                bold: false,
                margin: [0,5,0,2.5]
            }
        }
    };

    // Generate the PDF and download it
    pdfMake.createPdf(docDefinition).download();
}

function toTitleCase (str) {
    if (!str) {
      return '';
    }
    const strArr = str.split(' ').map((word) => {
      return word ? word[0].toUpperCase() + word.substring(1).toLowerCase() : '';
    });
    return strArr.join(' ');
}

function firstLetterUpper(str) {
    var newstr = str.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g,function(c){return c.toUpperCase()});
    return newstr;
}

function toSentenceCase(str) {
    var newString = firstLetterUpper(str);
    return newString;
}

document.addEventListener('DOMContentLoaded', function () {
    const resumeForm = document.getElementById("resumeForm");
    // Check if resumeForm is not null before adding the event listener
    if (resumeForm) {
        resumeForm.addEventListener("submit", generatePDF);
    } else {
        console.error("Element with ID 'resumeForm' not found.");
    }
});
